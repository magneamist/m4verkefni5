import "./App.css";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Select } from "./components/ui/select";
import CatBreedExplorer from "./CatCard";

import ReactDOM from "react-dom/client";
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
