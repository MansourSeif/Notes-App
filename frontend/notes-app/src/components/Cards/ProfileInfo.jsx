import React from 'react'
import { getInitials } from '../../utils/helper'

const ProfileInfo = ({onLogout , userInfo}) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 '>{getInitials(userInfo?.fullName)}

      </div>
      <div >
        <p className='text-sm font-bold'>{userInfo?.fullName.split(' ')[0]}</p>
        <button className=' text-sm text-primary underline' onClick={onLogout}>Log out</button>
      </div>
    </div>
  )
}

export default ProfileInfo