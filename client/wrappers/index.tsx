import DateWrapper from './DateWrapper';
import FontWrapper from './FontWrapper';
import ThemeWrapper from './ThemeWrapper';

const WrapperRegistry: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <ThemeWrapper>
    <FontWrapper>
      <DateWrapper>
        <>{children}</>
      </DateWrapper>
    </FontWrapper>
  </ThemeWrapper>
);

export default WrapperRegistry;
