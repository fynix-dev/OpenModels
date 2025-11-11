import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter, Routes, Route } from "react-router-dom";
import CnnModel from './screens/CNNModel.jsx';
import RnnModel from './screens/RnnModel.jsx';
import NextWordPredictor from './screens/NextWordPredictor.jsx';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path='/cnn' element={<CnnModel />} />
      <Route path='/' element={<RnnModel />} />
      <Route path='/next-word-predictor' element={<NextWordPredictor />} />
    </Routes>
  </HashRouter>
)
