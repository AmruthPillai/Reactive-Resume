import axios from './axios';

export type PrintResumeAsPdfParams = {
  username: string;
  slug: string;
};

export const printResumeAsPdf = (printResumeAsPdfParams: PrintResumeAsPdfParams): Promise<string> =>
  axios.get(`/printer/${printResumeAsPdfParams.username}/${printResumeAsPdfParams.slug}`).then((res) => res.data);
