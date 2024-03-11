import axios from "axios";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import userContext from "../context/userContext";
import { IoImage } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { Toaster, toast } from "sonner";
import { GiSaveArrow } from "react-icons/gi";
import { MdOutlineSaveAlt } from "react-icons/md";

import NavBar from "../components/NavBar";

export default function Profil() {
  const { userConnected, setUserConnected } = useContext(userContext);
  const [deleteUser, setDeleteUser] = useState(userConnected);
  const [file, setFile] = useState(undefined);
  const [userUpdate, setUserUpdate] = useState({
    pseudo: userConnected?.pseudo || "",
    email: userConnected?.email || "",
    avatar: userConnected?.avatar || "",
    style_favoris: userConnected?.style_favoris || "",
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
        toast.success("Informations du profil mis à jour", {
          position: "top-center",
        });
  
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setUserConnected(userUpdated.data);
        setIsEditing(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error(error);
    }
  };


  return (
    <>
      <NavBar />
      <Toaster />
      <div className="background1">
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

{!isEditing && userConnected ? (
    <form id="form" className="pseudo-user">
      <h1>Informations du profil</h1>
      <div className="user-info">
        <h2>Pseudo</h2>
        <p>{userConnected.pseudo}</p>
        <h2>E-mail</h2>
        <p>{userConnected.email}</p>
        <h2>Catégorie préférée</h2>
        <p>{userConnected.style_favoris}</p>
      </div>

      <div className="handle-edit">
        <button
          className="edit"
          type="button"
          onClick={handleEdit}
        >
          <MdEdit size={18} style={{ marginRight: "5px" }} />{" "}
          Editer mon profil
        </button>
      </div>
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
                        <div className="upload-avatar">
                          <label htmlFor="file" className="label-file">
                            <IoImage size={18} style={{ marginRight: "5px" }} />{" "}
                            Choisir un avatar
                          </label>

                          <button type="submit" className="save-avatar">
                            <GiSaveArrow size={18} />
                          </button>
                        </div>
                      </form>
                    </div>
                    <form
                      id="form"
                      className="edit-user"
                      onSubmit={handleSubmit}
                    >
                      <p>Pseudo</p>
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
                      <p>E-mail</p>
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
                      <p>Catégorie préférée</p>
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
                          <MdOutlineSaveAlt
                            size={22}
                            style={{ marginRight: "10px" }}
                          />{" "}
                          Enregistrer
                        </button>

                        <button
                          className="delete"
                          type="submit"
                          onClick={() => handleDeleteProfil(deleteUser.id)}
                        >
                          <NavLink to="/signin">Supprimer le profil </NavLink>
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