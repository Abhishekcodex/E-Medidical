var baseEndPoint = "";
const domain = `localhost:3000`;
baseEndPoint = `http://${domain}`;

//login
export const customerLogin = `${baseEndPoint}/customerLogin`;
export const customerLogout = `${baseEndPoint}/customerLogout`;