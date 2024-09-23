import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Layout from "./frontend/components/layout/Layout";
import Video from "./frontend/pages/video/Video";
import Home from "./frontend/pages/home/Home";
import FavoriteList from "./frontend/pages/favorite/FavoriteList";
import Login from "./frontend/pages/login/Login";
import Audio from "./frontend/pages/audio/Audio";

import Credenciales from './backend/fireBase/fireBaseCredenciales/Credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(Credenciales);

function RutaProtegida({ children, usuario, cargando }) {
  // Para que no aparesca el login, debido a como se deben pasar las rutas y el tiempo de espera
  if (cargando) {
    return console.log('carga'); 
  }
  return usuario ? children : <Navigate to="/login" />;
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);  
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (consulUsuario) => {
      if (consulUsuario) {
        setUsuario(consulUsuario);
      } else {
        setUsuario(null);
      }
      setCargando(false); 
    });

    return () => unsubscribe();
  }, []);

  if (cargando) {
    // Para que no aparesca el login, debido a como se deben pasar las rutas y el tiempo de espera
    return console.log('carga');
  }

  return (
    <Router>
      <Routes>
        {/* Ruta principal: Si hay un usuario autenticado, muestra Layout; si no, muestra Login */}
        <Route path="/" element={usuario ? <Layout correo={usuario.email} /> : <Login />}>
          {/* Rutas anidadas */}
          <Route index element={<Home />} />
          <Route path=":section" element={<Home />} />

          <Route path="favorite/:user" element={<FavoriteList />} />
          <Route path="video/:title/:url" element={<Video />} />
          <Route path="audio/:title/:url" element={<Audio />} />

          {/* Ruta protegida para favoritos */}
          <Route
            path="favorite/:user"
            element={
              <RutaProtegida usuario={usuario} cargando={cargando}>
                <FavoriteList />
              </RutaProtegida>
            }
          />

          {/* Ruta protegida para videos */}
          <Route
            path="video/:url"
            element={
              <RutaProtegida usuario={usuario} cargando={cargando}>
                <Video />
              </RutaProtegida>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
