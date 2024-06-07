import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'https://experiments-labs-server.vercel.app'
});
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;
