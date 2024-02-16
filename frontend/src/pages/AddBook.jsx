import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import userContext from "../context/userContext";
import { Toaster, toast } from "sonner";
import { MdOutlineBookmarkAdd } from "react-icons/md";

export default function AddBook() {
  const { userConnected } = useContext(userContext);
  const [titleBook, setTitleBook] = useState("");
  const [autorBook, setAutorBook] = useState("");
  const [dateBook, setDateBook] = useState("");
  const [pageBook, setPageBook] = useState("");
  const [languageBook, setLanguageBook] = useState("");
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
      data.append("langue", languageBook);
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
      if (res.status === 201) {
        toast.success("Nouveau livre ajouté à la bibliothèque", {
          position: "top-center",
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));

        navigate("/library");
      } else {
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <NavBar />
      <Toaster />
      <div className="background">
        <div className="header-title">
          <h1>
            My Little <span style={{ color: "#719a6b" }}>Library</span>
          </h1>
        </div>

        <div className="form-book">
          <div className="book-wrapper">
            <form onSubmit={handleSubmit} className="uploadbook">
              <p>Titre du livre </p>
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
              <p>Date de sortie </p>
              <input
                type="date"
                className="date"
                onChange={(event) => setDateBook(event.target.value)}
              />
              <p>Langue d'édition </p>
              <input
                type="text"
                className="langue"
                onChange={(event) => setLanguageBook(event.target.value)}
                placeholder="Edition en Français"
              />
              <p>Nombre de pages </p>
              <input
                type="number"
                className="pages"
                onChange={(event) => setPageBook(event.target.value)}
              />
              <p>Catégorie</p>
              <input
                type="text"
                className="cat"
                onChange={(event) => setCategoryBook(event.target.value)}
                placeholder="Fantastique, Thriller ..."
              />
              <p>Description </p>
              <textarea
                type="text"
                className="desc"
                onChange={(event) => setDescriptionBook(event.target.value)}
              />

              <div className="img-container">
                <img src="images/img.png" alt="img-upload" />
                <input
                  name="filename"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  accept="image/*"
                  id="file"
                  className="input-file"
                />
              </div>
              <div className="onread">
                <p>Livre lu </p>
                <label className="container">
                  <input
                    type="checkbox"
                    className="lu"
                    checked={statutBook === "Lu"}
                    onChange={handleReadChange}
                  />
                  <div className="checkmark"></div>
                </label>

                <p>Livre du moment</p>
                <label className="container">
                  <input
                    type="checkbox"
                    className="encours"
                    checked={statutBook === "En cours"}
                    onChange={handleInReadChange}
                  />
                  <div className="checkmark"></div>
                </label>

                <p>Livre à lire</p>
                <label className="container">
                  <input
                    type="checkbox"
                    className="alire"
                    checked={statutBook === "Non lu"}
                    onChange={handleToReadChange}
                  />
                  <div className="checkmark"></div>
                </label>
              </div>

              <div className="btn-add">
                <button type="submit" className="upload">
                  <MdOutlineBookmarkAdd
                    size={20}
                    style={{ marginRight: "10px" }}
                  />{" "}
                  Ajouter à la collection
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
