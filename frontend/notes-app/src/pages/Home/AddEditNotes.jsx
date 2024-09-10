import React from 'react'
import TagInput from '../../components/Inputs/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosinstance'

const AddEditNotes = ({ onClose, getAllNotes, noteData, type, handleShowToast }) => {
    const [title, setTitle] = React.useState(noteData?.title || "")
    const [content, setContent] = React.useState(noteData?.content || "")
    const [tags, setTags] = React.useState(noteData?.tags || [])
    const [error, setError] = React.useState(null)

    // Add new note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post('/add-note', {
                title,
                content,
                tags,
            })
            // Update the list with the new note
            if (response.data && response.data.note) {
                handleShowToast("Note Added Successfully!")
                getAllNotes()
                onClose()
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
        }
    }

    // Edit note
    const editNote = async () => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags,
            })
            if (response.data && response.data.note) {
                handleShowToast("Note Updated Successfully!")
                getAllNotes()
                onClose()
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
        }
    }

    const handleAddNote = () => {
        if (!title) {
            setError('Please enter the title')
            return
        }
        if (!content) {
            setError('Please enter the content')
            return
        }

        setError(null)

        if (type === 'edit') {
            editNote()
        } else {
            addNewNote()
        }
    }

    return (
        <div className='relative'>
            <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
                <MdClose className='text-xl text-slate-400' />
            </button>

            <div className='flex flex-col gap-2 '>
                <label className='input-label'>TITLE</label>
                <input
                    type="text"
                    className='text-2xl text-slate-950 outline-none p-2 rounded-md'
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className='input-label'>CONTENT</label>
                <textarea
                    className='text-sm text-slate-950 outline-none bg-white p-2 rounded-md'
                    placeholder='Enter content'
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <div className="mt-2">
                    <TagInput tags={tags} setTags={setTags} />
                </div>
            </div>

            {error && <p className='text-red-500 text-sm pt-4'>{error}</p>}

            <div className='flex gap-5'>
                <button
                    className='btn-primary bg-primary font-medium mt-5 p-3'
                    onClick={handleAddNote}
                >
                    {type === 'edit' ? "UPDATE" : "ADD"}
                </button>
            </div>
        </div>
    )
}

export default AddEditNotes
