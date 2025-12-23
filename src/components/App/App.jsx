import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import { AuthProvider } from "../../contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
