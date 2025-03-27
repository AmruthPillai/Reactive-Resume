import { t } from "@lingui/macro";
import type { ErrorMessage } from "@reactive-resume/utils";
import { deepSearchAndParseDates } from "@reactive-resume/utils";
import _axios from "axios";

import { toast } from "../hooks/use-toast";
import { translateError } from "../services/errors/translate-error";

// Base URL points to the PDF service
const baseURL = import.meta.env.VITE_API_URL || "/api";

export const axios = _axios.create({ baseURL, withCredentials: false }); // No credentials needed for PDF service? Verify this.

// Intercept responses to transform ISO dates to JS date objects
axios.interceptors.response.use(
  (response) => {
    // Assuming the PDF service might return dates, keep this for now
    const transformedResponse = deepSearchAndParseDates(response.data, ["createdAt", "updatedAt"]);
    return { ...response, data: transformedResponse };
  },
  (error) => {
    // Basic error handling for PDF service calls
    const message = error.response?.data?.message as ErrorMessage | string | undefined;
    const description = message ? translateError(message) : t`An unknown error occurred while contacting the PDF service.`;

    toast({
      variant: "error",
      title: t`PDF Service Error`,
      description,
    });

    // Reject with a generic error or the specific message if available
    return Promise.reject(new Error(typeof message === 'string' ? message : 'PDF Service Error'));
  },
);

// Removed auth refresh interceptors as auth is handled by Supabase
