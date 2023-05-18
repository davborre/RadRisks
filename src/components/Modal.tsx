import { Dialog } from '@headlessui/react'
import { useState } from 'react';

const modalHeaders = [
  'Welcome to RadRisks!',
  'Getting Started',
  'Features',
  'Documentation',
  'About'
]

const Modal = ({ darkMode, isOpen, setOpen }: { darkMode: boolean, isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [tab, setTab] = useState(0);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      className={`relative z-50 ${darkMode ? 'dark' : ''}`}
    >
      <div className="fixed inset-0 bg-black/50 dark:bg-white/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded-[50px] w-[40rem] h-[40rem] bg-white dark:bg-black dark:text-white text-center p-10 flex flex-col">
          <h1 className="font-bold text-4xl">{modalHeaders[tab]}</h1>
          {tab == 0 &&
            <div className="flex grow">
              <img className="mx-auto" src="/logo.png" alt="RadRisks logo" />
            </div>
          }
          {tab == 1 &&
            <p className="text-left text-2xl flex grow items-center">RadRisks is a tool that allows radiation protection professionals to calculate the lifetime risk per unit intake by ingestion or inhalation for a specific radionuclide over a specified period of time.</p>
          }
          {tab == 2 &&
            <div className="flex grow items-center">
              <ul className="list-disc text-2xl text-left pl-10">
                <li>Calculate risk</li>
                <li>Export past output history</li>
                <li>View and edit data coefficients</li>
                <li>Customize the program</li>
              </ul>
            </div>
          }
          {tab == 3 &&
            <div className="flex grow items-center">
              <div>
                <img src="/calculationsFlow.png" alt="calculations flow" />
                <p className="text-2xl mt-10">Learn more at the RadRisks Wiki.</p>
              </div>
            </div>
          }
          {tab == 4 &&
            <div className="flex grow items-center text-left text-2xl">
              <div>
                <p>RadRisks was developed by Ben Nguyen and David Borrego.</p>
                <br />
                <p>Made with Tauri, React, Typescript, Rust, and Tailwind CSS.</p>
                <br />
                <p>See the code on <a href="https://github.com/davborre/RadRisks" target="_blank">GitHub</a>.</p>
              </div>
            </div>}
          <div className="flex justify-center gap-5">
            <div onClick={() => setTab(0)} className={`rounded-full w-3 h-3 ${tab == 0 ? "bg-epablue dark:bg-epagreen" : "bg-black dark:bg-white"}`} />
            <div onClick={() => setTab(1)} className={`rounded-full w-3 h-3 ${tab == 1 ? "bg-epablue dark:bg-epagreen" : "bg-black dark:bg-white"}`} />
            <div onClick={() => setTab(2)} className={`rounded-full w-3 h-3 ${tab == 2 ? "bg-epablue dark:bg-epagreen" : "bg-black dark:bg-white"}`} />
            <div onClick={() => setTab(3)} className={`rounded-full w-3 h-3 ${tab == 3 ? "bg-epablue dark:bg-epagreen" : "bg-black dark:bg-white"}`} />
            <div onClick={() => setTab(4)} className={`rounded-full w-3 h-3 ${tab == 4 ? "bg-epablue dark:bg-epagreen" : "bg-black dark:bg-white"}`} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal