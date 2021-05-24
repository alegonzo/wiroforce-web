import axios from 'axios';

const AxiosHelper = () => {
    return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
    });
}

export default AxiosHelper;