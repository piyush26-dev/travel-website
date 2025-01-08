import { getItemLocalStorage } from "./Utils/browserServices";

const getUrl = () => {
    const userRole = getItemLocalStorage("userRole") || "Guest";

    // Define base URLs for each role
    const API_BASE_URLS = {
        Admin: "admin",
        // Writer: "writer",
        // Assistant: "assistant",
        // Quality_assurance: "quality-assurance",
        // Guest: "guest",
    };

    return API_BASE_URLS[userRole];
};

export default getUrl;
