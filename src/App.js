import { Routes, Route } from 'react-router-dom'
import Welcome from "./components/Welcome"
import DashLayout from "./components/DashLayout"
import NewArea from "./features/areas/NewArea"
import EditArea from "./features/areas/EditArea"
import AreasList from './features/areas/AreasList'
import PlantingList from "./features/plantings/PlantingList"
import EditPlanting from './features/plantings/EditPlanting'
import CropsList from './features/crops/CropsList'
import EditCrop from './features/crops/EditCrop'
// import NewCrop from './features/crops/NewCrop'
import Schedule from './features/schedules/Schedule'
// import { Helmet } from 'react-helmet-async';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashLayout />}>
        <Route index element={<Welcome />} />
        <Route path="plantings">
          <Route index element={<PlantingList />} />
          <Route path=":id" element={<EditPlanting />} />
        </Route>
        <Route path="schedule">
            <Route index element={<Schedule />} />
        </Route>
        <Route path="areas">
            <Route index element={<AreasList />} />
            <Route path=":id" element={<EditArea />} />
            <Route path="new" element={<NewArea />} />
        </Route>
        <Route path="crops">
            <Route index element={<CropsList />} />
            <Route path=":id" element={<EditCrop />} />
            {/* <Route path="/new" element={<NewCrop />}/> */}

        </Route>
      </Route>
    </Routes>
  );
}

export default App;
