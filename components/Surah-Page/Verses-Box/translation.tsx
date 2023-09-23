import { Setting } from "@/types/setting-type";

export default function Translation({ children, resourceName, settings }: { children: React.ReactNode, resourceName: string, settings: Setting }) {
  const getTranslateSetting = () => {
    let i = 0;
    if (settings.translation.id) i++;
    if (settings.translation.latin) i++;

    return i;
  }

  return <div className="text-sm sm:text-base mb-4">
    {children}
    {(getTranslateSetting() > 1) &&
      <div className="text-xs font-normal mt-1">&mdash; {resourceName}</div>
    }
  </div>
}