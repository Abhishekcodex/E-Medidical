const SessionStorage = {

    saveJWT: (token) => {

        if (token && token !== "")
            sessionStorage.setItem("E-MEDICAL_JWT_TOKEN", token);
    },
    save: (key, value) => {
        sessionStorage.setItem(key, value);
    },
    getValue: (key) => {

        sessionStorage.getItem(key);
    },
    saveSession: (obj) => {
        if (obj) {
            var json = JSON.stringify(obj);
            var base64String = btoa(json);
            sessionStorage.setItem("E-MEDICAL_Session", base64String);
        }
    },
    saveSessionEMedical: (obj) => {
        if (obj) {
            var json = JSON.stringify(obj);
            var base64String = btoa(json);
            sessionStorage.setItem("E-MEDICAL_Session_rlog", base64String);
        }
    },
    clearSession: () => {
        sessionStorage.removeItem("E-MEDICAL_Session");
        sessionStorage.removeItem("E-MEDICAL_Session_rlog");
    },
    getSessionData: () => {
        
        if (sessionStorage.getItem('E-MEDICAL_Session') != null) {
            var base64String = atob(sessionStorage.getItem('E-MEDICAL_Session'));
            var jsonObj = JSON.parse(base64String);
            return jsonObj;
        }
        return undefined;
    },
    getSessionDataEMedical: () => {
        
        if (sessionStorage.getItem('E-MEDICAL_Session_rlog') != null) {
            var base64String = atob(sessionStorage.getItem('E-MEDICAL_Session_rlog'));
            var jsonObj = JSON.parse(base64String);
            return jsonObj;
        }
        return undefined;
    },
    getJWT: () => {

        return sessionStorage.getItem("E-MEDICAL_JWT_TOKEN");

    },
    clearJWT: () => {
        sessionStorage.removeItem("E-MEDICAL_JWT_TOKEN");
    },
    clearAll: () => {
        sessionStorage.clear();
    },
}

export {
    SessionStorage,
}