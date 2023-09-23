import { useImmerAtom } from "jotai-immer";
import Translation from "./Setting-Sections/translation";
import WordByWord from "./Setting-Sections/wordByWord";
import { settingAtom } from "../atoms/setting-atom";

export default function SettingContainer() {
  const [setting, setSetting] = useImmerAtom(settingAtom);

  return <div className="p-2 w-full max-h-96 overflow-y-scroll">
    <div className="font-semibold text-base mb-2">Tema</div>
    <div className="flex relative rounded-full bg-slate-100 dark:bg-pri-color-dark text-sm p-2">
      <div className={`bg-white dark:bg-sec-color-dark h-9 w-[47%] absolute z[-1] rounded-full drop-shadow-md transition duration-300 ease-in-out ${setting.theme && "translate-x-[100%]"}`}></div>
      <button onClick={() => setSetting(e => { e.theme = 0; return e })} className="w-[50%] z-[1] p-2">Terang</button>
      <button onClick={() => setSetting(e => { e.theme = 1; return e })} className="w-[50%] z-[1]">Gelap</button>
    </div>
    <div className="w-full h-[1.5px] rounded-full bg-gray-700 dark:bg-zinc-300 my-4" />
    <WordByWord />
    <Translation />
  </div >
}