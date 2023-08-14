import { MouseEventHandler, ReactNode } from "react"

export default function Button({children, onClick = () => {}}: {children: ReactNode, onClick?: MouseEventHandler}) {
  return <button onClick={onClick} className={`flex justify-center items-center p-1 rounded-full w-8 h-8 overflow-hidden transition-all relative button hover:text-sec-color-light text-gray-400 [&>div]:hover:bg-sec-color-light active:scale-90`}>
    <div className="absolute opacity-30 w-full h-full transition-all"/>
    {children}
  </button>
}