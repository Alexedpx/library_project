import { useContext, useState, useEffect } from "react";

import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import userContext from "../context/userContext";
import NavBar from "../components/NavBar";

export default function HomePage() {
  const { userConnected } = useContext(userContext);
  const [books, setBooks] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const dataBooks = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/books/book-by-user/${
            userConnected.id
          }`
        );
        setBooks(dataBooks.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    getBooks();
  }, [id]);

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (name === "filterName") {
      setFilterName(value);
    } else if (name === "categorie") {
      setSelectedCategorie(value);
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
        <div className="search">
          <input
            type="text"
            name="filterName"
            value={filterName}
            className="search_input"
            placeholder="Rechercher un livre"
            onChange={handleInput}
          />

          <select
            name="categorie"
            value={selectedCategorie}
            onChange={handleInput}
            className="selectcategory"
          >
            <option value="">Catégorie</option>
            <option value="Science-Fiction">Science-Fiction</option>
            <option value="Biographie">Biographie</option>
            <option value="Scolaire">Scolaire</option>
            <option value="Thriller">Thriller</option>
            <option value="Fantastique">Fantastique</option>
          </select>
        </div>

        <div className="container-books">
          <h2>MES LIVRES LUS</h2>
          <div className="livres-lus">
            {books
              .filter((book) => {
                const nameFilter =
                  filterName === "" ||
                  (book.titre?.toLowerCase() || "").includes(
                    filterName.toLowerCase()
                  );
                const categorieFilter =
                  selectedCategorie === "" ||
                  (book.categorie?.toLowerCase() || "") ===
                    selectedCategorie.toLowerCase();

                const isRead = book.lu === 1;

                return nameFilter && categorieFilter && isRead;
              })
              .map((book) => (
                <div key={book.id} className="book-list">
                  <NavLink to={`/book/${book.id}`}>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${book.image}`}
                      alt={book.titre}
                    />
                  </NavLink>
                </div>
              ))}
          </div>
          <h2>MES LIVRES A LIRE</h2>
          <div className="livres-nonlus">
            {books
              .filter((book) => {
                const nameFilter =
                  filterName === "" ||
                  (book.titre?.toLowerCase() || "").includes(
                    filterName.toLowerCase()
                  );
                const categorieFilter =
                  selectedCategorie === "" ||
                  (book.categorie?.toLowerCase() || "") ===
                    selectedCategorie.toLowerCase();

                const isRead = book.lu === 0;

                return nameFilter && categorieFilter && isRead;
              })
              .map((book) => (
                <div key={book.id} className="book-list">
                  <NavLink to={`/book/${book.id}`}>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${book.image}`}
                      alt={book.titre}
                    />
                  </NavLink>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
