import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./assets/scss/App.scss";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import AddEstablishmentPage from "./pages/AddEstablishmentPage";
import Navigation from "./components/Navigation";
import { LoadScriptNext } from "@react-google-maps/api";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import { AddSuggestionsPage } from "./pages/AddSuggestionsPage";
import UpdateEstablishmentPage from "./pages/UpdateEstablishmentPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ManageSuggestionsPage from "./pages/ManageSuggestionsPage";

const google_api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  return (
    <div id="App">
      <Navigation />

      <LoadScriptNext googleMapsApiKey={google_api_key}>
        <Routes>
          {/* <Route path="*" element={<NotFoundPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/suggestions" element={<AddSuggestionsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/update-profile" element={<UpdateProfilePage />} />
            <Route path="/update/:id" element={<UpdateEstablishmentPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route
              path="/manage-suggestions/:id"
              element={<ManageSuggestionsPage />}
            />

            <Route
              path="/add-establishment"
              element={<AddEstablishmentPage />}
            />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </LoadScriptNext>
    </div>
  );
}

export default App;
