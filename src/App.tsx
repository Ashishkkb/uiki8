
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Components from "./pages/Components";
import UIKit from "./pages/UIKit";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/components" element={<Components />} />
      <Route path="/ui-kit" element={<UIKit />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
