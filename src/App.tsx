
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Components from "./pages/Components";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./hooks/useTheme";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/components" element={<Components />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
