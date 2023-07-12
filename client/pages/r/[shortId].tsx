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
import { useMutation, useQuery } from 'react-query';
import { Resume } from 'schema';

import Page from '@/components/build/Center/Page';
import { ServerError } from '@/services/axios';
import { printResumeAsPdf, PrintResumeAsPdfParams } from '@/services/printer';
import { fetchResumeByShortId } from '@/services/resume';
import { useAppDispatch } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Preview.module.scss';

type QueryParams = {
  shortId: string;
};

type Props = {
  shortId: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query, locale = 'en' }) => {
  const { shortId } = query as QueryParams;

  return { props: { shortId, ...(await serverSideTranslations(locale, ['common'])) } };
};

const Preview: NextPage<Props> = ({ shortId }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { data: resume } = useQuery<Resume>(`resume/${shortId}`, () => fetchResumeByShortId({ shortId }), {
    onSuccess: (data) => {
      dispatch(setResume(data));
    },
  });

  const { mutateAsync, isLoading } = useMutation<string, ServerError, PrintResumeAsPdfParams>(printResumeAsPdf);

  useEffect(() => {
    if (resume) dispatch(setResume(resume));
  }, [resume, dispatch]);

  useEffect(() => {
    if (resume && !isEmpty(resume) && router.locale !== resume.metadata.locale) {
      const { pathname, asPath, query } = router;

      router.push({ pathname, query }, asPath, { locale: resume.metadata.locale });
    }
  }, [resume, router]);

  if (!resume || isEmpty(resume)) return null;

  const layout: string[][][] = get(resume, 'metadata.layout', []);

  const handleDownload = async () => {
    const url = await mutateAsync({
      username: resume.user.username,
      slug: resume.slug,
      lastUpdated: dayjs(resume.updatedAt).unix().toString(),
    });

    download(url);
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
