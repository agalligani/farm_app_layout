import { Routes, Route } from 'react-router-dom'
// import Home from './components/Home'
// import Layout from "./components/Layout";
import Welcome from "./components/Welcome"
import DashLayout from "./components/DashLayout";
import Area from "./features/areas/Area";
import Planting from "./features/plantings/Planting";
import Crop from './features/crops/Crop';
// import { Helmet } from 'react-helmet-async';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashLayout />}>
        <Route index element={<Welcome />} />  
        <Route path="plantings">
            <Route index element={<Planting />} />
        </Route>
        <Route path="schedule">
            <Route index element={<Crop />} />
        </Route>
        <Route path="areas">
            <Route index element={<Area />} />
        </Route>
        <Route path="crops">
            <Route index element={<Crop />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
