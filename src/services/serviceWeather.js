import axios from "axios";
import { CURRENT_WEATHER } from "@/router/constants.js";

const apiClient = axios.create({
    baseURL: CURRENT_WEATHER,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
});

export default {
    getWeather() {
        return apiClient.get();
    }
};