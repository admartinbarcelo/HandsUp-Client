import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PackPage from "./pages/PackPage/"

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

import PlanCreatePage from './pages/Plans/PlanCreatePage';
import PlanDetailsPage from './pages/Plans/PlanDetailsPage';
import PlanEditPage from './pages/Plans/PlanEditPage';

import PacksCreatePage from './pages/Packs/PacksCreatePage';
import PacksDetailsPage from './pages/Packs/PacksDetailsPage';
import PacksEditPage from './pages/Packs/PacksEditPage';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile"element={<IsPrivate><ProfilePage /></IsPrivate>}/>
        <Route path="/signup"element={<IsAnon><SignupPage /></IsAnon>}/>
        <Route path="/login"element={<IsAnon><LoginPage /></IsAnon>}/>

        <Route path="/plans/create"element={<IsPrivate><PlanCreatePage/></IsPrivate>} />
        <Route path="/plans/:planId"element={<IsAnon><PlanDetailsPage/></IsAnon>} />
        <Route path="/plans/:planId/edit"element={<IsPrivate><PlanEditPage/></IsPrivate>} />

        <Route path="/packs/create"element={<IsPrivate><PacksCreatePage/></IsPrivate>} />
        <Route path="/packs/:packId"element={<IsAnon><PacksDetailsPage/></IsAnon>} />
        <Route path="/packs/:packId/edit"element={<IsPrivate><PacksEditPage/></IsPrivate>} />
      </Routes>
    </div>
  );
}

export default App;
