import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div>Zora Mini — coming soon</div>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
