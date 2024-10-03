import axios from "axios";
import config from "@/secret";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../utils";
import { PATHS, ROLES } from "../consts";

export const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 300000,
  timeoutErrorMessage: `Connection is timeout exceeded`
})

let isTokenExpired = false;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      const { data } = error.response;
      console.log(error.response);
      if (data.errors && data.errors.length > 0) {
        data.errors.forEach((error: { field: string, message: string[] }) => {
          const errorMessage = error.message.join(', ');
          toast.error(`${error.field}: ${errorMessage}`);
        });
      }

      else {
        switch (error.response.status) {
          case 401:
          case 403: {
            if (!isTokenExpired) {
              isTokenExpired = true
              toast.error(data.message);
              const user = getUserFromLocalStorage();
              setTimeout(() => {
                if (user) {
                  const userRole = user.role;
                  switch (userRole) {
                    case ROLES.MANAGER:
                      // window.location.href = PATH.ADMIN_LOGIN;
                      console.log(window.location.href = PATHS.MANAGER_LOGIN)
                      break;
                    case ROLES.STAFF:
                      window.location.href = PATHS.STAFF_LOGIN;
                      break;
                    case ROLES.REFEREE:
                      window.location.href = PATHS.REFERREE_LOGIN;
                      break;
                    default:
                      window.location.href = PATHS.HOME;
                      break;
                  }
                } else {
                  return;
                }
                console.log('test')
                localStorage.clear();
                isTokenExpired = false;
              }, 1300);
            }
            break;
          }

          case 404:
            toast.error(data.message);
            // window.location.href = PATH.NOTFOUND;
            break;

          case 500:
            toast.error(data.message);
            window.location.href = PATHS.INTERNAL_SERVER_ERROR;
            break;

          default:
            toast.error(data.message);
            break;
        }
      }

      return Promise.reject(error.response.data);
    } else {
      toast.error('Network error');
      return Promise.reject(error);
    }
  }
);