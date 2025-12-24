import { useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * Custom hook to poll user balance every 1.5 seconds
 * @param {boolean} isAuthenticated - Whether user is authenticated
 * @param {Function} onBalanceUpdate - Callback function to update balance state
 */
export function useBalancePolling(isAuthenticated, onBalanceUpdate) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear interval if user is not authenticated
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const tokenType = localStorage.getItem('tokenType');

        if (!token || !tokenType) {
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/balance`,
          {
            headers: {
              'Authorization': `${tokenType} ${token}`
            }
          }
        );

        if (response.data && response.data.status === true) {
          const balanceData = response.data.data;
          // Update localStorage with the full data object
          localStorage.setItem('userBalance', JSON.stringify(balanceData));
          
          // Also update userData if user info is included in the response
          if (balanceData.user) {
            const currentUserData = localStorage.getItem('userData');
            if (currentUserData) {
              try {
                const userData = JSON.parse(currentUserData);
                // Update user data with balance info
                const updatedUserData = {
                  ...userData,
                  balance: balanceData.user.balance,
                  name: balanceData.user.name || userData.name
                };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
              } catch (error) {
                console.error("Error updating user data:", error);
              }
            }
          }
          
          // Dispatch custom event for same-tab updates
          window.dispatchEvent(new CustomEvent('balanceUpdated', {
            detail: { balanceData }
          }));
          
          // Call callback to update state
          if (onBalanceUpdate) {
            onBalanceUpdate(balanceData);
          }
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    // Fetch immediately on mount/authentication
    fetchBalance();

    // Set up interval to fetch every 1.5 seconds
    // intervalRef.current = setInterval(() => {
    //   fetchBalance();
    // }, 1500);

    // Cleanup interval on unmount or when authentication changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAuthenticated, onBalanceUpdate]);
}

