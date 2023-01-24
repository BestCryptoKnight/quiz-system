import axios from '../utils/axios'
import HEADER from './header'
import {
  GET_USERS
} from '../store/constants'

const getUsers = (page) => async dispatch => {
  try {
    const result = await axios.get(`api/user/get_users?page=${page}`)
    dispatch({ type: GET_USERS, payload: result.data })
    return result.data
  }
  catch (error) {
    console.log(error)
  }
}

const getUser = async (id) => {
  try{
    const result = await axios.get(`api/user/get_user/${id}`)
    return result.data
  }
  catch(error){

  }
}

const addUser = async (data) => {
  try {
    const result = await axios.post('api/user/add_user', data)
    return result
  }
  catch (error) {
    console.log(error)
    return error
  }
}

const updateUser = async (id, data) => {
  try{
    const result = await axios.post(`api/user/update_user/${id}`, data)
    return result
  }
  catch(error){
    console.log(error)
    return error
  }
}

const deleteUser = async (id) => {
  try {
    const result = await axios.delete(`api/user/delete_user/${id}`)
    return result
  }
  catch (error) {
    console.log(error)
    return error
  }
}

export {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
}