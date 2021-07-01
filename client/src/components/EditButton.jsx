import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

function EditButton() {
  return (
    <Popover className='relative'>
      {({ open }) => (
        <>
          <Popover.Button
            className={`block hover:text-gray-700 transition focus:outline-none ${
              open ? "text-gray-700" : ""
            } `}>
            <SettingsIcon />
          </Popover.Button>
          {/* <Popover.Overlay
            className={`${
              open ? "opacity-30 fixed inset-0" : "opacity-0"
            } bg-black`}
          /> */}
          <Transition
            as={Fragment}
            // enter='transition-opacity duration-200 ease-in-out '
            // enterFrom='opacity-0'
            // enterTo='opacity-1'
            enter='transition transform ease-out duration-200 '
            enterFrom='opacity-0 scale-0 origin-bottom-left'
            enterTo='opacity-100 translate-y-0 scale-100 origin-bottom-left'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'>
            <Popover.Panel className='absolute -top-2 left-2 -mt-28 translate-y bg-white rounded-md ring-1 py-1 overflow-hidden ring-black ring-opacity-5 shadow '>
              <a
                href='#'
                className='flex items-center hover:bg-gray-100 px-3 py-2 space-x-2 hover:text-gray-500 transition-colors font-normal'>
                <span className='flex items-center transform  '>
                  <EditIcon />
                </span>
                <div className='text-sm'>Edit</div>
              </a>
              <a
                href='#'
                className='flex items-center hover:bg-gray-100 px-3 py-2 space-x-2 group hover:text-gray-500 transition-colors'>
                <span className='flex items-center '>
                  <MarkIcon />
                </span>
                <div className='text-sm'>Mark</div>
              </a>
              <a
                href='#'
                className='flex items-center hover:bg-gray-100 px-3 py-2 space-x-2 hover:text-gray-500 transition-colors font-normal'>
                <span className='flex items-center '>
                  <LabIcon />
                </span>
                <div className='text-sm'>Mark</div>
              </a>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default EditButton;

const SettingsIcon = () => {
  return (
    <svg
      className='h-5 w-5 fill-current'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
      />
    </svg>
  );
};

const EditIcon = () => {
  return (
    <svg class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
      />
    </svg>
  );
};
const MarkIcon = () => {
  return (
    <svg class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
      />
    </svg>
  );
};
const LabIcon = () => {
  return (
    <svg class='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
      />
    </svg>
  );
};
