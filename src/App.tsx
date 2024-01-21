import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./pages/catalog/Catalog";
import { Toaster } from "react-hot-toast";
import { Favourites } from "./pages/favourites/Favourites";
import { SharedLayout } from "./components/SharedLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
