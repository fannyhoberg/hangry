import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./assets/scss/App.scss";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import AddEstablishmentPage from "./pages/AddEstablishmentPage";
import Navigation from "./components/Navigation";
import { LoadScriptNext } from "@react-google-maps/api";

const google_api_key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  return (
    <div id="App">
      <Navigation />

      <LoadScriptNext googleMapsApiKey={google_api_key}>
        <Routes>
          {/* <Route path="*" element={<NotFoundPage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-establishment" element={<AddEstablishmentPage />} />
        </Routes>
      </LoadScriptNext>
    </div>
  );
}

export default App;
