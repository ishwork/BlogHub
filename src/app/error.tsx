'use client';

import ErrorContent, { ERRORS } from '@/src/components/ErrorContent';

/**
 * @description This page uses RootLayout `layout.tsx`.
 */
const Error = () => {
  return <ErrorContent header={ERRORS.SERVICE.HEADER} message={ERRORS.SERVICE.MESSAGE} />;
};

export default Error;
