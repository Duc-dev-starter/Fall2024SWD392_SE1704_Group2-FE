import { useNavigate } from "react-router-dom";
import { User } from "../models";
import { getUserFromLocalStorage } from "../utils";
import { API_PATHS, PATHS, ROLES } from "../consts";
import { toast } from "react-toastify";
import { BaseService } from "./BaseService";


export const forgotPassword = async (email: string) => {
  await BaseService.put({url : API_PATHS.FORGOT_PASSWORD, payload: {email}});
  toast.success('New password sent to your email. Please check your inbox.');
}

export const logout = ( navigate: ReturnType<typeof useNavigate>) => {
    const user: User = getUserFromLocalStorage();
    if (user.role === ROLES.MANAGER) {
      navigate(PATHS.MANAGER_LOGIN);
    }
    else {
      navigate(PATHS.HOME);
    }
    toast.info("You logout from the system");
    localStorage.clear();
  };