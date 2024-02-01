import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

export default function BookById() {
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({});
  const [deleteBook, setDeleteBook] = useState([]);
  const [bookUpdate, setBookUpdate] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDeleteBook = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/books/${bookDetails.id}`
      );

      setBookDetails({});
      setDeleteBook(bookDetails.id);

      navigate("/library");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const book = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`
        );
        setBookDetails(book.data[0]);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    getBookDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBookDetails({
        ...bookDetails,
        commentaire: bookUpdate.commentaire,
        lu: bookUpdate.lu,
      });

      const updatedBook = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`,
        bookUpdate
      );

      setIsEditing(false);
    } catch (err) {
      console.error("edit book error:", err);
    }
  };

  const formatLocalDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("fr-FR", options);
  };

  return (
    <>
      <NavBar />
      <div className="background">
        <div className="header-title">
          <h1>
            My Little <span style={{ color: "#719a6b" }}>Library</span>
          </h1>
        </div>

        {bookDetails && (
          <div className="info-container">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${bookDetails.image}`}
              alt="img-book"
            />
            <div className="book-information">
              {!isEditing ? (
                <>
                  <div className="header-details">
                    <div className="icon-action">
                      <h1>{bookDetails.titre}</h1>
                      <div className="icon-info">
                        <img
                          src="/images/Edit.png"
                          alt="edit"
                          className="edit"
                          onClick={handleEdit}
                          role="presentation"
                        />

                        <img
                          src="/images/delete.png"
                          alt="delete"
                          className="delete"
                          onClick={() => handleDeleteBook(deleteBook.id)}
                          role="presentation"
                        />
                      </div>
                    </div>

                    <h2>{bookDetails.auteur}</h2>
                    <p>
                      {formatLocalDate(bookDetails.date)} -{" "}
                      {bookDetails.nombre_pages} pages
                    </p>
                  </div>
                  <div className="description-book">
                    <p>{bookDetails.description}</p>
                  </div>
                  <div className="category-note">
                    <p>
                      <span style={{ fontWeight: "bold" }}>Catégorie</span> :{" "}
                      {bookDetails.categorie}
                    </p>
                    <div className="information-book">
                      <p>
                        <span style={{ fontWeight: "bold" }}>Note</span> :{" "}
                        {bookDetails.commentaire}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <form id="form" className="edit-book" onSubmit={handleSubmit}>
            

                  <div className="header-details">
                    <h1>{bookDetails.titre}</h1>
                    <h2>{bookDetails.auteur}</h2>
                    <p>
                      {formatLocalDate(bookDetails.date)} -{" "}
                      {bookDetails.nombre_pages} pages
                    </p>
                  </div>
                  <div className="description-book">
                    <p>{bookDetails.description}</p>
                  </div>
                  <div className="category-note">
                    <p>
                      <span style={{ fontWeight: "bold" }}>Catégorie</span> :{" "}
                      {bookDetails.categorie}
                    </p>
                    <div className="information-book">
                      <p>
                        <span style={{ fontWeight: "bold" }}>Note</span> :{" "}
                        <input
                          type="text"
                          value={bookUpdate.commentaire}
                          onChange={(event) =>
                            setBookUpdate({
                              ...bookUpdate,
                              commentaire: event.target.value,
                            })
                          }
                        />
                      </p>
                    </div>
                    <div className="save-btn">
                      <button type="submit" className="save">
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </form>
              )}
              <div className="btn-return">
                <NavLink to="/library">
                  <button type="button" className="return">
                    Retourner à ma bibliothèque
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
