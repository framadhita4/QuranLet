import { FormEvent } from "react";

export default function SearchBar({ placeholder, inputHandler }: { placeholder: string, inputHandler: (e: FormEvent<HTMLInputElement>) => void }) {
  return <input type="text"
    className="w-full overflow-ellipsis placeholder:opacity-70 bg-slate-100 dark:bg-pri-color-dark rounded-md focus:outline-none p-2 mb-2"
    onInput={inputHandler}
    placeholder={placeholder} />
}