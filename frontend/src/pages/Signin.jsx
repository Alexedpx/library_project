import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import userContext from "../context/userContext";

export default function Signin() {
  const navigate = useNavigate();
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const { setUserConnected } = useContext(userContext);
  const [inputPassword, setInputPassword] = useState("");

  const handleInscription = async (e) => {
    e.preventDefault();
    const userSignin = {
      pseudo: inputPseudo,
      email: inputEmail,
      password: inputPassword,
      avatar: `/images/avatar.jpg`,
     
    };
    try {
      const dataUser = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/signin/`,
        userSignin
      );

      setUserConnected(dataUser.data);
      const userLocal = {
        ...dataUser.data,
        token: dataUser.data.token,
      };
      localStorage.setItem(
        "token",
        JSON.stringify({
          ...userLocal,
        })
      );

      if (dataUser.status === 201) {
        alert("Inscription réussie !");

        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
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
            Read <span style={{ color: "#719a6b" }}>books,</span>
            <br></br>
            Love <span style={{ color: "#719a6b" }}>books.</span>
          </h2>
        </div>
        <div className="presentation-text">
          <h3>Gérez votre collection et ajoutez de nouveaux livres !</h3>
        </div>
      </div>

      <div className="container-signin">
        <div className="signin-wrapper">
          <h1>Inscrivez-vous pour créer votre bibliothèque !</h1>
          <p>
            Déjà inscrit sur My Little Library ?<br></br>
            <NavLink to="/">Connexion</NavLink>
          </p>

          <form onSubmit={handleInscription} className="form-signin">
            <p>Adresse e-mail</p>
            <input
              type="email"
              className="email"
              onChange={(event) => setInputEmail(event.target.value)}
            />
            <p>Pseudo</p>
            <input
              type="text"
              className="name"
              onChange={(event) => setInputPseudo(event.target.value)}
            />
            <div className="mdp-container">
              <p>Mot de passe</p>
              <input
                type="password"
                className="password"
                onChange={(event) => setInputPassword(event.target.value)}
              />
            </div>
            <div className="container-button">
              <button type="submit" className="btn-inscription">
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
