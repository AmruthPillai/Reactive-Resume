import axios from './axios';

export type PrintResumeAsPdfParams = {
  username: string;
  slug: string;
  lastUpdated: string;
  preview?: string | undefined | null;
};

export const printResumeAsPdf = (printResumeAsPdfParams: PrintResumeAsPdfParams): Promise<string> =>
  axios
    .get(
      `/printer/${printResumeAsPdfParams.username}/${printResumeAsPdfParams.slug}?lastUpdated=${printResumeAsPdfParams.lastUpdated}&preview=${printResumeAsPdfParams.preview}`,
    )
    .then((res) => {
      // console.log(res.data);
      return res.data;
    });
