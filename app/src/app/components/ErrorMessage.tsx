import { PropsWithChildren } from 'react';

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <div className='text-red-500'>
      {children}
    </div>
  );
};

export default ErrorMessage;
