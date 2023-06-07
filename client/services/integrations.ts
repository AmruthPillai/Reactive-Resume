import { AxiosResponse } from 'axios';
import { Integration, Resume } from 'schema';

import axios from './axios';

export type ImportFromExternalParams = {
  integration: Integration;
  file: File;
};

export const importFromExternal = async (importFromExternalParams: ImportFromExternalParams) => {
  const formData = new FormData();

  formData.append('file', importFromExternalParams.file);

  return axios
    .post<Resume, AxiosResponse<Resume>, FormData>(`/integrations/${importFromExternalParams.integration}`, formData)
    .then((res) => res.data);
};
