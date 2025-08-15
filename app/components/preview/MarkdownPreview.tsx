'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownPreviewProps {
  content: string;
  onContentChange: (content: string) => void;
}

export default function MarkdownPreview({ content, onContentChange }: MarkdownPreviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      {/* Editor */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="font-medium">Editor</h3>
        </div>
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="w-full h-96 p-4 font-mono text-sm resize-none focus:outline-none"
          placeholder="Your README content will appear here..."
        />
      </div>

      {/* Preview */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="font-medium">Preview</h3>
        </div>
        <div className="p-4 h-96 overflow-auto prose prose-sm max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}