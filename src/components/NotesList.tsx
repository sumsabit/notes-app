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
                  <button
  type="button"
  onClick={() => pinNote(note.id)}
  title={note.isPinned ? "Unpin note" : "Pin note"}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={note.isPinned ? "yellow" : "none"}
   stroke={note.isPinned ? "orange" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
</button>
                     
                  
                      <button onClick={()=> archiveNote(note.id)}>
                        {note.isArchived ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
                          strokeLinejoin="round" className="lucide lucide-package-open preview-icon">
                            <path d="M12 22v-9"/>
                            <path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"/><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"/>
                           <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"/></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                              stroke-linejoin="round" className="lucide lucide-package preview-icon">
                              <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/></svg>
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