import env from '@beam-australia/react-env';
import { AxiosResponse } from 'axios';
import { Resume } from 'schema';

import isBrowser from '@/utils/isBrowser';

import axios from './axios';

export type CreateResumeParams = {
  name: string;
  slug: string;
  public: boolean;
};

export type FetchResumeByIdentifierParams = {
  username: string;
  slug: string;
  options?: {
    secretKey?: string;
  };
};

export type FetchResumeByShortIdParams = {
  shortId: string;
};

export type RenameResumeParams = {
  id: number;
  name: string;
  slug: string;
};

export type DuplicateResumeParams = {
  id: number;
};

export type LoadSampleDataParams = {
  id: number;
};

export type ResetResumeParams = {
  id: number;
};

export type UploadPhotoParams = {
  id: number;
  file: File;
};

export type DeletePhotoParams = {
  id: number;
};

export type DeleteResumeParams = {
  id: number;
};

export const fetchResumes = () => axios.get<Resume[]>('/resume').then((res) => res.data);

export const fetchResumeByIdentifier = async ({
  username,
  slug,
  options = { secretKey: '' },
}: FetchResumeByIdentifierParams) => {
  if (!isBrowser) {
    const serverUrl = env('SERVER_URL');
    const secretKey = options.secretKey;

    return fetch(`${serverUrl}/resume/${username}/${slug}?secretKey=${secretKey}`).then((response) => response.json());
  }

  return axios.get<Resume>(`/resume/${username}/${slug}`).then((res) => res.data);
};

export const fetchResumeByShortId = async ({ shortId }: FetchResumeByShortIdParams) =>
  axios.get<Resume>(`/resume/short/${shortId}`).then((res) => res.data);

export const createResume = (createResumeParams: CreateResumeParams) =>
  axios.post<Resume, AxiosResponse<Resume>, CreateResumeParams>('/resume', createResumeParams).then((res) => res.data);

export const renameResume = (renameResumeParams: RenameResumeParams) =>
  axios
    .patch<Resume, AxiosResponse<Resume>, RenameResumeParams>(`/resume/${renameResumeParams.id}`, renameResumeParams)
    .then((res) => res.data);

export const updateResume = (updateResumeParams: Partial<Resume>) =>
  axios
    .patch<Resume, AxiosResponse<Resume>, Partial<Resume>>(`/resume/${updateResumeParams.id}`, updateResumeParams)
    .then((res) => res.data);

export const duplicateResume = (duplicateResumeParams: DuplicateResumeParams) =>
  axios
    .post<Resume, AxiosResponse<Resume>, DuplicateResumeParams>(`/resume/${duplicateResumeParams.id}/duplicate`)
    .then((res) => res.data);

export const loadSampleData = (loadSampleDataParams: LoadSampleDataParams) =>
  axios
    .post<Resume, AxiosResponse<Resume>, LoadSampleDataParams>(`/resume/${loadSampleDataParams.id}/sample`)
    .then((res) => res.data);

export const resetResume = (resetResumeParams: ResetResumeParams) =>
  axios
    .post<Resume, AxiosResponse<Resume>, ResetResumeParams>(`/resume/${resetResumeParams.id}/reset`)
    .then((res) => res.data);

export const uploadPhoto = async (uploadPhotoParams: UploadPhotoParams) => {
  const formData = new FormData();

  formData.append('file', uploadPhotoParams.file);

  return axios
    .put<Resume, AxiosResponse<Resume>, FormData>(`/resume/${uploadPhotoParams.id}/photo`, formData)
    .then((res) => res.data);
};

export const deletePhoto = async (deletePhotoParams: DeletePhotoParams) =>
  axios.delete<Resume, AxiosResponse<Resume>>(`/resume/${deletePhotoParams.id}/photo`).then((res) => res.data);

export const deleteResume = (deleteResumeParams: DeleteResumeParams) =>
  axios
    .delete<void, AxiosResponse<void>, DeleteResumeParams>(`/resume/${deleteResumeParams.id}`)
    .then((res) => res.data);
