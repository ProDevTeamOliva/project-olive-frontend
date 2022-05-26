import isDevelopment from "./isDevelopment";

export const baseUrl = isDevelopment ? `http://localhost:${process.env.REACT_APP_EXPRESS_PORT || 5000}` : "/api";
