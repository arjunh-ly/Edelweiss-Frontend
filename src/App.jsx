import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Home from "./pages/Home";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}

export default App;