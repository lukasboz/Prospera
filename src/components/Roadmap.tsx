import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar.tsx";

const Roadmap = () => {
  const location = useLocation();


  return (
    <div>
            <Navbar />
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">TODO: fill in</h1>

      </div>
    </div>
    </div>
  );
};

export default Roadmap;
