// app/components/forms/RepositoryForm.tsx
'use client';

import { useState } from 'react';
import { z } from 'zod';

const repoSchema = z.object({
  url: z.string().url().refine((url) => 
    url.includes('github.com'), 
    "Must be a valid GitHub repository URL"
  )
});

export function RepositoryForm({ onSubmit }) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const validation = repoSchema.safeParse({ url });
      if (!validation.success) {
        setError(validation.error.errors.message);
        return;
      }
      
      await onSubmit(url);
    } catch (err) {
      setError('Failed to process repository');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
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
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Analyzing...' : 'Generate README'}
      </button>
    </form>
  );
}
