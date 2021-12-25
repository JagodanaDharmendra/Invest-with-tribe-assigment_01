import { Routes, Route, Navigate } from "react-router-dom";
import { Layout, Home } from "../pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
