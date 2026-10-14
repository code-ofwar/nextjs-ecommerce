import { CgSpinner } from "react-icons/cg";
import { LuLoaderCircle } from "react-icons/lu";

const LoadingPage = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="flex flex-col items-center gap-2">
        <LuLoaderCircle className="animate-spin text-5xl text-primary" />

        <p className="text-sm font-medium text-muted">
          Loading...
        </p>
      </div>
    </main>
  );
};

export default LoadingPage;