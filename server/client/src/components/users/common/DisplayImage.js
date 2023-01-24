import Avatar from 'react-avatar'

const DisplayImage = ({ total = '', users = [] }) => {
  let display
  if (total > 5) {
    let subUsers = []
    for (let i = 0; i < 4; i++)
      subUsers.push(users[i])
    const extraNum = total - 4
    display = (
      <div className='flex justify-end min-w-[150px] -space-x-2 overflow-hidden'>
        {subUsers.map((user, key) =>
          <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-white" size='30' name={user.name} src={user.image} alt="" key={key} />)}
        <div className='flex h-8 w-8 rounded-full ring-2 ring-white bg-[#3598DB] text-white font-medium text-center justify-center items-center'>{extraNum}+</div>
      </div>)
  }
  else {
    display = (
      <div className='flex justify-end min-w-[150px] -space-x-2 overflow-hidden'>
        {
          users.map((user, key) =>
            <Avatar className="inline-block h-8 w-8 rounded-full ring-2 ring-white" size='30' name={user.name} src={user.image} alt="" key={key} />)
        }
      </div>
    )
  }
  return (
    <>
      {
        display
      }
    </>
  )
}

export default DisplayImage