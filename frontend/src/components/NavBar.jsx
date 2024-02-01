import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/userContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { userConnected, setUserConnected } = useContext(userContext);

  const handlelogout = () => {
    setUserConnected(false);
    navigate("/");
  };

  return (
    <div className="container-navbar">
      <div className="login-container">
        {userConnected.avatar && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${userConnected.avatar}`}
            alt="avataruser"
            role="presentation"
          />
        )}
        <div className="user-profile">
          <p>{userConnected.pseudo}</p>
          <div className="logout-button">
            <button type="submit" className="logout" onClick={handlelogout}>
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
      <div className="navlink">
        <div className="accueil-container">
          <img src=" /images/book.png" alt="book" />
          <NavLink to="/library">
            <h1>MA BIBLIOTHEQUE</h1>
          </NavLink>
        </div>
        <div className="accueil-container">
          <img src=" /images/add.png" alt="add" />
          <NavLink to="/addbook">
            <h1>AJOUTER UN LIVRE</h1>
          </NavLink>
        </div>
        <div className="accueil-container">
          <img src=" /images/Avatar.png" alt="avatar" />
          <NavLink to="/profil">
            <h1>MON PROFIL</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
