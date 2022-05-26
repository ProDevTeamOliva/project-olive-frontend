import isDevelopment from "./isDevelopment";

const url = isDevelopment ? `http://localhost:${process.env.REACT_APP_EXPRESS_PORT || 5000}` : null

const baseUrl = url ?? "/api"
const baseUrlSio = url ?? ""

export {
    baseUrl,
    baseUrlSio
};
