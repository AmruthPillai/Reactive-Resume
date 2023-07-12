import { Download, Downloading } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';
import clsx from 'clsx';
import dayjs from 'dayjs';
import download from 'downloadjs';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { Resume } from 'schema';

import Page from '@/components/build/Center/Page';
import { DEFAULT_ERROR_MESSAGE } from '@/constants/index';
import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { fetchResumeByIdentifier } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Preview.module.scss';

type QueryParams = {
  slug: string;
  username: string;
};

type Props = {
  slug: string;
  resume?: Resume;
  username: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale = 'en' }) => {
  const { username, slug } = query as QueryParams;

  try {
    const resume = await fetchResumeByIdentifier({ username, slug });

    return {
      props: { username, slug, resume, ...(await serverSideTranslations(locale, ['common'])) },
    };
  } catch {
    return { props: { username, slug, ...(await serverSideTranslations(locale, ['common'])) } };
  }
};

const Preview: NextPage<Props> = ({ username, slug, resume: initialData }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const resume = useAppSelector((state) => state.resume.present);

  useEffect(() => {
    if (initialData && !isEmpty(initialData)) {
      const errorObj = JSON.parse(JSON.stringify(initialData));
      const statusCode: number | null = get(errorObj, 'statusCode', null);

      if (statusCode === 404) {
        toast.error('The resume you were looking for does not exist, or maybe it never did?');

        router.push('/');
        return;
      }

      dispatch(setResume(initialData));
    }
  }, [dispatch, initialData]);

  useEffect(() => {
    const locale = get(resume, 'metadata.locale', 'en');

    if (!isEmpty(resume) && router.locale !== locale) {
      const { pathname, asPath, query } = router;

      router.push({ pathname, query }, asPath, { locale });
    }
  }, [resume, router]);

  useQuery<Resume>(`resume/${username}/${slug}`, () => fetchResumeByIdentifier({ username, slug }), {
    initialData,
    onSuccess: (data) => {
      dispatch(setResume(data));
    },
    onError: (error) => {
      const errorObj = JSON.parse(JSON.stringify(error));
      const statusCode: number = get(errorObj, 'status', 404);

      if (statusCode === 404) {
        toast.error('The resume you were looking for does not exist, or maybe it never did?');

        router.push('/');
      }
    },
  });

  const { mutateAsync, isLoading } = useMutation<string, ServerError, PrintResumeAsPdfParams>(printResumeAsPdf);

  if (isEmpty(resume)) return null;

  const layout: string[][][] = get(resume, 'metadata.layout', []);

  const handleDownload = async () => {
    try {
      const updatedAt = get(resume, 'updatedAt');

      const url = await mutateAsync({ username, slug, lastUpdated: dayjs(updatedAt).unix().toString() });

      download(url);
    } catch {
      toast.error(DEFAULT_ERROR_MESSAGE);
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
