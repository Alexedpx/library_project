import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { Toaster, toast } from "sonner";
import { MdOutlineSaveAlt } from "react-icons/md";
import NavBar from "../components/NavBar";

export default function BookById() {
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState({});
  const [deleteBook, setDeleteBook] = useState([]);
  const { userConnected } = useContext(userContext);
  const [userFavorite, setUserFavorite] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const param = useParams();
  const [isEditing, setIsEditing] = useState(false);
  // const [hasBookInRead, setHasBookInRead] = useState(false);
  const [pagesLues, setPagesLues] = useState(bookDetails.pageLue);
  const { id } = useParams();

  const [bookUpdate, setBookUpdate] = useState({
    commentaire: bookDetails.commentaire,
    statut: bookDetails.statut,
    pageLue: bookDetails.pageLue !== undefined ? bookDetails.pageLue : 0,
  });

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      setBookUpdate((prevBookUpdate) => ({
        ...prevBookUpdate,
        commentaire: bookDetails.commentaire,
        statut: bookDetails.statut,
        pageLue: bookDetails.pageLue !== undefined ? bookDetails.pageLue : 0,
      }));
    }
  };

  // GESTION DES LIVRES FAVORIS PAR ID DE L'UTILISATEUR
  // VERIFIE SI LE LIVRE EST DEJA EN FAVORIS

  const favoriteUser = async () => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        const favorite = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/favoris/${
            userConnected.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserFavorite(favorite.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    favoriteUser();
  }, []);

  useEffect(() => {
    if (userFavorite.length > 0) {
      const resultat = userFavorite.find(
        (book) => book.bookId.toString() === param.id
      );
      if (resultat) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [userFavorite]);

  // SUPPRIME UN FAVORIS

  const handleFavoriteClick = async (bookIdSelected) => {
    console.log("Book ID Selected:", bookIdSelected);
    const user = JSON.parse(localStorage.getItem("token"));
    if (isFavorite) {
      try {
        const userId = userConnected.id;
        await axios.delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/favoris/${userId}/${bookIdSelected}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Livre supprimé des favoris", { position: "top-center" });
      } catch (error) {
        console.error(error);
      }

      // AJOUTE UN FAVORIS
    } else {
      const NewFavorite = {
        bookId: bookIdSelected,
        userId: userConnected.id,
      };
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/favoris`,
          NewFavorite,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Livre ajouté aux favoris", { position: "top-center" });
      } catch (error) {
        console.error(`Error adding to favorites:`, error);
      }
    }
    favoriteUser();
  };

  // SUPRESSION D'UN LIVRE DE LA BIBLIOTHEQUE

  const handleDeleteBook = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/books/${bookDetails.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("Livre supprimé de la bibliothèque", {
        position: "top-center",
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setBookDetails({});
      setDeleteBook(bookDetails.id);
      navigate("/library");
    } catch (err) {
      console.error(err);
    }
  };

  // AFFICHE DES LIVRES PAR ID

  useEffect(() => {
    const getBookDetails = async () => {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        const book = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setBookDetails(book.data[0]);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    getBookDetails();
  }, [id]);

  // MODIFICATIONS DES DONNEES D'UN LIVRE (commentaire, statut, page lues ...)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const updatedBookData = {
        commentaire: bookUpdate.commentaire,
        statut:
          bookUpdate.statut !== null && bookUpdate.statut !== undefined
            ? bookUpdate.statut
            : bookDetails.statut,
        pageLue: bookUpdate.pageLue, // Ne pas réinitialiser ici
      };

      const updatedBook = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`,
        updatedBookData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setBookDetails((prevBookDetails) => ({
        ...prevBookDetails,
        commentaire: bookUpdate.commentaire,
        statut: bookUpdate.statut,
        pageLue: bookUpdate.pageLue,
      }));

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


  // TOAST LIVRE A LIRE

  const handleInReadClick = () => {
    setBookUpdate((prevBookUpdate) => ({
      ...prevBookUpdate,
      statut: "En cours",
    }));

    toast.success("Nouvelle lecture en cours", { position: "top-center" });
  };

  // TOAST LIVRE LU

  const handleIsReadClick = () => {
    setBookUpdate((prevBookUpdate) => ({
      ...prevBookUpdate,
      statut: "Lu",
    }));

    toast.success("Bien joué ! Vous avez terminé un livre.", {
      position: "top-center",
    });
  };

  return (
    <>
      <NavBar />
      <Toaster />
      <div className="background1">
        <div className="header-title">
          <h1>
            My Little <span style={{ color: "#719a6b" }}>Library</span>
          </h1>
        </div>

        <div className="form">
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
                          {userFavorite && (
                            <img
                              onClick={() => handleFavoriteClick(param.id)}
                              role="presentation"
                              className="favorite"
                              src={
                                isFavorite
                                  ? "/images/heartfavorite.png"
                                  : "/images//heartnotfavorite.png"
                              }
                              alt=""
                            />
                          )}
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
                      <h3>{bookDetails.langue}</h3>

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
                          <span style={{ fontWeight: "bold" }}>
                            Commentaire personnel
                          </span>{" "}
                          : {bookDetails.commentaire}
                        </p>
                      </div>
                      {bookDetails.statut === "En cours" && (
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Progression{" "}
                          </span>{" "}
                          : {bookDetails.pageLue} sur {bookDetails.nombre_pages}{" "}
                          pages
                          <div className="progress">
                            <progress
                              value={bookDetails.pageLue}
                              max={bookDetails.nombre_pages}
                            ></progress>
                          </div>
                        </p>
                      )}
                      {bookDetails.statut === "Lu" && (
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Progression{" "}
                          </span>{" "}
                          : Livre terminé !
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <form id="form" className="edit-book" onSubmit={handleSubmit}>
                    {isEditing && bookDetails.statut === "En cours" && (
                      <div className="isread">
                        <div className="check">
                          <p>Marquer comme lu ?</p>
                          <label className="container">
                            <input
                              type="checkbox"
                              onClick={() => handleIsReadClick()}
                            />
                            <div className="checkmark"></div>
                          </label>
                        </div>
                      </div>
                    )}

                    {isEditing && bookDetails.statut === "Non lu" && (
                      <div className="isread">
                        <div className="check">
                          <p>En cours de lecture ?</p>
                          <label className="container">
                            <input
                              type="checkbox"
                              onClick={() => handleInReadClick()}
                            />
                            <div className="checkmark"></div>
                          </label>
                        </div>
                      </div>
                    )}
                    <div className="header-details">
                      <h1>{bookDetails.titre}</h1>
                      <h2>{bookDetails.auteur}</h2>
                      <h3>{bookDetails.langue}</h3>
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
                          <span style={{ fontWeight: "bold" }}>
                            Commentaire personnel
                          </span>{" "}
                          :{" "}
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
                      {isEditing && bookDetails.statut === "En cours" && (
                        <div className="range">
                          <p>
                            <span style={{ fontWeight: "bold" }}>
                              Progression
                            </span>{" "}
                            :{" "}
                            <input
                              type="number"
                              name="pagesLues"
                              value={bookUpdate.pageLue}
                              max={bookDetails.nombre_pages}
                              onChange={(e) =>
                                setBookUpdate({
                                  ...bookUpdate,
                                  pageLue: parseInt(e.target.value),
                                })
                              }
                            />{" "}
                            sur {bookDetails.nombre_pages} pages
                          </p>
                        </div>
                      )}

                      <div className="save-btn">
                        <button type="submit" className="save">
                          <MdOutlineSaveAlt
                            size={22}
                            style={{ marginRight: "10px" }}
                          />{" "}
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
      </div>
    </>
  );
}
