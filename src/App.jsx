import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutAdmin from "./layouts/LayoutAdmin";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
