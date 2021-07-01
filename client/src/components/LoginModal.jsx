import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { login } from "../services/loginServices";

function LoginModal({ isOpenModal, closeModal, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const user = await login({ username, password });
      setUser(user);
      closeModal();
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrorMessage("Invalid user or password. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }

  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}>
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-900 bg-opacity-60 z-10' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'>
            <div className='inline-block relative z-10 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-3xl font-bold leading-6 text-gray-800 text-center'>
                Login
              </Dialog.Title>
              <form action='' onSubmit={handleLogin}>
                <div className='mt-4 rounded-md shadow-sm'>
                  <input
                    type='text'
                    placeholder='Username'
                    onChange={({ target }) => setUsername(target.value)}
                    className='block w-full border border-gray-300 text-gray-900  rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </div>

                <div className='mt-3 rounded-md shadow-sm'>
                  <input
                    type='password'
                    placeholder='Password'
                    onChange={({ target }) => setPassword(target.value)}
                    className='block w-full border border-gray-300 text-gray-900  rounded-md px-3 py-2 text-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  />
                </div>
                <div className='mt-2 text-red-600 font-medium'>
                  {errorMessage}
                </div>
                <div className='mt-3'>
                  <button
                    type='submit'
                    className='inline-flex justify-center w-32 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'>
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default LoginModal;
