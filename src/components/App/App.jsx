import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
/* other imports */

function App() {
  // Vite exposes the build-time base at import.meta.env.BASE_URL.
  // In dev this is '/', in the gh-pages build it will be '/news-explorer-frontend/'.
  const basename = import.meta.env.BASE_URL || "/";

  return (
    <BrowserRouter basename={basename}>
      <Header />
      <Main />
      {/* rest of your routes/components */}
    </BrowserRouter>
  );
}

export default App;
