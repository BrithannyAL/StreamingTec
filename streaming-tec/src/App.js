import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./frontend/components/layout/Layout";
import Video from "./frontend/pages/video/Video";
import Home from "./frontend/pages/home/Home";
import FavoriteList from "./frontend/pages/favorite/FavoriteList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":section" element={<Home />} />
          <Route path="favorite/:user" element={<FavoriteList />} />
          <Route path="video/:url" element={<Video />} />
        </Route>
      </Routes>
    </Router>
  );
}
