import { createContext, useContext, useEffect, useState } from "react";
interface ThemeContextType {
theme: "light" | "dark";
toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function ThemeProvider({children}: {children: React.ReactNode;}){
const [theme, setTheme] = useState<"light" | "dark">(()=>{
const savedTheme = localStorage.getItem("theme")
if(savedTheme === "light" || savedTheme === "dark"){
    return savedTheme
}
return "light"
});

const toggleTheme = () => {
setTheme((prev) => (prev === "light" ? "dark" : "light"));
};
useEffect(()=>{
    localStorage.setItem("theme", theme)
}, [theme])
return (
<ThemeContext.Provider value={{ theme, toggleTheme }}>
{children}
</ThemeContext.Provider>
);
}
export function useThemeContext() {
const context = useContext(ThemeContext);

if (context === undefined) {
throw new Error("useThemeContext must be used within ThemeProvider");
}

return context;
}