import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/attempts`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const updateAttempt = async (attempt: any) => {
    const { data } = await axiosWithCredentials.put(`${QUESTIONS_API}/${attempt._id}`, attempt);
    return data;
};