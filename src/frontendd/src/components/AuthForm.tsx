import React from 'react';

interface AuthFormProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
}

export default function AuthForm({
  title, children, onSubmit, submitLabel
}: AuthFormProps) {
  return (
    <section className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
      <h1 className="text-center text-2xl font-bold mb-2">{title}</h1>
      <form onSubmit={onSubmit} className="mt-4">
        {children}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 text-white font-medium rounded-lg hover:bg-yellow-500 transition"
        >
          {submitLabel}
        </button>
      </form>
    </section>
  );
}
