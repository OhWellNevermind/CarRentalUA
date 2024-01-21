import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  return (
    <div className="flex flex-row gap-4 items-center px-10 pt-4">
      <button
        className="text-black hover:text-blue"
        onClick={() => navigate("/catalog")}
        type="button"
      >
        Catalog
      </button>
      <button
        className="text-black hover:text-blue"
        onClick={() => navigate("/favourites")}
        type="button"
      >
        Favourites
      </button>
    </div>
  );
};
