import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import userContext from "../context/userContext";

export default function Login() {
  const navigate = useNavigate();
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { setUserConnected } = useContext(userContext);
  

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleConnexion = async (e) => {
    e.preventDefault();
    const userLogin = {
      pseudo: inputPseudo,
      password: inputPassword,
    };
    try {
      const dataUser = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
        userLogin
      );

      setUserConnected(dataUser.data);
      navigate("/library");
    } catch (error) {
      alert("identifiants incorrect, veuillez réessayer");
    }
  };

  return (
    <>
      <div className="header">
        <h1>
          My Little <span style={{ color: "#719a6b" }}>Library</span>
        </h1>

        <div className="catching-title">
          <h2>
            Read <span style={{ color: "#719a6b" }}>books,</span><br></br>
            Love <span style={{ color: "#719a6b" }}>books.</span>
          </h2>
        </div>
        <div className="presentation-text">
          <h3>Gérez votre collection et ajoutez de nouveaux livres !</h3>
        </div>
      </div>

      <div className="container-login">
        <div className="login-wrapper">
          <h1>Connectez-vous</h1>
          <p>
            Vous n'avez pas encore de compte sur My Little Library ?<br></br>
            <NavLink to="/signin">Inscription</NavLink>
          </p>
          <form onSubmit={handleConnexion} className="form-login">
            <p>Pseudo</p>
            <input
              type="text"
              className="name"
              onClick={handleInputClick}
              onChange={(event) => setInputPseudo(event.target.value)}
            />
            <div className="mdp-container">
              <p>Mot de passe</p>
              <input
                type="password"
                className="password"
                onClick={handleInputClick}
                onChange={(event) => setInputPassword(event.target.value)}
              />
            </div>
            <div className="container-button">
              <button type="submit" className="btn-inscription">
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
