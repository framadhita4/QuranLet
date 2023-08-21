export default function SurahCardSkeleton() {
  return <>
    <div>
      <div className="h-20 w-full flex justify-between bg-white p-3 border-2 rounded-lg border-slate-200 animate-pulse transition-all duration-300">
        <div className="w-full flex justify-center items-center transition-all duration-300">
          <div className="flex items-center justify-center rounded rotate-45 w-10 h-10 bg-slate-200 ml-1 mr-4 transition-all duration-300"/>
          <div className="w-full">
            <div className="w-full h-4 bg-slate-200 mb-3 rounded"/>
            <div className="w-full h-2 rounded bg-slate-200 transition-all duration-300"/>
          </div>
        </div>
      </div>
    </div>
  </>
}