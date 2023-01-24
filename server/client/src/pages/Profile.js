import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import UploadModal from '../components/auth/Editor/UploadModal'
import FormAction from '../components/auth/FormAction'
import Input from '../components/auth/Input'
import {signupFields} from '../components/auth/FormFields'

const fields = signupFields
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

const Profile = () => {
  const navigate = useNavigate()
  const { account, changeAccount } = useAuth()

  const [formData, setFormData] = useState(fieldsState)
  const [avatar, setAvatar] = useState(account?.image || '/assets/emotions/avatar1.png')
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleClick = async () => {
    if (formData.name === '' || formData.password === '' || formData.confirmPassword === '')
      toast.error('Fill all the blanks')
    else if (formData.password !== formData.confirmPassword)
      toast.error("Password doesn't match")
    else {
      try{
        await changeAccount(formData)
        navigate(-1)
      }
      catch(error){
        console.log(error)
      }
    }
  }

  const onAvatarClick = () => {
    setShowModal(true)
  }

  useEffect(()=>{
    setFormData({ ...formData, name: account?.name});
  },[])

  return (
    <div className='min-h-full h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='text-2xl text-center py-3'>
        Edit Account
      </div>
      <div className='max-w-md w-full space-y-8'>
        <div className='border rounded-xl px-3 pb-7'>
          <form className="mt-8" encType='multipart/form-data'>
            <div className='flex flex-col justify-center items-center'>
              <img className="rounded-full shadow-xl text-center w-48 h-48 flex items-center justify-center duration-200" src={avatar} alt='avatar' />
            </div>
            <div className='text-center text-sm cursor-pointer mt-2' onClick={onAvatarClick}>
              Upload Avatar
            </div>
            <>
              {
                fields.map(field =>
                  <Input
                    key={field.id}
                    handleChange={handleChange}
                    value={formData[field.id]}
                    labelText={field.labelText}
                    labelFor={field.labelFor}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    isRequired={field.isRequired}
                    placeholder={field.placeholder}
                  />
                )
              }
              <FormAction handleClick={handleClick} text="Update" />
              <div className='text-center w-full py-2 mt-2 bg-gray-400 text-white rounded-md cursor-pointer' onClick={()=> navigate(-1)}>
                Cancel
              </div>
            </>
            <UploadModal showModal={showModal} setShowModal={setShowModal} setFiles={setAvatar} setFormData={setFormData} formData={formData} />
          </form>
        </div>  
      </div> 
    </div>
  )
}

export default Profile