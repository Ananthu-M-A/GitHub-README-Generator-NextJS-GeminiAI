'use client';

import { useState } from 'react';

interface RepositoryFormProps {
  onSubmit: (url: string) => void;
}

export default function RepositoryForm({ onSubmit }: RepositoryFormProps) {
  const [url, setUrl] = useState('https://github.com/Ananthu-M-A/Login-Page');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!url.includes('github.com')) {
        setError('Please enter a valid GitHub repository URL');
        return;
      }
      await onSubmit(url);
    } catch (err) {
      console.error('Error processing repository:', err);
      setError('Failed to process repository');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl shadow p-6 border border-gray-200 w-full max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          GitHub Repository URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/username/repo"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
      >
        {isLoading ? 'Analyzing...' : 'Generate README'}
      </button>
    </form>
  );
}