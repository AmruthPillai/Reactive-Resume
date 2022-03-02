import dynamic from 'next/dynamic';

const NoSSR: React.FC = ({ children }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false });
