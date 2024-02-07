import axios from "axios";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import userContext from "../context/userContext";
import NavBar from "../components/NavBar";

export default function Profil() {
  const { userConnected, setUserConnected } = useContext(userContext);
  const [deleteUser, setDeleteUser] = useState(userConnected);
  const [file, setFile] = useState(undefined);
  const [userUpdate, setUserUpdate] = useState({
    pseudo: userConnected.pseudo,
    email: userConnected.email,
    avatar: userConnected.avatar,
    style_favoris: userConnected.style_favoris,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const data = new FormData();
      data.append("image", file);

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/image`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setUserConnected(res.data[0]);
      setUserUpdate(res.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProfil = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    try {
      const deletedUser = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${deleteUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setDeleteUser(deleteUser.id);
      localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("token"));
    if (userConnected && userConnected.id) {
      const userId = userConnected.id;

      try {
        const userUpdated = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
          userUpdate,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setUserConnected(userUpdated.data);
        setIsEditing(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("L'ID de l'utilisateur est indéfini ou incorrect.");
    }
  };
  return (
    <>
      <NavBar />
      <div className="background">
        <div className="header-title">
          <h1>
            My Little <span style={{ color: "#719a6b" }}>Library </span>
          </h1>
        </div>

        <div className="container-profil">
          <div className="profil-wrapper">
            {userConnected ? (
              <div className="user-profile">
                {userConnected && (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${
                      userConnected.avatar
                    }`}
                    alt="avataruser"
                    role="presentation"
                    className="avatar"
                  />
                )}

                {!isEditing ? (
                  <form id="form" className="pseudo-user">
                    {userConnected.pseudo && <p>{userConnected.pseudo}</p>}
                    {userConnected.email && <p>{userConnected.email}</p>}

                    <p>Catégorie préférée: {userConnected.style_favoris}</p>

                    <button className="edit" type="button" onClick={handleEdit}>
                      Editer mon profil
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="upload">
                      <form onSubmit={handleUpload}>
                        <input
                          name="filename"
                          onChange={(e) => setFile(e.target.files[0])}
                          type="file"
                          accept="image/*"
                          id="file"
                          className="input-file"
                        />
                        <label htmlFor="file" className="label-file">
                          Choisir un avatar
                        </label>

                        <button type="submit" className="upload-avatar">
                          <img src="images/upload.png" alt="upload" />
                        </button>
                      </form>
                    </div>
                    <form
                      id="form"
                      className="edit-user"
                      onSubmit={handleSubmit}
                    >
                      <input
                        className="input-edit"
                        type="text"
                        value={userUpdate.pseudo}
                        onChange={(event) =>
                          setUserUpdate({
                            ...userUpdate,
                            pseudo: event.target.value,
                          })
                        }
                      />
                      <input
                        className="input-edit"
                        type="text"
                        value={userUpdate.email}
                        onChange={(event) =>
                          setUserUpdate({
                            ...userUpdate,
                            email: event.target.value,
                          })
                        }
                      />

                      <input
                        className="input-edit"
                        type="text"
                        value={userUpdate.style_favoris}
                        onChange={(event) =>
                          setUserUpdate({
                            ...userUpdate,
                            style_favoris: event.target.value,
                          })
                        }
                      />
                      <div className="edit-profil">
                        <button className="saveprofil" type="submit">
                          Enregistrer
                        </button>
                      </div>
                      <div className="delete-user-profile">
                        <button
                          className="delete"
                          type="submit"
                          onClick={() => handleDeleteProfil(deleteUser.id)}
                        >
                          <NavLink to="/">Supprimer le profil ?</NavLink>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
