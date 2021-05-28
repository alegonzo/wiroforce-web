import getConfig from 'next/config';
import axios from 'axios';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const AxiosHelper = () => {
    console.log(publicRuntimeConfig.apiUrl);
    return axios.create({
        baseURL: `${publicRuntimeConfig.apiUrl}`
    });
}

export default AxiosHelper;