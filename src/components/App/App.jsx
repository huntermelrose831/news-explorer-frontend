import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import { AuthProvider } from "../../contexts/AuthContext";

function App() {
  const basename = import.meta.env.BASE_URL || "/";
  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <div className="page">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/saved-news" element={<SavedNews />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
