import ApiClient from "../../apiClient";
import { customerLogin, customerLogout} from "../../endpoints";
const GetCustomerLogin = (email, password) => {
    debugger
    return ApiClient({
        endPoint: customerLogin,
        type: "Post",
        params: {
            payload: {
                email, 
                password
            },
        },
    });
};
const GetCustomerLogout = (email, userId) => {
    debugger
    return ApiClient({
        endPoint: customerLogout,
        type: "Post",
        params: {
            payload: {
                email, 
                userId
            },
        },
    });
};
export { GetCustomerLogin, GetCustomerLogout}