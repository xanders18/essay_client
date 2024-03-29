import axios from 'axios'
import { API } from './link'

const _checkStorage = () => {
    if (localStorage.getItem('login_data')) {
        let ls = JSON.parse(localStorage.getItem('login_data'))
        ls.type_code = ls.type[0].toUpperCase()
        return ls
    }
    return null
}

export const storage = _checkStorage()

export const Get = async (route, header = null) => {
    const URL = API + route    
    if (storage) {
        const header = {
            headers: {
                "Authorization": `Bearer ${storage.token}`
            }
        }
        return await axios.get(URL, header)
    }
    return await axios.get(URL)
}

export const Post = async (route, data, header = null) => {
    const URL = API + route
    if (storage) {
        const header = {
            headers: {
                "Authorization": `Bearer ${storage.token}`,
            }
        }
        return await axios.post(URL, data, header)
    }
    return await axios.post(URL, data)
}



