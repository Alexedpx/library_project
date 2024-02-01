import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function AddBook() {
  const [titleBook, setTitleBook] = useState("");
  const [autorBook, setAutorBook] = useState("");
  const [dateBook, setDateBook] = useState("");
  const [pageBook, setPageBook] = useState("");
  const [categoryBook, setCategoryBook] = useState("");
  const [descriptionBook, setDescriptionBook] = useState("");
  const [isRead, setIsRead] = useState(true);
  const [isToRead, setIsToRead] = useState(false);
  const [file, setFile] = useState(undefined);
  const navigate = useNavigate();

  const handleReadChange = () => {
    setIsRead(!isRead);
    setIsToRead(false);
  };

  const handleToReadChange = () => {
    setIsToRead(!isToRead);
    setIsRead(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData();
      data.append("image", file);
      data.append("titre", titleBook);
      data.append("auteur", autorBook);
      data.append("nombre_pages", pageBook);
      data.append("date", dateBook);
      data.append("categorie", categoryBook);
      data.append("description", descriptionBook);
      data.append("lu", isRead ? "1" : "0");
      data.append("a_lire", isToRead ? "1" : "0");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/books/addbook`,
        data
      );
      navigate("/library");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="background">
        <div className="header-title">
          <h1>
            My Little <span style={{ color: "#719a6b" }}>Library</span>
          </h1>
        </div>

        <div className="form-book">
          <div className="book-wrapper">
            <form onSubmit={handleSubmit} className="uploadbook">
              <p>Titre </p>
              <input
                type="text"
                className="titre"
                onChange={(event) => setTitleBook(event.target.value)}
              />
              <p>Auteur </p>
              <input
                type="text"
                className="auteur"
                onChange={(event) => setAutorBook(event.target.value)}
              />
              <p>Date </p>
              <input
                type="date"
                className="date"
                onChange={(event) => setDateBook(event.target.value)}
              />
              <p>Nombre de pages </p>
              <input
                type="text"
                className="pages"
                onChange={(event) => setPageBook(event.target.value)}
              />
              <p>Catégorie </p>
              <input
                type="text"
                className="cat"
                onChange={(event) => setCategoryBook(event.target.value)}
              />
              <p>Description </p>
              <textarea
                type="text"
                className="desc"
                onChange={(event) => setDescriptionBook(event.target.value)}
              />
              <input
                name="image"
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept="image/*"
              />

              <div className="onread">
                <p>Livre lu </p>
                <input
                  type="checkbox"
                  className="lu"
                  checked={isRead}
                  onChange={handleReadChange}
                />
                <p>Livre à lire</p>
                <input
                  type="checkbox"
                  className="alire"
                  checked={isToRead}
                  onChange={handleToReadChange}
                />
              </div>

              <div className="btn-add">
                <button type="submit" className="upload">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
