import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Suspense } from "react";

export const SharedLayout = () => {
  return (
    <div>
      <Header />
      <div className="px-10 py-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
