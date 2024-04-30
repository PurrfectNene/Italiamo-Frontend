import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import AllRegionsPage from "./pages/AllRegionsPage"
import RegionDetailsPage from "./pages/RegionDetailsPage";
import AllCitiesPage from "./pages/AllCitiesPage";
import CityDetailsPage from "./pages/CityDetailsPage";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import Footer from "./components/Footer";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/regions" element={<AllRegionsPage />} />
        <Route exact path="/regions/:id" element={<RegionDetailsPage />} />
        <Route exact path="/cities" element={<AllCitiesPage />} />
        <Route exact path="/cities/:id" element={<CityDetailsPage />} />
        <Route exact path="/cities/:id" element={<CityDetailsPage />} />
        <Route exact path="/cities/:cityId/places/:placeId" element={<PlaceDetailsPage />} />
        <Route exact path="/profile" element={<UserPage />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
