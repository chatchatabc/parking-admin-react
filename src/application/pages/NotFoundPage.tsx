import { useLocation, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const domain = window.location.hostname;
  const port = window.location.port;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-4xl">Oh no! 404 Page not found.</h1>
      <p className="my-16">
        It seems that{" "}
        <span className="font-bold">
          {domain}
          {port ? ":" : ""}
          {port}
          {location.pathname}
        </span>{" "}
        is not available.
      </p>
      <button
        onClick={() => {
          navigate("/");
        }}
        className="flex items-center text-blue-500 underline hover:no-underline"
      >
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z"
          />
        </svg>
        Go back to home
      </button>
    </div>
  );
}

export default NotFoundPage;
