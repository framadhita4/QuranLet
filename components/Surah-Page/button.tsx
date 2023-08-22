import { MouseEventHandler, ReactNode } from "react"

export default function Button({ children, onClick = () => { } }: { children: ReactNode, onClick?: MouseEventHandler }) {
  return <button onClick={onClick} className={`p-1 rounded-full flex items-center justify-center w-8 h-8 transition-all relative button hover:text-sec-color-light [&>div]:hover:bg-sec-color-light active:scale-90 rounded-full`}>
    <div className="absolute opacity-30 w-full h-full transition-all rounded-full" />
    {children}
  </button>
}