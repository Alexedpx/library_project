import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import userContext from "../context/userContext";
import NavBar from "../components/NavBar";

export default function FavoriteBook() {
  const { userConnected } = useContext(userContext);
  const [userFavorite, setUserFavorite] = useState([]);

  // AFFICHAGE DES FAVORIS DE L'UTILISATEUR CONNECTE

  const favoriteUser = async () => {
    if (userConnected) {
      const user = JSON.parse(localStorage.getItem("token"));
      try {
        const favorite = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/favoris/books/${
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

  return (
    <>
      <NavBar />
      <div className="background1">
        <div className="header-title">
          <h1>
            My Little <span style={{ color: "#719a6b" }}>Library</span>
          </h1>
        </div>

        <div className="livre-favoris">
          {userFavorite.map((book) => (
            <div className="book-fav" key={book.bookId}>
              <div className="img-container">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
                  alt={book.titre}
                />
                <div className="displayinfo">
                  <h1>{book.titre}</h1>
                  <h2>{book.auteur}</h2>
                  <h3>{book.categorie}</h3>
                </div>
                <div className="btn-details">
                  <NavLink to={`/book/${book.bookId}`}>
                    <button className="details" type="button">
                      Voir les détails du livre
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}