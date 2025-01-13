import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const handleButtonClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="home-container">
  <div className="action-card">
    <h2>Welcome to Your Home Page</h2>
    {/* <p>Access your profile or log out as required.</p> */}
    <div className="button-container">
      <button className="button button-primary" onClick={handleButtonClick}>
        View Profile
      </button>
      <button className="button button-secondary" onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  </div>
</div>

  );
}

export default Home;

  {/* <div className="notes-section">
        <h2>Your Notes</h2>
        {notes.length === 0 ? (
          <p>No notes available. Create one!</p>
        ) : (
          notes.map((note) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />
          ))
        )}
      </div>

      <div className="create-note-section">
        <h2>Create a New Note</h2>
        <form onSubmit={createNote}>
          <div className="input-container">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="input-container">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="button button-primary">
            Save Note
          </button>
        </form>
      </div> */}

// <div>
    //     <div>
    //         <h2>Notes</h2>
    //         {notes.map((note) => (
    //             <Note note={note} onDelete={deleteNote} key={note.id} />
    //         ))}
    //     </div>
    //     <h2>Create a Note</h2>
    //     <form onSubmit={createNote}>
    //         <label htmlFor="title">Title:</label>
    //         <br />
    //         <input
    //             type="text"
    //             id="title"
    //             name="title"
    //             required
    //             onChange={(e) => setTitle(e.target.value)}
    //             value={title}
    //         />
    //         <label htmlFor="content">Content:</label>
    //         <br />
    //         <textarea
    //             id="content"
    //             name="content"
    //             required
    //             value={content}
    //             onChange={(e) => setContent(e.target.value)}
    //         ></textarea>
    //         <br />
    //         <input type="submit" value="Submit"></input>
    //     </form>
    // </div>