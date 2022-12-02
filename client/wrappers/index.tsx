import DateWrapper from './DateWrapper';
import FontWrapper from './FontWrapper';
import SentryWrapper from './SentryWrapper';
import ThemeWrapper from './ThemeWrapper';

const WrapperRegistry: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <ThemeWrapper>
    <FontWrapper>
      <DateWrapper>
        <SentryWrapper>
          <>{children}</>
        </SentryWrapper>
      </DateWrapper>
    </FontWrapper>
  </ThemeWrapper>
);

export default WrapperRegistry;
