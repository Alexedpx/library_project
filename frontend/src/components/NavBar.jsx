import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { slide as Menu } from "react-burger-menu";
import userContext from "../context/userContext";
import { MdOutlineLogout } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

export default function Navbar() {
  const navigate = useNavigate();
  const { userConnected, setUserConnected } = useContext(userContext);

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  const handlelogout = () => {
    removeToken();
    setUserConnected(null);
    navigate("/");
  };

  

  return (
    <>
      <div className="container-navbar">
        <img src="/images/burger.png" alt="burger" className="burger" />
        <div className="burger-menu">
          <Menu right width="300px">
            <div className="login">
              <div className="profil">
             
              {userConnected?.avatar && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      userConnected.avatar
                    }`}
                    className="avatar"
                    alt="avataruser"
                    role="presentation"
                  />
                )}
              

                <div className="info">
                {userConnected?.pseudo && (
                    <p>{userConnected.pseudo}</p>
                  )}
                  <div className="logout-button">
                    <button
                      type="submit"
                      className="logout"
                      onClick={handlelogout}
                    >
                      <MdOutlineLogout size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <NavLink to="/library">
              <div className="icon">
                <IoBookOutline size={22} style={{ marginRight: "20px" }} />
                MA BIBLIOTHEQUE
              </div>
            </NavLink>
            <NavLink to="/addbook">
              <div className="icon">
                <MdOutlineBookmarkAdd
                  size={22}
                  style={{ marginRight: "20px" }}
                />
                AJOUTER UN LIVRE
              </div>
            </NavLink>
            <NavLink to="/favoritebook">
              <div className="icon">
                <FaRegHeart size={22} style={{ marginRight: "20px" }} />
                MES FAVORIS
              </div>
            </NavLink>
            {userConnected?.pseudo &&  (
              <NavLink to="/profil">
                <div className="icon">
                  <RxAvatar size={21} style={{ marginRight: "20px" }} />
                  MON PROFIL
                </div>
              </NavLink>
            )}
          </Menu>
        </div>

        <div className="login-container">
          {userConnected && userConnected.avatar && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${userConnected.avatar}`}
              alt="avataruser"
              role="presentation"
            />
          )}
          <div className="user-profile">
            {userConnected && userConnected.pseudo && (
              <p>{userConnected.pseudo}</p>
            )}
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
            <MdOutlineBookmarkAdd />
            <NavLink to="/addbook">
              <h1>AJOUTER UN LIVRE</h1>
            </NavLink>
          </div>
          <div className="accueil-container">
            <img src=" /images/favorite.png" alt="avatar" />
            <NavLink to="/favoritebook">
              <h1>MES FAVORIS</h1>
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
    </>
  );
}
