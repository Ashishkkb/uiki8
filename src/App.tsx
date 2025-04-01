
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Components from "./pages/Components";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";
import UIKit from "./pages/UIKit";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/components" element={<Components />} />
        <Route path="/ui-kit" element={<UIKit />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}

export default App;
