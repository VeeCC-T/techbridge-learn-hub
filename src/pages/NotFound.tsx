import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="text-2xl font-semibold">Page Not Found</p>
        <p className="text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/" className="inline-block">
          <button className="px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            Return to Home
          </button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
