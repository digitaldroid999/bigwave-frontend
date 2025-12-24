import axios from "axios";

/**
 * Shared login utility function
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise<{success: boolean, user: object|null, token: string|null, balanceData: object|null, error: string|null}>}
 */
export const performLogin = async (username, password) => {
  try {
    // Make POST request to login endpoint
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/login`,
      {
        username: username,
        password: password
      }
    );
    
    console.log(response.data);

    if (response.data.status === true) {
      // Save token and user data to localStorage
      const { token, token_type, user } = response.data.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('tokenType', token_type);
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');

      // Fetch user balance info after successful login
      let balanceData = null;
      try {
        const balanceResponse = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/balance`,
          {
            headers: {
              'Authorization': `${token_type} ${token}`
            }
          }
        );
        
        if (balanceResponse.data && balanceResponse.data.status === true) {
          balanceData = balanceResponse.data.data;
          localStorage.setItem('userBalance', JSON.stringify(balanceData));
          
          // Dispatch custom event for same-tab updates
          window.dispatchEvent(new CustomEvent('balanceUpdated', {
            detail: { balanceData }
          }));
        }
      } catch (balanceError) {
        console.error("Error fetching balance:", balanceError);
        // Continue with login even if balance fetch fails
      }

      return {
        success: true,
        user: user,
        token: token,
        balanceData: balanceData,
        error: null
      };
    } else {
      return {
        success: false,
        user: null,
        token: null,
        balanceData: null,
        error: response.data.message || "Login failed"
      };
    }
  } catch (err) {
    // Handle error response
    let errorMessage = "Network error. Please try again.";
    if (err.response && err.response.data) {
      errorMessage = err.response.data.message || "Login failed. Please check your credentials.";
    }
    console.error("Login error:", err);
    
    return {
      success: false,
      user: null,
      token: null,
      balanceData: null,
      error: errorMessage
    };
  }
};

