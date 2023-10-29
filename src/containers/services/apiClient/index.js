import axios from 'axios'
import { SessionStorage } from '../../utility';
const ApiClient = (APIData) => {
    let { endPoint, params = {}, type }
        = APIData

    const token = SessionStorage.getJWT();

    const headers = {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Authorization': `Bearer ${token}`,
        ...params?.headers
    }

    let apiObjAxios = {
        method: type ? type : 'GET',
        headers: { ...headers },
    }
    const payload = {
        ...params.payload
    }

    if (apiObjAxios.method === 'GET') {
        if (params.queryStrings !== undefined) {
            let queryStrings = Object.keys(params.queryStrings).map(query =>
                encodeURIComponent(query) + '=' + encodeURIComponent(params.queryStrings[query])
            ).join('&')
            endPoint += queryStrings ? '?' + queryStrings : '';
        }
    } else if (apiObjAxios.method === 'UPLOAD') {
        const formData = new FormData();
        formData.append("file", params.payload);
        apiObjAxios.headers = {
            "Content-Type": "multipart/form-data",
        }
        if (params.formBody) {
            for (const key of Object.keys(params.formBody)) {
                formData.append(key, params.formBody[key])
            }
        }
        apiObjAxios.data = formData
        apiObjAxios.method = 'POST'
    }
    else {
        apiObjAxios.data = JSON.stringify(payload)
        apiObjAxios.method = 'POST'
    }

    apiObjAxios.url = endPoint;
    return axios(apiObjAxios);
  
}
export default ApiClient;