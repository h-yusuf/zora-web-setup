import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Landing } from "./pages/Landing";
import { Wiring } from "./pages/docs/Wiring";
import { Diy } from "./pages/docs/Diy";
import { Flash } from "./pages/docs/Flash";

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
        <Route
          path="/docs/diy"
          element={
            <Layout>
              <Diy />
            </Layout>
          }
        />
        <Route
          path="/docs/flash"
          element={
            <Layout>
              <Flash />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
