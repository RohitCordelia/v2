import React from 'react';
import { Layout } from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.log('roh err', error, resetErrorBoundary);
  
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <div
        role="alert"
        className="container mx-auto py-24 pb-12 text-center lg:pt-36 px-3 lg:pb-36"
      >
        <h2 className="my-5 text-3xl font-semibold">Something went wrong!</h2>
        {/* {error && <p>{error.message}</p>} */}
        {location.pathname !== '/' && (
          <button
            onClick={() => {
              navigate('/');
              window.location.reload();
            }}
            className="text-xs min-w-[140px] text-center lg:text-base cursor-pointer border-1 border-brand-primary bg-brand-primary text-white px-4 py-2 font-semibold rounded"
          >
            Back to Homepage
          </button>
        )}
      </div>
    </Layout>
  );
};

export default ErrorFallback;
