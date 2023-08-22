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
    <label className={`relative inline-flex select-none items-center ${disabled ? "opacity-50" : "cursor-pointer"}`}>
      <input
        type='checkbox'
        className='sr-only'
        checked={checked(setting)}
        onChange={onChangeHandler}
      />
      <span className={`mr-3 flex h-[18px] w-8 items-center rounded-full p-1 duration-200 ${checked(setting) ? 'bg-gray-700' : 'bg-gray-300'}`}>
        <span className={`h-[12px] w-[12px] rounded-full bg-white duration-200 ${checked(setting) ? 'translate-x-[12px]' : ''}`} />
      </span>
      <span>{text}</span>
    </label>
  </>
}