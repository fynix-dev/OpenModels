import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import CnnModel from "./screens/CnnModel.jsx";
import RnnModel from "./screens/RnnModel.jsx";
import ModelList from "./screens/ModelList.jsx";
import NextWordPredictor from "./screens/NextWordPredictor.jsx";
import SpamHamPredictor from "./screens/SpamHamPredictor.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/cnn" element={<CnnModel />} />
      <Route path="/rnn" element={<RnnModel />} />
      <Route path="/next-word-predictor" element={<NextWordPredictor />} />
      <Route path="/spam-ham-predictor" element={<SpamHamPredictor />} />
      <Route path="/" element={<ModelList />} />
    </Routes>
  </HashRouter>,
);
