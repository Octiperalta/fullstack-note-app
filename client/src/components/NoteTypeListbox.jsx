import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";

const people = [
  { name: "none", color: "gray" },
  { name: "education", color: "yellow" },
  { name: "personal", color: "red" },
  { name: "work", color: "blue" },
];

export default function NoteTypeListbox({ setNoteType }) {
  const [selected, setSelected] = useState(people[0]);

  const setSelectedType = type => {
    setSelected(type);
    console.log(type);
    setNoteType(type);
  };

  return (
    <div className='w-44'>
      <Listbox value={selected} onChange={setSelectedType}>
        {({ open }) => (
          <>
            <div className='relative'>
              <Listbox.Button className='relative w-full py-1 pl-2 pr-10 text-left bg-gray-100 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 sm:text-sm'>
                <span className='block truncate text-gray-700 capitalize'>
                  {selected.name}
                </span>
                <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  {open ? (
                    <ChevronUpIcon
                      className='w-5 h-5 text-gray-400'
                      aria-hidden='true'
                    />
                  ) : (
                    <ChevronDownIcon
                      className='w-5 h-5 text-gray-400'
                      aria-hidden='true'
                    />
                  )}
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                show={open}
                enter='transition duration-1000'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'>
                <Listbox.Options
                  static
                  className='absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {people.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `${
                          active ? "text-blue-900 bg-gray-200" : "text-gray-800"
                        } cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={person}>
                      {({ selected, active }) => (
                        <>
                          <span className='flex items-center space-x-3 justify-between'>
                            <span
                              className={`${
                                selected ? "font-medium" : "font-normal"
                              } block truncate capitalize`}>
                              {person.name}
                            </span>
                            <span
                              className={`h-2 w-2 bg-transparent inline-block rounded border-2 border-${person.color}-500`}></span>
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-blue-900" : "text-blue-900"
                              } absolute inset-y-0 left-0 flex items-center pl-3`}>
                              <CheckIcon
                                className='w-5 h-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}
