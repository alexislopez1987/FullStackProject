import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:49160/api/v1/",
  responseType: "json"
});