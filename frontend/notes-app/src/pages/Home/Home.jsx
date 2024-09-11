import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosinstance'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from "../../assets/add-notes.png"

const Home = () => {
  
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown:false , 
    type: 'add',
    data : null
  })

  const [showToastMsg , setShowToastMsg] = useState({
    isShown : false , 
    message : "" , 
    type: "add" , 
  })

  const [allNotes , setAllNotes] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [isSearching , setIsSearching] = useState(false)
  const navigate = useNavigate();

  const handleShowToast = (message , type) => {
    setShowToastMsg({
      isShown : true , 
      message, 
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown : false , 
      message : ""
    })
  }


  const handleEdit =( noteDetails) => {
    setOpenAddEditModal({
      isShown : true , 
      type : "edit" , 
      data : noteDetails
    })
    
  }

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

  // get all notes 
  const getAllNotes = async () => {

    try{
      const response = await axiosInstance.get('/get-all-notes' ) ; 
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }

    }catch(error){
        console.log("An unexpected error occured . Try again . ")
    }
  }

  // delete note
  const deleteNote = async (data) => {
    const noteId = data._id ; 
    try {
        const response = await axiosInstance.delete("/delete-note/" + noteId )
        if(response.data && !response.data.error) {
            handleShowToast("Note Deleted Succcessfuly !" , "delete" )
            getAllNotes()
        }

    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          console.log("An error occured . Please try again . ")
        }
    }

  }

  const onSearchNote = async (query) =>{
    try {
      const response = axiosInstance.get("/search-note" ,{params: {query},})
      if(response.data && (await response).data.notes) {
        setIsSearching(true) ; 
        setAllNotes((await response).data.notes)
      }

    } catch (error) {
      console.log(error)
    }
  } 


  useEffect(() => {
    getAllNotes()
    getUserInfo()
    return () => {}
  }, [])

  
  return (
<>
<Navbar userInfo ={userInfo} onSearchNote={onSearchNote} />

<div className='container  mx-auto '>

  { allNotes.length > 0 ?

    <div className='grid grid-cols-3 gap-4 mt-8'>
    {
      allNotes.map((note,index) =>( 
        
        <NoteCard 
        key={note._id}
        title={note.title}
        date={note.createdOn} 
        content={note.content}
        tags={note.tags}
        isPinned={note.isPinned}
        onEdit={() => { handleEdit(note)}}
        onDelete={() => {deleteNote(note)}}
        onPinNote={() => {}} />
        
      ))
    }
    </div> 
    : <EmptyCard imgSrc = {AddNotesImg} message="Start creating your first note! Click the 'Add' button to jot your thoughts, ideas, and reminders.Let's get started!" />
    }
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
          >
             <AddEditNotes 
            onClose={() =>{
            setOpenAddEditModal({
              isShown: false ,
              type: 'add',
              data: null
            })}}
            getAllNotes={getAllNotes}
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            handleShowToast = {handleShowToast}
           /> 
      </Modal>

      <Toast
        message = {showToastMsg.message}
        type = {showToastMsg.type}
        isShown ={showToastMsg.isShown}
        onClose = {handleCloseToast}
      />




</>
  )}


export default Home