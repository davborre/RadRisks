import { Dialog } from '@headlessui/react'

const Modal = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean[]>> }) => {

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen([true, false, false, false, false])}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto rounded-[50px] w-[40rem] h-[40rem] bg-white text-center p-10 flex flex-col">
          <h1 className="font-bold text-4xl">Getting Started</h1>
          <p className="text-left text-2xl grow flex items-center">RadRisks is a tool that allows radiation protection professionals to calculate the lifetime risk per unit intake by ingestion or inhalation for a specific radionuclide over a specified period of time.</p>
          <div className="flex justify-center gap-5 pt-10">
            <div className="bg-black rounded-full w-2 h-2" />
            <div className="bg-black rounded-full w-2 h-2" />
            <div className="bg-black rounded-full w-2 h-2" />
            <div className="bg-black rounded-full w-2 h-2" />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal