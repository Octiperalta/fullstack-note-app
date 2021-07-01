import React, { useState } from "react";
import NoteTypeListbox from "./NoteTypeListbox";
import { Transition } from "@headlessui/react";
import { Fragment } from "react";

function AddNote({ add }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [noteType, setNoteType] = useState("");
  const [important, setImportant] = useState(false);

  const createNote = e => {
    e.preventDefault();
    add({
      content: content,
      type: noteType.name || "none",
      isChecked: false,
      isImportant: important,
    });
    // setContent("");
    // setNoteType("");
    setImportant(false);
    setIsOpen(false);
  };

  return (
    <div className='z-10'>
      <div
        onClick={() => setIsOpen(isOpen => !isOpen)}
        className={`fixed inset-0 z-20 ${isOpen ? "block" : "hidden"}`}></div>
      <div className='flex relative z-30 space-x-8'>
        <div className='flex-shrink-0'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`bg-blue-600 text-gray-100 rounded-full p-2 focus:outline-none focus:ring-2  focus:ring-blue-300 hover:bg-blue-500 transition ${
              isOpen ? "transform rotate-135" : ""
            } `}>
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
          </button>
        </div>

        <Transition
          as={Fragment}
          show={isOpen}
          enter='transition transform ease-in-out duration-300 origin-left'
          enterFrom='opacity-0 -translate-x-full'
          enterTo='opacity-100 translate-x-0'
          leave='transition duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='absolute left-6 bg-white px-4 py-3 rounded-md shadow-md '>
            <form action='' onSubmit={createNote}>
              <div className='flex items-center space-x-3'>
                <div className='relative w-96 '>
                  <span className='absolute inset-y-0 flex items-center left-0 text-gray-400'>
                    <svg
                      className=' h-5 w-5 '
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      />
                    </svg>
                  </span>
                  <input
                    type='text'
                    className='block h-full w-full pl-7 focus:outline-none text-gray-600 font-medium'
                    placeholder='Escriba una nueva nota'
                    onChange={e => setContent(e.target.value)}
                  />
                </div>
                <div className='flex items-center space-x-2 '>
                  <NoteTypeListbox setNoteType={setNoteType} />
                  <div className='flex'>
                    <button
                      type='button'
                      onClick={() => setImportant(important => !important)}
                      className={`block transition bg-gray-100 p-1 rounded-lg items-center ${
                        important ? "text-red-500 bg-gray-200" : "text-gray-400"
                      }  hover:bg-gray-200 focus:ring-2 focus:ring-opacity-75 focus:ring-blue-400 focus:outline-none`}>
                      <ExclamationIcon className='h-5 w-5' />
                    </button>
                  </div>
                  <div className='flex'>
                    <button
                      type='submit'
                      className='transition bg-gray-100 p-1 rounded-lg items-center text-gray-400 hover:bg-gray-200 hover:text-green-500 focus:ring-2 focus:ring-opacity-75 focus:ring-blue-400 focus:outline-none'>
                      <AddIcon className='h-5 w-5' />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default AddNote;

const ExclamationIcon = ({ className }) => {
  return (
    <svg className={className} viewBox='0 0 512 512'>
      <path
        d='M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 008 8h0a8 8 0 008-8l8-216c.58-8.64-7.34-16-16-16z'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='40'
      />
      <circle
        cx='256'
        cy='416'
        r='16'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='40'
      />
    </svg>
  );
};

const AddIcon = ({ className }) => {
  return (
    <svg
      className={className}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
      />
    </svg>
  );
};
