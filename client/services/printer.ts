import axios from './axios';

export type PrintResumeAsPdfParams = {
  username: string;
  slug: string;
  lastUpdated: string;
};

export const printResumeAsPdf = (printResumeAsPdfParams: PrintResumeAsPdfParams): Promise<string> =>
  axios
    .get(
      `/printer/${printResumeAsPdfParams.username}/${printResumeAsPdfParams.slug}?lastUpdated=${printResumeAsPdfParams.lastUpdated}`,
    )
    .then((res) => res.data);
