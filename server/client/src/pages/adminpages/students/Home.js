import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, deleteUser } from '../../../apis/user.api'
import { FaPlusCircle } from 'react-icons/fa'
import Avatar from 'react-avatar'

const StudentItem = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let [search, setSearch] = useSearchParams()
  const deleteClick = async () => {
    try {
      await deleteUser(props.user._id);
      setSearch({page: 1})
      dispatch(getUsers(search.page))
    }
    catch (error) {
      console.log(error)
    }
  }

  const editClick = () => {
    navigate(`/register-student/edit/${props.user._id}`)
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-base">
      <th scope="row" className="text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className='flex flex-row items-center gap-1 ml-32'>
          <Avatar name={props.user.name} size='35' round="20px" src={props.user.image} />
          <div>{props.user.name}</div>
        </div>
      </th>
      <th scope="row" className="text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {props.user.password}
      </th>
      <td className="flex flex-row items-center py-3 justify-center">
        <div className='flex flex-row gap-3'>
          <div className="font-medium text-white text-center py-2 w-20 bg-blue-500 rounded-md cursor-pointer" onClick={editClick}>Edit</div>
          <div className="font-medium text-white text-center py-2 w-20 bg-red-500 rounded-md cursor-pointer" onClick={deleteClick}>Remove</div>
        </div>
      </td>
    </tr>
  )
}

const RegisterStudent = () => {
  const users = useSelector(state => state.userReducer.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(10)
  let [search, setSearch] = useSearchParams()

  const handleClick = () => {
    navigate('/admin')
  }

  const handleAddClick = () => {
    navigate('/register-student/add')
  }

  const getUserData = async () => {
    dispatch(getUsers(1))
  }

  useEffect(() => {
    setSearch({ page: 1 })
    setPage(1)
    getUserData()
  }, [])

  const onNextClick = () => {
    if (page * count < users.total){
      setPage(page + 1)
      setSearch({ page: page + 1})
      dispatch(getUsers(page + 1))
    }
    else {
      
    }
  }

  const onPrevClick = () => {
    if (page > 1){
      setPage(page - 1)
      setSearch({ page: page - 1 })
      dispatch(getUsers(page - 1))
    }
    else {

    }
  }

  return (
    <div className='mx-36'>
      <div className='float-right mt-6 rounded-xl bg-[#26FF4A] text-white text-lg px-10 py-4 cursor-pointer' onClick={handleClick}>Incio</div>
      <div className='pt-24 text-center text-3xl uppercase font-bold text-blue-500'>
        Inscribir estudiante
      </div>
      <div className='flex flex-col justify-center'>
        <div className='flex flex-row items-center justify-center gap-3 my-2 rounded-md bg-[#3598DB] text-white text-md w-[200px] py-2 cursor-pointer' onClick={handleAddClick}>
          <FaPlusCircle />
          Add Student
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-md text-white uppercase bg-gray-500">
              <tr>
                <th scope="col" className="text-center py-3 min-w-[250px]">
                  Student name
                </th>
                <th scope="col" className="text-center py-3 min-w-[250px]">
                  Password
                </th>
                <th scope="col" className="text-center py-3 min-w-[350px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                users?.data ?
                  users.data.map((user, key) => <StudentItem user={user} key={key} />)
                  :
                  <>
                  </>
              }
            </tbody>
          </table>
        </div>
        <div className="flex flex-col mt-2 items-center justify-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{((search.get('page') || 1) - 1) * 10 + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{((search.get('page') || 1) - 1) * 10 + users.data?.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{users.total}</span> Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-l hover:bg-gray-900 dark:bg-gray-800" onClick={onPrevClick}>
              Prev
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-600 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900" onClick={onNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterStudent