import { FaAngleDown } from "react-icons/fa"
import { CiHome } from "react-icons/ci"
import { MdLiveTv } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"
import { CiMobile3 } from "react-icons/ci"
import { useEffect, useState } from "react"
import { FaCircleUser } from "react-icons/fa6"
import axios from "axios"

const itemData = [
    {
        name : 'Home',
        icon : <img src="/img/icons/home.svg" alt="home" />,
        link : '/'
    },
    {
        name : 'New Game',
        icon : <img src="/img/icons/Frame.svg" alt="gift" />,
        link : '/newgame'
    },
    {
        name : 'Favorite Game',
        icon : <img src="/img/icons/favorite.svg" alt="favorite" />,
        link : '/favorite'
    },
    {
        name : 'Slot',
        icon : <img src="/img/icons/octicon_goal-24.svg" alt="gift" />,
        link : '/slot'
    },
    {
        name : 'Live',
        icon : <img src="/img/icons/live.svg" alt="live" />,
        link : '/live'
    },
]

export default function Menu( { showHandle, setShowHandle, showLogin, isAuthenticated, userData: propUserData, userBalance: propUserBalance, onSignOut } ) {
    const location = useLocation();
    const [userData, setUserData] = useState(propUserData);
    const [userBalance, setUserBalance] = useState(propUserBalance);
    const [isLoadingBalance, setIsLoadingBalance] = useState(false);

    useEffect( () => {
        if( showHandle ){
            document.body.style.overflow = 'hidden' ;
        } else{
            document.body.style.overflow = 'auto' ;
        }
    }, [ showHandle ] ) ;

    useEffect(() => {
        // Update userData from prop if provided
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
    }, [propUserData, isAuthenticated]);

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
    }, [propUserBalance, isAuthenticated]);

    // Fetch balance info if not available
    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem('authToken');
            const tokenType = localStorage.getItem('tokenType');
            
            if (token && !userBalance && !isLoadingBalance && isAuthenticated) {
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
    }, [userBalance, isLoadingBalance, isAuthenticated]);

    // Extract balance values
    // New API structure: data.user.balance
    const realBalance = userBalance?.user?.balance || userBalance?.realBalance || userBalance?.balance || userData?.balance || 0.00;
    const bonusBalance = userBalance?.bonusBalance || userBalance?.bonus || 0.00;
    const point = userBalance?.point || userBalance?.points || 0.00;
    const level = userBalance?.level || userData?.level || 0;
    const userDisplayName = userData?.username || userData?.name || userData?.email || 'User';

    const handleSignOut = () => {
        if (onSignOut) {
            onSignOut();
        }
        setShowHandle(false);
    };

    return(
    <div>
        <div className="menu-black" style={ { display : ( showHandle ? 'flex' : 'none' ) } } onClick={ () => setShowHandle( false ) }></div>
        <div className="nav-menu" style={ showHandle ? { left: '0' } : {} }>
            <div>
                <div className="nav-lang">
                    <img src="/img/flags/default.png" alt="countryFlag" />
                    <span>English</span>
                    <FaAngleDown />
                </div>
                
                {isAuthenticated && (
                    <div className="menu-user-info">
                        <div className="menu-user-profile">
                            {/* <FaCircleUser className="menu-user-avatar" /> */}
                            <img src="/img/sidebar-user.png" alt="sidebar-user.png" className="menu-user-avatar" />
                            <div className="menu-user-details">
                                <div className="menu-user-email">{userDisplayName}</div>
                                <div className="menu-user-level">Level {level.toString().padStart(2, '0')}</div>
                            </div>
                        </div>
                        <div className="menu-user-balances">
                            <div className="menu-balance-item">
                                <img src="/img/coinS.png" alt="coin" className="menu-balance-icon" />
                                <div className="menu-balance-content">
                                    <div className="menu-balance-label">Real balance</div>
                                    <div className="menu-balance-value">€{realBalance.toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="menu-balance-item">
                                <img src="/img/coinC.png" alt="coin" className="menu-balance-icon" />
                                <div className="menu-balance-content">
                                    <div className="menu-balance-label">Bonus balance</div>
                                    <div className="menu-balance-value">€{bonusBalance.toFixed(2)}</div>
                                </div>
                            </div>
                            <div className="menu-balance-item">
                                <img src="/img/diamond.png" alt="diamond" className="menu-balance-icon" />
                                <div className="menu-balance-content">
                                    <div className="menu-balance-label">Point</div>
                                    <div className="menu-balance-value">{point.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="nav-menu-items">
                    {
                        itemData.map( ( item, index ) => (
                            <Link 
                                className={`nav-menu-item ${location.pathname === item.link ? 'active' : ''}`} 
                                key={ index } 
                                to={ item.link } 
                                onClick={() => setShowHandle(false)}
                            >
                                { item.icon }
                                <span> { item.name } </span>
                            </Link>
                        ) )
                    }
                </div>
            </div>

            <>
                {!isAuthenticated && (
                    <div className="user-sign-btn-menu">
                        <div className="btn_login" onClick={showLogin}>
                            <span>Login</span>
                        </div>
                        {/* <div className="btn_login">
                            <span>Sign Up</span>
                        </div> */}
                    </div>
                )}

                {isAuthenticated && (
                    <div className="menu-logout-btn-container">
                        <div className="btn_logout" onClick={handleSignOut}>
                            <span>Sign out</span>
                        </div>
                    </div>
                )}

                {/* <div className="MobileVersion-Menu">
                    <div className="menu-item-mobile">
                        <CiMobile3 />
                        Mobile Version
                    </div>
                    <div className="menu-item-mobile-mode">
                        <img src="/icons/pc.svg" alt="pc"/>
                        PC Version
                    </div>
                </div> */}
            </>

        </div>
    </div>
    )
}