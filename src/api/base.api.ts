import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_ENVIRONMENT === "development"
      ? import.meta.env.VITE_DEVELOPEMENT_BACKEND_API
      : import.meta.env.VITE_PRODUCTION_BACKEND_API,
});
