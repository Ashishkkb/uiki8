
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Components from "./pages/Components";
import NotFound from "./pages/NotFound";
import Documentation from "./pages/Documentation";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./hooks/useTheme";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/components" element={<Components />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" richColors closeButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
