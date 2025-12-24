import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";

export default function GameDialog({ isOpen, onClose, gameData }) {
  const [gameInfo, setGameInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && gameData) {
      fetchGameInfo();
      // Disable body scrolling when dialog is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scrolling when dialog is closed
      document.body.style.overflow = '';
    }
    
    // Cleanup: re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, gameData]);

  const fetchGameInfo = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const tokenType = localStorage.getItem('tokenType');
      
      // Get gameCode and vendorCode from gameData
      const gameCode = gameData?.gameCode || '';
      const vendorCode = gameData?.vendorCode || '';
      
      // Make POST request to playgame API
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/playgame`,
        {
          gameCode: gameCode,
          vendorCode: vendorCode
        },
        {
          headers: {
            'Authorization': `${tokenType} ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Extract data from API response
      const apiData = response.data?.data || response.data || {};
      
      // Generate event-id
      const eventId = apiData.eventId || generateEventId();
      
      // Get client IP from API response or fallback
      const clientIp = apiData.clientIp || await getClientIp();
      
      // Get current time
      const currentTime = apiData.time || new Date().toLocaleString('en-US', { 
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' PST';

      // Get URL and key from API response
      const gameUrl = apiData.url || apiData.gameUrl || `https://rt739qobgi.hvlhdbgi.biz/gs2c/playGame.do?`;
      const key = apiData.key || apiData.token || '';

      setGameInfo({
        url: gameUrl,
        key: key,
        eventId: eventId,
        clientIp: clientIp,
        time: currentTime
      });
    } catch (error) {
      console.error("Error fetching game info:", error);
      // Fallback to default values if API fails
      const eventId = generateEventId();
      const clientIp = await getClientIp();
      const currentTime = new Date().toLocaleString('en-US', { 
        timeZone: 'America/Los_Angeles',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }) + ' PST';
      
      const gameUrl = `https://rt739qobgi.hvlhdbgi.biz/gs2c/playGame.do?`;
      const token = localStorage.getItem('authToken');
      const symbol = gameData?.gameCode || 'vs12bbb';
      const key = `token=${encodeURIComponent(token)}%60%7C%60symbol=${symbol}%60%7C%60language=ja%60%7C%60currency=EUR`;
      
      setGameInfo({
        url: gameUrl,
        key: key,
        eventId: eventId,
        clientIp: clientIp,
        time: currentTime
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateEventId = () => {
    return Array.from({ length: 32 }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  };

  const getClientIp = async () => {
    try {
      // Try to get IP from a service or use a default
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      // Fallback to server URL hostname
      try {
        const serverUrl = new URL(process.env.REACT_APP_BACKEND_URL);
        return serverUrl.hostname;
      } catch {
        return '155.254.19.131'; // Ultimate fallback
      }
    }
  };

  if (!isOpen) return null;

  // Get game title from gameData
  const gameTitle = gameData?.gameTitle || gameData?.title || 'Game';

  return (
    <div className="game-dialog-overlay" onClick={onClose}>
      <div className="game-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="game-dialog-back-btn" onClick={onClose}>
            <IoIosArrowBack />
        </div>
        
        <div className="game-dialog-header">
          <h2 className="game-dialog-title">{gameTitle}</h2>
        </div>
        
        <div className="game-dialog-content">
          {isLoading ? (
            <div className="game-dialog-loading">
              <div className="loading-spinner"></div>
              <span>Loading game...</span>
            </div>
          ) : (
            <>
              {gameInfo && (
                <iframe 
                  src={gameInfo.key ? `${gameInfo.url}${gameInfo.key}` : gameInfo.url} 
                  title={gameTitle} 
                  className="game-dialog-iframe"
                  allowFullScreen
                ></iframe>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

