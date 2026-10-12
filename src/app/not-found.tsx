import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-5xl font-bold text-foreground sm:text-6xl">404</h1>

      <p className="mb-5 mt-2 text-2xl text-muted sm:text-3xl">
        Page not found
      </p>

      <Link
        href="/"
        className="text-lg text-primary underline underline-offset-4 transition-opacity hover:opacity-80 sm:text-xl"
      >
        Go to home
      </Link>
    </section>
  );
};

export default NotFoundPage;
