import axios from "axios";

let instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const listAPI = {

    getTodos: () => {
        return instance.get('/todos?_limit=10')
    }

}