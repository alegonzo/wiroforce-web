import axios from 'axios';

const AxiosHelper = () => {
    console.log(process.env.NEXT_PUBLIC_API_URL);
    return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
    });
}

export default AxiosHelper;