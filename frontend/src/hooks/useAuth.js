import { isAuthenticated } from "../utils/token";

const useAuth = () => {

    return {
        isLoggedIn: isAuthenticated()
    };

};

export default useAuth;