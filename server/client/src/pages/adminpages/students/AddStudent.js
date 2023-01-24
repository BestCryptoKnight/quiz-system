import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../../apis/user.api';
import toast from 'react-hot-toast'
const AddStudent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const onAddClick = async (e) => {
    try {
      if (!name || !password)
        toast.error('Fill the blanks')
      else {
        const response = await addUser({
          name: name,
          password: password
        });

        if (response.message) {
          toast.error('Name already exists')
        }
        else {
          e.preventDefault();
          navigate('/register-student')
        }
      }
    }
    catch (error) {
      toast(error);
    }
  };

  return (
    <div className="w-full max-w-sm container mt-20 mx-auto">
      <div className="w-full mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
          Name of Student
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
      </div>
      <div className="w-full mb-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600" value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Enter password" />
      </div>
      <div className="flex items-center justify-between">
        <button className="mt-5 bg-[#3598DB] w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onAddClick}>
          Add Student
        </button>
      </div>
      <div className="text-center mt-4 text-gray-500 cursor-pointer" onClick={() => navigate('/register-student')}>
        Cancel
      </div>
    </div>
  );
}

export default AddStudent