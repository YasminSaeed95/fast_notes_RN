import React, { createContext, ReactNode, useState } from 'react';

// TypeScript type for a note
export type Note = {
  id: string;
  title: string;
  content: string;
};

type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
};

export const NotesContext = createContext<NotesContextType>({
  notes: [],
  addNote: () => {},
});

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (title: string, content: string) => {
    setNotes((prev) => [
      ...prev,
      { id: Math.random().toString(), title, content },
    ]);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
}
