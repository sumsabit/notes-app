# Notes App

A simple and responsive Notes App built with React, TypeScript, and Tailwind CSS. It allows users to create, edit, delete, search, pin, and archive notes.

## Features

- Create notes with a title and content.
- Edit existing notes.
- Delete notes.
- Pin important notes.
- Archive notes.
- Search notes by title or content.
- Filter notes by All, Pinned, and Archived.
- Sort pinned notes first and show recently updated notes.
- Switch between light and dark themes.
- Save notes using browser local storage.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- React Context API
- Local Storage

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sumsabit/notes-app
```

### 2. Navigate to the project folder

```bash
cd notes-app
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Start the development server

```bash
pnpm dev
```

Open the local URL displayed in your terminal to use the application.

## Project Structure

```text
src/
├── components/
│   ├── CreateNote.tsx
│   ├── NotesList.tsx
│   └── Theme.tsx
├── context/
│   ├── NoteContext.tsx
│   └── ThemeContext.tsx
├── App.tsx
└── main.tsx
```

## Author

**Sumeya Sabit**

GitHub: sumsabit
