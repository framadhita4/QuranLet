import Translation from "./Setting-Sections/translation";
import WordByWord from "./Setting-Sections/wordByWord";

export default function SettingContainer() {

  return <div className="p-4 w-full max-h-96 overflow-scroll">
    <WordByWord />
    <Translation />
  </div >
}