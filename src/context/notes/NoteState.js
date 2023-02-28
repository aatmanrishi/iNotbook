import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all Notes
  const getNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "YOUR_AUTH_TOKEN_HERE",
        },
      });
      const json = await response.json();
      setNotes(json);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "YOUR_AUTH_TOKEN_HERE",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
      setNotes(notes.concat(note));
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    setIsLoading(true);
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "YOUR_AUTH_TOKEN_HERE",
        },
      });
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    setIsLoading(true);
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "YOUR_AUTH_TOKEN_HERE",
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const newNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });
      setNotes(newNotes);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, isLoading, error }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
