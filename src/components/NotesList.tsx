import { useState } from "react";
import { useNoteContext } from "../context/NoteContext";
import type { Note } from "../context/NoteContext";
import { useThemeContext } from "../context/ThemeContext";
function NoteList(){
    const {theme} = useThemeContext()
   const [editingNote, setEditingNote] = useState<Note | null>(null);
    const {notes, pinNote, archiveNote, deleteNote, editNote} = useNoteContext()
    const [searchQuery, setSearchQuery] = useState("");
   
   type View = "All" | "Pinned" |"Archived"
   const [activeView, setActiveView] = useState<View>("All")
     let emptyMessage: string;
     if(activeView === "All"){
emptyMessage ="No note created yet ";
     }
     else if(activeView === "Pinned"){
        emptyMessage = "No pinned note yet";
     }
     else{
     emptyMessage = "No archived note yet"
     }
    
   const filteredNotes = notes.filter((note)=>{
  

      if(activeView === "All"){
        
         return  !note.isArchived
     }
     if(activeView === "Pinned"){

return  note.isPinned && !note.isArchived
     }
     if(activeView === "Archived"){
   
return note.isArchived
     }
     return false;
   }
   
)
 const searchedNotes = filteredNotes.filter((note)=>{
    const query = searchQuery.trim().toLowerCase()
    return (
        note.title.toLowerCase().includes(query) ||
         note.content.toLowerCase().includes(query)

    )

    })
     let displayMessage = emptyMessage;

if (searchQuery.trim() && searchedNotes.length === 0) {
  displayMessage = "No matching notes found.";
}
const AllCount = notes.filter((note)=>!note.isArchived).length;
const pinnedCount = notes.filter((note)=>note.isPinned && !note.isArchived).length;
const ArchivedCount = notes.filter((note)=>note.isArchived).length;
const sortedNotes = [...searchedNotes].sort((a, b) => {
    if(a.isPinned !== b.isPinned){
 return Number(b.isPinned) - Number(a.isPinned)
    }
    else{
     return    b.updatedAt.getTime() - a.updatedAt.getTime()
    }
            
         });
         return(
    
        <div>
          <div className="flex justify-between">
            <div className="relative mb-6">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
viewBox="0 0 24 24" fill="none" stroke="currentColor"
 stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  className="absolute  left-3 top-1/2 -translate-y-1/2 text-gray-400 lucide lucide-search preview-icon">
<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
            <input
  type="search"
  placeholder="Search notes..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
 
    className={`rounded-lg border py-2 pl-10  outline-none  border-gray-600 placeholder-gray-400 ${
    theme === "dark"
      ?" text-gray-900  "
    : " text-white "
      
  }`}
  
/>
</div>
                  <div className="flex gap-6">
                   <button onClick={()=>setActiveView("All")}>All({AllCount})</button>
                   <button onClick={()=>setActiveView("Pinned")}>pinned({pinnedCount}) </button>
                   <button onClick={()=>setActiveView("Archived")}>Archived({ArchivedCount})</button>
                   </div>
               </div>   
            {searchedNotes.length === 0 ? 
            ( <div className="flex min-h-[60vh] w-full items-center justify-center">
    <p className="text-center text-3xl font-extrabold">
      {displayMessage}
    </p>
  </div>):(
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
           
            {sortedNotes.map((note, index)=>(
                 <div  key ={ note.id} 
                  className={`relative min-h-48 rounded-2xl p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : [
              "bg-amber-100 text-gray-900",
              "bg-pink-100 text-gray-900",
              "bg-blue-100 text-gray-900",
              "bg-green-100 text-gray-900",
            ][index % 4]
      }`}>
        
                    
                    {editingNote?.id === note.id ? (
    <div  className="relative min-h-48 rounded-2xl p-5">
        
        <input
         className={`flex flex-col gap-2 w-full rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
  theme === "dark"
    ? " text-white "
    : " text-gray-900 "
}`}
          
            value={editingNote.title}
           onChange={(e) => {
  const newTitle = e.target.value;

  setEditingNote({
    ...editingNote,
    title: newTitle,
  });

 
}}
            placeholder="Title"
            
        />

        <textarea
        
            value={editingNote.content}
            onChange={(e) =>{
             const newContent = e.target.value
             setEditingNote({
                ...editingNote,
                content: newContent,
             })
           
            }
                      }
                         className={`flex flex-col gap-2 w-full resize-y rounded-lg border border-gray-300 p-3 text-gray-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
  theme === "dark"
    ? " text-white "
    : " text-gray-900 "
}`}
    
            placeholder="Write your note..."
        />
        
        <span className="flex gap-6 mt-2">
<button
  onClick={() => {
    editNote(
      editingNote.id,
      editingNote.title,
      editingNote.content
    );

    setEditingNote(null);
  }}
  className={`rounded-lg ml-8 bg-gray-100 px-2  text-gray-800 hover:bg-gray-300${
  theme === "dark"
    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
}`}
   
>
  Save Edited
</button>
<button
  onClick={() => setEditingNote(null)}
   className={`rounded-lg   bg-gray-100 px-2  text-gray-800 hover:bg-gray-300${
  theme === "dark"
    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
}`}
  
>
  Cancel
</button>
</span>
    
    </div>
) : (
    <div
        onClick={() => setEditingNote({ ...note })}
        className="cursor-pointer rounded-lg p-4"
    >
        <h2  className="mb-3 text-lg font-bold">{note.title}</h2>
        <p className="whitespace-pre-wrap  text-sm leading-6 opacity-80">{note.content}</p>
    </div>
)}
{editingNote?.id !== note.id && (
<div className="absolute right-3 top-3 flex gap-2">
                    <button onClick={()=>pinNote(note.id)}>
                      
                        
                        {note.isPinned ? ( 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" 
                     height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                      strokeLinejoin="round" className="lucide lucide-bookmark-off
                       preview-icon">
                    <path d="M19 19v1a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5"/><path d="m2 2 20 20"/>
                     <path d="M8.656 3H17a2 2 0 0 1 2 2v8.344"/></svg>
                        ): (
                        <svg xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                          strokeLinejoin="round" className="lucide lucide-bookmark
                           preview-icon">
                         <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/></svg>
                    )}

                    </button>
                     
                    <button onClick={()=>deleteNote(note.id)}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" 
                        strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-trash preview-icon">
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                            <path d="M3 6h18"/>
                       <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                      <button onClick={()=> archiveNote(note.id)}>
                        {note.isArchived ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                            stroke-linejoin="round" className="lucide lucide-archive-x preview-icon">
                                <rect width="20" height="5" x="2" y="3" rx="1"/>
                                <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="m9.5 17 5-5"/><path d="m9.5 12 5 5"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" className="lucide lucide-archive preview-icon">
                                <rect width="20" height="5" x="2" y="3" rx="1"/>
                            <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
                        )}
                    </button>
                    </div>
)}
                 </div>
            ))}
            
          </div>
          )}
        </div>
        
    )

}
export default NoteList