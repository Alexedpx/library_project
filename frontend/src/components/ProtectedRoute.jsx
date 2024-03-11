import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import userContext from "../context/userContext";

function ProtectedRoute({ children }) {
  const { setUserConnected } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Définir l'intercepteur Axios pour gérer les réponses HTTP
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          // Effacer le JWT stocké dans le stockage local
          localStorage.removeItem("token");
          // Déconnecter l'utilisateur
          navigate("/");
        }
        setUserConnected(null);

        return Promise.reject(error);
      }
    );

    // Nettoyer l'intercepteur lorsque le composant est démonté
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("token"));
    if (!user || !user.token) {
      return navigate("/");
    }
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/userbytoken`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setUserConnected(res.data[0]);
    return res.data[0];
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);
  return children;
}

export default ProtectedRoute;
