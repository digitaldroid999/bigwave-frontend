import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function UserInfo({ userData: propUserData, userBalance: propUserBalance }) {
  const [userData, setUserData] = useState(propUserData);
  const [userBalance, setUserBalance] = useState(propUserBalance);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  
  // Track previous balance values for animation
  const prevRealBalanceRef = useRef(0);
  const prevBonusBalanceRef = useRef(0);
  const prevPointRef = useRef(0);
  
  // Animation state
  const [realBalanceAnimation, setRealBalanceAnimation] = useState("");
  const [bonusBalanceAnimation, setBonusBalanceAnimation] = useState("");
  const [pointAnimation, setPointAnimation] = useState("");

  useEffect(() => {
    // Update from prop if provided
    if (propUserData) {
      setUserData(propUserData);
    } else {
      // Otherwise get from localStorage
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, [propUserData]);

  useEffect(() => {
    // Update balance from prop if provided
    if (propUserBalance) {
      setUserBalance(propUserBalance);
    } else {
      // Otherwise get from localStorage
      const storedBalance = localStorage.getItem('userBalance');
      if (storedBalance) {
        try {
          setUserBalance(JSON.parse(storedBalance));
        } catch (error) {
          console.error("Error parsing balance data:", error);
        }
      }
    }
  }, [propUserBalance]);

  useEffect(() => {
    // Listen for storage changes to update balance in real-time
    const handleStorageChange = (e) => {
      if (e.key === 'userBalance' && e.newValue) {
        try {
          setUserBalance(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Error parsing balance data:", error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event for same-tab updates
    const handleBalanceUpdate = (e) => {
      if (e.detail && e.detail.balanceData) {
        setUserBalance(e.detail.balanceData);
      }
    };
    
    window.addEventListener('balanceUpdated', handleBalanceUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('balanceUpdated', handleBalanceUpdate);
    };
  }, []);

  // Fetch balance info if not available
  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem('authToken');
      const tokenType = localStorage.getItem('tokenType');
      
      if (token && !userBalance && !isLoadingBalance) {
        setIsLoadingBalance(true);
        try {
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
            setUserBalance(balanceData);
            localStorage.setItem('userBalance', JSON.stringify(balanceData));
            
            // Dispatch custom event for same-tab updates
            window.dispatchEvent(new CustomEvent('balanceUpdated', {
              detail: { balanceData }
            }));
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
        } finally {
          setIsLoadingBalance(false);
        }
      }
    };

    fetchBalance();
  }, [userBalance, isLoadingBalance]);

  // Extract balance values from server response
  // New API structure: data.user.balance
  const realBalance = userBalance?.user?.balance || userBalance?.realBalance || userBalance?.balance || userData?.balance || 0.00;
  const bonusBalance = userBalance?.bonusBalance || userBalance?.bonus || 0.00;
  const point = userBalance?.point || userBalance?.points || 0.00;
  const level = userBalance?.level || userData?.level || 0;
  
  // Handle balance animations
  useEffect(() => {
    // Real balance animation
    if (prevRealBalanceRef.current !== realBalance) {
      const diff = realBalance - prevRealBalanceRef.current;
      if (prevRealBalanceRef.current !== 0) {
        if (diff > 0) {
          setRealBalanceAnimation("balance-increase");
        } else if (diff < 0) {
          setRealBalanceAnimation("balance-decrease");
        } else {
          setRealBalanceAnimation("balance-updated");
        }
        
        // Clear animation class after animation completes
        const timer = setTimeout(() => {
          setRealBalanceAnimation("");
        }, 800);
        
        prevRealBalanceRef.current = realBalance;
        return () => clearTimeout(timer);
      } else {
        prevRealBalanceRef.current = realBalance;
      }
    }
  }, [realBalance]);
  
  useEffect(() => {
    // Bonus balance animation
    if (prevBonusBalanceRef.current !== bonusBalance) {
      const diff = bonusBalance - prevBonusBalanceRef.current;
      if (prevBonusBalanceRef.current !== 0) {
        if (diff > 0) {
          setBonusBalanceAnimation("balance-increase");
        } else if (diff < 0) {
          setBonusBalanceAnimation("balance-decrease");
        } else {
          setBonusBalanceAnimation("balance-updated");
        }
        
        const timer = setTimeout(() => {
          setBonusBalanceAnimation("");
        }, 800);
        
        prevBonusBalanceRef.current = bonusBalance;
        return () => clearTimeout(timer);
      } else {
        prevBonusBalanceRef.current = bonusBalance;
      }
    }
  }, [bonusBalance]);
  
  useEffect(() => {
    // Point animation
    if (prevPointRef.current !== point) {
      const diff = point - prevPointRef.current;
      if (prevPointRef.current !== 0) {
        if (diff > 0) {
          setPointAnimation("balance-increase");
        } else if (diff < 0) {
          setPointAnimation("balance-decrease");
        } else {
          setPointAnimation("balance-updated");
        }
        
        const timer = setTimeout(() => {
          setPointAnimation("");
        }, 800);
        
        prevPointRef.current = point;
        return () => clearTimeout(timer);
      } else {
        prevPointRef.current = point;
      }
    }
  }, [point]);

  return (
    <div className="user-info">
      <div className="user-info-item">
        <div className="user-info-icon">
          <img src="/img/coinS.png" alt="coinS" />
        </div>
        <div className="user-info-content">
          <div className="user-info-label">Real balance</div>
          <div className={`user-info-value ${realBalanceAnimation}`}>€{realBalance.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="user-info-divider"></div>
      
      <div className="user-info-item">
        <div className="user-info-icon">
          {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#FFD700" stroke="#D4AF37" strokeWidth="1.5"/>
            <ellipse cx="16" cy="12" rx="8" ry="6" fill="#FFA500" opacity="0.3"/>
            <text x="16" y="20" textAnchor="middle" fontSize="14" fill="#8B4513" fontWeight="bold" fontFamily="Arial">C</text>
          </svg> */}
          <img src="/img/coinC.png" alt="coinS" />
        </div>
        <div className="user-info-content">
          <div className="user-info-label">Bonus balance</div>
          <div className={`user-info-value ${bonusBalanceAnimation}`}>€{bonusBalance.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="user-info-divider"></div>
      
      <div className="user-info-item">
        <div className="user-info-icon">
          <img src="/img/diamond.png" alt="diamond" />
        </div>
        <div className="user-info-content">
          <div className="user-info-label">Point</div>
          <div className={`user-info-value ${pointAnimation}`}>{point.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="user-info-divider"></div>
      
      <div className="user-info-item">
        <div className="user-info-icon">
          <img src="/img/bestSeller.png" alt="level" />
        </div>
        <div className="user-info-content">
          <div className="user-info-label">Level</div>
          <div className="user-info-value">{level.toString().padStart(2, '0')}</div>
        </div>
      </div>
    </div>
  );
}

