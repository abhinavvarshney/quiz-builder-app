import { ALPHA_NUMERIC_STRING, PERMALINK_LENGTH } from "../constants";


/**
 * @description Function to generate a random alphanumeric string of some defined length
 * @param {Number} length length of the string to be generate
 * @return {String} random alphanumeric string
*/
const generateRandomString = (length = 6) => {
    const alphanumericCharacters = ALPHA_NUMERIC_STRING;
    let uniqueString = '';

    while (uniqueString.length < length) {
        const randomIndex = Math.floor(Math.random() * alphanumericCharacters.length);
        const randomCharacter = alphanumericCharacters.charAt(randomIndex);
        uniqueString += randomCharacter;
    }

    return uniqueString;
};

/*
 * Helper func to generate permaLink for a quiz 
*/
const generatePermaLink = () => {
    const permaLink = generateRandomString(PERMALINK_LENGTH);
    return permaLink;
};

export{
    generatePermaLink
};