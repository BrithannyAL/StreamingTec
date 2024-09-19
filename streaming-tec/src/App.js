import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Video from "./pages/video/Video";
import Home from "./pages/home/Home";
import FavoriteList from "./pages/favorite/FavoriteList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorite/:user" element={<FavoriteList />} />
          <Route path="video/:url" element={<Video />} />
        </Route>
      </Routes>
    </Router>
  );
}
