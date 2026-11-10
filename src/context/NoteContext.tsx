/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
export interface Note {
 id: string;
    title: string;
    content : string;
    isPinned: boolean;
    isArchived: boolean;
    createdAt: Date;
  updatedAt: Date;
} 
interface NoteContextType {
    notes: Note[];
    createNote: (title: string, content: string) => void;
    deleteNote: (id: string) => void;
    editNote: (id: string, title: string, content: string) => void;
    pinNote: (id: string) => void;
    archiveNote: (id: string) => void;
}
const NoteContext = createContext<NoteContextType | undefined>(undefined);
export function NoteProvider({children}: {children: React.ReactNode}){
const [notes, setNotes] = useState<Note[]>(()=>{
  const savedNotes = localStorage.getItem("notes")
  if(!savedNotes){
    return []
  }
  const parsedNotes = JSON.parse(savedNotes);

return parsedNotes.map((note: Note) => ({
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
}));
}
);
useEffect(()=>{
  localStorage.setItem("notes", JSON.stringify(notes))
},[notes])

  function createNote(title: string, content: string) {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      isPinned: false,
      isArchived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes((previousNotes) => [...previousNotes, newNote]);
  }
  const deleteNote = (id: string) => {
  setNotes((prevNotes) =>
    prevNotes.filter((note) => note.id !== id)
  );
};
  const editNote=(id: string, title: string, content: string)=>{
    setNotes((prevNotes)=>
        prevNotes.map((note)=> note.id ===id? {...note, title, content, updatedAt: new Date()}
  :note)
    );
  }
  const pinNote=(id: string)=>{
    setNotes((prevNotes)=>
        prevNotes.map((note)=> note.id ===id ? {...note, isPinned:
           !note.isPinned,   
           updatedAt: new Date()}
  : note)
    );
  }
  const archiveNote=(id: string)=>{
    setNotes((prevNotes)=>
        prevNotes.map((note)=> note.id ===id ? {...note, 
           isArchived: !note.isArchived,
          updatedAt: new Date()}
  :note)
    );
  }
  
    return(
      <NoteContext.Provider
  value={{
    notes,
    createNote,
    editNote,
    deleteNote,
    pinNote,
    archiveNote,
  }}
>
  {children}
</NoteContext.Provider>
    )
}
export function  useNoteContext(){
  const context = useContext(NoteContext)

  if (context === undefined) {
throw new Error("useNoteContext must be used within NoteProvider");
}
return context 
}