export const ERRORS = {
  NOT_FOUND: {
    HEADER: 'Not Found',
    MESSAGE:
      'Unfortunately, the page you are looking for does not exist. Please check the URL and try again.',
  },
  SERVICE: {
    HEADER: 'Server Error',
    MESSAGE:
      'Server error - Could not establish a connection to the server. Please try again later!',
  },
};

const ErrorContent = ({
  header = ERRORS.NOT_FOUND.HEADER,
  message = ERRORS.NOT_FOUND.MESSAGE,
}: {
  header: string;
  message: string;
}) => (
  <main className="mx-auto w-full max-w-5xl bg-background p-4">
    <h1 className="text-text font-bold text-center text-[1.875rem] mb-4">{header}</h1>
    <p className="mb-8 text-center text-text/80">{message}</p>
  </main>
);

export default ErrorContent;
