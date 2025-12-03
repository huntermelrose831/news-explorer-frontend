import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";


function App() {
  return (
    <BrowserRouter>
      <div className="page">
        
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
