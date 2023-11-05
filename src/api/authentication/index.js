import axios from "axios";

const signin = axios.create({
  baseURL: "https://api.postman.com/collections/28131810-2c45d6f8-7627-4a10-a4c8-f4034c3e4f71?access_key=PMAT-01HDPC61PBK17TYYY29S7XKA4A&fbclid=IwAR0wsBm6jmfA2A0L7fhQWy19PiQEHQf0nP54AkcKTMAPDWlhwmcCUH8rncs", // Đổi thành URL của API thực tế
});

export default signin;
