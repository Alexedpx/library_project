import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import userContext from "../context/userContext";
import { Toaster, toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { setUserConnected } = useContext(userContext);

  const handleInputClick = (e) => {
    e.stopPropagation();
  };
  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleConnexion = async (e) => {
    e.preventDefault();
    const userLogin = {
      pseudo: inputPseudo,
      password: inputPassword,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
        userLogin
      );

      setUserConnected(res.data);
      const userLocal = {
        ...res.data.user,
        token: res.data.token,
      };
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...userLocal,
        })
      );
      navigate("/library");
    } catch (error) {
      toast.error("Identifiants incorrects, veuillez réessayer", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="header">
        <h1>
          My Little <span style={{ color: "#719a6b" }}>Library</span>
        </h1>

        <div className="container-login">
          <div className="catching-text">
            <h3>Gérez votre collection et ajoutez de nouveaux livres !</h3>
          </div>
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

              <p>Mot de passe</p>
              <div className="mdp-container">
                <input
                  type={motDePasseVisible ? "text" : "password"}
                  className="password"
                  onClick={handleInputClick}
                  onChange={(event) => setInputPassword(event.target.value)}
                />
                <img
                  src={
                    motDePasseVisible
                      ? "/images/Mdp_unsee.png"
                      : "/images/Mdp_see.png"
                  }
                  alt="eye"
                  className="mdp"
                  onClick={toggleMotDePasseVisibility}
                  role="presentation"
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
        <div className="slogan">
          <h2>
            Read <span style={{ color: "#719a6b" }}>books, </span>
            <br></br>
            Love <span style={{ color: "#719a6b" }}>books.</span>
          </h2>
        </div>
      </div>
    </>
  );
}
