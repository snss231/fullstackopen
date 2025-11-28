import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = t => {
  token = t
} 

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default { getAll, create, setToken }