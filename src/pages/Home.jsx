import { useState, useEffect } from "react";
import api from "../apis";
import Note from "../components/Note";
import NavBar from "./NavBar"
import '../styles/Home.css'
export default function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState("");
    console.log(notes)
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((response) => response.data)
      .then((data) => {
        setNotes(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((response) => {
        if (response.status === 204) {
          alert("Note Deleted Sucessfully");
        } else {
          alert("Error Deleting Note");
        }
      })
      .catch((error) => alert(error));
    getNotes();
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((response) => {
        if (response.status === 201) alert("Note Created Successfully");
        else alert("Error Creating Note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <NavBar />
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
      </div>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          type="text"
          id="content"
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
