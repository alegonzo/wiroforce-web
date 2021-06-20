import getConfig from 'next/config';
import axios from 'axios';
const { publicRuntimeConfig } = getConfig()

const AxiosHelper = () => {
    console.log("API URL", publicRuntimeConfig.apiUrl);
    return axios.create({ baseURL: `${publicRuntimeConfig.apiUrl}` });
}

export default AxiosHelper;