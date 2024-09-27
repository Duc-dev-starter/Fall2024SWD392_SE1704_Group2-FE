import { useNavigate } from "react-router-dom";
import { User } from "../models";
import { getUserFromLocalStorage } from "../utils";
import { PATHS, ROLES } from "../consts";
import { toast } from "react-toastify";

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