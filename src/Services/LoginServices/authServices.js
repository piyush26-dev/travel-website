import getUrl from "../../config";
import httpServices from "./httpServices";

export const LoginService = (payload) => {
    return httpServices.post(`http://13.61.144.187:3000/api/admin/login`, payload);
}

export const getProfileDetailsService = () => {
    return httpServices.get(`/${getUrl()}/profile-view`);
}
