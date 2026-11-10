import React, { useState } from "react";
import { useNoteContext } from "../context/NoteContext";
import { useThemeContext } from "../context/ThemeContext";

function CreateNote(){
    
    const {createNote} = useNoteContext();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const {theme} = useThemeContext()
    const handleSave = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
     if(!title.trim() || !content.trim() )   return;      
createNote(title, content);
  setTitle("")
  setContent("")
  setIsOpen(false)
    }
    return(<>
    <div className="flex">
    <button type="button" onClick={()=>{
        setIsOpen(!isOpen)
    }}
  className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-orange-500 px-6 py-4 text-4xl font-bold text-white shadow-lg"
      >+</button>
    {isOpen && (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 p-4">
    <form onSubmit={handleSave}
      className={`fixed 	left-1/2 -translate-x-1/2   rounded-2xl p-20  flex flex-col gap-10 w-full max-w-lg  shadow-xl${
  theme === "dark"
    ? "border-gray-700 bg-gray-700 text-white placeholder-gray-400"
    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
}`}
    >
        
        <input
         className={`w-full rounded-lg border p-3 outline-none ${
    theme === "dark"
      ? " text-white  bg-gray-500"
      : " text-gray-900 "
  }`}
   value={title}  placeholder="Title" onChange={(e)=> setTitle(e.target.value)}/>
        <textarea
        className={`w-full rounded-lg border p-3 outline-none ${
    theme === "dark"
      ? " text-white bg-gray-500"
      : " text-gray-900 "
  }`} 
         value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder="Write your note..."/>
  <button type="submit"
  
  className="rounded-2xl bg-orange-400 px-2 py-4 text-white hover:text-black hover:bg-amber-100" >Save </button>
    </form>
    </div>)}
    </div>
    </>)
}
export default CreateNote