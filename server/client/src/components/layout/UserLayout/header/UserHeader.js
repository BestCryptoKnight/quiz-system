import React, { useState, useEffect } from 'react'
import { FaSearch, FaRegBell, FaRegClipboard } from 'react-icons/fa'
import { useAuth } from '../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar'

const UserHeader = () => {
  const { isLoggedIn, logout, account } = useAuth()
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn)
      navigate('/')
  }, [isLoggedIn])

  const handleLogoutClick = () => {
    logout()
  }

  const handleProfileClick = () => {
    navigate('/user/profile')
  }

  const handleToggle = () => {
    setClicked(true)
  }

  return (
    <div className='pl-40 pr-20 py-0.5 mb-20 flex flex-row justify-between shadow-lg w-full items-center'>
      <div className='flex flex-row'>
        <img className='w-[80px]' src='/assets/icons/logo.png' alt='logo' />
        <div className="my-3 bg-gray-300 w-0.5"></div>
        <div className='flex flex-col mx-2 justify-center'>
          <p className='text-lg'>Autoescuela App</p>
          <p className='text-2xl font-bold'>Comunidad</p>
        </div>
      </div>
      <div className='flex flex-row gap-6 items-center'>
        <div className='flex flex-row gap-4 text-xl'>
          <FaSearch />
          <div className="bg-gray-300 w-0.5"></div>
          <FaRegClipboard />
          <FaRegBell />
        </div>
        <div className='flex flex-row gap-3'>
          <p className='text-sm font-medium'>Autoescuela App</p>
          {/* <img className='w-7 y-7 rounded-full' src='/assets/icons/logo.png' alt='logo circle' /> */}
        </div>
        {
          isLoggedIn ?
            <div className='transition-200 relative' onMouseLeave={() => setClicked(false)}>
              <Avatar className='cursor-pointer' name={account.name} size='30' round='20px' src={account.image} alt='' onClick={handleToggle} />
              {
                clicked ?
                  <div className='flex flex-col absolute shadow-md rounded-sm'>
                    <div className='cursor-pointer hover:bg-gray-300 py-1 px-3' onClick={handleProfileClick}>Profile</div>
                    <div className='cursor-pointer hover:bg-gray-300 py-1 px-3' onClick={handleLogoutClick}>LogOut</div>
                  </div>
                  :
                  <></>
              }
            </div>
            :
            <div className='cursor-pointer'>LogIn</div>
        }
      </div>
    </div>
  )
}

export default UserHeader