import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./assets/scss/App.scss";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import AddEstablishmentPage from "./pages/AddEstablishmentPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div id="App">
      <Navigation />

      <Routes>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/add-establishment" element={<AddEstablishmentPage />} />
      </Routes>
    </div>
  );
}

export default App;
