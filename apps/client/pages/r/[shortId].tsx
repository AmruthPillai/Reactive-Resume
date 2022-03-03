import { Download, Downloading } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';
import { Resume } from '@reactive-resume/schema';
import clsx from 'clsx';
import download from 'downloadjs';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';

import i18nConfig from '@/i18n/index';
import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { fetchResumeByShortId } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Preview.module.scss';

const Page = dynamic(() => import('@/components/build/Center/Page'));

type QueryParams = {
  shortId?: string;
};

type Props = {
  shortId?: string;
  resume?: Resume;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale }) => {
  const { shortId } = query as QueryParams;

  try {
    const resume = await fetchResumeByShortId({ shortId });

    return { props: { shortId, resume, ...(await serverSideTranslations(locale, ['common'], i18nConfig)) } };
  } catch {
    return { props: { shortId, ...(await serverSideTranslations(locale, ['common'], i18nConfig)) } };
  }
};

const Preview: NextPage<Props> = ({ shortId, resume: initialData }) => {
  const dispatch = useAppDispatch();

  const resume = useAppSelector((state) => state.resume);

  useEffect(() => {
    if (!isEmpty(initialData)) {
      dispatch(setResume(initialData));
    }
  }, [dispatch, initialData]);

  useQuery<Resume>(`resume/${shortId}`, () => fetchResumeByShortId({ shortId }), {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      dispatch(setResume(data));
    },
  });

  const { mutateAsync, isLoading } = useMutation<string, ServerError, PrintResumeAsPdfParams>(printResumeAsPdf);

  if (isEmpty(resume)) return null;

  const layout: string[][][] = get(resume, 'metadata.layout', []);

  const handleDownload = async () => {
    try {
      const url = await mutateAsync({ username: resume.user.username, slug: resume.slug });

      download(url);
    } catch {
      toast.error('Something went wrong, please try again later.');
    }
  };

  return (
    <div className={clsx('preview-mode', styles.container)}>
      {layout.map((_, pageIndex) => (
        <Page key={pageIndex} page={pageIndex} />
      ))}

      <div className={clsx(styles.download, { 'opacity-75': isLoading })}>
        <ButtonBase onClick={handleDownload} disabled={isLoading}>
          {isLoading ? (
            <>
              <Downloading />
              <h4>Please wait</h4>
            </>
          ) : (
            <>
              <Download />
              <h4>Download PDF</h4>
            </>
          )}
        </ButtonBase>
      </div>

      <p className={styles.footer}>
        Made with <Link href="/">Reactive Resume</Link>
      </p>
    </div>
  );
};

export default Preview;
