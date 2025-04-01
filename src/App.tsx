
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Components from "./pages/Components";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/components" element={<Components />} />
        <Route path="/ui-kit" element={<Index />} /> {/* Redirect to Index */}
        <Route path="/documentation" element={<Documentation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
