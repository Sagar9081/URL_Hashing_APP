import { Routes, Route, Navigate } from "react-router-dom";
import Links from "./pages/Links";
import { Create } from "./pages/Create";
import { Auth } from "./pages/Auth";
import { Detail } from "./pages/Detail";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<Links />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<Navigate to="/create" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
