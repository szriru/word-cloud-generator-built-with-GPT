interface ParamModalProps {
  isOpen: boolean
  children: React.ReactNode
}

export default function ParamModal({ isOpen, children }: ParamModalProps) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg overflow-hidden w-5/6 md:max-w-md">
            <div className="p-4 flex flex-col ">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}