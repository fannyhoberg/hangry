import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./assets/scss/App.scss";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div id="App">
      <Routes>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
