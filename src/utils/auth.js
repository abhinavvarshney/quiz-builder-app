import { KEYS_IN_LOCAL_STORAGE, MESSAGE_LIST } from "../constants";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./dataStorage";


const generateToken = () => {
    try {
        return Math.random().toString(36).slice(2);
    } catch (err) {
        console.log("Error inside token generation", err);
    }
}

/**
 * @description function to handler user registration for the app
 * @param {Object} userInfo object containing all the user information
 * @returns {Object} object describing registration status
*/
const registerUser = ({ userInfo = {} }) => {
    try {
        const {
            email = ''
        } = userInfo;
        const response = {
            isRegistrationSuccessful: false,
            message: ''
        };
        const usersList = getDataFromLocalStorage(KEYS_IN_LOCAL_STORAGE.USER_LIST) || [];

        const isUserAlreadyExists = usersList.some(({ email: emailOfCurrentUser = '' }) => emailOfCurrentUser === email);

        if (isUserAlreadyExists) {
            response.message = MESSAGE_LIST.USER_ALREADY_EXISTS;
        } else {
            usersList.push({ ...userInfo, id: usersList.length + 1 });
            const isSetSuccess = setDataInLocalStorage(KEYS_IN_LOCAL_STORAGE.USER_LIST, usersList);
            if (isSetSuccess) {
                response.message = MESSAGE_LIST.USER_REGISTRATION_SUCCESSFUL;
                response.isRegistrationSuccessful = true;
            } else {
                response.message = MESSAGE_LIST.ERROR_WHILE_REGISTRATION;
            }
        }
        return response;
    } catch (err) {
        console.error("Error while creating user", err);
        throw MESSAGE_LIST.ERROR_WHILE_REGISTRATION;
    }
};

/**
 * @description function to handler user authorization for the login
 * @param {Object} userCredentials object containing all the user information
 * @returns {Object} object describing login status
*/
const validateUserAndAuthorizeSignIn = ({ userCredentials = {} }) => {
    try {

        const {
            email = '',
            password = ''
        } = userCredentials;

        const response = {
            authorized: false,
            message: '',
            token: ''
        };

        const usersList = getDataFromLocalStorage(KEYS_IN_LOCAL_STORAGE.USER_LIST) || [];

        const user = usersList.find(({ email: userEmail = '', password: userPassword = '' } = {}) => userEmail === email && userPassword === password);

        if (user) {
            response.authorized = true;
            response.token = generateToken();
            setDataInLocalStorage(KEYS_IN_LOCAL_STORAGE.USER_INFO, { ...userCredentials, id: user.id, token: response.token });
        } else {
            response.message = MESSAGE_LIST.INVALID_CREDENTIALS;
        }
        return response;

    } catch (err) {
        console.log("Error inside -> validateUserAndAuthorizeSignIn", err);
    }
}


export {
    registerUser,
    validateUserAndAuthorizeSignIn
};