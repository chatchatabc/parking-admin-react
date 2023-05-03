interface Props {
  message?: string;
}

function ErrorMessageComp({ message }: Props) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex bg-black bg-opacity-50 z-[9] items-center justify-center">
      <div className="w-1/2 text-center p-16 bg-white rounded-lg">
        <header>
          <h1>Oh no! Something wrong happened.</h1>
        </header>
        {message && <h2 className="text-2xl font-bold mt-8">{message}</h2>}
        <section className="flex"></section>
      </div>
    </div>
  );
}

export default ErrorMessageComp;
