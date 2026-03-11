import React, { useState, useEffect } from "react";
import Menu from './menu' ;
import { useNavigate, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import UserInfo from "./userInfo";
import { performLogin } from "../../utils/auth";
import LoadingSpinner from "../common/loadingSpinner";
import AnimatedErrorMessage from "../common/animatedErrorMessage";

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


export default function Header({ showLogin, isAuthenticated, userData, userBalance, onSignOut, onLoginSuccess }) {
    const navigate = useNavigate() ;
    const location = useLocation() ;
    const navigatePage = ( link ) => e => {
        navigate( link, { replace : true } ) ;
    }
    const [ showMenu, setShowMenu ] = useState( false ) ;
    
    // Login state for header inputs
    const [username, setUsername] = useState(() => {
        // Try to get saved username from localStorage
        const savedUserData = localStorage.getItem('userData');
        if (savedUserData) {
            try {
                const user = JSON.parse(savedUserData);
                return user.username || "samplay01";
            } catch (e) {
                return "samplay01";
            }
        }
        return "samplay01";
    });
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    
    // Clear error when user types
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 5000); // Clear error after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [error]);
    
    // Clear input errors when typing
    useEffect(() => {
        if (usernameError && username) {
            setUsernameError(false);
        }
    }, [username, usernameError]);
    
    useEffect(() => {
        if (passwordError && password) {
            setPasswordError(false);
        }
    }, [password, passwordError]);
    
    // Handle header login
    const handleHeaderLogin = async () => {
        // Validate inputs with visual feedback
        let hasError = false;
        
        if (!username || username.trim() === "") {
            setUsernameError(true);
            hasError = true;
        }
        
        if (!password || password.trim() === "") {
            setPasswordError(true);
            hasError = true;
        }
        
        if (hasError) {
            setError("ユーザー名とパスワードを入力してください");
            return;
        }
        
        setIsLoading(true);
        setError("");
        setUsernameError(false);
        setPasswordError(false);
        
        try {
            const result = await performLogin(username.trim(), password);
            
            if (result.success) {
                // Clear password field on success
                setPassword("");
                setUsernameError(false);
                setPasswordError(false);
                
                // Call success callback from App.js
                if (onLoginSuccess) {
                    onLoginSuccess(result.user, result.token, result.balanceData);
                }
            } else {
                setError(result.error || "ログインに失敗しました");
                setUsernameError(true);
                setPasswordError(true);
            }
        } catch (err) {
            setError("ログイン中にエラーが発生しました");
            setUsernameError(true);
            setPasswordError(true);
            console.error("Header login error:", err);
        } finally {
            setIsLoading(false);
        }
    };
    
    return(
        <>
        <div className="header">
            <div className="header-logo">
                <div className="user-mobile-show menu-toggle-icon" onClick={ () => setShowMenu( !showMenu ) }>
                    {showMenu ? (
                        <span className="menu-close-icon">×</span>
                    ) : (
                        <img src="/img/vector.svg" alt="menu" />
                    )}
                </div>
                <img src="/img/logo 1.png" alt="logo" onClick={ () => navigate( '/' ) } />
                <span className="user-mobile-show">
                </span>
                {/* <FaCircleUser className="user-mobile-show"/> */}
            </div>
            {!isAuthenticated ? (
                <div className="user-sign" key="login-form"> 
                    <div className="user-name">
                        <span>ユーザー名</span>
                        {/* <span>User Name</span> */}
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError(""); // Clear error when typing
                                setUsernameError(false);
                            }}
                            disabled={isLoading}
                            className={usernameError ? "error" : username && username.trim() ? "valid" : ""}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isLoading) {
                                    handleHeaderLogin();
                                }
                            }}
                        />
                    </div>
                    <div className="user-password">
                        <span>ログインパスワード</span>
                        {/* <span>Password</span> */}
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(""); // Clear error when typing
                                setPasswordError(false);
                            }}
                            disabled={isLoading}
                            className={passwordError ? "error" : password && password.trim() ? "valid" : ""}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isLoading) {
                                    handleHeaderLogin();
                                }
                            }}
                        />
                    </div>
                    {error && (
                        <AnimatedErrorMessage 
                            message={error} 
                            onDismiss={() => setError("")}
                            autoDismiss={true}
                            dismissDelay={5000}
                        />
                    )}
                    <div className="user-sign-btn">
                        <div
                            className={`btn_login ${isLoading ? "loading" : ""}`}
                            onClick={handleHeaderLogin}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !isLoading) {
                                    handleHeaderLogin();
                                }
                            }}
                        >
                            <span>
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner size="small" color="white" />
                                        <span>ログイン中...</span>
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </span>
                        </div>
                        {/* <div className="btn_login">
                            <span>Sign Up</span>
                        </div> */}
                    </div>
                </div>
            ) : (
                <div key="user-info">
                <UserInfo userData={userData} userBalance={userBalance} />
                </div>
            )}
            <div className="user-timezone">
                {/* <div className="timezone-time">{ time.toISOString() }</div> */}
                    {isAuthenticated && (
                        <div className="btn_login" onClick={ onSignOut }>
                            <span>Sign Out</span>
                        </div>
                    )}
                <div className="user-country-flag">
                    <img src="/img/flags/default.png" alt="countryFlag" />
                    <FaAngleDown />
                </div>
            </div>
        </div>
        <div className="header-nav">
            {/* <div className="nav-item-mobile">
                <CiMobile3 />
                Mobile Version
            </div> */}
            {
                itemData.map( ( item, index ) => (
                    <div 
                        className={`nav-item ${location.pathname === item.link ? 'active' : ''}`}
                        key={ index } 
                        onClick={ navigatePage( item.link ) }
                    >
                        { item.icon }
                        <span>{ item.name }</span>
                    </div>
                ) )
            }
        </div>

        {/* Mobile Version */}
        {/* <div className="header-nav-mobile"> */}
            {/* <div className="nav-item-change-mode">
                <img src="/icons/pc.svg" alt="pc"/>
                PC Version
            </div> */}
            {/* <div></div>
            <div className="user-timezone-mobile">
                <div className="timezone-time">{ time.toISOString() }</div>
                <div className="user-country-flag">
                    <img src="/img/flags/default.png" alt="countryFlag" />
                    <FaAngleDown />
                </div>
            </div>
        </div> */}
        <Menu showHandle={ showMenu } setShowHandle = { setShowMenu } showLogin={showLogin} isAuthenticated={isAuthenticated} userData={userData} userBalance={userBalance} onSignOut={onSignOut} />
    </>
    )
} ;