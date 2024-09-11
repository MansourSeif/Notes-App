import React from 'react'
import {FaMagnifyingGlass} from "react-icons/fa6"
import {IoMdClose} from 'react-icons/io'


const SearchBar = ({value , onChange , handleSearch , onClearSearch} ) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100  rounded-full'>
        <input type="text"  
        placeholder='Search notes'
        className='w-full text-xs text-left bg-transparent py-[11px]  outline-none  '
        value={value}   
        onChange={onChange}
    />
    
    {value ?
        <IoMdClose className='text-xl text-slate-400 cursor-pointer hover:text-primary' onClick={onClearSearch} />
        :  
        <FaMagnifyingGlass className='text-slate-400 cursor-pointer hover:text-primary' onClick={handleSearch} />
    }

    </div>
  )
}

export default SearchBar