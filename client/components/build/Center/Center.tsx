import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useAppSelector } from '@/store/hooks';
import { cn } from '@/utils/styles';

import ArtboardController from './ArtboardController';
import styles from './Center.module.scss';
import Header from './Header';
import Page from './Page';

const Center = () => {
  const orientation = useAppSelector((state) => state.build.page.orientation);

  const resume = useAppSelector((state) => state.resume.present);
  const layout: string[][][] = get(resume, 'metadata.layout');

  if (isEmpty(resume)) return null;

  return (
    <div className={cn(styles.center)}>
      <Header />

      <TransformWrapper
        centerOnInit
        minScale={0.25}
        initialScale={0.95}
        limitToBounds={false}
        centerZoomedOut={false}
        pinch={{ step: 1 }}
        wheel={{ step: 0.1 }}
      >
        {(controllerProps) => (
          <>
            <TransformComponent wrapperClass={styles.wrapper}>
              <div
                className={cn({
                  [styles.artboard]: true,
                  'flex-col': orientation === 'vertical',
                })}
              >
                {layout.map((_, pageIndex) => (
                  <Page key={pageIndex} page={pageIndex} showPageNumbers />
                ))}
              </div>
            </TransformComponent>

            <ArtboardController {...controllerProps} />
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Center;
