import React, { useState } from "react";
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import EditIcon from "./EditButton";

function Note({
  content,
  type,
  id,
  isChecked,
  isImportant,
  isFirstRender,
  index,
  deleteNote,
}) {
  const [checked, setChecked] = useState(isChecked);
  const color =
    {
      personal: "red",
      work: "blue",
      education: "yellow",
    }[type.toLowerCase()] || "gray";

  return (
    <Transition
      as={Fragment}
      show={true}
      appear={true}
      enter={`transition ${
        isFirstRender ? `delay-${index}00 duration-300 ` : "duration-500"
      }`}
      enterFrom={isFirstRender ? "opacity-0" : "transform -translate-x-full "}
      enterTo={isFirstRender ? "opacity-100" : "transform translate-x-0 "}
      leave='transition-opacity duration-1000'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'>
      <div className='bg-white flex justify-between rounded-lg px-5 py-5 shadow-sm'>
        <div className='flex items-center space-x-5'>
          <button
            onClick={() => setChecked(!checked)}
            className={`focus:outline-none transition ${
              checked ? "text-green-500" : "text-gray-200 hover:text-gray-300"
            }`}>
            <CheckCircleIcon className='h-7 w-7' />
          </button>
          <span
            className={`focus:outline-none transition ${
              isImportant ? "text-red-600" : "text-gray-200"
            }`}>
            <ExclamationCircleIcon className='h-7 w-7' />
          </span>
          <div className='flex items-center space-x-1'>
            <div className='w-24'>
              <span
                className={`inline-block bg-${color}-500 text-gray-100 px-3 py-1  tracking-wide leading-snug rounded-full text-xs uppercase `}>
                {type}
              </span>
            </div>
            <p
              className={`text-gray-600 text-opacity-90 text-lg tracking-tight capitalize font-medium ${
                checked && "line-through"
              }`}>
              {content}
            </p>
          </div>
        </div>
        <div className='flex space-x-6'>
          <span
            className={`group flex items-center space-x-1 text-gray-400 cursor-default hover:text-${color}-500 transition duration-200`}>
            <svg
              className='h-5 w-5 '
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
            <p className='text-sm font-medium'>Due in 30min</p>
          </span>
          <div className='flex text-gray-400 space-x-1 items-center'>
            <button
              className='block hover:text-red-700 transition'
              onClick={() => deleteNote(id)}>
              <svg
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
            <EditIcon />
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default Note;
