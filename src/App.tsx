import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./assets/scss/App.scss";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div id="App">
      <Routes>
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        <Route path="/" element={<HomePage />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
