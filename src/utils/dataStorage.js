/**
 * @description Retrieve data from local storage
 * @param {string} key name of the key against which data will be set
 * @param {any} value value of the key
 * @returns set/update status
*/
const setDataInLocalStorage = (key, value) => {
    try{
        localStorage.setItem(key,JSON.stringify(value));
        return true;
    }catch(err){
        console.error("Error inside set data in local storage");
        return false;
    }
}

/**
 * @description Retrieve data from local storage
 * @param {string} key name of the key against which data will be fetched
 * @returns Data stored in db  
*/
const getDataFromLocalStorage = (key) => {
    try{
        let data = localStorage.getItem(key);
        if(data !== null){
            return JSON.parse(data);
        }
        return null;
    }catch(err){
        console.error("Error inside get data from local storage");
        return null;
    }
}

export {
    setDataInLocalStorage,
    getDataFromLocalStorage
};