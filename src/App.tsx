import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./pages/Catalog";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
