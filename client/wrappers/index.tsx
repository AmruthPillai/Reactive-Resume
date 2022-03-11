import DateWrapper from './DateWrapper';
import FontWrapper from './FontWrapper';
import HotkeysWrapper from './HotkeysWrapper';
import ThemeWrapper from './ThemeWrapper';

const WrapperRegistry: React.FC = ({ children }) => {
  return (
    <ThemeWrapper>
      <FontWrapper>
        <HotkeysWrapper>
          <DateWrapper>
            <>{children}</>
          </DateWrapper>
        </HotkeysWrapper>
      </FontWrapper>
    </ThemeWrapper>
  );
};

export default WrapperRegistry;
