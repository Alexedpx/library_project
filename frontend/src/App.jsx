import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useMemo } from "react";
import userContext from "./context/userContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Profil from "./pages/Profil";
import BookById from "./pages/BookById";
import AddBook from "./pages/AddBook";
import "./styles/index.scss";

export default function App() {
  const [userConnected, setUserConnected] = useState(null);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    { path: "/signin", element: <Signin /> },
    {
      path: "/library",
      element: <HomePage />,
    },

    {
      path: "/profil",
      element: <Profil />,
    },
    {
      path: "/book/:id",
      element: <BookById />,
    },
    {
      path: "/addbook",
      element: <AddBook />,
    },
  ]);

  return (
    <userContext.Provider
      value={useMemo(
        () => ({ userConnected, setUserConnected }),
        [userConnected, setUserConnected]
      )}
    >
      <RouterProvider router={router} />
    </userContext.Provider>
  );
}
