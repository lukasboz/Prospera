import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ExtraInfo = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">We have no TOS nor privacy policy :D</h1>

      </div>
    </div>
  );
};

export default ExtraInfo;
