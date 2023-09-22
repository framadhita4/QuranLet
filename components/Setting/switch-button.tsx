import { settingAtom } from "../atoms/setting-atom";
import { Setting } from "@/types/setting-type";
import { useImmerAtom } from "jotai-immer";

interface Props {
  text: string,
  disabled?: boolean,
  changeHandler: (setting: Setting) => Setting,
  checked: (setting: Setting) => boolean;
};

export default function SwitchButton({ text, disabled = false, changeHandler, checked }: Props) {
  const [setting, setSetting] = useImmerAtom(settingAtom);

  const onChangeHandler = () => {
    setSetting(changeHandler);
  }

  return <>
    <label className={`relative inline-flex select-none items-center p-1 rounded-md ${disabled ? "opacity-50" : "cursor-pointer hover:bg-slate-100 dark:hover:bg-pri-color-dark"}`}>
      <input
        type='checkbox'
        className='sr-only'
        checked={checked(setting)}
        onChange={onChangeHandler}
      />
      <div className={`mr-3 flex h-[24px] w-9 items-baseline dark:border-[1px] dark:border-zinc-300 rounded-full p-[3px] duration-200 ${checked(setting) ? 'bg-gray-700 dark:bg-zinc-300' : 'bg-zinc-300 dark:bg-transparent'}`}>
        <div className={`h-[17px] w-[17px] rounded-full bg-white  duration-200 ${checked(setting) ? 'translate-x-[12px] dark:bg-sec-color-dark' : 'dark:bg-zinc-300'}`} />
      </div>
      <div className="text-sm font-medium">{text}</div>
    </label>
  </>
}