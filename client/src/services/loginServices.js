import axios from "axios";

const API_URL = "http://localhost:3001/api/login";

const login = async credentials => {
  const { data } = await axios.post(API_URL, credentials);
  return data;
};

export { login };
