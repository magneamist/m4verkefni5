import "./App.css";
import CatBreedExplorer from "./CatCard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route index element={<CatBreedExplorer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
