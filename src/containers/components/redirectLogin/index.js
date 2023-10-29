import { useNavigate } from "react-router-dom";
import { SessionStorage } from "../../utility";
import { useEffect } from "react";
const RedirectToHome = () => {    
    const getFirstChar = (str) => {        
        const firstChars = str.substr(0, 4);               
        var url = "";
        if (firstChars === "loca") {
            url = "local"
        } else {
            url = firstChars;
        }
        return url;
    };
    const navigate = useNavigate();
    useEffect(() => {
        const servername = getFirstChar(`${window.location.host}`);        
        let serverurl = {
            servername: servername,
        }
        var autotimeout = "N";
        if (servername === "local") {
            autotimeout = "N";
        }
        if (autotimeout === 'N') {
            if (servername === "local") {
                SessionStorage.saveSessionEMedical(serverurl);
                navigate('/home')
            }
        }
        
    },[navigate])
}
export default RedirectToHome;