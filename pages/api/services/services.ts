import axios from 'axios';

const addNewThreadWithMessage = async (title: string, text: string): Promise<any> => {
    const response = await axios.post("http://localhost:3001/api/threads/new-thread-with-message", {title, text})
    return response.data
};

const addNewMessageToThread = async (thread_id: string, text: string): Promise<any> => {
    const response = await axios.post("http://localhost:3001/api/message", {thread_id, text})
    return response.data
};
export { addNewThreadWithMessage, addNewMessageToThread };