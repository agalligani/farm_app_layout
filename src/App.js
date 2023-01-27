import { Routes, Route } from 'react-router-dom'
import Welcome from "./components/Welcome"
import DashLayout from "./components/DashLayout"

import NewArea from "./features/areas/NewArea"
import AreasList from './features/areas/AreasList'
import EditArea from "./features/areas/EditArea"

import NewPlanting from "./features/plantings/NewPlanting"
import PlantingsList from "./features/plantings/PlantingsList"
import EditPlanting from './features/plantings/EditPlanting'

import NewCrop from './features/crops/NewCrop'
import CropsList from './features/crops/CropsList'
import EditCrop from './features/crops/EditCrop'

import NewSchedule from './features/schedules/NewSchedule'
import SchedulesList from './features/schedules/SchedulesList'
// import { Helmet } from 'react-helmet-async';

import Prefetch from './auth/Prefetch'

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashLayout />}>
        <Route index element={<Welcome />} />
        <Route element={<Prefetch/>}>
          <Route path="plantings">
            <Route index element={<PlantingsList />} />
            <Route path=":id" element={<EditPlanting />} />
            <Route path="new" element={<NewPlanting />} />
          </Route>
          <Route path="schedules">
            <Route index element={<SchedulesList />} />
            <Route path="new" element={<NewSchedule />} />
          </Route>
        </Route> {/* End Prefetch **/}
        <Route path="areas">
            <Route index element={<AreasList />} />
            <Route path=":id" element={<EditArea />} />
            <Route path="new" element={<NewArea />} />
        </Route>
        <Route path="crops">
            <Route index element={<CropsList />} />
            <Route path=":id" element={<EditCrop />} />
            <Route path="new" element={<NewCrop />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
