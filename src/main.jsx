import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import CnnModel from './screens/CNNModel.jsx';
import RnnModel from './screens/RnnModel.jsx';
import NextWordPredictor from './screens/NextWordPredictor.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/cnn' element={<CnnModel />} />
      <Route path='/rnn' element={<RnnModel />} />
      <Route path='/next-word-predictor' element={<NextWordPredictor />} />
    </Routes>
  </BrowserRouter>
)
