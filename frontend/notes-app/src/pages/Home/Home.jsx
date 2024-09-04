import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosinstance'


const Home = () => {
  
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown:false , 
    type: 'add',
    data : null
  })

  const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate();
// get user info
  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user") ; 
      if(response.data ){
        setUserInfo(response.data.user)
      }
    } catch(error){
      if(error.response && error.response.status === 401){
        localStorage.clear()
        navigate('/login')
      }
    } 
  }  ;

  useEffect(() => {
    getUserInfo()
    return () => {}
  }, [])

  
  return (
<>
<Navbar userInfo ={userInfo} />

<div className='container  mx-auto '>
    <div className='grid grid-cols-3 gap-4 mt-8'>

    <NoteCard 
    title={"meeeting on hell divers 2 "}
    date={"12/12/2021"} 
    content={"lorem ipsum dolor sit amet zgzgeg zgz gz    zgrg zgz gzh zhrjez,h-yr,s; "}
    tags={"#meeting #work"}
    isPinned={true}
    onEdit={() => {}}
    onDelete={() => {}}
    onPinNote={() => {}} />
    </div>
</div>
    <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-500 absolute right-10 bottom-10 ' onClick={()=>{
      setOpenAddEditModal({
        isShown: true,
        type: 'add',
        data: null
      })
     }}>
      <MdAdd className='text-[32px] text-white ' />  
    </button>

    <Modal 
    isOpen={openAddEditModal.isShown}
    onRequestClose={()=>{}}
    style={{
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)'
        },
        
        }}
        contentLabel="" 
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden'
        > <AddEditNotes onClose={() =>{
          setOpenAddEditModal({
            isShown: false ,
            type: 'add',
            data: null
          })}}
           type={openAddEditModal.type}
           noteData={openAddEditModal.data}
         /> 
        </Modal>
</>
  )}


export default Home