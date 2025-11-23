import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Questions = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">TODO: fill in this page</h1>

      </div>
    </div>
  );
};

export default Questions;
