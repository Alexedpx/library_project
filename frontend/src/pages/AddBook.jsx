import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import userContext from "../context/userContext";

export default function AddBook() {
  const { userConnected } = useContext(userContext);
  const [titleBook, setTitleBook] = useState("");
  const [autorBook, setAutorBook] = useState("");
  const [dateBook, setDateBook] = useState("");
  const [pageBook, setPageBook] = useState("");
  const [categoryBook, setCategoryBook] = useState("");
  const [descriptionBook, setDescriptionBook] = useState("");
  const [statutBook, setStatutBook] = useState("");
  const [file, setFile] = useState(undefined);
  const navigate = useNavigate();

  const handleReadChange = () => {
    setStatutBook("Lu");
  };

  const handleInReadChange = () => {
    setStatutBook("En cours");
  };


  const handleToReadChange = () => {
    setStatutBook("Non lu");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const data = new FormData();
      data.append("image", file);
      data.append("titre", titleBook);
      data.append("auteur", autorBook);
      data.append("nombre_pages", pageBook);
      data.append("date", dateBook);
      data.append("categorie", categoryBook);
      data.append("description", descriptionBook);
      data.append("statut", statutBook);
      data.append("userId", userConnected.id);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/books/addbook`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
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
                  onChange={handleReadChange}
                />

                <p>En cours</p>
                <input
                  type="checkbox"
                  className="encours"
                  onChange={handleInReadChange}
                />
                <p>Livre à lire</p>
                <input
                  type="checkbox"
                  className="alire"
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
