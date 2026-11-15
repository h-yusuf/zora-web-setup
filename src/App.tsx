import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Landing } from "./pages/Landing";
import { Wiring } from "./pages/docs/Wiring";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />
        <Route
          path="/docs/wiring"
          element={
            <Layout>
              <Wiring />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
