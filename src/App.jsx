import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AllCitiesPage from "./pages/AllCitiesPage";
import AllPlacesPage from "./pages/AllPlacesPage";
import AllRegionsPage from "./pages/AllRegionsPage";
import CityDetailsPage from "./pages/CityDetailsPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";

import CulturalPlacesPage from "./pages/CulturalPlacesPage";
import FoodAndWinePlacesPage from "./pages/FoodAndWinePlacesPage";
import NaturePlacesPage from "./pages/NaturePlacesPage";
import RelaxWellnessPlacesPage from "./pages/RelaxWellnessPlacesPage";
import VillagesPlacesPage from "./pages/VillagesPlacesPage";

import IsAdmin from "./components/IsAdmin";
import ProfilePage from "./pages/ProfilePage";
import RegionDetailsPage from "./pages/RegionDetailsPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/regions" element={<AllRegionsPage />} />
        <Route exact path="/regions/:id" element={<RegionDetailsPage />} />
        <Route exact path="/cities" element={<AllCitiesPage />} />
        <Route exact path="/cities/:id" element={<CityDetailsPage />} />
        <Route
          exact
          path="/cities/:cityId/places/:placeId"
          element={<PlaceDetailsPage />}
        />
        {/* <Route exact path="/places/:placeId" element={<PlaceDetailsPage />} /> */}
        <Route exact path="/places/allplaces" element={<AllPlacesPage />} />
        <Route exact path="/places/cultural" element={<CulturalPlacesPage />} />
        <Route
          exact
          path="/places/food&wine"
          element={<FoodAndWinePlacesPage />}
        />
        <Route exact path="/places/nature" element={<NaturePlacesPage />} />
        <Route exact path="/places/villages" element={<VillagesPlacesPage />} />
        <Route
          exact
          path="/places/relax&wellness"
          element={<RelaxWellnessPlacesPage />}
        />
        <Route
          exact
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <IsAdmin>
              <DashboardPage />
            </IsAdmin>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
