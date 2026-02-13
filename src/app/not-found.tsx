import ErrorContent, { ERRORS } from '@/src/components/ErrorContent';

/**
 * @description This page uses RootLayout `layout.tsx`.
 */

const NotFound = () => {
  return <ErrorContent header={ERRORS.NOT_FOUND.HEADER} message={ERRORS.NOT_FOUND.MESSAGE} />;
};

export default NotFound;
