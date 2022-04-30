const Heading: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <h3 className="my-2 inline-block border-b px-5 pb-2">{children}</h3>;
};

export default Heading;
