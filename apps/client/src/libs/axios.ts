import { t } from "@lingui/macro";
import type { ErrorMessage } from "@reactive-resume/utils";
import { deepSearchAndParseDates } from "@reactive-resume/utils";
import _axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { redirect } from "react-router";

import { refreshToken } from "@/client/services/auth";

import { USER_KEY } from "../constants/query-keys";
import { toast } from "../hooks/use-toast";
import { translateError } from "../services/errors/translate-error";
import { queryClient } from "./query-client";

export const axios = _axios.create({ baseURL: "/api", withCredentials: true });

// Intercept responses to transform ISO dates to JS date objects
axios.interceptors.response.use(
  (response) => {
    const transformedResponse = deepSearchAndParseDates(response.data, ["createdAt", "updatedAt"]);
    return { ...response, data: transformedResponse };
  },
  (error) => {
    const message = error.response?.data.message as ErrorMessage;
    const description = translateError(message);

    if (description) {
      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description,
      });
    }

    return Promise.reject(new Error(message));
  },
);

// Create another instance to handle failed refresh tokens
// Reference: https://github.com/Flyrell/axios-auth-refresh/issues/191
const axiosForRefresh = _axios.create({ baseURL: "/api", withCredentials: true });

// Interceptor to handle expired access token errors
const handleAuthError = () => refreshToken(axiosForRefresh);

// Interceptor to handle expired refresh token errors
const handleRefreshError = async () => {
  await queryClient.invalidateQueries({ queryKey: USER_KEY });
  redirect("/auth/login");
};

// Intercept responses to check for 401 and 403 errors, refresh token and retry the request
createAuthRefreshInterceptor(axios, handleAuthError, { statusCodes: [401, 403] });
createAuthRefreshInterceptor(axiosForRefresh, handleRefreshError);
