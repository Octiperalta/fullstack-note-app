/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { FilterIcon, LoginIcon, LogoutIcon } from "@heroicons/react/outline";
import AddNote from "./components/AddNote";
import Note from "./components/Note";
import "./index.css";
import { createNote, fetchNotes, removeNote } from "./services/noteServices";
import LoginModal from "./components/LoginModal";

function App() {
  const [notes, setNotes] = useState();
  const isFirstRender = useRef(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [user, setUser] = useState(null);

  function closeModal(e) {
    setIsOpenModal(false);
  }

  function openModal() {
    setIsOpenModal(true);
  }

  useEffect(() => {
    fetchNotes().then(res => setNotes(res));
  }, []);

  useEffect(() => {
    if (notes) isFirstRender.current = false;
  }, [notes]);

  const addNote = async note => {
    await createNote(note);
    setNotes([...notes, note]);
  };

  const deleteNote = async id => {
    await removeNote(id);
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className='h-screen bg-gray-200 flex antialiased font-poppins overflow-hidden'>
      <div className='bg-white flex-shrink-0 flex flex-col justify-between px-3 py-1 items-center'>
        <div className='flex flex-col space-y-10 py-6'>
          <a href='#' className=' group focus:outline-none'>
            <svg
              className='h-7 w-7 text-gray-700 group-focus:text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
          </a>
          <a href='#' className=' group focus:outline-none'>
            <svg
              className='h-7 w-7 text-gray-300 group-focus:text-gray-200 '
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z'
              />
            </svg>
          </a>
          <a href='#' className=' group focus:outline-none'>
            <svg
              className='h-7 w-7 text-gray-300 group-focus:text-gray-200'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </a>
          <a href='#' className=' group focus:outline-none'>
            <svg
              className='h-7 w-7 text-gray-300 group-focus:text-gray-200'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </a>
        </div>
        <div>
          <button className='rounded-full focus:outline-none focus:ring-2 ring-offset-1'>
            <img
              className='h-10 w-10 object-cover rounded-full border-2 border-gray-600'
              src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=5&w=200&q=80'
              alt=''
            />
          </button>
        </div>
      </div>
      <div className='bg-gray-200 flex-1 px-7 py-6'>
        <div className='flex py-1 items-center'>
          {user && <AddNote add={addNote} />}

          <div className='flex ml-auto space-x-10'>
            <a href='#'>
              <svg
                className='h-6 w-6  text-gray-600 '
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </a>
            <a href='#'>
              <svg
                className='h-6 w-6  text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
            </a>

            {!user ? (
              <>
                <button
                  className='focus:ring focus:outline-none rounded-md'
                  onClick={openModal}>
                  <LoginIcon className='h-6 w-6 text-gray-600 ' />
                </button>

                <LoginModal
                  isOpenModal={isOpenModal}
                  closeModal={closeModal}
                  setUser={setUser}
                />
              </>
            ) : (
              <button
                className='focus:ring focus:outline-none rounded-md'
                onClick={() => setUser(null)}>
                <LogoutIcon className='h-6 w-6 text-gray-600' />
              </button>
            )}
          </div>
        </div>
        <main className='max-w-7xl mx-auto mt-24 px-8 flex flex-col'>
          <div className='relative flex justify-between items-center flex-shrink-0'>
            <div>
              <h1 className='text-5xl uppercase tracking-widest text-gray-800 relative z-10 font-semibold'>
                Notes
              </h1>
              <span className='absolute -top-3 -left-16 text-9xl uppercase text-gray-500 text-opacity-10 font-normal'>
                Notes
              </span>
            </div>
            <div className='text-gray-500 font-medium text-md flex items-center space-x-6 '>
              <button className='transform hover:text-gray-700 transition'>
                <FilterIcon className='h-5 w-5' />
              </button>
              <span className='tracking-tight'>{notes?.length} tasks</span>
            </div>
          </div>

          <div className='divide-y-4 mt-2 relative flex-grow'>
            {notes?.map((note, index) => (
              <Note
                {...note}
                isFirstRender={isFirstRender.current}
                index={index}
                key={note.id}
                deleteNote={deleteNote}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
