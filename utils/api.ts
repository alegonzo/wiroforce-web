import axios from 'axios';

const AxiosHelper = () => {
    return axios.create({
        baseURL: `${process.env.API_URL}`
    });
}

export default AxiosHelper;