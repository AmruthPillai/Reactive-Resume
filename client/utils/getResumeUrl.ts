import env from '@beam-australia/react-env';
import { Resume } from 'schema';
import get from 'lodash/get';

type Options = {
  withHost?: boolean;
  shortUrl?: boolean;
  buildUrl?: boolean;
};

const defaultOptions: Options = {
  withHost: false,
  shortUrl: false,
  buildUrl: false,
};

const getResumeUrl = (resume: Resume, options: Options = defaultOptions): string => {
  const username: string = get(resume, 'user.username');
  const shortId: string = get(resume, 'shortId');
  const slug: string = get(resume, 'slug');

  let url = '';
  let hostname = env('URL');

  if (typeof window !== 'undefined') {
    hostname = window.location.origin;
  }

  url = options.withHost ? `${hostname}` : url;
  url = options.shortUrl ? `${url}/r/${shortId}` : `${url}/${username}/${slug}`;
  url = options.buildUrl ? `${url}/build` : url;

  return url;
};

export default getResumeUrl;
