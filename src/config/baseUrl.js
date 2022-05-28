export const baseUrl = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.VITE_EXPRESS_PORT || 5000}`
  : "/api";
