import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({tags , setTags}) => {
    const [inputValue , setInputValue] = useState("")
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }
    const handleTagAdd = () => {
        if (inputValue.trim() !== "") {
           setTags([...tags , inputValue])
           setInputValue("")
        }
    }

    const handleKeyDown = (e) => { 
        if (e.key === 'Enter') {
            handleTagAdd()
        }
    }

    const handleTagRemove = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove)) 
    }

  return (
    <div className=''>
        <div className='flex items-center gap-2 flex-wrap mt-2'>
            {tags?.length >0 &&
             tags.map((tag,index)=>{
                return <span key={index} className='items-center gap-2 text-sm text-slate-950 flex bg-slate-100 justify-center px-2 rounded-md py-1'>
                    # {tag} 
                    <button onClick={() =>{
                        handleTagRemove(tag)
                    }}>
                        <MdClose className='text-red-500' />
                        </button>   
                </span>
            })}
        </div>

        <div className='flex items-center gap-4 mt-3'>
        <input type="text" className=' text-sm bg-transparent border px-3 py-2 rounded outline-none' placeholder='Add Tags' onChange={handleInputChange} onKeyDown={handleKeyDown} 
        value={inputValue} />
        <button className='w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-900 duration-500' onClick={() =>{handleTagAdd()}}>
            <MdAdd className='text-2xl hover:text-white  text-blue-700' />
        </button>
        </div>

    </div>
  )
}

export default TagInput