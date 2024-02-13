import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState, useMemo } from "react";
import userContext from "./context/userContext";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Profil from "./pages/Profil";
import BookById from "./pages/BookById";
import AddBook from "./pages/AddBook";
import FavoriteBook from "./pages/FavoriteBook";
import ProtectedRoute from "./components/ProtectedRoute";
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
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },

    {
      path: "/profil",
      element: (
        <ProtectedRoute>
          <Profil />
        </ProtectedRoute>
      ),
    },
    {
      path: "/book/:id",
      element: (
        <ProtectedRoute>
          <BookById />
        </ProtectedRoute>
      ),
    },
    {
      path: "/addbook",
      element: (
        <ProtectedRoute>
          <AddBook />
        </ProtectedRoute>
      ),
    },
    {
      path: "/favoritebook",
      element: (
        <ProtectedRoute>
          <FavoriteBook />
        </ProtectedRoute>
      ),
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