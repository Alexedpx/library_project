import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import userContext from "../context/userContext";
import NavBar from "../components/NavBar";

export default function FavoriteBook() {
  const { userConnected } = useContext(userContext);
  const [userFavorite, setUserFavorite] = useState([]);

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
      <div className="background">
        <div className="header-title">
          <h1>
            My Little <span style={{ color: "#719a6b" }}>Library</span>
          </h1>
        </div>
        <div className="display-favorite">
          <div className="livre-favoris">
            {userFavorite.map((book) => (
              <div className="book-list" key={book.bookId}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${book.image}`}
                  alt={book.titre}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
