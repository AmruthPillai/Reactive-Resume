import DateWrapper from './DateWrapper';
import FontWrapper from './FontWrapper';
import HotkeysWrapper from './HotkeysWrapper';
import LocaleWrapper from './LocaleWrapper';
import ThemeWrapper from './ThemeWrapper';

const WrapperRegistry: React.FC = ({ children }) => {
  return (
    <ThemeWrapper>
      <FontWrapper>
        <HotkeysWrapper>
          <DateWrapper>
            <LocaleWrapper>
              <>{children}</>
            </LocaleWrapper>
          </DateWrapper>
        </HotkeysWrapper>
      </FontWrapper>
    </ThemeWrapper>
  );
};

export default WrapperRegistry;
