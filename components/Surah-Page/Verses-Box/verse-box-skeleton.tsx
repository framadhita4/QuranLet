export default function VerseBoxSkeleton({ id }: { id: string }) {
  return <div id={`${id}`} className="border-b-2 mt-10 py-4 flex flex-wrap md:flex-nowrap animate-pulse">
    <div className="mr-10 mb-4 md:mb-0 flex md:flex-col place-items-baseline gap-1">
      <div className="h-8 w-8 bg-slate-200 dark:bg-sec-color-dark rounded-full"></div>
      <div className="h-8 w-8 bg-slate-200 dark:bg-sec-color-dark rounded-full"></div>
    </div>
    <div className="w-full">
      <div className="w-full h-20 rounded bg-slate-200 dark:bg-sec-color-dark mb-8"></div>
      <div className="w-full h-8 rounded bg-slate-200 dark:bg-sec-color-dark mb-4"></div>
    </div>
  </div>
}