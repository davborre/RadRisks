import { Dialog } from '@headlessui/react'
import { useState } from 'react';

const Modal = ({ isOpen, setOpen }: { isOpen: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const [tab, setTab] = useState(0);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded-[50px] w-[40rem] h-[40rem] bg-white text-center p-10 flex flex-col">
          {tab == 0 &&
            <h1 className="font-bold text-4xl">Getting Started</h1>
          }
          {
            tab == 0 && <p className="text-left text-2xl grow flex items-center">RadRisks is a tool that allows radiation protection professionals to calculate the lifetime risk per unit intake by ingestion or inhalation for a specific radionuclide over a specified period of time.</p>
          }
          {tab == 1 &&
            <h1 className="font-bold text-4xl">Features</h1>
          }
          {tab == 1 &&
            <div className="grow flex items-center">
              <ul className="list-disc text-2xl text-left pl-10">
                <li>Calculate risk</li>
                <li>Export past output history</li>
                <li>View and edit data coefficients</li>
                <li>Customize the program</li>
              </ul>
            </div>
          }
          {tab == 2 &&
            <h1 className="font-bold text-4xl">How The Calculations Work</h1>
          }
          {tab == 2 &&
            <div className="flex grow items-center">
              <div>
                <img src="public/calculationsFlow.png" />
                <p className="text-2xl mt-10">Learn more at the RadRisks Wiki.</p>
              </div>
            </div>
          }
          {tab == 3 &&
            <h1 className="font-bold text-4xl">About</h1>
          }
          {tab == 3 &&
            <div className="flex grow items-center text-left text-2xl">
              <div>
                <p>RadRisks was developed by Ben Nguyen and David Borrego.</p>
                <br />
                <p>Made with Tauri, React, Typescript, Rust, and Tailwind CSS.</p>
                <br />
                <p>See the code on <a href="https://github.com/davborre/RadRisks" target="_blank">GitHub</a>.</p>
              </div>
            </div>}
          <div className="flex justify-center gap-5 pt-10">
            <div onClick={() => setTab(0)} className={`rounded-full w-2 h-2 ${tab == 0 ? "bg-epablue" : "bg-black"}`} />
            <div onClick={() => setTab(1)} className={`rounded-full w-2 h-2 ${tab == 1 ? "bg-epablue" : "bg-black"}`} />
            <div onClick={() => setTab(2)} className={`rounded-full w-2 h-2 ${tab == 2 ? "bg-epablue" : "bg-black"}`} />
            <div onClick={() => setTab(3)} className={`rounded-full w-2 h-2 ${tab == 3 ? "bg-epablue" : "bg-black"}`} />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal