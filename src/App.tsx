import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { NoteProvider } from "./context/NoteContext";

import Theme from "./components/Theme";
import CreateNote from "./components/CreateNote";
import NoteList from "./components/NotesList";




function AppContent() {
  const { theme } = useThemeContext();

  return (
   
  <div
    className={`min-h-screen w-full px-4 py-6 transition-colors duration-300 sm:px-8 ${
      theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-gray-900"
    }`}
  >
    <header className="mx-auto mb-8 flex max-w-6xl items-center justify-between">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        My Note
      </h1>

      <Theme />
    </header>

    <main className="mx-auto max-w-6xl">
      <CreateNote />
      <NoteList />
    </main>
  </div>
);
  
}

function App() {
 
  return (
  <>
  

 
    <ThemeProvider>
      <NoteProvider>
  <AppContent/>
      </NoteProvider>
    </ThemeProvider>
    </>
  );
}

export default App;

