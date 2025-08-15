import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function Preview({ markdown }: { markdown: string }) {
  return (
    <div className="bg-[#161616] rounded-xl shadow p-6 min-h-[40vh] border border-gray-700 overflow-auto w-full max-w-xl mx-auto">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[gfm]}>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}