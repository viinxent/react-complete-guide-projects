import { useState, useEffect } from 'react';

export default client => {
  const [error, setError] = useState('');

  const reqInterceptors = client.interceptors.request.use(request => {
    setError('');
    return request;
  });

  const resInterceptors = client.interceptors.response.use(
    response => response,
    err => setError(err.message)
  );

  const clearError = () => setError('');

  useEffect(() => {
    return () => {
      client.interceptors.request.eject(reqInterceptors);
      client.interceptors.response.eject(resInterceptors);
    };
  }, [client, reqInterceptors, resInterceptors]);

  return [error, clearError];
}