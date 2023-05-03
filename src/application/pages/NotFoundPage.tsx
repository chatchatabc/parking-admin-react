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
      <div className="flex items-center space-x-8">
        {/* Go back */}
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-2 text-blue-500 underline hover:no-underline"
        >
          <span>Go back</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 48 48"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
            >
              <path d="m13 8l-7 6l7 7" />
              <path d="M6 14h22.994c6.883 0 12.728 5.62 12.996 12.5c.284 7.27-5.723 13.5-12.996 13.5H11.998" />
            </g>
          </svg>
        </button>

        <p>OR</p>

        {/* Go back home */}
        <button
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center gap-2 text-blue-500 underline hover:no-underline"
        >
          <span>Go back to home</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
