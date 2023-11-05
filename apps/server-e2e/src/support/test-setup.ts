import axios from "axios";

module.exports = async function () {
  const serverUrl = process.env.VITE_SERVER_URL ?? "http://localhost:3000";

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = `${serverUrl}/api`;
};
