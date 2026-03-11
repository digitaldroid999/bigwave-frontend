import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { BrowserRouter, Link, Route, Switch } from 'react-router-dom' ;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/header';
import Landing from './components/layouts/landing';
import Footer from './components/layouts/footer';
import NewGame from './pages/NewGame/newGame';
import Favorite from './pages/favorites/favorite';
import Slot from './pages/slot/slot';
import Live from './pages/live/live';
import GameDemo from './pages/live/components/gameDemo';
import Login from './components/auth/login';
import Notification from './components/common/notification';
import echo from './lib/echo';
import { useBalancePolling } from './hooks/useBalancePolling';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is authenticated from localStorage (check for token)
    const token = localStorage.getItem('authToken');
    return token !== null && localStorage.getItem('isAuthenticated') === 'true';
  });
  const [userData, setUserData] = useState(() => {
    // Get user data from localStorage on mount
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        return JSON.parse(storedUserData);
      } catch (error) {
        return null;
      }
    }
    return null;
  });
  const [userBalance, setUserBalance] = useState(() => {
    // Get user balance from localStorage on mount
    const storedBalance = localStorage.getItem('userBalance');
    if (storedBalance) {
      try {
        return JSON.parse(storedBalance);
      } catch (error) {
        return null;
      }
    }
    return null;
  });
  const [notification, setNotification] = useState({ message: '', isVisible: false });
  const userDataRef = useRef(userData);
  const userBalanceRef = useRef(userBalance);

  // Memoize the balance update callback to prevent unnecessary re-renders
  const handleBalanceUpdate = useCallback((balanceData) => {
    setUserBalance(balanceData);
  }, []);

  // Poll balance every 1 second when authenticated
  useBalancePolling(isAuthenticated, handleBalanceUpdate);

  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);

  useEffect(() => {
    userBalanceRef.current = userBalance;
  }, [userBalance]);

  useEffect(() => {
    const currentUser = userDataRef.current || userData;
    const userId = currentUser?.id;
    console.log('userId', userId);

    if (!isAuthenticated || !userId) {
      console.log('[Echo] Skipping private channel subscription: user not authenticated or missing id');
      return undefined;
    }

    const channelName = `user.${userId}`;
    const channel = echo.private(channelName);
    console.log(`[Echo] Subscribed to private channel ${channelName}`);

    const handleBalanceUpdated = (event) => {
      console.log('[Echo] balance.updated event received', event);

      const previousBalance = userBalanceRef.current;
      const currentUserSnapshot = userDataRef.current;

      let balanceData = null;

      const normalizeWithUser = (payloadUser, fallbackBalance) => {
        if (!payloadUser || typeof payloadUser !== 'object') {
          return null;
        }

        const normalizedBalance = Number(
          typeof payloadUser.balance !== 'undefined'
            ? payloadUser.balance
            : fallbackBalance
        );

        const baseBalance = (previousBalance && typeof previousBalance === 'object') ? previousBalance : {};

        return {
          ...baseBalance,
          balance: isNaN(normalizedBalance) ? baseBalance.balance : normalizedBalance,
          realBalance: isNaN(normalizedBalance) ? baseBalance.realBalance : normalizedBalance,
          user: {
            ...(baseBalance.user && typeof baseBalance.user === 'object' ? baseBalance.user : {}),
            ...payloadUser,
            balance: isNaN(normalizedBalance) ? payloadUser.balance : normalizedBalance,
          },
        };
      };

      if (event?.balanceData) {
        console.log('[Echo] Using event.balanceData');
        balanceData = event.balanceData;
      } else if (event?.data?.balanceData) {
        console.log('[Echo] Using event.data.balanceData');
        balanceData = event.data.balanceData;
      } else if (event?.data) {
        console.log('[Echo] Using general event.data payload');
        balanceData = event.data;
      } else if (
        event?.status &&
        event?.data &&
        event.data.user
      ) {
        console.log('[Echo] Using event.status/data.user payload');
        balanceData = normalizeWithUser(event.data.user, previousBalance?.realBalance ?? previousBalance?.balance);
      } else if (typeof event?.newBalance !== 'undefined') {
        console.log('[Echo] Using event.newBalance');
        const normalizedValue = Number(event.newBalance);
        const baseBalance = (previousBalance && typeof previousBalance === 'object') ? previousBalance : {};
        const baseUser = (baseBalance.user && typeof baseBalance.user === 'object')
          ? baseBalance.user
          : (currentUserSnapshot && typeof currentUserSnapshot === 'object' ? { ...currentUserSnapshot } : {});

        balanceData = {
          ...baseBalance,
          balance: normalizedValue,
          realBalance: normalizedValue,
          user: {
            ...baseUser,
            balance: normalizedValue,
          },
        };
      } else if (
        typeof event?.balance !== 'undefined' ||
        typeof event?.realBalance !== 'undefined' ||
        typeof event?.bonusBalance !== 'undefined' ||
        typeof event?.point !== 'undefined' ||
        (event && typeof event === 'object' && event.user)
      ) {
        console.log('[Echo] Using generic balance-like fields');
        balanceData = event;
      }

      if (!balanceData && event?.data?.user) {
        console.log('[Echo] Fallback: normalizing with event.data.user');
        balanceData = normalizeWithUser(event.data.user, previousBalance?.realBalance ?? previousBalance?.balance);
      }

      if (!balanceData) {
        console.warn('[Echo] Balance update received without recognizable payload', event);
        return;
      }

      console.log('[Echo] Normalized balance payload', balanceData);

      const updatedUser = balanceData.user || event?.data?.user;

      if (updatedUser) {
        try {
          localStorage.setItem('userData', JSON.stringify({
            ...(currentUserSnapshot && typeof currentUserSnapshot === 'object' ? currentUserSnapshot : {}),
            ...updatedUser,
          }));
          setUserData((prev) => ({
            ...(prev && typeof prev === 'object' ? prev : {}),
            ...updatedUser,
          }));
        } catch (userStorageError) {
          console.error('Unable to persist updated user data to localStorage', userStorageError);
        }
      }

      try {
        localStorage.setItem('userBalance', JSON.stringify(balanceData));
      } catch (storageError) {
        console.error('Unable to persist updated balance to localStorage', storageError);
      }

      try {
        window.dispatchEvent(new CustomEvent('balanceUpdated', {
          detail: { balanceData },
        }));
      } catch (dispatchError) {
        console.error('Unable to dispatch balanceUpdated event', dispatchError);
      }

      setUserBalance(balanceData);
    };

    channel.listen('.balance.updated', handleBalanceUpdated);

    return () => {
      channel.stopListening('.balance.updated');
      echo.leave(channelName);
      console.log(`[Echo] Left private channel ${channelName}`);
    };
  }, [isAuthenticated, userData]);

  const handleLoginSuccess = (userData, token, balanceData) => {
    setIsAuthenticated(true);
    setUserData(userData);
    setUserBalance(balanceData);
    setShowLogin(false);
    // User data, token, and balance are already saved in localStorage by login component
    console.log("Login successful:", { userData, token, balanceData });
    
    // Show welcome notification
    const username = userData?.username || userData?.email || userData?.name || 'User';
    setNotification({
      message: `Welcome, ${username}`,
      isVisible: true
    });
  };

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userBalance');
    
    // Update state
    setIsAuthenticated(false);
    setUserData(null);
    setUserBalance(null);
    
    console.log("User signed out");
  };

  return (
    <Router>
      <div className="App">
        <Header showLogin={() => setShowLogin(true)} isAuthenticated={isAuthenticated} userData={userData} userBalance={userBalance} onSignOut={handleSignOut} onLoginSuccess={handleLoginSuccess} />
        <Routes>
          <Route exact path='/' element={<Landing showLogin={() => setShowLogin(true)} isAuthenticated={isAuthenticated} userData={userData} userBalance={userBalance} onSignOut={handleSignOut} />} />
          <Route exact path='/newgame' element={<NewGame showLogin={() => setShowLogin(true)} isAuthenticated={isAuthenticated} userData={userData} userBalance={userBalance} onSignOut={handleSignOut} />}/>
          <Route exact path='/favorite' element={<Favorite showLogin={() => setShowLogin(true)} isAuthenticated={isAuthenticated} userData={userData} userBalance={userBalance} onSignOut={handleSignOut} />} />
          <Route exact path='/slot' element={<Slot showLogin={() => setShowLogin(true)} isAuthenticated={isAuthenticated} userData={userData} userBalance={userBalance} onSignOut={handleSignOut} />} />
          <Route exact path='/live' element={<Live showLogin={() => setShowLogin(true)} isAuthenticated={isAuthenticated} userData={userData} userBalance={userBalance} onSignOut={handleSignOut} />} />
          <Route exact path='/live/gamedemo' element={<GameDemo />} />
        </Routes>
        <Footer />
        <Login isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
        <Notification 
          message={notification.message}
          isVisible={notification.isVisible}
          onClose={() => setNotification({ message: '', isVisible: false })}
        />
      </div>
    </Router>
  );
}

export default App;
