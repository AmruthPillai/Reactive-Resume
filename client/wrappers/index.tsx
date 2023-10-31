import DateWrapper from './DateWrapper';
import FontWrapper from './FontWrapper';
import GlobalDndContext from './GlobalDndContext';
import ThemeWrapper from './ThemeWrapper';

const WrapperRegistry: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
  <ThemeWrapper>
    <FontWrapper>
      <DateWrapper>
        <GlobalDndContext>
          <>{children}</>
        </GlobalDndContext>
      </DateWrapper>
    </FontWrapper>
  </ThemeWrapper>
);

export default WrapperRegistry;
