import { useNoteContext } from "../context/NoteContext";

function Note() {
  const { notes } = useNoteContext();

  return (
    <div >
      <h2>My Notes</h2>

      {notes.length === 0 ? (
        <p >
          No notes have been created yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Note;