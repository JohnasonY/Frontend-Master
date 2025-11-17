var chatbotAPI = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  /**
   * encapsulate GET method. If there is token, add token to the request header
   * @param {string} relativePath relative to base url
   * @returns {Promise} response header
   */
  async function get(relativePath) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(`${BASE_URL}${relativePath}`, { headers });
  }

  /**
   * encapsulate POST method. If there is token, add token to the request header
   * @param {string} relativePath relative to base url
   * @param {object} reqBody
   * @returns {Promise} response header
   */
  async function post(relativePath, reqBody) {
    const headers = {};
    headers["Content-Type"] = "application/json";
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(`${BASE_URL}${relativePath}`, {
      headers,
      method: "POST",
      body: JSON.stringify(reqBody),
    });
  }

  /**
   * user register
   * @param {object} newUser {loginId: "xxx", nickname: "xxx", loginPwd: "xxx"}
   * @returns {Promise}
   */
  async function register(newUser) {
    // get response header
    const respHeader = await post("/api/user/reg", newUser);
    // get response body
    const respBody = await respHeader.json();
    return respBody;
  }

  /**
   * user login
   * @param {object} userInfo
   * @returns {Promise}
   */
  async function login(userInfo) {
    // get response header
    const respHeader = await post(`/api/user/login`, userInfo);
    // get response body
    const respBody = await respHeader.json();
    if (respBody.code === 0) {
      // login success
      // store token from the response header into local storage
      const token = respHeader.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return respBody;
  }

  /**
   * get user info based on the token in local storage
   * @returns {Promise} response body
   */
  async function getUserProfile() {
    const respHeader = await get("/api/user/profile");
    const respBody = await respHeader.json();
    return respBody;
  }

  /**
   * check if a loginId exists
   * @param {string} loginId user loginId
   * @returns {Promise}
   */
  async function isUserExisted(loginId) {
    const respHeader = await get(`/api/user/exists?loginId=${loginId}`);
    const respBody = await respHeader.json();
    return respBody;
  }

  /**
   * Send an message to the chatbot
   * @param {string} content Message to be sent to the chatbot
   * @returns {Promise}
   */
  async function sendMessage(content) {
    const respHeader = await post("/api/chat", {
      content,
    });
    const respBody = await respHeader.json();
    return respBody;
  }

  /**
   * Get chat history for the current token
   * @returns {Promise}
   */
  async function getChatHistory() {
    const respHeader = await get(`/api/chat/history`);
    const respBody = await respHeader.json();
    return respBody;
  }

  /**
   * sign out account, remove token from local storage
   */
  function signOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    register,
    login,
    getUserProfile,
    isUserExisted,
    sendMessage,
    getChatHistory,
    signOut,
  };
})();
