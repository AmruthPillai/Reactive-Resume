import '@/styles/globals.scss';

import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation, useTranslation } from 'next-i18next';
import i18nConfig from 'next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Loading from '@/components/shared/Loading';
import ModalWrapper from '@/modals/index';
import queryClient from '@/services/react-query';
import store, { persistor } from '@/store/index';
import WrapperRegistry from '@/wrappers/index';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'modals'], i18nConfig)),
    },
  };
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('common.title')}</title>
        <meta name="description" content={t('common.description')} />

        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <WrapperRegistry>
                <Loading />

                <Component {...pageProps} />

                <ModalWrapper />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    duration: 4000,
                    className: 'toast',
                  }}
                />
              </WrapperRegistry>
            </QueryClientProvider>
          </PersistGate>
        </LocalizationProvider>
      </ReduxProvider>
    </>
  );
};

export default appWithTranslation(App, i18nConfig);
