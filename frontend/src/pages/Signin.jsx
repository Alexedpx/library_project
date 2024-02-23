import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import userContext from "../context/userContext";
import { Toaster, toast } from "sonner";

export default function Signin() {
  const navigate = useNavigate();
  const [motDePasseVisible, setMotDePasseVisible] = useState(false);
  const [inputPseudo, setInputPseudo] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const { setUserConnected } = useContext(userContext);
  const [inputPassword, setInputPassword] = useState("");
  const [formValid, setFormValid] = useState(true);

  const validateForm = () => {
    if (!inputPseudo || !inputEmail || !inputPassword) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  };

  useEffect(() => {
    validateForm();
  }, [inputPseudo, inputEmail, inputPassword]);

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const toggleMotDePasseVisibility = () => {
    setMotDePasseVisible(!motDePasseVisible);
  };

  const handleInscription = async (e) => {
    e.preventDefault();
    validateForm();
    if (formValid) {
      const userSignin = {
        pseudo: inputPseudo,
        email: inputEmail,
        password: inputPassword,
        avatar: `/images/avatar.jpg`,
      };
      try {
        const dataUser = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
          userSignin
        );

        toast.success(
          `Inscription réussie, bienvenue ${dataUser.data.pseudo}!`,
          {
            position: "top-center",
          }
        );

        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/");
        setUserConnected(dataUser.data);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      toast.error("Veuillez remplir tous les champs", {
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
        <div className="container-signin">
          <div className="catching-text">
            <h3>Gérez votre collection et ajoutez de nouveaux livres !</h3>
          </div>

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
                  S'inscrire
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
