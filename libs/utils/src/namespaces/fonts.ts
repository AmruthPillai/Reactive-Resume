export type Font = {
  family: string;
  category: string;
  subsets: string[];
  variants: string[];
  files: Record<string, string>;
};

/**
 * Known system fonts we consider available locally without fetching from Google Fonts.
 * Extend this list when adding more system-safe families to the app.
 */
export const localFonts = ["Arial", "Cambria", "Garamond", "Times New Roman"];

/**
 * Checks whether a font family is a local/system font.
 *
 * Input: font family name (case-insensitive)
 * Output: true if present in localFonts, otherwise false
 */
export const isLocalFont = (family: string): boolean =>
  localFonts.some((f) => f.toLowerCase() === family.toLowerCase());

export const fonts: Font[] = [
  {
    family: "Roboto",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "700",
      "700italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1MmgWxPKTM1K9nz.ttf",
      "300": "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5vAx05IsDqlA.ttf",
      "500": "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf",
      "700": "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAx05IsDqlA.ttf",
      "900": "http://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmYUtvAx05IsDqlA.ttf",
      "100italic": "http://fonts.gstatic.com/s/roboto/v30/KFOiCnqEu92Fr1Mu51QrIzcXLsnzjYk.ttf",
      "300italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TjARc9AMX6lJBP.ttf",
      regular: "http://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
      italic: "http://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu52xPKTM1K9nz.ttf",
      "500italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51S7ABc9AMX6lJBP.ttf",
      "700italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TzBhc9AMX6lJBP.ttf",
      "900italic": "http://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TLBBc9AMX6lJBP.ttf",
    },
  },
  {
    family: "Open Sans",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "latin",
      "latin-ext",
      "vietnamese",
    ],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0C4nY1M2xLER.ttf",
      "500":
        "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjr0C4nY1M2xLER.ttf",
      "600":
        "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsgH1y4nY1M2xLER.ttf",
      "700":
        "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf",
      "800":
        "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgshZ1y4nY1M2xLER.ttf",
      regular:
        "http://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk5hkaVcUwaERZjA.ttf",
      italic:
        "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk8ZkaVcUwaERZjA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk_RkaVcUwaERZjA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkxhjaVcUwaERZjA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0RkyFjaVcUwaERZjA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/opensans/v36/memQYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWq8tWZ0Pw86hd0Rk0ZjaVcUwaERZjA.ttf",
    },
  },
  {
    family: "Noto Sans JP",
    category: "sans-serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEi75vY0rw-oME.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFJEj75vY0rw-oME.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFE8j75vY0rw-oME.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFCMj75vY0rw-oME.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFM8k75vY0rw-oME.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFPYk75vY0rw-oME.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFJEk75vY0rw-oME.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFLgk75vY0rw-oME.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75vY0rw-oME.ttf",
    },
  },
  {
    family: "Montserrat",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-Y3tcoqK5.ttf",
      "200":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Ew-Y3tcoqK5.ttf",
      "300":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-Y3tcoqK5.ttf",
      "500":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-Y3tcoqK5.ttf",
      "600":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-Y3tcoqK5.ttf",
      "700":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-Y3tcoqK5.ttf",
      "800":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w-Y3tcoqK5.ttf",
      "900":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC70w-Y3tcoqK5.ttf",
      regular:
        "http://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R8aX9-p7K5ILg.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR9aX9-p7K5ILg.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq_p9aX9-p7K5ILg.ttf",
      italic:
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9aX9-p7K5ILg.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq5Z9aX9-p7K5ILg.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq3p6aX9-p7K5ILg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq0N6aX9-p7K5ILg.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR6aX9-p7K5ILg.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/montserrat/v26/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqw16aX9-p7K5ILg.ttf",
    },
  },
  {
    family: "Lato",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "100",
      "100italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "700",
      "700italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30wWyWrFCbw7A.ttf",
      "300": "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USew-FGC_p9dw.ttf",
      "700": "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVew-FGC_p9dw.ttf",
      "900": "http://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50Xew-FGC_p9dw.ttf",
      "100italic": "http://fonts.gstatic.com/s/lato/v24/S6u-w4BMUTPHjxsIPy-vNiPg7MU0.ttf",
      "300italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI9w2PHA3s5dwt7w.ttf",
      regular: "http://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHvxk6XweuBCY.ttf",
      italic: "http://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxswWyWrFCbw7A.ttf",
      "700italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI5wqPHA3s5dwt7w.ttf",
      "900italic": "http://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI3wiPHA3s5dwt7w.ttf",
    },
  },
  {
    family: "Poppins",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrLPTed3FBGPaTSQ.ttf",
      "200": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_V1tvFP-KUEg.ttf",
      "300": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8V1tvFP-KUEg.ttf",
      "500": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9V1tvFP-KUEg.ttf",
      "600": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
      "700": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7V1tvFP-KUEg.ttf",
      "800": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4V1tvFP-KUEg.ttf",
      "900": "http://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5V1tvFP-KUEg.ttf",
      "100italic": "http://fonts.gstatic.com/s/poppins/v20/pxiAyp8kv8JHgFVrJJLmE3tFOvODSVFF.ttf",
      "200italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmv1plEN2PQEhcqw.ttf",
      "300italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm21llEN2PQEhcqw.ttf",
      regular: "http://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
      italic: "http://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrJJLed3FBGPaTSQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmg1hlEN2PQEhcqw.ttf",
      "600italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmr19lEN2PQEhcqw.ttf",
      "700italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmy15lEN2PQEhcqw.ttf",
      "800italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm111lEN2PQEhcqw.ttf",
      "900italic": "http://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm81xlEN2PQEhcqw.ttf",
    },
  },
  {
    family: "Roboto Condensed",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/robotocondensed/v25/ieVi2ZhZI2eCN5jzbjEETS9weq8-33mZKCMSbvtdYyQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/robotocondensed/v25/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meKCMSbvtdYyQ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/robotocondensed/v25/ieVg2ZhZI2eCN5jzbjEETS9weq8-19eDpCEYatlYcyRi4A.ttf",
      regular:
        "http://fonts.gstatic.com/s/robotocondensed/v25/ieVl2ZhZI2eCN5jzbjEETS9weq8-59WxDCs5cvI.ttf",
      italic:
        "http://fonts.gstatic.com/s/robotocondensed/v25/ieVj2ZhZI2eCN5jzbjEETS9weq8-19e7CAk8YvJEeg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/robotocondensed/v25/ieVg2ZhZI2eCN5jzbjEETS9weq8-19eDtCYYatlYcyRi4A.ttf",
    },
  },
  {
    family: "Inter",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      "200":
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      "300":
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      "500":
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      "600":
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      "700":
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      "800":
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      "900":
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      regular:
        "http://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
    },
  },
  {
    family: "Roboto Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vuPQ--5Ip2sSQ.ttf",
      "200":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_XvqPQ--5Ip2sSQ.ttf",
      "300":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_gPqPQ--5Ip2sSQ.ttf",
      "500":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_7PqPQ--5Ip2sSQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_AP2PQ--5Ip2sSQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2PQ--5Ip2sSQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/robotomono/v23/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPQ--5Ip2sSQ.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAeW9AJi8SZwt.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrnnAOW9AJi8SZwt.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrk5AOW9AJi8SZwt.ttf",
      italic:
        "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlnAOW9AJi8SZwt.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrlVAOW9AJi8SZwt.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrm5B-W9AJi8SZwt.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/robotomono/v23/L0xoDF4xlVMF-BfR8bXMIjhOsXG-q2oeuFoqFrmAB-W9AJi8SZwt.ttf",
    },
  },
  {
    family: "Oswald",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs13FvgUFoZAaRliE.ttf",
      "300":
        "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs169vgUFoZAaRliE.ttf",
      "500":
        "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs18NvgUFoZAaRliE.ttf",
      "600":
        "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1y9ogUFoZAaRliE.ttf",
      "700":
        "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1xZogUFoZAaRliE.ttf",
      regular:
        "http://fonts.gstatic.com/s/oswald/v53/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvgUFoZAaRliE.ttf",
    },
  },
  {
    family: "Noto Sans",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "devanagari",
      "greek",
      "greek-ext",
      "latin",
      "latin-ext",
      "vietnamese",
    ],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/notosans/v30/o-0OIpQlx3QUlC5A4PNjhjRFSfiM7HBj.ttf",
      "200": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjKhVlY9aA5Wl6PQ.ttf",
      "300": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjThZlY9aA5Wl6PQ.ttf",
      "500": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjFhdlY9aA5Wl6PQ.ttf",
      "600": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjOhBlY9aA5Wl6PQ.ttf",
      "700": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFlY9aA5Wl6PQ.ttf",
      "800": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjQhJlY9aA5Wl6PQ.ttf",
      "900": "http://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjZhNlY9aA5Wl6PQ.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/notosans/v30/o-0MIpQlx3QUlC5A4PNr4AwhQ_yu6WBjJLE.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AyNYtyEx2xqPaif.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzpYdyEx2xqPaif.ttf",
      regular: "http://fonts.gstatic.com/s/notosans/v30/o-0IIpQlx3QUlC5A4PNb4j5Ba_2c7A.ttf",
      italic: "http://fonts.gstatic.com/s/notosans/v30/o-0OIpQlx3QUlC5A4PNr4DRFSfiM7HBj.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AyxYNyEx2xqPaif.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AydZ9yEx2xqPaif.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4Az5ZtyEx2xqPaif.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzlZdyEx2xqPaif.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/notosans/v30/o-0TIpQlx3QUlC5A4PNr4AzBZNyEx2xqPaif.ttf",
    },
  },
  {
    family: "Raleway",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvao4CPNLA3JC9c.ttf",
      "200":
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtaooCPNLA3JC9c.ttf",
      "300":
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVuEooCPNLA3JC9c.ttf",
      "500":
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvoooCPNLA3JC9c.ttf",
      "600":
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVsEpYCPNLA3JC9c.ttf",
      "700":
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCPNLA3JC9c.ttf",
      "800":
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtapYCPNLA3JC9c.ttf",
      "900":
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtzpYCPNLA3JC9c.ttf",
      regular:
        "http://fonts.gstatic.com/s/raleway/v29/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCPNLA3JC9c.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjNPrQVIT9c2c8.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4ejMPrQVIT9c2c8.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4TbMPrQVIT9c2c8.ttf",
      italic:
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4WjMPrQVIT9c2c8.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4VrMPrQVIT9c2c8.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4bbLPrQVIT9c2c8.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4Y_LPrQVIT9c2c8.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4ejLPrQVIT9c2c8.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/raleway/v29/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4cHLPrQVIT9c2c8.ttf",
    },
  },
  {
    family: "Nunito Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVilntF8kA_Ykqw.ttf",
      "300":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GiClntF8kA_Ykqw.ttf",
      "500":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G5ClntF8kA_Ykqw.ttf",
      "600":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GCC5ntF8kA_Ykqw.ttf",
      "700":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GMS5ntF8kA_Ykqw.ttf",
      "800":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4GVi5ntF8kA_Ykqw.ttf",
      "900":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4Gfy5ntF8kA_Ykqw.ttf",
      regular:
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G1ilntF8kA_Ykqw.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP91UgIfM0qxVd.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmrR91UgIfM0qxVd.ttf",
      italic:
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmqP91UgIfM0qxVd.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmq991UgIfM0qxVd.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpR8FUgIfM0qxVd.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmpo8FUgIfM0qxVd.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmoP8FUgIfM0qxVd.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/nunitosans/v15/pe1kMImSLYBIv1o4X1M8cce4OdVisMz5nZRqy6cmmmU3t2FQWEAEOvV9wNvrwlNstMKW3Y6K5WMwXeVy3GboJ0kTHmom8FUgIfM0qxVd.ttf",
    },
  },
  {
    family: "Roboto Slab",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojIWWaG5iddG-1A.ttf",
      "200":
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoDISWaG5iddG-1A.ttf",
      "300":
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjo0oSWaG5iddG-1A.ttf",
      "500":
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjovoSWaG5iddG-1A.ttf",
      "600":
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoUoOWaG5iddG-1A.ttf",
      "700":
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoa4OWaG5iddG-1A.ttf",
      "800":
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoDIOWaG5iddG-1A.ttf",
      "900":
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjoJYOWaG5iddG-1A.ttf",
      regular:
        "http://fonts.gstatic.com/s/robotoslab/v33/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISWaG5iddG-1A.ttf",
    },
  },
  {
    family: "Ubuntu",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["300", "300italic", "regular", "italic", "500", "500italic", "700", "700italic"],
    files: {
      "300": "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoC1CzTt2aMH4V_gg.ttf",
      "500": "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCjC3Tt2aMH4V_gg.ttf",
      "700": "http://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvTt2aMH4V_gg.ttf",
      "300italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZftWyIPYBvgpUI.ttf",
      regular: "http://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgo6eAT3v02QFg.ttf",
      italic: "http://fonts.gstatic.com/s/ubuntu/v20/4iCu6KVjbNBYlgoKeg7znUiAFpxm.ttf",
      "500italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejYHtGyIPYBvgpUI.ttf",
      "700italic": "http://fonts.gstatic.com/s/ubuntu/v20/4iCp6KVjbNBYlgoKejZPsmyIPYBvgpUI.ttf",
    },
  },
  {
    family: "Nunito",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDDshRTM9jo7eTWk.ttf",
      "300":
        "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDOUhRTM9jo7eTWk.ttf",
      "500":
        "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhRTM9jo7eTWk.ttf",
      "600":
        "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDGUmRTM9jo7eTWk.ttf",
      "700":
        "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDFwmRTM9jo7eTWk.ttf",
      "800":
        "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDDsmRTM9jo7eTWk.ttf",
      "900":
        "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDBImRTM9jo7eTWk.ttf",
      regular:
        "http://fonts.gstatic.com/s/nunito/v26/XRXI3I6Li01BKofiOc5wtlZ2di8HDLshRTM9jo7eTWk.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiLXA3iqzbXWnoeg.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNi83A3iqzbXWnoeg.ttf",
      italic:
        "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNirXA3iqzbXWnoeg.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNin3A3iqzbXWnoeg.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNic3c3iqzbXWnoeg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiSnc3iqzbXWnoeg.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiLXc3iqzbXWnoeg.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/nunito/v26/XRXK3I6Li01BKofIMPyPbj8d7IEAGXNiBHc3iqzbXWnoeg.ttf",
    },
  },
  {
    family: "Playfair Display",
    category: "serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "500":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vUDQZNLo_U2r.ttf",
      "600":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebukDQZNLo_U2r.ttf",
      "700":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQZNLo_U2r.ttf",
      "800":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfFukDQZNLo_U2r.ttf",
      "900":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfsukDQZNLo_U2r.ttf",
      regular:
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf",
      italic:
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtbK-F2rA0s.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_pqTbtbK-F2rA0s.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_naUbtbK-F2rA0s.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_k-UbtbK-F2rA0s.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_iiUbtbK-F2rA0s.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/playfairdisplay/v36/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_gGUbtbK-F2rA0s.ttf",
    },
  },
  {
    family: "Rubik",
    category: "sans-serif",
    subsets: ["arabic", "cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "300": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-WYi1UE80V4bVkA.ttf",
      "500": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-NYi1UE80V4bVkA.ttf",
      "600": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-2Y-1UE80V4bVkA.ttf",
      "700": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-4I-1UE80V4bVkA.ttf",
      "800": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-h4-1UE80V4bVkA.ttf",
      "900": "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-ro-1UE80V4bVkA.ttf",
      regular:
        "http://fonts.gstatic.com/s/rubik/v28/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1UE80V4bVkA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8sDE0UwdYPFkJ1O.ttf",
      italic:
        "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8tdE0UwdYPFkJ1O.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8tvE0UwdYPFkJ1O.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8uDFEUwdYPFkJ1O.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8u6FEUwdYPFkJ1O.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8vdFEUwdYPFkJ1O.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/rubik/v28/iJWbBXyIfDnIV7nEt3KSJbVDV49rz8v0FEUwdYPFkJ1O.ttf",
    },
  },
  {
    family: "Merriweather",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "300italic", "regular", "italic", "700", "700italic", "900", "900italic"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l521wRpX837pvjxPA.ttf",
      "700":
        "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52xwNpX837pvjxPA.ttf",
      "900":
        "http://fonts.gstatic.com/s/merriweather/v30/u-4n0qyriQwlOrhSvowK_l52_wFpX837pvjxPA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR7lXcf_hP3hPGWH.ttf",
      regular: "http://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5OeyxNV-bnrw.ttf",
      italic:
        "http://fonts.gstatic.com/s/merriweather/v30/u-4m0qyriQwlOrhSvowK_l5-eSZJdeP3r-Ho.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR71Wsf_hP3hPGWH.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/merriweather/v30/u-4l0qyriQwlOrhSvowK_l5-eR7NWMf_hP3hPGWH.ttf",
    },
  },
  {
    family: "PT Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/ptsans/v17/jizfRExUiTo99u79B_mh4OmnLD0Z4zM.ttf",
      regular: "http://fonts.gstatic.com/s/ptsans/v17/jizaRExUiTo99u79P0WOxOGMMDQ.ttf",
      italic: "http://fonts.gstatic.com/s/ptsans/v17/jizYRExUiTo99u79D0eEwMOJIDQA-g.ttf",
      "700italic": "http://fonts.gstatic.com/s/ptsans/v17/jizdRExUiTo99u79D0e8fOytKB8c8zMrig.ttf",
    },
  },
  {
    family: "Noto Sans KR",
    category: "sans-serif",
    subsets: ["cyrillic", "korean", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuozeLTq8H4hfeE.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzmoyeLTq8H4hfeE.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzrQyeLTq8H4hfeE.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzztgyeLTq8H4hfeE.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzjQ1eLTq8H4hfeE.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzg01eLTq8H4hfeE.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzmo1eLTq8H4hfeE.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzkM1eLTq8H4hfeE.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLTq8H4hfeE.ttf",
    },
  },
  {
    family: "Kanit",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcr72GwWKcaxALFs.ttf",
      "200": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5aOiWgX6BJNUJy.ttf",
      "300": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4-OSWgX6BJNUJy.ttf",
      "500": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5mOCWgX6BJNUJy.ttf",
      "600": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr5KPyWgX6BJNUJy.ttf",
      "700": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4uPiWgX6BJNUJy.ttf",
      "800": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4yPSWgX6BJNUJy.ttf",
      "900": "http://fonts.gstatic.com/s/kanit/v15/nKKU-Go6G5tXcr4WPCWgX6BJNUJy.ttf",
      "100italic": "http://fonts.gstatic.com/s/kanit/v15/nKKV-Go6G5tXcraQI2GAdY5FPFtrGw.ttf",
      "200italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI82hVaRrMFJyAu4.ttf",
      "300italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6miVaRrMFJyAu4.ttf",
      regular: "http://fonts.gstatic.com/s/kanit/v15/nKKZ-Go6G5tXcoaSEQGodLxA.ttf",
      italic: "http://fonts.gstatic.com/s/kanit/v15/nKKX-Go6G5tXcraQGwWKcaxALFs.ttf",
      "500italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI_GjVaRrMFJyAu4.ttf",
      "600italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI92kVaRrMFJyAu4.ttf",
      "700italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI7mlVaRrMFJyAu4.ttf",
      "800italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI6WmVaRrMFJyAu4.ttf",
      "900italic": "http://fonts.gstatic.com/s/kanit/v15/nKKS-Go6G5tXcraQI4GnVaRrMFJyAu4.ttf",
    },
  },
  {
    family: "Work Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nWNigDp6_cOyA.ttf",
      "200":
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K8nXNigDp6_cOyA.ttf",
      "300":
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXNigDp6_cOyA.ttf",
      "500":
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K3vXNigDp6_cOyA.ttf",
      "600":
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K5fQNigDp6_cOyA.ttf",
      "700":
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K67QNigDp6_cOyA.ttf",
      "800":
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K8nQNigDp6_cOyA.ttf",
      "900":
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K-DQNigDp6_cOyA.ttf",
      regular:
        "http://fonts.gstatic.com/s/worksans/v19/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nXNigDp6_cOyA.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU3moJo43ZKyDSQQ.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUXmsJo43ZKyDSQQ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUgGsJo43ZKyDSQQ.ttf",
      italic:
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU3msJo43ZKyDSQQ.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGU7GsJo43ZKyDSQQ.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUAGwJo43ZKyDSQQ.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUOWwJo43ZKyDSQQ.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUXmwJo43ZKyDSQQ.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/worksans/v19/QGY9z_wNahGAdqQ43Rh_ebrnlwyYfEPxPoGUd2wJo43ZKyDSQQ.ttf",
    },
  },
  {
    family: "Lora",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      "500": "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787wsuyJGmKxemMeZ.ttf",
      "600": "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787zAvCJGmKxemMeZ.ttf",
      "700": "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787z5vCJGmKxemMeZ.ttf",
      regular: "http://fonts.gstatic.com/s/lora/v32/0QI6MX1D_JOuGQbT0gvTJPa787weuyJGmKxemMeZ.ttf",
      italic: "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-MoFkqh8ndeZzZ0.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-PgFkqh8ndeZzZ0.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-BQCkqh8ndeZzZ0.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/lora/v32/0QI8MX1D_JOuMw_hLdO6T2wV9KnW-C0Ckqh8ndeZzZ0.ttf",
    },
  },
  {
    family: "Mukta",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      "200": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEOjFma-2HW7ZB_.ttf",
      "300": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbFqj1ma-2HW7ZB_.ttf",
      "500": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEyjlma-2HW7ZB_.ttf",
      "600": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbEeiVma-2HW7ZB_.ttf",
      "700": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbF6iFma-2HW7ZB_.ttf",
      "800": "http://fonts.gstatic.com/s/mukta/v14/iJWHBXyXfDDVXbFmi1ma-2HW7ZB_.ttf",
      regular: "http://fonts.gstatic.com/s/mukta/v14/iJWKBXyXfDDVXYnGp32S0H3f.ttf",
    },
  },
  {
    family: "Noto Sans TC",
    category: "sans-serif",
    subsets: ["chinese-traditional", "cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cz_CpOtma3uNQ.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7yCy_CpOtma3uNQ.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7_6y_CpOtma3uNQ.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz75Ky_CpOtma3uNQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7361_CpOtma3uNQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz70e1_CpOtma3uNQ.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7yC1_CpOtma3uNQ.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz7wm1_CpOtma3uNQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosanstc/v35/-nFuOG829Oofr2wohFbTp9ifNAn722rq0MXz76Cy_CpOtma3uNQ.ttf",
    },
  },
  {
    family: "Fira Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5Vn9IjOazP3dUTP.ttf",
      "200": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnWKnuQR37fF3Wlg.ttf",
      "300": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnPKruQR37fF3Wlg.ttf",
      "500": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKvuQR37fF3Wlg.ttf",
      "600": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzuQR37fF3Wlg.ttf",
      "700": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnLK3uQR37fF3Wlg.ttf",
      "800": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnMK7uQR37fF3Wlg.ttf",
      "900": "http://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnFK_uQR37fF3Wlg.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/firasans/v17/va9A4kDNxMZdWfMOD5VvkrCqYTfVcFTPj0s.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAGQBf_XljGllLX.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBiQxf_XljGllLX.ttf",
      regular: "http://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VfkILKSTbndQ.ttf",
      italic: "http://fonts.gstatic.com/s/firasans/v17/va9C4kDNxMZdWfMOD5VvkojOazP3dUTP.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrA6Qhf_XljGllLX.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrAWRRf_XljGllLX.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrByRBf_XljGllLX.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBuRxf_XljGllLX.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/firasans/v17/va9f4kDNxMZdWfMOD5VvkrBKRhf_XljGllLX.ttf",
    },
  },
  {
    family: "Quicksand",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkKEo18G0wx40QDw.ttf",
      "500":
        "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkM0o18G0wx40QDw.ttf",
      "600":
        "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkCEv18G0wx40QDw.ttf",
      "700":
        "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkBgv18G0wx40QDw.ttf",
      regular:
        "http://fonts.gstatic.com/s/quicksand/v31/6xK-dSZaM9iE8KbpRA_LJ3z8mH9BOJvgkP8o18G0wx40QDw.ttf",
    },
  },
  {
    family: "Barlow",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/barlow/v12/7cHrv4kjgoGqM7E3b8s8yn4hnCci.ttf",
      "200": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3w-oc4FAtlT47dw.ttf",
      "300": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3p-kc4FAtlT47dw.ttf",
      "500": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3_-gc4FAtlT47dw.ttf",
      "600": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E30-8c4FAtlT47dw.ttf",
      "700": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3t-4c4FAtlT47dw.ttf",
      "800": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3q-0c4FAtlT47dw.ttf",
      "900": "http://fonts.gstatic.com/s/barlow/v12/7cHqv4kjgoGqM7E3j-wc4FAtlT47dw.ttf",
      "100italic": "http://fonts.gstatic.com/s/barlow/v12/7cHtv4kjgoGqM7E_CfNYwHoDmTcibrA.ttf",
      "200italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfP04Voptzsrd6m9.ttf",
      "300italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOQ4loptzsrd6m9.ttf",
      regular: "http://fonts.gstatic.com/s/barlow/v12/7cHpv4kjgoGqM7EPC8E46HsxnA.ttf",
      italic: "http://fonts.gstatic.com/s/barlow/v12/7cHrv4kjgoGqM7E_Ccs8yn4hnCci.ttf",
      "500italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfPI41optzsrd6m9.ttf",
      "600italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfPk5Foptzsrd6m9.ttf",
      "700italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOA5Voptzsrd6m9.ttf",
      "800italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfOc5loptzsrd6m9.ttf",
      "900italic": "http://fonts.gstatic.com/s/barlow/v12/7cHsv4kjgoGqM7E_CfO451optzsrd6m9.ttf",
    },
  },
  {
    family: "Inconsolata",
    category: "monospace",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7LppwU8aRr8lleY2co.ttf",
      "300":
        "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp9s8aRr8lleY2co.ttf",
      "500":
        "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp7c8aRr8lleY2co.ttf",
      "600":
        "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp1s7aRr8lleY2co.ttf",
      "700":
        "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp2I7aRr8lleY2co.ttf",
      "800":
        "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7LppwU7aRr8lleY2co.ttf",
      "900":
        "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lppyw7aRr8lleY2co.ttf",
      regular:
        "http://fonts.gstatic.com/s/inconsolata/v32/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8aRr8lleY2co.ttf",
    },
  },
  {
    family: "IBM Plex Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX-KVElMYYaJe8bpLHnCwDKjbLeEKxIedbzDw.ttf",
      "200":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjR7_MIZmdd_qFmo.ttf",
      "300":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjXr8MIZmdd_qFmo.ttf",
      "500":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjSL9MIZmdd_qFmo.ttf",
      "600":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76MIZmdd_qFmo.ttf",
      "700":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjWr7MIZmdd_qFmo.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX8KVElMYYaJe8bpLHnCwDKhdTmdKZMW9PjD3N8.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTm2Idscf3vBmpl8A.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmvIRscf3vBmpl8A.ttf",
      regular: "http://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKtdbUFI5NadY.ttf",
      italic:
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX-KVElMYYaJe8bpLHnCwDKhdTeEKxIedbzDw.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTm5IVscf3vBmpl8A.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmyIJscf3vBmpl8A.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/ibmplexsans/v19/zYX7KVElMYYaJe8bpLHnCwDKhdTmrINscf3vBmpl8A.ttf",
    },
  },
  {
    family: "Mulish",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexRNRwaClGrw-PTY.ttf",
      "300":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexc1RwaClGrw-PTY.ttf",
      "500":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexaFRwaClGrw-PTY.ttf",
      "600":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexU1WwaClGrw-PTY.ttf",
      "700":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexXRWwaClGrw-PTY.ttf",
      "800":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexRNWwaClGrw-PTY.ttf",
      "900":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexTpWwaClGrw-PTY.ttf",
      regular:
        "http://fonts.gstatic.com/s/mulish/v13/1Ptyg83HX_SGhgqO0yLcmjzUAuWexZNRwaClGrw-PTY.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSqeOvHp47LTZFwA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSd-OvHp47LTZFwA.ttf",
      italic:
        "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSKeOvHp47LTZFwA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSG-OvHp47LTZFwA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsS9-SvHp47LTZFwA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSzuSvHp47LTZFwA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSqeSvHp47LTZFwA.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/mulish/v13/1Ptwg83HX_SGhgqk2hAjQlW_mEuZ0FsSgOSvHp47LTZFwA.ttf",
    },
  },
  {
    family: "PT Serif",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/ptserif/v18/EJRSQgYoZZY2vCFuvAnt65qVXSr3pNNB.ttf",
      regular: "http://fonts.gstatic.com/s/ptserif/v18/EJRVQgYoZZY2vCFuvDFRxL6ddjb-.ttf",
      italic: "http://fonts.gstatic.com/s/ptserif/v18/EJRTQgYoZZY2vCFuvAFTzrq_cyb-vco.ttf",
      "700italic": "http://fonts.gstatic.com/s/ptserif/v18/EJRQQgYoZZY2vCFuvAFT9gaQVy7VocNB6Iw.ttf",
    },
  },
  {
    family: "DM Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAop1hTmf3ZGMZpg.ttf",
      "200":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpxhTmf3ZGMZpg.ttf",
      "300":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwA_JxhTmf3ZGMZpg.ttf",
      "500":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTmf3ZGMZpg.ttf",
      "600":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTmf3ZGMZpg.ttf",
      "700":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTmf3ZGMZpg.ttf",
      "800":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpthTmf3ZGMZpg.ttf",
      "900":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAC5thTmf3ZGMZpg.ttf",
      regular:
        "http://fonts.gstatic.com/s/dmsans/v14/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTmf3ZGMZpg.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDG3zRmYJpso5.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JDW3zRmYJpso5.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat_XDW3zRmYJpso5.ttf",
      italic:
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW3zRmYJpso5.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-7DW3zRmYJpso5.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9XCm3zRmYJpso5.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm3zRmYJpso5.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JCm3zRmYJpso5.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/dmsans/v14/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8gCm3zRmYJpso5.ttf",
    },
  },
  {
    family: "Heebo",
    category: "sans-serif",
    subsets: ["hebrew", "latin"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiS2cckOnz02SXQ.ttf",
      "200": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1ECSycckOnz02SXQ.ttf",
      "300": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1E1yycckOnz02SXQ.ttf",
      "500": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EuyycckOnz02SXQ.ttf",
      "600": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EVyucckOnz02SXQ.ttf",
      "700": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EbiucckOnz02SXQ.ttf",
      "800": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1ECSucckOnz02SXQ.ttf",
      "900": "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EICucckOnz02SXQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/heebo/v22/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSycckOnz02SXQ.ttf",
    },
  },
  {
    family: "Noto Serif",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFGjwM0Lhq_Szw.ttf",
      "200":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZKFCjwM0Lhq_Szw.ttf",
      "300":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZ9lCjwM0Lhq_Szw.ttf",
      "500":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZmlCjwM0Lhq_Szw.ttf",
      "600":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZdlejwM0Lhq_Szw.ttf",
      "700":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZT1ejwM0Lhq_Szw.ttf",
      "800":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZKFejwM0Lhq_Szw.ttf",
      "900":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZAVejwM0Lhq_Szw.ttf",
      regular:
        "http://fonts.gstatic.com/s/notoserif/v22/ga6iaw1J5X9T9RW6j9bNVls-hfgvz8JcMofYTa32J4wsL2JAlAhZqFCjwM0Lhq_Szw.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBNLgscPpKrCzyUi.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPLg8cPpKrCzyUi.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBMVg8cPpKrCzyUi.ttf",
      italic:
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBNLg8cPpKrCzyUi.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBN5g8cPpKrCzyUi.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBOVhMcPpKrCzyUi.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBOshMcPpKrCzyUi.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPLhMcPpKrCzyUi.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/notoserif/v22/ga6saw1J5X9T9RW6j9bNfFIMZhhWnFTyNZIQD1-_FXP0RgnaOg9MYBPihMcPpKrCzyUi.ttf",
    },
  },
  {
    family: "Titillium Web",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "900",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffAzHKIx5YrSYqWM.ttf",
      "300":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffGjEKIx5YrSYqWM.ttf",
      "600":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffBzCKIx5YrSYqWM.ttf",
      "700":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffHjDKIx5YrSYqWM.ttf",
      "900":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPDcZTIAOhVxoMyOr9n_E7ffEDBKIx5YrSYqWM.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbewI1zZpaduWMmxA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbepI5zZpaduWMmxA.ttf",
      regular:
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPecZTIAOhVxoMyOr9n_E7fRMTsDIRSfr0.ttf",
      italic:
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPAcZTIAOhVxoMyOr9n_E7fdMbmCKZXbr2BsA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbe0IhzZpaduWMmxA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/titilliumweb/v17/NaPFcZTIAOhVxoMyOr9n_E7fdMbetIlzZpaduWMmxA.ttf",
    },
  },
  {
    family: "Manrope",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59FO_F87jxeN7B.ttf",
      "300":
        "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk6jFO_F87jxeN7B.ttf",
      "500":
        "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F87jxeN7B.ttf",
      "600":
        "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4jE-_F87jxeN7B.ttf",
      "700":
        "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F87jxeN7B.ttf",
      "800":
        "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk59E-_F87jxeN7B.ttf",
      regular:
        "http://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F87jxeN7B.ttf",
    },
  },
  {
    family: "Hind Siliguri",
    category: "sans-serif",
    subsets: ["bengali", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRDf44uEfKiGvxts.ttf",
      "500":
        "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRG_54uEfKiGvxts.ttf",
      "600":
        "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoREP-4uEfKiGvxts.ttf",
      "700":
        "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwOs5juQtsyLLR5jN4cxBEoRCf_4uEfKiGvxts.ttf",
      regular:
        "http://fonts.gstatic.com/s/hindsiliguri/v12/ijwTs5juQtsyLLR5jN4cxBEofJvQxuk0Nig.ttf",
    },
  },
  {
    family: "Libre Franklin",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhLsSUB9rIb-JH1g.ttf",
      "200":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhrsWUB9rIb-JH1g.ttf",
      "300":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhcMWUB9rIb-JH1g.ttf",
      "500":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhHMWUB9rIb-JH1g.ttf",
      "600":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduh8MKUB9rIb-JH1g.ttf",
      "700":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhycKUB9rIb-JH1g.ttf",
      "800":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhrsKUB9rIb-JH1g.ttf",
      "900":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhh8KUB9rIb-JH1g.ttf",
      regular:
        "http://fonts.gstatic.com/s/librefranklin/v14/jizOREVItHgc8qDIbSTKq4XkRg8T88bjFuXOnduhLsWUB9rIb-JH1g.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZ8RdDMTedX1sGE.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05ob8RNDMTedX1sGE.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oYiRNDMTedX1sGE.ttf",
      italic:
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZ8RNDMTedX1sGE.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oZORNDMTedX1sGE.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oaiQ9DMTedX1sGE.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05oabQ9DMTedX1sGE.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05ob8Q9DMTedX1sGE.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/librefranklin/v14/jizMREVItHgc8qDIbSTKq4XkRiUawTk7f45UM9y05obVQ9DMTedX1sGE.ttf",
    },
  },
  {
    family: "Karla",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    files: {
      "200": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDeJqqFENLR7fHGw.ttf",
      "300": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDppqqFENLR7fHGw.ttf",
      "500": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDypqqFENLR7fHGw.ttf",
      "600": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDJp2qFENLR7fHGw.ttf",
      "700": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDH52qFENLR7fHGw.ttf",
      "800": "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTDeJ2qFENLR7fHGw.ttf",
      regular:
        "http://fonts.gstatic.com/s/karla/v30/qkBIXvYC6trAT55ZBi1ueQVIjQTD-JqqFENLR7fHGw.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNnCV0lPZbLXGxGR.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNkcV0lPZbLXGxGR.ttf",
      italic:
        "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNlCV0lPZbLXGxGR.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNlwV0lPZbLXGxGR.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNmcUElPZbLXGxGR.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNmlUElPZbLXGxGR.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/karla/v30/qkBKXvYC6trAT7RQNNK2EG7SIwPWMNnCUElPZbLXGxGR.ttf",
    },
  },
  {
    family: "Nanum Gothic",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["regular", "700", "800"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/nanumgothic/v23/PN_oRfi-oW3hYwmKDpxS7F_LQv37zlEn14YEUQ.ttf",
      "800":
        "http://fonts.gstatic.com/s/nanumgothic/v23/PN_oRfi-oW3hYwmKDpxS7F_LXv77zlEn14YEUQ.ttf",
      regular: "http://fonts.gstatic.com/s/nanumgothic/v23/PN_3Rfi-oW3hYwmKDpxS7F_z_tLfxno73g.ttf",
    },
  },
  {
    family: "Material Icons Outlined",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/materialiconsoutlined/v109/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcdl5GuI2Ze.otf",
    },
  },
  {
    family: "Josefin Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjRXMFrLgTsQV0.ttf",
      "200":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_LjQXMFrLgTsQV0.ttf",
      "300":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_GbQXMFrLgTsQV0.ttf",
      "500":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_ArQXMFrLgTsQV0.ttf",
      "600":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_ObXXMFrLgTsQV0.ttf",
      "700":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_N_XXMFrLgTsQV0.ttf",
      regular:
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQXMFrLgTsQV0.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTtINhKibpUV3MEQ.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTNIJhKibpUV3MEQ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCT6oJhKibpUV3MEQ.ttf",
      italic:
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTtIJhKibpUV3MEQ.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCThoJhKibpUV3MEQ.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTaoVhKibpUV3MEQ.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/josefinsans/v32/Qw3JZQNVED7rKGKxtqIqX5EUCGZ2dIn0FyA96fCTU4VhKibpUV3MEQ.ttf",
    },
  },
  {
    family: "Arimo",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "latin",
      "latin-ext",
      "vietnamese",
    ],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      "500": "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk338xsBxDAVQI4aA.ttf",
      "600": "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk3M8tsBxDAVQI4aA.ttf",
      "700": "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk3CstsBxDAVQI4aA.ttf",
      regular:
        "http://fonts.gstatic.com/s/arimo/v29/P5sfzZCDf9_T_3cV7NCUECyoxNk37cxsBxDAVQI4aA.ttf",
      italic:
        "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY-ERBrEdwcoaKww.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY-2RBrEdwcoaKww.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY9aQxrEdwcoaKww.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/arimo/v29/P5sdzZCDf9_T_10c3i9MeUcyat4iJY9jQxrEdwcoaKww.ttf",
    },
  },
  {
    family: "Noto Color Emoji",
    category: "sans-serif",
    subsets: ["emoji"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/notocoloremoji/v25/Yq6P-KqIXTD0t4D9z1ESnKM3-HpFab5s79iz64w.ttf",
    },
  },
  {
    family: "Libre Baskerville",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/librebaskerville/v14/kmKiZrc3Hgbbcjq75U4uslyuy4kn0qviTjYwI8Gcw6Oi.ttf",
      regular:
        "http://fonts.gstatic.com/s/librebaskerville/v14/kmKnZrc3Hgbbcjq75U4uslyuy4kn0pNeYRI4CN2V.ttf",
      italic:
        "http://fonts.gstatic.com/s/librebaskerville/v14/kmKhZrc3Hgbbcjq75U4uslyuy4kn0qNcaxYaDc2V2ro.ttf",
    },
  },
  {
    family: "Dosis",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      "200": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJt7MV3BkFTq4EPw.ttf",
      "300": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJabMV3BkFTq4EPw.ttf",
      "500": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJBbMV3BkFTq4EPw.ttf",
      "600": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJ6bQV3BkFTq4EPw.ttf",
      "700": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJ0LQV3BkFTq4EPw.ttf",
      "800": "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJt7QV3BkFTq4EPw.ttf",
      regular:
        "http://fonts.gstatic.com/s/dosis/v32/HhyJU5sn9vOmLxNkIwRSjTVNWLEJN7MV3BkFTq4EPw.ttf",
    },
  },
  {
    family: "PT Sans Narrow",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/ptsansnarrow/v18/BngSUXNadjH0qYEzV7ab-oWlsbg95DiCUfzgRd-3.ttf",
      regular:
        "http://fonts.gstatic.com/s/ptsansnarrow/v18/BngRUXNadjH0qYEzV7ab-oWlsYCByxyKeuDp.ttf",
    },
  },
  {
    family: "Source Code Pro",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DEyQhM5hTXUcdJg.ttf",
      "300":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DJKQhM5hTXUcdJg.ttf",
      "500":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DP6QhM5hTXUcdJg.ttf",
      "600":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DBKXhM5hTXUcdJg.ttf",
      "700":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DCuXhM5hTXUcdJg.ttf",
      "800":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DEyXhM5hTXUcdJg.ttf",
      "900":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DGWXhM5hTXUcdJg.ttf",
      regular:
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_diYsKILxRpg3hIP6sJ7fM7PqPMcMnZFqUwX28DMyQhM5hTXUcdJg.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTT7I1rSVcZZJiGpw.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTMo1rSVcZZJiGpw.ttf",
      italic:
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTbI1rSVcZZJiGpw.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTXo1rSVcZZJiGpw.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTsoprSVcZZJiGpw.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTi4prSVcZZJiGpw.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTT7IprSVcZZJiGpw.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/sourcecodepro/v23/HI_jiYsKILxRpg3hIP6sJ7fM7PqlOPHYvDP_W9O7GQTTxYprSVcZZJiGpw.ttf",
    },
  },
  {
    family: "Bitter",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbeCL_EXFh2reU.ttf",
      "200":
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8XbfCL_EXFh2reU.ttf",
      "300":
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8ajfCL_EXFh2reU.ttf",
      "500":
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8cTfCL_EXFh2reU.ttf",
      "600":
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8SjYCL_EXFh2reU.ttf",
      "700":
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8RHYCL_EXFh2reU.ttf",
      "800":
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8XbYCL_EXFh2reU.ttf",
      "900":
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8V_YCL_EXFh2reU.ttf",
      regular:
        "http://fonts.gstatic.com/s/bitter/v33/raxhHiqOu8IVPmnRc6SY1KXhnF_Y8fbfCL_EXFh2reU.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c4P3OWHpzveWxBw.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cYPzOWHpzveWxBw.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cvvzOWHpzveWxBw.ttf",
      italic:
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c4PzOWHpzveWxBw.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6c0vzOWHpzveWxBw.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cPvvOWHpzveWxBw.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cB_vOWHpzveWxBw.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cYPvOWHpzveWxBw.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/bitter/v33/raxjHiqOu8IVPmn7epZnDMyKBvHf5D6cSfvOWHpzveWxBw.ttf",
    },
  },
  {
    family: "Cabin",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkW-EL7Gvxm7rE_s.ttf",
      "600":
        "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkYODL7Gvxm7rE_s.ttf",
      "700":
        "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkbqDL7Gvxm7rE_s.ttf",
      regular:
        "http://fonts.gstatic.com/s/cabin/v27/u-4X0qWljRw-PfU81xCKCpdpbgZJl6XFpfEd7eA9BIxxkV2EL7Gvxm7rE_s.ttf",
      italic:
        "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHx_KlwkzuA_u1Bg.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXH9fKlwkzuA_u1Bg.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHGfWlwkzuA_u1Bg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/cabin/v27/u-4V0qWljRw-Pd815fNqc8T_wAFcX-c37MPiNYlWniJ2hJXHIPWlwkzuA_u1Bg.ttf",
    },
  },
  {
    family: "Assistant",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtmZnEGGf3qGuvM4.ttf",
      "300":
        "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtrhnEGGf3qGuvM4.ttf",
      "500":
        "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQttRnEGGf3qGuvM4.ttf",
      "600":
        "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtjhgEGGf3qGuvM4.ttf",
      "700":
        "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtgFgEGGf3qGuvM4.ttf",
      "800":
        "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtmZgEGGf3qGuvM4.ttf",
      regular:
        "http://fonts.gstatic.com/s/assistant/v19/2sDPZGJYnIjSi6H75xkZZE1I0yCmYzzQtuZnEGGf3qGuvM4.ttf",
    },
  },
  {
    family: "Oxygen",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "regular", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCJW8Db2-4C7wFZQ.ttf",
      "700": "http://fonts.gstatic.com/s/oxygen/v15/2sDcZG1Wl4LcnbuCNWgDb2-4C7wFZQ.ttf",
      regular: "http://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4Lcnbu6iUcnZ0SkAg.ttf",
    },
  },
  {
    family: "Bebas Neue",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5rygbi49c.ttf",
    },
  },
  {
    family: "EB Garamond",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    files: {
      "500":
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-2fRUA4V-e6yHgQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-NfNUA4V-e6yHgQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-DPNUA4V-e6yHgQ.ttf",
      "800":
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-a_NUA4V-e6yHgQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-6_RUA4V-e6yHgQ.ttf",
      italic:
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7e8QI96WamXgXFI.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7eOQI96WamXgXFI.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7diR496WamXgXFI.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7dbR496WamXgXFI.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/ebgaramond/v27/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7c8R496WamXgXFI.ttf",
    },
  },
  {
    family: "Cairo",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA-W1ToLQ-HmkA.ttf",
      "300":
        "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hL4-W1ToLQ-HmkA.ttf",
      "500":
        "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hNI-W1ToLQ-HmkA.ttf",
      "600":
        "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hD45W1ToLQ-HmkA.ttf",
      "700":
        "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hAc5W1ToLQ-HmkA.ttf",
      "800":
        "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hGA5W1ToLQ-HmkA.ttf",
      "900":
        "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hEk5W1ToLQ-HmkA.ttf",
      regular:
        "http://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvangtZmpQdkhzfH5lkSs2SgRjCAGMQ1z0hOA-W1ToLQ-HmkA.ttf",
    },
  },
  {
    family: "Anton",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/anton/v25/1Ptgg87LROyAm0K08i4gS7lu.ttf",
    },
  },
  {
    family: "Abel",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/abel/v18/MwQ5bhbm2POE6VhLPJp6qGI.ttf",
    },
  },
  {
    family: "Dancing Script",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BAyoHTeB9ptDqpw.ttf",
      "600":
        "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B7y0HTeB9ptDqpw.ttf",
      "700":
        "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7B1i0HTeB9ptDqpw.ttf",
      regular:
        "http://fonts.gstatic.com/s/dancingscript/v25/If2cXTr6YS-zF4S-kcSWSVi_sxjsohD9F50Ruu7BMSoHTeB9ptDqpw.ttf",
    },
  },
  {
    family: "Barlow Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B43LT31vytKgbaw.ttf",
      "200":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B497y_3HcuKECcrs.ttf",
      "300":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B47rx_3HcuKECcrs.ttf",
      "500":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B4-Lw_3HcuKECcrs.ttf",
      "600":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B4873_3HcuKECcrs.ttf",
      "700":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B46r2_3HcuKECcrs.ttf",
      "800":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B47b1_3HcuKECcrs.ttf",
      "900":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B45L0_3HcuKECcrs.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxzL3I-JCGChYJ8VI-L6OO_au7B6xTru1H2lq0La6JN.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrF3DWvIMHYrtUxg.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrc3PWvIMHYrtUxg.ttf",
      regular:
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTx3L3I-JCGChYJ8VI-L6OO_au7B2xbZ23n3pKg.ttf",
      italic:
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B6xTT31vytKgbaw.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrK3LWvIMHYrtUxg.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrB3XWvIMHYrtUxg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrY3TWvIMHYrtUxg.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrf3fWvIMHYrtUxg.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/barlowcondensed/v12/HTxyL3I-JCGChYJ8VI-L6OO_au7B6xTrW3bWvIMHYrtUxg.ttf",
    },
  },
  {
    family: "Hind",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfMJaIRuYjDpf5Vw.ttf",
      "500": "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfJpbIRuYjDpf5Vw.ttf",
      "600": "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfLZcIRuYjDpf5Vw.ttf",
      "700": "http://fonts.gstatic.com/s/hind/v16/5aU19_a8oxmIfNJdIRuYjDpf5Vw.ttf",
      regular: "http://fonts.gstatic.com/s/hind/v16/5aU69_a8oxmIRG5yBROzkDM.ttf",
    },
  },
  {
    family: "Material Symbols Outlined",
    category: "monospace",
    subsets: ["latin"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHeembd5zrTgt.ttf",
      "200":
        "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDAvHOembd5zrTgt.ttf",
      "300":
        "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDDxHOembd5zrTgt.ttf",
      "500":
        "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCdHOembd5zrTgt.ttf",
      "600":
        "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDBxG-embd5zrTgt.ttf",
      "700":
        "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDBIG-embd5zrTgt.ttf",
      regular:
        "http://fonts.gstatic.com/s/materialsymbolsoutlined/v136/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1v-p_4MrImHCIJIZrDCvHOembd5zrTgt.ttf",
    },
  },
  {
    family: "Space Grotesk",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj62UUsjNsFjTDJK.ttf",
      "500":
        "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUUsjNsFjTDJK.ttf",
      "600":
        "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj42VksjNsFjTDJK.ttf",
      "700":
        "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksjNsFjTDJK.ttf",
      regular:
        "http://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsjNsFjTDJK.ttf",
    },
  },
  {
    family: "Noto Sans SC",
    category: "sans-serif",
    subsets: ["chinese-simplified", "cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_EnYxNbPzS5HE.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG1_FnYxNbPzS5HE.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG4HFnYxNbPzS5HE.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG-3FnYxNbPzS5HE.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGwHCnYxNbPzS5HE.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYxNbPzS5HE.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG1_CnYxNbPzS5HE.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG3bCnYxNbPzS5HE.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYxNbPzS5HE.ttf",
    },
  },
  {
    family: "Jost",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myjJAVGPokMmuHL.ttf",
      "200": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwjJQVGPokMmuHL.ttf",
      "300": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mz9JQVGPokMmuHL.ttf",
      "500": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myRJQVGPokMmuHL.ttf",
      "600": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mx9IgVGPokMmuHL.ttf",
      "700": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mxEIgVGPokMmuHL.ttf",
      "800": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwjIgVGPokMmuHL.ttf",
      "900": "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7mwKIgVGPokMmuHL.ttf",
      regular: "http://fonts.gstatic.com/s/jost/v15/92zPtBhPNqw79Ij1E865zBUv7myjJQVGPokMmuHL.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZu0ENI0un_HLMEo.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZm0FNI0un_HLMEo.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZrMFNI0un_HLMEo.ttf",
      italic: "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZu0FNI0un_HLMEo.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZt8FNI0un_HLMEo.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZjMCNI0un_HLMEo.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZgoCNI0un_HLMEo.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZm0CNI0un_HLMEo.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/jost/v15/92zJtBhPNqw73oHH7BbQp4-B6XlrZkQCNI0un_HLMEo.ttf",
    },
  },
  {
    family: "Noto Serif JP",
    category: "serif",
    subsets: ["japanese", "latin"],
    variants: ["200", "300", "regular", "500", "600", "700", "900"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZBaPRkgfU8fEwb0.otf",
      "300":
        "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZHKMRkgfU8fEwb0.otf",
      "500":
        "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZCqNRkgfU8fEwb0.otf",
      "600":
        "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZAaKRkgfU8fEwb0.otf",
      "700":
        "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZGKLRkgfU8fEwb0.otf",
      "900":
        "http://fonts.gstatic.com/s/notoserifjp/v21/xn77YHs72GKoTvER4Gn3b5eMZFqJRkgfU8fEwb0.otf",
      regular: "http://fonts.gstatic.com/s/notoserifjp/v21/xn7mYHs72GKoTvER4Gn3b5eMXNikYkY0T84.otf",
    },
  },
  {
    family: "Crimson Text",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "600", "600italic", "700", "700italic"],
    files: {
      "600":
        "http://fonts.gstatic.com/s/crimsontext/v19/wlppgwHKFkZgtmSR3NB0oRJXsCx2C9lR1LFffg.ttf",
      "700":
        "http://fonts.gstatic.com/s/crimsontext/v19/wlppgwHKFkZgtmSR3NB0oRJX1C12C9lR1LFffg.ttf",
      regular: "http://fonts.gstatic.com/s/crimsontext/v19/wlp2gwHKFkZgtmSR3NB0oRJvaAJSA_JN3Q.ttf",
      italic: "http://fonts.gstatic.com/s/crimsontext/v19/wlpogwHKFkZgtmSR3NB0oRJfaghWIfdd3ahG.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/crimsontext/v19/wlprgwHKFkZgtmSR3NB0oRJfajCOD9NV9rRPfrKu.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/crimsontext/v19/wlprgwHKFkZgtmSR3NB0oRJfajDqDtNV9rRPfrKu.ttf",
    },
  },
  {
    family: "Lobster",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/lobster/v30/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",
    },
  },
  {
    family: "Pacifico",
    category: "handwriting",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ96A4sijpFu_.ttf",
    },
  },
  {
    family: "Exo 2",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvOcPtq-rpvLpQ.ttf",
      "200": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jPvKcPtq-rpvLpQ.ttf",
      "300": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8j4PKcPtq-rpvLpQ.ttf",
      "500": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jjPKcPtq-rpvLpQ.ttf",
      "600": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jYPWcPtq-rpvLpQ.ttf",
      "700": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jWfWcPtq-rpvLpQ.ttf",
      "800": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jPvWcPtq-rpvLpQ.ttf",
      "900": "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jF_WcPtq-rpvLpQ.ttf",
      regular: "http://fonts.gstatic.com/s/exo2/v21/7cH1v4okm5zmbvwkAx_sfcEuiD8jvvKcPtq-rpvLpQ.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drF0fNC6jJ7bpQBL.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drH0fdC6jJ7bpQBL.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drEqfdC6jJ7bpQBL.ttf",
      italic:
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drF0fdC6jJ7bpQBL.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drFGfdC6jJ7bpQBL.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drGqetC6jJ7bpQBL.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drGTetC6jJ7bpQBL.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drH0etC6jJ7bpQBL.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/exo2/v21/7cH3v4okm5zmbtYtMeA0FKq0Jjg2drHdetC6jJ7bpQBL.ttf",
    },
  },
  {
    family: "Teko",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN9JG7Sy3TKEvkCF.ttf",
      "500": "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN8lG7Sy3TKEvkCF.ttf",
      "600": "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN_JHLSy3TKEvkCF.ttf",
      "700": "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN_wHLSy3TKEvkCF.ttf",
      regular: "http://fonts.gstatic.com/s/teko/v20/LYjYdG7kmE0gV69VVPPdFl06VN8XG7Sy3TKEvkCF.ttf",
    },
  },
  {
    family: "Prompt",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2CA9oYREcjeo0k.ttf",
      "200": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cr_s4bmkvc5Q9dw.ttf",
      "300": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cy_g4bmkvc5Q9dw.ttf",
      "500": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Ck_k4bmkvc5Q9dw.ttf",
      "600": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cv_44bmkvc5Q9dw.ttf",
      "700": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C2_84bmkvc5Q9dw.ttf",
      "800": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2Cx_w4bmkvc5Q9dw.ttf",
      "900": "http://fonts.gstatic.com/s/prompt/v10/-W_8XJnvUD7dzB2C4_04bmkvc5Q9dw.ttf",
      "100italic": "http://fonts.gstatic.com/s/prompt/v10/-W_7XJnvUD7dzB2KZeJ8TkMBf50kbiM.ttf",
      "200italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLQb2MrUZEtdzow.ttf",
      "300italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK0bGMrUZEtdzow.ttf",
      regular: "http://fonts.gstatic.com/s/prompt/v10/-W__XJnvUD7dzB26Z9AcZkIzeg.ttf",
      italic: "http://fonts.gstatic.com/s/prompt/v10/-W_9XJnvUD7dzB2KZdoYREcjeo0k.ttf",
      "500italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLsbWMrUZEtdzow.ttf",
      "600italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeLAamMrUZEtdzow.ttf",
      "700italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka2MrUZEtdzow.ttf",
      "800italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeK4aGMrUZEtdzow.ttf",
      "900italic": "http://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKcaWMrUZEtdzow.ttf",
    },
  },
  {
    family: "Comfortaa",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4TbMPrQVIT9c2c8.ttf",
      "500":
        "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4VrMPrQVIT9c2c8.ttf",
      "600":
        "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4bbLPrQVIT9c2c8.ttf",
      "700":
        "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LPrQVIT9c2c8.ttf",
      regular:
        "http://fonts.gstatic.com/s/comfortaa/v45/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4WjMPrQVIT9c2c8.ttf",
    },
  },
  {
    family: "Material Icons Round",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/materialiconsround/v108/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmMq_fTTvg-.otf",
    },
  },
  {
    family: "Maven Pro",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "800", "900"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8Rf25nCpozp5GvU.ttf",
      "600":
        "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8fvx5nCpozp5GvU.ttf",
      "700":
        "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8cLx5nCpozp5GvU.ttf",
      "800":
        "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8aXx5nCpozp5GvU.ttf",
      "900":
        "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8Yzx5nCpozp5GvU.ttf",
      regular:
        "http://fonts.gstatic.com/s/mavenpro/v33/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8SX25nCpozp5GvU.ttf",
    },
  },
  {
    family: "Archivo",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTNDJp8B1oJ0vyVQ.ttf",
      "200":
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTtDNp8B1oJ0vyVQ.ttf",
      "300":
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTajNp8B1oJ0vyVQ.ttf",
      "500":
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTBjNp8B1oJ0vyVQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTT6jRp8B1oJ0vyVQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTT0zRp8B1oJ0vyVQ.ttf",
      "800":
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTtDRp8B1oJ0vyVQ.ttf",
      "900":
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTnTRp8B1oJ0vyVQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/archivo/v19/k3k6o8UDI-1M0wlSV9XAw6lQkqWY8Q82sJaRE-NWIDdgffTTNDNp8B1oJ0vyVQ.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCBshdsBU7iVdxQ.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HABsxdsBU7iVdxQ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HDfsxdsBU7iVdxQ.ttf",
      italic:
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCBsxdsBU7iVdxQ.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HCzsxdsBU7iVdxQ.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HBftBdsBU7iVdxQ.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HBmtBdsBU7iVdxQ.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HABtBdsBU7iVdxQ.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/archivo/v19/k3k8o8UDI-1M0wlSfdzyIEkpwTM29hr-8mTYIRyOSVz60_PG_HAotBdsBU7iVdxQ.ttf",
    },
  },
  {
    family: "Fjalla One",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/fjallaone/v15/Yq6R-LCAWCX3-6Ky7FAFnOZwkxgtUb8.ttf",
    },
  },
  {
    family: "Signika Negative",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAr5S73st9hiuEq8.ttf",
      "500":
        "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAqVS73st9hiuEq8.ttf",
      "600":
        "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAp5TL3st9hiuEq8.ttf",
      "700":
        "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RApATL3st9hiuEq8.ttf",
      regular:
        "http://fonts.gstatic.com/s/signikanegative/v21/E21x_cfngu7HiRpPX3ZpNE4kY5zKSPmJXkF0VDD2RAqnS73st9hiuEq8.ttf",
    },
  },
  {
    family: "Varela Round",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/varelaround/v20/w8gdH283Tvk__Lua32TysjIvoMGOD9gxZw.ttf",
    },
  },
  {
    family: "Rajdhani",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pasEcOsc-bGkqIw.ttf",
      "500": "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pb0EMOsc-bGkqIw.ttf",
      "600": "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pbYF8Osc-bGkqIw.ttf",
      "700": "http://fonts.gstatic.com/s/rajdhani/v15/LDI2apCSOBg7S-QT7pa8FsOsc-bGkqIw.ttf",
      regular: "http://fonts.gstatic.com/s/rajdhani/v15/LDIxapCSOBg7S-QT7q4AOeekWPrP.ttf",
    },
  },
  {
    family: "IBM Plex Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6pfjptAgt5VM-kVkqdyU8n3kwq0n1hj-sNFQ.ttf",
      "200":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3uAL8ldPg-IUDNg.ttf",
      "300":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3oQI8ldPg-IUDNg.ttf",
      "500":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3twJ8ldPg-IUDNg.ttf",
      "600":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3vAO8ldPg-IUDNg.ttf",
      "700":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6qfjptAgt5VM-kVkqdyU8n3pQP8ldPg-IUDNg.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6rfjptAgt5VM-kVkqdyU8n1ioStndlre4dFcFh.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSGlZFh8ARHNh4zg.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSflVFh8ARHNh4zg.ttf",
      regular: "http://fonts.gstatic.com/s/ibmplexmono/v19/-F63fjptAgt5VM-kVkqdyU8n5igg1l9kn-s.ttf",
      italic:
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6pfjptAgt5VM-kVkqdyU8n1ioq0n1hj-sNFQ.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSJlRFh8ARHNh4zg.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSClNFh8ARHNh4zg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioSblJFh8ARHNh4zg.ttf",
    },
  },
  {
    family: "Outfit",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC0C4G-EiAou6Y.ttf",
      "200":
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bC1C4G-EiAou6Y.ttf",
      "300":
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4W61C4G-EiAou6Y.ttf",
      "500":
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1C4G-EiAou6Y.ttf",
      "600":
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4e6yC4G-EiAou6Y.ttf",
      "700":
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4deyC4G-EiAou6Y.ttf",
      "800":
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bCyC4G-EiAou6Y.ttf",
      "900":
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4ZmyC4G-EiAou6Y.ttf",
      regular:
        "http://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.ttf",
    },
  },
  {
    family: "DM Serif Display",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/dmserifdisplay/v15/-nFnOHM81r4j6k0gjAW3mujVU2B2K_d709jy92k.ttf",
      italic:
        "http://fonts.gstatic.com/s/dmserifdisplay/v15/-nFhOHM81r4j6k0gjAW3mujVU2B2G_Vx1_r352np3Q.ttf",
    },
  },
  {
    family: "Arvo",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/arvo/v22/tDbM2oWUg0MKoZw1yLTA8vL7lAE.ttf",
      regular: "http://fonts.gstatic.com/s/arvo/v22/tDbD2oWUg0MKmSAa7Lzr7vs.ttf",
      italic: "http://fonts.gstatic.com/s/arvo/v22/tDbN2oWUg0MKqSIQ6J7u_vvijQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/arvo/v22/tDbO2oWUg0MKqSIoVLHK9tD-hAHkGg.ttf",
    },
  },
  {
    family: "Overpass",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PLrOZCLtce-og.ttf",
      "200":
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6fPPrOZCLtce-og.ttf",
      "300":
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6ovPrOZCLtce-og.ttf",
      "500":
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6zvPrOZCLtce-og.ttf",
      "600":
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6IvTrOZCLtce-og.ttf",
      "700":
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6G_TrOZCLtce-og.ttf",
      "800":
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6fPTrOZCLtce-og.ttf",
      "900":
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6VfTrOZCLtce-og.ttf",
      regular:
        "http://fonts.gstatic.com/s/overpass/v13/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPrOZCLtce-og.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLADe5qPl8Kuosgz.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCDepqPl8Kuosgz.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLBdepqPl8Kuosgz.ttf",
      italic:
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLADepqPl8Kuosgz.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLAxepqPl8Kuosgz.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLDdfZqPl8Kuosgz.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLDkfZqPl8Kuosgz.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCDfZqPl8Kuosgz.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/overpass/v13/qFdU35WCmI96Ajtm81GgSdXCNs-VMF0vNLCqfZqPl8Kuosgz.ttf",
    },
  },
  {
    family: "Caveat",
    category: "handwriting",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjcB9SIKjYBxPigs.ttf",
      "600":
        "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SIKjYBxPigs.ttf",
      "700":
        "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjRV6SIKjYBxPigs.ttf",
      regular:
        "http://fonts.gstatic.com/s/caveat/v18/WnznHAc5bAfYB2QRah7pcpNvOx-pjfJ9SIKjYBxPigs.ttf",
    },
  },
  {
    family: "Public Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuFpi5ww0pX189fg.ttf",
      "200":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymulpm5ww0pX189fg.ttf",
      "300":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuSJm5ww0pX189fg.ttf",
      "500":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuJJm5ww0pX189fg.ttf",
      "600":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuyJ65ww0pX189fg.ttf",
      "700":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymu8Z65ww0pX189fg.ttf",
      "800":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymulp65ww0pX189fg.ttf",
      "900":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuv565ww0pX189fg.ttf",
      regular:
        "http://fonts.gstatic.com/s/publicsans/v15/ijwGs572Xtc6ZYQws9YVwllKVG8qX1oyOymuFpm5ww0pX189fg.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpRgQctfVotfj7j.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673trRgActfVotfj7j.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673toPgActfVotfj7j.ttf",
      italic:
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpRgActfVotfj7j.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tpjgActfVotfj7j.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tqPhwctfVotfj7j.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tq2hwctfVotfj7j.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673trRhwctfVotfj7j.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/publicsans/v15/ijwAs572Xtc6ZYQws9YVwnNDZpDyNjGolS673tr4hwctfVotfj7j.ttf",
    },
  },
  {
    family: "Cormorant Garamond",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQAllvuQWJ5heb_w.ttf",
      "500":
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQWlhvuQWJ5heb_w.ttf",
      "600":
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQdl9vuQWJ5heb_w.ttf",
      "700":
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQEl5vuQWJ5heb_w.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEPjuw-NxBKL_y94.ttf",
      regular:
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjornFLsS6V7w.ttf",
      italic:
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrHtPkyuF7w6C.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEO7ug-NxBKL_y94.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEOXvQ-NxBKL_y94.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/cormorantgaramond/v16/co3WmX5slCNuHLi8bLeY9MK7whWMhyjYrEPzvA-NxBKL_y94.ttf",
    },
  },
  {
    family: "M PLUS Rounded 1c",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "japanese",
      "latin",
      "latin-ext",
      "vietnamese",
    ],
    variants: ["100", "300", "regular", "500", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGCAYIAV6gnpUpoWwNkYvrugw9RuM3ixLsg6-av1x0.ttf",
      "300":
        "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0q5psKxeqmzgRK.ttf",
      "500":
        "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM1y55sKxeqmzgRK.ttf",
      "700":
        "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM064ZsKxeqmzgRK.ttf",
      "800":
        "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0m4psKxeqmzgRK.ttf",
      "900":
        "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGBAYIAV6gnpUpoWwNkYvrugw9RuM0C45sKxeqmzgRK.ttf",
      regular:
        "http://fonts.gstatic.com/s/mplusrounded1c/v15/VdGEAYIAV6gnpUpoWwNkYvrugw9RuPWGzr8C7vav.ttf",
    },
  },
  {
    family: "Slabo 27px",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/slabo27px/v14/mFT0WbgBwKPR_Z4hGN2qsxgJ1EJ7i90.ttf",
    },
  },
  {
    family: "Abril Fatface",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/abrilfatface/v23/zOL64pLDlL1D99S8g8PtiKchm-BsjOLhZBY.ttf",
    },
  },
  {
    family: "Satisfy",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/satisfy/v21/rP2Hp2yn6lkG50LoOZSCHBeHFl0.ttf",
    },
  },
  {
    family: "Asap",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYkqQsLmOXoA7Glw.ttf",
      "200":
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYEqUsLmOXoA7Glw.ttf",
      "300":
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYzKUsLmOXoA7Glw.ttf",
      "500":
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYoKUsLmOXoA7Glw.ttf",
      "600":
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYTKIsLmOXoA7Glw.ttf",
      "700":
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYdaIsLmOXoA7Glw.ttf",
      "800":
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYEqIsLmOXoA7Glw.ttf",
      "900":
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYO6IsLmOXoA7Glw.ttf",
      regular:
        "http://fonts.gstatic.com/s/asap/v30/KFOOCniXp96a4Tc2DaTeuDAoKsE617JFc49knOIYdjTYkqUsLmOXoA7Glw.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWubEbGmTggvWl0Qn.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZEbWmTggvWl0Qn.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuaabWmTggvWl0Qn.ttf",
      italic:
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmTggvWl0Qn.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWub2bWmTggvWl0Qn.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuYaammTggvWl0Qn.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuYjammTggvWl0Qn.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZEammTggvWl0Qn.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/asap/v30/KFOMCniXp96ayz4E7kSn66aGLdTylUAMQXC89YmC2DPNWuZtammTggvWl0Qn.ttf",
    },
  },
  {
    family: "Red Hat Display",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbjKWckg5-Xecg3w.ttf",
      "500":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbl6Wckg5-Xecg3w.ttf",
      "600":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbrKRckg5-Xecg3w.ttf",
      "700":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbouRckg5-Xecg3w.ttf",
      "800":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbuyRckg5-Xecg3w.ttf",
      "900":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbsWRckg5-Xecg3w.ttf",
      regular:
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIf7wUr0m80wwYf0QCXZzYzUoTK8RZQvRd-D1NYbmyWckg5-Xecg3w.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVxAsz_VWZk3zJGg.ttf",
      italic:
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVmgsz_VWZk3zJGg.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVqAsz_VWZk3zJGg.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVRAwz_VWZk3zJGg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVfQwz_VWZk3zJGg.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVGgwz_VWZk3zJGg.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/redhatdisplay/v19/8vIh7wUr0m80wwYf0QCXZzYzUoTg-CSvZX4Vlf1fe6TVMwwz_VWZk3zJGg.ttf",
    },
  },
  {
    family: "Shadows Into Light",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/shadowsintolight/v19/UqyNK9UOIntux_czAvDQx_ZcHqZXBNQDcsr4xzSMYA.ttf",
    },
  },
  {
    family: "Noto Sans Arabic",
    category: "sans-serif",
    subsets: ["arabic"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyG2vu3CBFQLaig.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfSGyvu3CBFQLaig.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCflmyvu3CBFQLaig.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCf-myvu3CBFQLaig.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfFmuvu3CBFQLaig.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfL2uvu3CBFQLaig.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfSGuvu3CBFQLaig.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfYWuvu3CBFQLaig.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyGyvu3CBFQLaig.ttf",
    },
  },
  {
    family: "Merriweather Sans",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZ_O4ljuEG7xFHnQ.ttf",
      "500":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZkO4ljuEG7xFHnQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZfOkljuEG7xFHnQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZRekljuEG7xFHnQ.ttf",
      "800":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZIukljuEG7xFHnQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cO9IRs1JiJN1FRAMjTN5zd9vgsFF_5asQTb6hZ2JKZou4ljuEG7xFHnQ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq2TzesCzRRXnaur.ttf",
      italic:
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq3NzesCzRRXnaur.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq3_zesCzRRXnaur.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq0TyusCzRRXnaur.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq0qyusCzRRXnaur.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/merriweathersans/v26/2-cM9IRs1JiJN1FRAMjTN5zd9vgsFHXwWDvLBsPDdpWMaq1NyusCzRRXnaur.ttf",
    },
  },
  {
    family: "Fira Sans Condensed",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOjEADFm8hSaQTFG18FErVhsC9x-tarWZXtqOlQfx9CjA.ttf",
      "200":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWTnMiMN-cxZblY4.ttf",
      "300":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWV3PiMN-cxZblY4.ttf",
      "500":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWQXOiMN-cxZblY4.ttf",
      "600":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWSnJiMN-cxZblY4.ttf",
      "700":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWU3IiMN-cxZblY4.ttf",
      "800":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWVHLiMN-cxZblY4.ttf",
      "900":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOsEADFm8hSaQTFG18FErVhsC9x-tarWXXKiMN-cxZblY4.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOtEADFm8hSaQTFG18FErVhsC9x-tarUfPVzONUXRpSjJcu.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVYMJ0dzRehY43EA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVBMF0dzRehY43EA.ttf",
      regular:
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOhEADFm8hSaQTFG18FErVhsC9x-tarYfHnrMtVbx8.ttf",
      italic:
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOjEADFm8hSaQTFG18FErVhsC9x-tarUfPtqOlQfx9CjA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVXMB0dzRehY43EA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVcMd0dzRehY43EA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVFMZ0dzRehY43EA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVCMV0dzRehY43EA.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/firasanscondensed/v10/wEOuEADFm8hSaQTFG18FErVhsC9x-tarUfPVLMR0dzRehY43EA.ttf",
    },
  },
  {
    family: "Material Icons Sharp",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/materialiconssharp/v109/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvSImEyc0vd.otf",
    },
  },
  {
    family: "Zilla Slab",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "300": "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYpEY2HSjWlhzbaw.ttf",
      "500": "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYskZ2HSjWlhzbaw.ttf",
      "600": "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYuUe2HSjWlhzbaw.ttf",
      "700": "http://fonts.gstatic.com/s/zillaslab/v11/dFa5ZfeM_74wlPZtksIFYoEf2HSjWlhzbaw.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CVHapXnp2fazkfg.ttf",
      regular: "http://fonts.gstatic.com/s/zillaslab/v11/dFa6ZfeM_74wlPZtksIFWj0w_HyIRlE.ttf",
      italic: "http://fonts.gstatic.com/s/zillaslab/v11/dFa4ZfeM_74wlPZtksIFaj86-F6NVlFqdA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CDHepXnp2fazkfg.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CIHCpXnp2fazkfg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/zillaslab/v11/dFanZfeM_74wlPZtksIFaj8CRHGpXnp2fazkfg.ttf",
    },
  },
  {
    family: "Tajawal",
    category: "sans-serif",
    subsets: ["arabic", "latin"],
    variants: ["200", "300", "regular", "500", "700", "800", "900"],
    files: {
      "200": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l_6gLrZjiLlJ-G0.ttf",
      "300": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l5qjLrZjiLlJ-G0.ttf",
      "500": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l8KiLrZjiLlJ-G0.ttf",
      "700": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l4qkLrZjiLlJ-G0.ttf",
      "800": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l5anLrZjiLlJ-G0.ttf",
      "900": "http://fonts.gstatic.com/s/tajawal/v9/Iurf6YBj_oCad4k1l7KmLrZjiLlJ-G0.ttf",
      regular: "http://fonts.gstatic.com/s/tajawal/v9/Iura6YBj_oCad4k1rzaLCr5IlLA.ttf",
    },
  },
  {
    family: "Material Symbols Rounded",
    category: "monospace",
    subsets: ["latin"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rIekXxKJKJBjAa8.ttf",
      "200":
        "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rAelXxKJKJBjAa8.ttf",
      "300":
        "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rNmlXxKJKJBjAa8.ttf",
      "500":
        "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rLWlXxKJKJBjAa8.ttf",
      "600":
        "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rFmiXxKJKJBjAa8.ttf",
      "700":
        "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rGCiXxKJKJBjAa8.ttf",
      regular:
        "http://fonts.gstatic.com/s/materialsymbolsrounded/v135/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDB_Qb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOcbTCVpeRL2w5rwZu2rIelXxKJKJBjAa8.ttf",
    },
  },
  {
    family: "Play",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/play/v19/6ae84K2oVqwItm4TOpc423nTJTM.ttf",
      regular: "http://fonts.gstatic.com/s/play/v19/6aez4K2oVqwIjtI8Hp8Tx3A.ttf",
    },
  },
  {
    family: "Hind Madurai",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "tamil"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfXaUnecsoMJ0b_g.ttf",
      "500":
        "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfBaQnecsoMJ0b_g.ttf",
      "600":
        "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfKaMnecsoMJ0b_g.ttf",
      "700":
        "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xu0e2p98ZvDXdZQIOcpqjfTaInecsoMJ0b_g.ttf",
      regular: "http://fonts.gstatic.com/s/hindmadurai/v11/f0Xx0e2p98ZvDXdZQIOcpqjn8Y0DceA0OQ.ttf",
    },
  },
  {
    family: "Indie Flower",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/indieflower/v21/m8JVjfNVeKWVnh3QMuKkFcZlbkGG1dKEDw.ttf",
    },
  },
  {
    family: "Barlow Semi Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlphgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfG4qvKk8ogoSP.ttf",
      "200":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRft6uPAGEki52WfA.ttf",
      "300":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf06iPAGEki52WfA.ttf",
      "500":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfi6mPAGEki52WfA.ttf",
      "600":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfp66PAGEki52WfA.ttf",
      "700":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRfw6-PAGEki52WfA.ttf",
      "800":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf36yPAGEki52WfA.ttf",
      "900":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpigxjLBV1hqnzfr-F8sEYMB0Yybp0mudRf-62PAGEki52WfA.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpjgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbLLIEsKh5SPZWs.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJnAWsgqZiGfHK5.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIDAmsgqZiGfHK5.ttf",
      regular:
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpvgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRnf4CrCEo4gg.ttf",
      italic:
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlphgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfYqvKk8ogoSP.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJbA2sgqZiGfHK5.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbJ3BGsgqZiGfHK5.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbITBWsgqZiGfHK5.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIPBmsgqZiGfHK5.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/barlowsemicondensed/v15/wlpkgxjLBV1hqnzfr-F8sEYMB0Yybp0mudRXfbIrB2sgqZiGfHK5.ttf",
    },
  },
  {
    family: "Chakra Petch",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeNIhFQJXE3AY00g.ttf",
      "500":
        "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkebIlFQJXE3AY00g.ttf",
      "600":
        "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeQI5FQJXE3AY00g.ttf",
      "700":
        "http://fonts.gstatic.com/s/chakrapetch/v11/cIflMapbsEk7TDLdtEz1BwkeJI9FQJXE3AY00g.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpLJQp_A_gMk0izH.ttf",
      regular: "http://fonts.gstatic.com/s/chakrapetch/v11/cIf6MapbsEk7TDLdtEz1BwkmmKBhSL7Y1Q.ttf",
      italic: "http://fonts.gstatic.com/s/chakrapetch/v11/cIfkMapbsEk7TDLdtEz1BwkWmqplarvI1R8t.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpKRQ5_A_gMk0izH.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpK9RJ_A_gMk0izH.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/chakrapetch/v11/cIfnMapbsEk7TDLdtEz1BwkWmpLZRZ_A_gMk0izH.ttf",
    },
  },
  {
    family: "Nanum Myeongjo",
    category: "serif",
    subsets: ["korean", "latin"],
    variants: ["regular", "700", "800"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Bty3DZF0dXLMZlywRbVRNhxy2pXV1A0pfCs5Kos.ttf",
      "800":
        "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Bty3DZF0dXLMZlywRbVRNhxy2pLVFA0pfCs5Kos.ttf",
      regular:
        "http://fonts.gstatic.com/s/nanummyeongjo/v22/9Btx3DZF0dXLMZlywRbVRNhxy1LreHQ8juyl.ttf",
    },
  },
  {
    family: "IBM Plex Sans Arabic",
    category: "sans-serif",
    subsets: ["arabic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3MZRtWPQCuHme67tEYUIx3Kh0PHR9N6YNe3PC5eMlAMg0.ttf",
      "200":
        "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPy_dCTVsVJKxTs.ttf",
      "300":
        "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YOW_tCTVsVJKxTs.ttf",
      "500":
        "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPO_9CTVsVJKxTs.ttf",
      "600":
        "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPi-NCTVsVJKxTs.ttf",
      "700":
        "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YOG-dCTVsVJKxTs.ttf",
      regular:
        "http://fonts.gstatic.com/s/ibmplexsansarabic/v12/Qw3CZRtWPQCuHme67tEYUIx3Kh0PHR9N6bs61vSbfdlA.ttf",
    },
  },
  {
    family: "Material Icons Two Tone",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/materialiconstwotone/v112/hESh6WRmNCxEqUmNyh3JDeGxjVVyMg4tHGctNCu3NjDrH_77.otf",
    },
  },
  {
    family: "Archivo Black",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/archivoblack/v21/HTxqL289NzCGg4MzN6KJ7eW6OYuP_x7yx3A.ttf",
    },
  },
  {
    family: "Noto Sans HK",
    category: "sans-serif",
    subsets: ["chinese-hongkong", "cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qHB_-oWTiYjNvVA.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qPB--oWTiYjNvVA.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qC5--oWTiYjNvVA.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qEJ--oWTiYjNvVA.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qK55-oWTiYjNvVA.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qJd5-oWTiYjNvVA.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qPB5-oWTiYjNvVA.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qNl5-oWTiYjNvVA.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosanshk/v31/nKKF-GM_FYFRJvXzVXaAPe97P1KHynJFP716qHB--oWTiYjNvVA.ttf",
    },
  },
  {
    family: "Catamaran",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "tamil"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPHjc1anXuluiLyw.ttf",
      "200":
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPPjd1anXuluiLyw.ttf",
      "300":
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPCbd1anXuluiLyw.ttf",
      "500":
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPErd1anXuluiLyw.ttf",
      "600":
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPKba1anXuluiLyw.ttf",
      "700":
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPJ_a1anXuluiLyw.ttf",
      "800":
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPPja1anXuluiLyw.ttf",
      "900":
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPNHa1anXuluiLyw.ttf",
      regular:
        "http://fonts.gstatic.com/s/catamaran/v19/o-0bIpQoyXQa2RxT7-5B6Ryxs2E_6n1iPHjd1anXuluiLyw.ttf",
    },
  },
  {
    family: "Asap Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9DSWlEgGqgp-pO.ttf",
      "300":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8nSmlEgGqgp-pO.ttf",
      "500":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9_S2lEgGqgp-pO.ttf",
      "600":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO9TTGlEgGqgp-pO.ttf",
      "700":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO83TWlEgGqgp-pO.ttf",
      "800":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8rTmlEgGqgp-pO.ttf",
      "900":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxieypY1o9NHyXh3WvSbGSggdO8PT2lEgGqgp-pO.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUIFFim6CovpOkXA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUOVGim6CovpOkXA.ttf",
      regular:
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxidypY1o9NHyXh3WvSbGSggdNeLYk1Mq3ap.ttf",
      italic:
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxifypY1o9NHyXh3WvSbGSggdOeJaElurmapvvM.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUL1Him6CovpOkXA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUJFAim6CovpOkXA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUPVBim6CovpOkXA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUOlCim6CovpOkXA.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/asapcondensed/v17/pxiYypY1o9NHyXh3WvSbGSggdOeJUM1Dim6CovpOkXA.ttf",
    },
  },
  {
    family: "Black Ops One",
    category: "display",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/blackopsone/v20/qWcsB6-ypo7xBdr6Xshe96H3WDzRtjkho4M.ttf",
    },
  },
  {
    family: "Yanone Kaffeesatz",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftodtWpcGuLCnXkVA.ttf",
      "300":
        "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoqNWpcGuLCnXkVA.ttf",
      "500":
        "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoxNWpcGuLCnXkVA.ttf",
      "600":
        "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoKNKpcGuLCnXkVA.ttf",
      "700":
        "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIftoEdKpcGuLCnXkVA.ttf",
      regular:
        "http://fonts.gstatic.com/s/yanonekaffeesatz/v29/3y9I6aknfjLm_3lMKjiMgmUUYBs04aUXNxt9gW2LIfto9tWpcGuLCnXkVA.ttf",
    },
  },
  {
    family: "Lilita One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/lilitaone/v15/i7dPIFZ9Zz-WBtRtedDbUEZ2RFq7AwU.ttf",
    },
  },
  {
    family: "IBM Plex Serif",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizBREVNn1dOx-zrZ2X3pZvkTi182zIZj1bIkNo.ttf",
      "200":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3Q-hIzoVrBicOg.ttf",
      "300":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi20-RIzoVrBicOg.ttf",
      "500":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3s-BIzoVrBicOg.ttf",
      "600":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi3A_xIzoVrBicOg.ttf",
      "700":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizAREVNn1dOx-zrZ2X3pZvkTi2k_hIzoVrBicOg.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizHREVNn1dOx-zrZ2X3pZvkTiUa41YTi3TNgNq55w.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4_oyq17jjNOg_oc.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa454xq17jjNOg_oc.ttf",
      regular:
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizDREVNn1dOx-zrZ2X3pZvkThUY0TY7ikbI.ttf",
      italic:
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizBREVNn1dOx-zrZ2X3pZvkTiUa2zIZj1bIkNo.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa48Ywq17jjNOg_oc.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4-o3q17jjNOg_oc.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/ibmplexserif/v19/jizGREVNn1dOx-zrZ2X3pZvkTiUa4442q17jjNOg_oc.ttf",
    },
  },
  {
    family: "Plus Jakarta Sans",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KU7NShXUEKi4Rw.ttf",
      "300":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_907NShXUEKi4Rw.ttf",
      "500":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_m07NShXUEKi4Rw.ttf",
      "600":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_d0nNShXUEKi4Rw.ttf",
      "700":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_TknNShXUEKi4Rw.ttf",
      "800":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_KUnNShXUEKi4Rw.ttf",
      regular:
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU7NShXUEKi4Rw.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ2lCR_QMq2oR82k.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ17CR_QMq2oR82k.ttf",
      italic:
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ0lCR_QMq2oR82k.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ0XCR_QMq2oR82k.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ37Dh_QMq2oR82k.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ3CDh_QMq2oR82k.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/plusjakartasans/v8/LDIZaomQNQcsA88c7O9yZ4KMCoOg4KozySKCdSNG9OcqYQ2lDh_QMq2oR82k.ttf",
    },
  },
  {
    family: "Questrial",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/questrial/v18/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
    },
  },
  {
    family: "Domine",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X0DAI10VErGuW8Q.ttf",
      "600":
        "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X6zHI10VErGuW8Q.ttf",
      "700":
        "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X5XHI10VErGuW8Q.ttf",
      regular:
        "http://fonts.gstatic.com/s/domine/v20/L0xhDFMnlVwD4h3Lt9JWnbX3jG-2X3LAI10VErGuW8Q.ttf",
    },
  },
  {
    family: "Permanent Marker",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/permanentmarker/v16/Fh4uPib9Iyv2ucM6pGQMWimMp004HaqIfrT5nlk.ttf",
    },
  },
  {
    family: "Signika",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r93zuYzTMngt4xjw.ttf",
      "500":
        "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9szuYzTMngt4xjw.ttf",
      "600":
        "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9XzyYzTMngt4xjw.ttf",
      "700":
        "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9ZjyYzTMngt4xjw.ttf",
      regular:
        "http://fonts.gstatic.com/s/signika/v25/vEF72_JTCgwQ5ejvMV0Ox_Kg1UwJ0tKfX4zNpD8E4ASzH1r9gTuYzTMngt4xjw.ttf",
    },
  },
  {
    family: "Frank Ruhl Libre",
    category: "serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw6bYVqQPxR2EUR_.ttf",
      "500":
        "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw73YVqQPxR2EUR_.ttf",
      "600":
        "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw4bZlqQPxR2EUR_.ttf",
      "700":
        "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw4iZlqQPxR2EUR_.ttf",
      "800":
        "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw5FZlqQPxR2EUR_.ttf",
      "900":
        "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw5sZlqQPxR2EUR_.ttf",
      regular:
        "http://fonts.gstatic.com/s/frankruhllibre/v20/j8_96_fAw7jrcalD7oKYNX0QfAnPcbzNEEB7OoicBw7FYVqQPxR2EUR_.ttf",
    },
  },
  {
    family: "M PLUS 1p",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "japanese",
      "latin",
      "latin-ext",
      "vietnamese",
    ],
    variants: ["100", "300", "regular", "500", "700", "800", "900"],
    files: {
      "100": "http://fonts.gstatic.com/s/mplus1p/v28/e3tleuShHdiFyPFzBRrQnDQAUW3aq-5N.ttf",
      "300": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQVBYge0PWovdU4w.ttf",
      "500": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQDBcge0PWovdU4w.ttf",
      "700": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQRBEge0PWovdU4w.ttf",
      "800": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQWBIge0PWovdU4w.ttf",
      "900": "http://fonts.gstatic.com/s/mplus1p/v28/e3tmeuShHdiFyPFzBRrQfBMge0PWovdU4w.ttf",
      regular: "http://fonts.gstatic.com/s/mplus1p/v28/e3tjeuShHdiFyPFzBRro-D4Ec2jKqw.ttf",
    },
  },
  {
    family: "Acme",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/acme/v25/RrQfboBx-C5_bx3Lb23lzLk.ttf",
    },
  },
  {
    family: "Almarai",
    category: "sans-serif",
    subsets: ["arabic"],
    variants: ["300", "regular", "700", "800"],
    files: {
      "300": "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS_anhnicoq72sXg.ttf",
      "700": "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS-aghnicoq72sXg.ttf",
      "800": "http://fonts.gstatic.com/s/almarai/v12/tssoApxBaigK_hnnS_qjhnicoq72sXg.ttf",
      regular: "http://fonts.gstatic.com/s/almarai/v12/tsstApxBaigK_hnnc1qPonC3vqc.ttf",
    },
  },
  {
    family: "Chivo",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_vB7ul2DSFXjQiQ.ttf",
      "200": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_PB_ul2DSFXjQiQ.ttf",
      "300": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_4h_ul2DSFXjQiQ.ttf",
      "500": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_jh_ul2DSFXjQiQ.ttf",
      "600": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_Yhjul2DSFXjQiQ.ttf",
      "700": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_Wxjul2DSFXjQiQ.ttf",
      "800": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_PBjul2DSFXjQiQ.ttf",
      "900": "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_FRjul2DSFXjQiQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/chivo/v18/va9b4kzIxd1KFppkaRKvDRPJVDf_vB_ul2DSFXjQiQ.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFwG1WrWN33AiasJ.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyG1GrWN33AiasJ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFxY1GrWN33AiasJ.ttf",
      italic:
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFwG1GrWN33AiasJ.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFw01GrWN33AiasJ.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFzY02rWN33AiasJ.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFzh02rWN33AiasJ.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyG02rWN33AiasJ.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/chivo/v18/va9Z4kzIxd1KFrBtW-13ZHhT-jDqdFyv02rWN33AiasJ.ttf",
    },
  },
  {
    family: "Bree Serif",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/breeserif/v17/4UaHrEJCrhhnVA3DgluAx63j5pN1MwI.ttf",
    },
  },
  {
    family: "Sarabun",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/sarabun/v15/DtVhJx26TKEr37c9YHZJmnYI5gnOpg.ttf",
      "200": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YNpoulwm6gDXvwE.ttf",
      "300": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YL5rulwm6gDXvwE.ttf",
      "500": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YOZqulwm6gDXvwE.ttf",
      "600": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YMptulwm6gDXvwE.ttf",
      "700": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YK5sulwm6gDXvwE.ttf",
      "800": "http://fonts.gstatic.com/s/sarabun/v15/DtVmJx26TKEr37c9YLJvulwm6gDXvwE.ttf",
      "100italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVnJx26TKEr37c9aBBx_nwMxAzephhN.ttf",
      "200italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxUl0s7iLSrwFUlw.ttf",
      "300italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxNl4s7iLSrwFUlw.ttf",
      regular: "http://fonts.gstatic.com/s/sarabun/v15/DtVjJx26TKEr37c9WBJDnlQN9gk.ttf",
      italic: "http://fonts.gstatic.com/s/sarabun/v15/DtVhJx26TKEr37c9aBBJmnYI5gnOpg.ttf",
      "500italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxbl8s7iLSrwFUlw.ttf",
      "600italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxQlgs7iLSrwFUlw.ttf",
      "700italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxJlks7iLSrwFUlw.ttf",
      "800italic": "http://fonts.gstatic.com/s/sarabun/v15/DtVkJx26TKEr37c9aBBxOlos7iLSrwFUlw.ttf",
    },
  },
  {
    family: "Didact Gothic",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/didactgothic/v20/ahcfv8qz1zt6hCC5G4F_P4ASpUySp0LlcyQ.ttf",
    },
  },
  {
    family: "Russo One",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/russoone/v16/Z9XUDmZRWg6M1LvRYsH-yMOInrib9Q.ttf",
    },
  },
  {
    family: "Lexend",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCzsX_LBte6KuGEo.ttf",
      "200":
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC7sW_LBte6KuGEo.ttf",
      "300":
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC2UW_LBte6KuGEo.ttf",
      "500":
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCwkW_LBte6KuGEo.ttf",
      "600":
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC-UR_LBte6KuGEo.ttf",
      "700":
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC9wR_LBte6KuGEo.ttf",
      "800":
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC7sR_LBte6KuGEo.ttf",
      "900":
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WC5IR_LBte6KuGEo.ttf",
      regular:
        "http://fonts.gstatic.com/s/lexend/v19/wlptgwvFAVdoq2_F94zlCfv0bz1WCzsW_LBte6KuGEo.ttf",
    },
  },
  {
    family: "Urbanist",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx8fFpOrS8SlKw.ttf",
      "200":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSx4fFpOrS8SlKw.ttf",
      "300":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDlR4fFpOrS8SlKw.ttf",
      "500":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqD-R4fFpOrS8SlKw.ttf",
      "600":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDFRkfFpOrS8SlKw.ttf",
      "700":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDLBkfFpOrS8SlKw.ttf",
      "800":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDSxkfFpOrS8SlKw.ttf",
      "900":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDYhkfFpOrS8SlKw.ttf",
      regular:
        "http://fonts.gstatic.com/s/urbanist/v15/L0xjDF02iFML4hGCyOCpRdycFsGxSrqDyx4fFpOrS8SlKw.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA133VJmvacG1K4S1.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA113VZmvacG1K4S1.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA12pVZmvacG1K4S1.ttf",
      italic:
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA133VZmvacG1K4S1.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA13FVZmvacG1K4S1.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA10pUpmvacG1K4S1.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA10QUpmvacG1K4S1.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA113UpmvacG1K4S1.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/urbanist/v15/L0xtDF02iFML4hGCyMqgdyNEf6or5L2WA11eUpmvacG1K4S1.ttf",
    },
  },
  {
    family: "Amatic SC",
    category: "handwriting",
    subsets: ["cyrillic", "hebrew", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/amaticsc/v26/TUZ3zwprpvBS1izr_vOMscG6eb8D3WTy-A.ttf",
      regular: "http://fonts.gstatic.com/s/amaticsc/v26/TUZyzwprpvBS1izr_vO0De6ecZQf1A.ttf",
    },
  },
  {
    family: "Alegreya",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "500":
        "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGxBUI_KCisSGVrw.ttf",
      "600":
        "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGKBII_KCisSGVrw.ttf",
      "700":
        "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGERII_KCisSGVrw.ttf",
      "800":
        "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGdhII_KCisSGVrw.ttf",
      "900":
        "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNGXxII_KCisSGVrw.ttf",
      regular:
        "http://fonts.gstatic.com/s/alegreya/v35/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hUI_KCisSGVrw.ttf",
      italic:
        "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlbgv6qmkySFr9V9.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlbSv6qmkySFr9V9.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlY-uKqmkySFr9V9.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlYHuKqmkySFr9V9.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlZguKqmkySFr9V9.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/alegreya/v35/4UaSrEBBsBhlBjvfkSLk3abBFkvpkARTPlZJuKqmkySFr9V9.ttf",
    },
  },
  {
    family: "Archivo Narrow",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvHlGKpHOtFCQ76Q.ttf",
      "600":
        "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhv8laKpHOtFCQ76Q.ttf",
      "700":
        "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvy1aKpHOtFCQ76Q.ttf",
      regular:
        "http://fonts.gstatic.com/s/archivonarrow/v30/tss5ApVBdCYD5Q7hcxTE1ArZ0Zz8oY2KRmwvKhhvLFGKpHOtFCQ76Q.ttf",
      italic:
        "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BJi53mpNiEr6T6Y.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BJQ53mpNiEr6T6Y.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BK84HmpNiEr6T6Y.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/archivonarrow/v30/tss7ApVBdCYD5Q7hcxTE1ArZ0bb1k3JSLwe1hB965BKF4HmpNiEr6T6Y.ttf",
    },
  },
  {
    family: "Cinzel",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800", "900"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-uTnTYrvDE5ZdqU.ttf",
      "600":
        "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-gjgTYrvDE5ZdqU.ttf",
      "700":
        "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-jHgTYrvDE5ZdqU.ttf",
      "800":
        "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-lbgTYrvDE5ZdqU.ttf",
      "900":
        "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-n_gTYrvDE5ZdqU.ttf",
      regular:
        "http://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnTYrvDE5ZdqU.ttf",
    },
  },
  {
    family: "ABeeZee",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/abeezee/v22/esDR31xSG-6AGleN6tKukbcHCpE.ttf",
      italic: "http://fonts.gstatic.com/s/abeezee/v22/esDT31xSG-6AGleN2tCklZUCGpG-GQ.ttf",
    },
  },
  {
    family: "Rowdies",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/rowdies/v17/ptRMTieMYPNBAK219hth5O7yKQNute8.ttf",
      "700": "http://fonts.gstatic.com/s/rowdies/v17/ptRMTieMYPNBAK219gtm5O7yKQNute8.ttf",
      regular: "http://fonts.gstatic.com/s/rowdies/v17/ptRJTieMYPNBAK21zrdJwObZNQo.ttf",
    },
  },
  {
    family: "Vollkorn",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "500":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2AnGuGWOdEbD63w.ttf",
      "600":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df27nauGWOdEbD63w.ttf",
      "700":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df213auGWOdEbD63w.ttf",
      "800":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2sHauGWOdEbD63w.ttf",
      "900":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2mXauGWOdEbD63w.ttf",
      regular:
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybgGDoxxrvAnPhYGzMlQLzuMasz6Df2MHGuGWOdEbD63w.ttf",
      italic:
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DJGWmmZM7Xq34g9.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DJ0WmmZM7Xq34g9.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DKYXWmZM7Xq34g9.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DKhXWmZM7Xq34g9.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DLGXWmZM7Xq34g9.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/vollkorn/v23/0ybuGDoxxrvAnPhYGxksckM2WMCpRjDj-DLvXWmZM7Xq34g9.ttf",
    },
  },
  {
    family: "Sora",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800"],
    files: {
      "100": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSn3-KIwNhBti0.ttf",
      "200": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSfSnn-KIwNhBti0.ttf",
      "300": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmScMnn-KIwNhBti0.ttf",
      "500": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdgnn-KIwNhBti0.ttf",
      "600": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSeMmX-KIwNhBti0.ttf",
      "700": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSe1mX-KIwNhBti0.ttf",
      "800": "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSfSmX-KIwNhBti0.ttf",
      regular: "http://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSnn-KIwNhBti0.ttf",
    },
  },
  {
    family: "Saira Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJRMQgErUN8XuHNEtX81i9TmEkrnwetA2omSrzS8.ttf",
      "200":
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnbcpg8Keepi2lHw.ttf",
      "300":
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnCclg8Keepi2lHw.ttf",
      "500":
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnUchg8Keepi2lHw.ttf",
      "600":
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnfc9g8Keepi2lHw.ttf",
      "700":
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnGc5g8Keepi2lHw.ttf",
      "800":
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnBc1g8Keepi2lHw.ttf",
      "900":
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJRLQgErUN8XuHNEtX81i9TmEkrnIcxg8Keepi2lHw.ttf",
      regular:
        "http://fonts.gstatic.com/s/sairacondensed/v11/EJROQgErUN8XuHNEtX81i9TmEkrfpeFE-IyCrw.ttf",
    },
  },
  {
    family: "Exo",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4lM2CwNsOl4p5Is.ttf",
      "200": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4tM3CwNsOl4p5Is.ttf",
      "300": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4g03CwNsOl4p5Is.ttf",
      "500": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4mE3CwNsOl4p5Is.ttf",
      "600": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4o0wCwNsOl4p5Is.ttf",
      "700": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4rQwCwNsOl4p5Is.ttf",
      "800": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4tMwCwNsOl4p5Is.ttf",
      "900": "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4vowCwNsOl4p5Is.ttf",
      regular: "http://fonts.gstatic.com/s/exo/v21/4UaZrEtFpBI4f1ZSIK9d4LjJ4lM3CwNsOl4p5Is.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t040FmPnws9Iu-uA.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0Y0BmPnws9Iu-uA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0vUBmPnws9Iu-uA.ttf",
      italic: "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t040BmPnws9Iu-uA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t00UBmPnws9Iu-uA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0PUdmPnws9Iu-uA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0BEdmPnws9Iu-uA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0Y0dmPnws9Iu-uA.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/exo/v21/4UafrEtFpBISdmSt-MY2ehbO95t0SkdmPnws9Iu-uA.ttf",
    },
  },
  {
    family: "Orbitron",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "500", "600", "700", "800", "900"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKS6xpmIyXjU1pg.ttf",
      "600":
        "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyxSmxpmIyXjU1pg.ttf",
      "700":
        "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1ny_CmxpmIyXjU1pg.ttf",
      "800":
        "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nymymxpmIyXjU1pg.ttf",
      "900":
        "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nysimxpmIyXjU1pg.ttf",
      regular:
        "http://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6xpmIyXjU1pg.ttf",
    },
  },
  {
    family: "Kalam",
    category: "handwriting",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/kalam/v16/YA9Qr0Wd4kDdMtD6GgLLmCUItqGt.ttf",
      "700": "http://fonts.gstatic.com/s/kalam/v16/YA9Qr0Wd4kDdMtDqHQLLmCUItqGt.ttf",
      regular: "http://fonts.gstatic.com/s/kalam/v16/YA9dr0Wd4kDdMuhWMibDszkB.ttf",
    },
  },
  {
    family: "Figtree",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_chQF5ewkEU4HTy.ttf",
      "500":
        "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_dNQF5ewkEU4HTy.ttf",
      "600":
        "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_ehR15ewkEU4HTy.ttf",
      "700":
        "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_eYR15ewkEU4HTy.ttf",
      "800":
        "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_f_R15ewkEU4HTy.ttf",
      "900":
        "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_fWR15ewkEU4HTy.ttf",
      regular:
        "http://fonts.gstatic.com/s/figtree/v5/_Xmz-HUzqDCFdgfMsYiV_F7wfS-Bs_d_QF5ewkEU4HTy.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A-gdyEU25WTybO8.ttf",
      italic:
        "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A7YdyEU25WTybO8.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A4QdyEU25WTybO8.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A2gayEU25WTybO8.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3A1EayEU25WTybO8.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3AzYayEU25WTybO8.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/figtree/v5/_Xm9-HUzqDCFdgfMm4GnA4aZFrUvtOK3Ax8ayEU25WTybO8.ttf",
    },
  },
  {
    family: "Montserrat Alternates",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFThWacfw6zH4dthXcyms1lPpC8I_b0juU0xiKfVKphL03l4.ttf",
      "200":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xJIb1ALZH2mBhkw.ttf",
      "300":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xQIX1ALZH2mBhkw.ttf",
      "500":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xGIT1ALZH2mBhkw.ttf",
      "600":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xNIP1ALZH2mBhkw.ttf",
      "700":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xUIL1ALZH2mBhkw.ttf",
      "800":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xTIH1ALZH2mBhkw.ttf",
      "900":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xaID1ALZH2mBhkw.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTjWacfw6zH4dthXcyms1lPpC8I_b0juU057p-xIJxp1ml4imo.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8dAbxD-GVxk3Nd.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p95ArxD-GVxk3Nd.ttf",
      regular:
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTvWacfw6zH4dthXcyms1lPpC8I_b0juU0J7K3RCJ1b0w.ttf",
      italic:
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFThWacfw6zH4dthXcyms1lPpC8I_b0juU057qfVKphL03l4.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8hA7xD-GVxk3Nd.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p8NBLxD-GVxk3Nd.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p9pBbxD-GVxk3Nd.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p91BrxD-GVxk3Nd.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/montserratalternates/v17/mFTkWacfw6zH4dthXcyms1lPpC8I_b0juU057p9RB7xD-GVxk3Nd.ttf",
    },
  },
  {
    family: "Yantramanav",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["100", "300", "regular", "500", "700", "900"],
    files: {
      "100": "http://fonts.gstatic.com/s/yantramanav/v13/flU-Rqu5zY00QEpyWJYWN5-QXeNzDB41rZg.ttf",
      "300": "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59Yf8NZIhI8tIHh.ttf",
      "500": "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN58AfsNZIhI8tIHh.ttf",
      "700": "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59IeMNZIhI8tIHh.ttf",
      "900": "http://fonts.gstatic.com/s/yantramanav/v13/flUhRqu5zY00QEpyWJYWN59wesNZIhI8tIHh.ttf",
      regular: "http://fonts.gstatic.com/s/yantramanav/v13/flU8Rqu5zY00QEpyWJYWN6f0V-dRCQ41.ttf",
    },
  },
  {
    family: "Source Serif 4",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjipdqrhxXD-wGvjU.ttf",
      "300":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjiklqrhxXD-wGvjU.ttf",
      "500":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjiiVqrhxXD-wGvjU.ttf",
      "600":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjisltrhxXD-wGvjU.ttf",
      "700":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjivBtrhxXD-wGvjU.ttf",
      "800":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjipdtrhxXD-wGvjU.ttf",
      "900":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjir5trhxXD-wGvjU.ttf",
      regular:
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEFy2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6OAVIJmeUDygwjihdqrhxXD-wGvjU.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pxl9dC84DrjXEXw.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pGF9dC84DrjXEXw.ttf",
      italic:
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pRl9dC84DrjXEXw.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pdF9dC84DrjXEXw.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pmFhdC84DrjXEXw.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98poVhdC84DrjXEXw.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98pxlhdC84DrjXEXw.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/sourceserif4/v8/vEF02_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US2D2QYxoUKIkn98p71hdC84DrjXEXw.ttf",
    },
  },
  {
    family: "Alfa Slab One",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alfaslabone/v19/6NUQ8FmMKwSEKjnm5-4v-4Jh6dVretWvYmE.ttf",
    },
  },
  {
    family: "Alegreya Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUt9_-1phKLFgshYDvh6Vwt5TltuGdShm5bsg.ttf",
      "300":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5fFPmE18imdCqxI.ttf",
      "500":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5alOmE18imdCqxI.ttf",
      "700":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5eFImE18imdCqxI.ttf",
      "800":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5f1LmE18imdCqxI.ttf",
      "900":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUu9_-1phKLFgshYDvh6Vwt5dlKmE18imdCqxI.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUv9_-1phKLFgshYDvh6Vwt7V9V3G1WpGtLsgu7.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VFE92jkVHuxKiBA.ttf",
      regular:
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUz9_-1phKLFgshYDvh6Vwt3V1nvEVXlm4.ttf",
      italic:
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUt9_-1phKLFgshYDvh6Vwt7V9tuGdShm5bsg.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VTE52jkVHuxKiBA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VBEh2jkVHuxKiBA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VGEt2jkVHuxKiBA.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/alegreyasans/v24/5aUo9_-1phKLFgshYDvh6Vwt7V9VPEp2jkVHuxKiBA.ttf",
    },
  },
  {
    family: "Zeyada",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/zeyada/v19/11hAGpPTxVPUbgZDNGatWKaZ3g.ttf",
    },
  },
  {
    family: "Source Sans 3",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kw461EN_io6npfB.ttf",
      "300":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kzm61EN_io6npfB.ttf",
      "500":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8KyK61EN_io6npfB.ttf",
      "600":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxm7FEN_io6npfB.ttf",
      "700":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxf7FEN_io6npfB.ttf",
      "800":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kw47FEN_io6npfB.ttf",
      "900":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8KwR7FEN_io6npfB.ttf",
      regular:
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky461EN_io6npfB.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqDlO9C4Ym4fB3Ts.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqOdO9C4Ym4fB3Ts.ttf",
      italic:
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqLlO9C4Ym4fB3Ts.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqItO9C4Ym4fB3Ts.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqGdJ9C4Ym4fB3Ts.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqF5J9C4Ym4fB3Ts.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqDlJ9C4Ym4fB3Ts.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/sourcesans3/v10/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqBBJ9C4Ym4fB3Ts.ttf",
    },
  },
  {
    family: "Righteous",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/righteous/v17/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf",
    },
  },
  {
    family: "Cormorant",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFk9TQ7Rg7A2uwYs.ttf",
      "500":
        "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFiNTQ7Rg7A2uwYs.ttf",
      "600":
        "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFs9UQ7Rg7A2uwYs.ttf",
      "700":
        "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFvZUQ7Rg7A2uwYs.ttf",
      regular:
        "http://fonts.gstatic.com/s/cormorant/v21/H4c2BXOCl9bbnla_nHIA47NMUjsNbCVrFhFTQ7Rg7A2uwYs.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQ9fdq6C-r0YvxdA.ttf",
      italic:
        "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQq_dq6C-r0YvxdA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQmfdq6C-r0YvxdA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQdfBq6C-r0YvxdA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/cormorant/v21/H4c0BXOCl9bbnla_nHIq6oGzilJm9otsA9kQTPBq6C-r0YvxdA.ttf",
    },
  },
  {
    family: "Neuton",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["200", "300", "regular", "italic", "700", "800"],
    files: {
      "200": "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKAKkfegD5Drog6Q.ttf",
      "300": "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKZKofegD5Drog6Q.ttf",
      "700": "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKdK0fegD5Drog6Q.ttf",
      "800": "http://fonts.gstatic.com/s/neuton/v22/UMBQrPtMoH62xUZKaK4fegD5Drog6Q.ttf",
      regular: "http://fonts.gstatic.com/s/neuton/v22/UMBTrPtMoH62xUZyyII7civlBw.ttf",
      italic: "http://fonts.gstatic.com/s/neuton/v22/UMBRrPtMoH62xUZCyog_UC71B6M5.ttf",
    },
  },
  {
    family: "Noticia Text",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/noticiatext/v15/VuJpdNDF2Yv9qppOePKYRP1-3R59v2HRrDH0eA.ttf",
      regular: "http://fonts.gstatic.com/s/noticiatext/v15/VuJ2dNDF2Yv9qppOePKYRP1GYTFZt0rNpQ.ttf",
      italic: "http://fonts.gstatic.com/s/noticiatext/v15/VuJodNDF2Yv9qppOePKYRP12YztdlU_dpSjt.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/noticiatext/v15/VuJrdNDF2Yv9qppOePKYRP12YwPhumvVjjTkeMnz.ttf",
    },
  },
  {
    family: "Noto Kufi Arabic",
    category: "sans-serif",
    subsets: ["arabic"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v3obPnLSmf5yD.ttf",
      "200":
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7v34bPnLSmf5yD.ttf",
      "300":
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh4x34bPnLSmf5yD.ttf",
      "500":
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5d34bPnLSmf5yD.ttf",
      "600":
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh6x2IbPnLSmf5yD.ttf",
      "700":
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh6I2IbPnLSmf5yD.ttf",
      "800":
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7v2IbPnLSmf5yD.ttf",
      "900":
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh7G2IbPnLSmf5yD.ttf",
      regular:
        "http://fonts.gstatic.com/s/notokufiarabic/v17/CSRp4ydQnPyaDxEXLFF6LZVLKrodhu8t57o1kDc5Wh5v34bPnLSmf5yD.ttf",
    },
  },
  {
    family: "Great Vibes",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/greatvibes/v18/RWmMoKWR9v4ksMfaWd_JN-XCg6UKDXlq.ttf",
    },
  },
  {
    family: "Cantarell",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/cantarell/v17/B50IF7ZDq37KMUvlO01xN4dOFISeJY8GgQ.ttf",
      regular: "http://fonts.gstatic.com/s/cantarell/v17/B50NF7ZDq37KMUvlO01Ji6hqHK-CLA.ttf",
      italic: "http://fonts.gstatic.com/s/cantarell/v17/B50LF7ZDq37KMUvlO015iaJuPqqSLJYf.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/cantarell/v17/B50WF7ZDq37KMUvlO015iZrSEY6aB4oWgWHB.ttf",
    },
  },
  {
    family: "Cardo",
    category: "serif",
    subsets: ["greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/cardo/v19/wlpygwjKBV1pqhND-aQR82JHaTBX.ttf",
      regular: "http://fonts.gstatic.com/s/cardo/v19/wlp_gwjKBV1pqiv_1oAZ2H5O.ttf",
      italic: "http://fonts.gstatic.com/s/cardo/v19/wlpxgwjKBV1pqhv93IQ73W5OcCk.ttf",
    },
  },
  {
    family: "Martel",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "600", "700", "800", "900"],
    files: {
      "200": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVqekahRbX9vnDzw.ttf",
      "300": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVzeoahRbX9vnDzw.ttf",
      "600": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVuewahRbX9vnDzw.ttf",
      "700": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XV3e0ahRbX9vnDzw.ttf",
      "800": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XVwe4ahRbX9vnDzw.ttf",
      "900": "http://fonts.gstatic.com/s/martel/v10/PN_yRfK9oXHga0XV5e8ahRbX9vnDzw.ttf",
      regular: "http://fonts.gstatic.com/s/martel/v10/PN_xRfK9oXHga0XtYcI-jT3L_w.ttf",
    },
  },
  {
    family: "Passion One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700", "900"],
    files: {
      "700": "http://fonts.gstatic.com/s/passionone/v18/Pby6FmL8HhTPqbjUzux3JEMq037owpYcuH8y.ttf",
      "900": "http://fonts.gstatic.com/s/passionone/v18/Pby6FmL8HhTPqbjUzux3JEMS0X7owpYcuH8y.ttf",
      regular: "http://fonts.gstatic.com/s/passionone/v18/PbynFmL8HhTPqbjUzux3JHuW_Frg6YoV.ttf",
    },
  },
  {
    family: "Courgette",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/courgette/v17/wEO_EBrAnc9BLjLQAUkFUfAL3EsHiA.ttf",
    },
  },
  {
    family: "Spectral",
    category: "serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
    ],
    files: {
      "200": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9v2s13GY_etWWIJ.ttf",
      "300": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uSsF3GY_etWWIJ.ttf",
      "500": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9vKsV3GY_etWWIJ.ttf",
      "600": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9vmtl3GY_etWWIJ.ttf",
      "700": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uCt13GY_etWWIJ.ttf",
      "800": "http://fonts.gstatic.com/s/spectral/v13/rnCs-xNNww_2s0amA9uetF3GY_etWWIJ.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qrXHafOPXHIJErY.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qtHEafOPXHIJErY.ttf",
      regular: "http://fonts.gstatic.com/s/spectral/v13/rnCr-xNNww_2s0amA-M-mHnOSOuk.ttf",
      italic: "http://fonts.gstatic.com/s/spectral/v13/rnCt-xNNww_2s0amA9M8kn3sTfukQHs.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qonFafOPXHIJErY.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qqXCafOPXHIJErY.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qsHDafOPXHIJErY.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/spectral/v13/rnCu-xNNww_2s0amA9M8qt3AafOPXHIJErY.ttf",
    },
  },
  {
    family: "Yellowtail",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/yellowtail/v22/OZpGg_pnoDtINPfRIlLotlzNwED-b4g.ttf",
    },
  },
  {
    family: "Space Mono",
    category: "monospace",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/spacemono/v13/i7dMIFZifjKcF5UAWdDRaPpZYFKQHwyVd3U.ttf",
      regular: "http://fonts.gstatic.com/s/spacemono/v13/i7dPIFZifjKcF5UAWdDRUEZ2RFq7AwU.ttf",
      italic: "http://fonts.gstatic.com/s/spacemono/v13/i7dNIFZifjKcF5UAWdDRYER8QHi-EwWMbg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/spacemono/v13/i7dSIFZifjKcF5UAWdDRYERE_FeaGy6QZ3WfYg.ttf",
    },
  },
  {
    family: "Amiri",
    category: "serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/amiri/v27/J7acnpd8CGxBHp2VkZY4xJ9CGyAa.ttf",
      regular: "http://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.ttf",
      italic: "http://fonts.gstatic.com/s/amiri/v27/J7afnpd8CGxBHpUrtLYS6pNLAjk.ttf",
      "700italic": "http://fonts.gstatic.com/s/amiri/v27/J7aanpd8CGxBHpUrjAo9zptgHjAavCA.ttf",
    },
  },
  {
    family: "Tinos",
    category: "serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "latin",
      "latin-ext",
      "vietnamese",
    ],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/tinos/v24/buE1poGnedXvwj1AW0Fp2i43-cxL.ttf",
      regular: "http://fonts.gstatic.com/s/tinos/v24/buE4poGnedXvwgX8dGVh8TI-.ttf",
      italic: "http://fonts.gstatic.com/s/tinos/v24/buE2poGnedXvwjX-fmFD9CI-4NU.ttf",
      "700italic": "http://fonts.gstatic.com/s/tinos/v24/buEzpoGnedXvwjX-Rt1s0CoV_NxLeiw.ttf",
    },
  },
  {
    family: "Philosopher",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/philosopher/v19/vEFI2_5QCwIS4_Dhez5jcWjVamgc-NaXXq7H.ttf",
      regular: "http://fonts.gstatic.com/s/philosopher/v19/vEFV2_5QCwIS4_Dhez5jcVBpRUwU08qe.ttf",
      italic: "http://fonts.gstatic.com/s/philosopher/v19/vEFX2_5QCwIS4_Dhez5jcWBrT0g21tqeR7c.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/philosopher/v19/vEFK2_5QCwIS4_Dhez5jcWBrd_QZ8tK1W77HtMo.ttf",
    },
  },
  {
    family: "Lobster Two",
    category: "display",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/lobstertwo/v20/BngRUXZGTXPUvIoyV6yN5-92w4CByxyKeuDp.ttf",
      regular: "http://fonts.gstatic.com/s/lobstertwo/v20/BngMUXZGTXPUvIoyV6yN59fK7KSJ4ACD.ttf",
      italic: "http://fonts.gstatic.com/s/lobstertwo/v20/BngOUXZGTXPUvIoyV6yN5-fI5qCr5RCDY_k.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/lobstertwo/v20/BngTUXZGTXPUvIoyV6yN5-fI3hyEwRiof_DpXMY.ttf",
    },
  },
  {
    family: "Titan One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/titanone/v15/mFTzWbsGxbbS_J5cQcjykzIn2Etikg.ttf",
    },
  },
  {
    family: "Patua One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/patuaone/v20/ZXuke1cDvLCKLDcimxBI5PNvNA9LuA.ttf",
    },
  },
  {
    family: "Changa",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZy2xQjDp9htf1ZM.ttf",
      "300":
        "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ_OxQjDp9htf1ZM.ttf",
      "500":
        "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ5-xQjDp9htf1ZM.ttf",
      "600":
        "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ3O2QjDp9htf1ZM.ttf",
      "700":
        "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ0q2QjDp9htf1ZM.ttf",
      "800":
        "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZy22QjDp9htf1ZM.ttf",
      regular:
        "http://fonts.gstatic.com/s/changa/v27/2-c79JNi2YuVOUcOarRPgnNGooxCZ62xQjDp9htf1ZM.ttf",
    },
  },
  {
    family: "Roboto Flex",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/robotoflex/v9/NaN4epOXO_NexZs0b5QrzlOHb8wCikXpYqmZsWI-__OGfttPZktqc2VdZ80KvCLZaPcSBZtOx2MifRuWR28sPJtUMbsFEK6cRrleUx9Xgbm3WLHa_F4Ep4Fm0PN19Ik5Dntczx0wZGzhPlL1YNMYKbv9_1IQXOw7AiUJVXpRJ6cXW4O8TNGoXjC79QRyaLshNDUf3e0O-gn5rrZCu20YNYG0EACUTNK-QKavMlxGIY8dxef0jQ.ttf",
    },
  },
  {
    family: "Ubuntu Condensed",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/ubuntucondensed/v16/u-4k0rCzjgs5J7oXnJcM_0kACGMtf-fVqvHoJXw.ttf",
    },
  },
  {
    family: "Paytone One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/paytoneone/v23/0nksC9P7MfYHj2oFtYm2CiTqivr9iBq_.ttf",
    },
  },
  {
    family: "PT Sans Caption",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/ptsanscaption/v19/0FlJVP6Hrxmt7-fsUFhlFXNIlpcSwSrUSwWuz38Tgg.ttf",
      regular:
        "http://fonts.gstatic.com/s/ptsanscaption/v19/0FlMVP6Hrxmt7-fsUFhlFXNIlpcqfQXwQy6yxg.ttf",
    },
  },
  {
    family: "Noto Serif TC",
    category: "serif",
    subsets: ["chinese-traditional", "latin"],
    variants: ["200", "300", "regular", "500", "600", "700", "900"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0Bvr8vbX9GTsoOAX4.otf",
      "300":
        "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvtssbX9GTsoOAX4.otf",
      "500":
        "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvoMtbX9GTsoOAX4.otf",
      "600":
        "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0Bvq8qbX9GTsoOAX4.otf",
      "700":
        "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvssrbX9GTsoOAX4.otf",
      "900":
        "http://fonts.gstatic.com/s/notoseriftc/v23/XLY9IZb5bJNDGYxLBibeHZ0BvvMpbX9GTsoOAX4.otf",
      regular: "http://fonts.gstatic.com/s/notoseriftc/v23/XLYgIZb5bJNDGYxLBibeHZ0BhnEESXFtUsM.otf",
    },
  },
  {
    family: "Crete Round",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/creteround/v14/55xoey1sJNPjPiv1ZZZrxJ1827zAKnxN.ttf",
      italic: "http://fonts.gstatic.com/s/creteround/v14/55xqey1sJNPjPiv1ZZZrxK1-0bjiL2xNhKc.ttf",
    },
  },
  {
    family: "Encode Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGGHiZtWP7FJCt2c.ttf",
      "200":
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGOHjZtWP7FJCt2c.ttf",
      "300":
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGD_jZtWP7FJCt2c.ttf",
      "500":
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGFPjZtWP7FJCt2c.ttf",
      "600":
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGL_kZtWP7FJCt2c.ttf",
      "700":
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGIbkZtWP7FJCt2c.ttf",
      "800":
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGOHkZtWP7FJCt2c.ttf",
      "900":
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGMjkZtWP7FJCt2c.ttf",
      regular:
        "http://fonts.gstatic.com/s/encodesans/v19/LDIcapOFNxEwR-Bd1O9uYNmnUQomAgE25imKSbHhROjLsZBWTSrQGGHjZtWP7FJCt2c.ttf",
    },
  },
  {
    family: "Eczar",
    category: "serif",
    subsets: ["devanagari", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      "500": "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXL96WqTIVKWJKWg.ttf",
      "600": "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXw9mWqTIVKWJKWg.ttf",
      "700": "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDX-tmWqTIVKWJKWg.ttf",
      "800": "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXndmWqTIVKWJKWg.ttf",
      regular:
        "http://fonts.gstatic.com/s/eczar/v22/BXR2vF3Pi-DLmxcpJB-qbNTyTMDXHd6WqTIVKWJKWg.ttf",
    },
  },
  {
    family: "Prata",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/prata/v20/6xKhdSpbNNCT-vWIAG_5LWwJ.ttf",
    },
  },
  {
    family: "Noto Serif KR",
    category: "serif",
    subsets: ["korean", "latin"],
    variants: ["200", "300", "regular", "500", "600", "700", "900"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTihC8O1ZNH1ahck.otf",
      "300":
        "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTkxB8O1ZNH1ahck.otf",
      "500":
        "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXThRA8O1ZNH1ahck.otf",
      "600":
        "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTjhH8O1ZNH1ahck.otf",
      "700":
        "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTlxG8O1ZNH1ahck.otf",
      "900":
        "http://fonts.gstatic.com/s/notoserifkr/v20/3JnmSDn90Gmq2mr3blnHaTZXTmRE8O1ZNH1ahck.otf",
      regular: "http://fonts.gstatic.com/s/notoserifkr/v20/3Jn7SDn90Gmq2mr3blnHaTZXduZp1ONyKHQ.otf",
    },
  },
  {
    family: "Kaushan Script",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/kaushanscript/v16/vm8vdRfvXFLG3OLnsO15WYS5DF7_ytN3M48a.ttf",
    },
  },
  {
    family: "Francois One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/francoisone/v21/_Xmr-H4zszafZw3A-KPSZutNxgKQu_avAg.ttf",
    },
  },
  {
    family: "Sawarabi Mincho",
    category: "serif",
    subsets: ["japanese", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/sawarabimincho/v17/8QIRdiDaitzr7brc8ahpxt6GcIJTLahP46UDUw.ttf",
    },
  },
  {
    family: "Macondo",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/macondo/v25/RrQQboN9-iB1IXmOS2XO0LBBd4Y.ttf",
    },
  },
  {
    family: "Sacramento",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sacramento/v15/buEzpo6gcdjy0EiZMBUG0CoV_NxLeiw.ttf",
    },
  },
  {
    family: "Alice",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alice/v20/OpNCnoEEmtHa6FcJpA_chzJ0.ttf",
    },
  },
  {
    family: "Marcellus",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/marcellus/v13/wEO_EBrOk8hQLDvIAF8FUfAL3EsHiA.ttf",
    },
  },
  {
    family: "Arsenal",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/arsenal/v12/wXKuE3kQtZQ4pF3D7-P5JeQAmX8yrdk.ttf",
      regular: "http://fonts.gstatic.com/s/arsenal/v12/wXKrE3kQtZQ4pF3D11_WAewrhXY.ttf",
      italic: "http://fonts.gstatic.com/s/arsenal/v12/wXKpE3kQtZQ4pF3D513cBc4ulXYrtA.ttf",
      "700italic": "http://fonts.gstatic.com/s/arsenal/v12/wXKsE3kQtZQ4pF3D513kueEKnV03vdnKjw.ttf",
    },
  },
  {
    family: "Architects Daughter",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/architectsdaughter/v18/KtkxAKiDZI_td1Lkx62xHZHDtgO_Y-bvfY5q4szgE-Q.ttf",
    },
  },
  {
    family: "El Messiri",
    category: "sans-serif",
    subsets: ["arabic", "cyrillic", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuXCe65ghj3OoapG.ttf",
      "600":
        "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuUufK5ghj3OoapG.ttf",
      "700":
        "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuUXfK5ghj3OoapG.ttf",
      regular:
        "http://fonts.gstatic.com/s/elmessiri/v22/K2FhfZBRmr9vQ1pHEey6GIGo8_pv3myYjuXwe65ghj3OoapG.ttf",
    },
  },
  {
    family: "Noto Sans Display",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cLVTGQ2iHrvWM.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp__cKVTGQ2iHrvWM.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_ykKVTGQ2iHrvWM.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_0UKVTGQ2iHrvWM.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_6kNVTGQ2iHrvWM.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_5ANVTGQ2iHrvWM.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp__cNVTGQ2iHrvWM.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_94NVTGQ2iHrvWM.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpbK4fy6r6tOBEJg0IAKzqdFZVZxpMkXJMhnB9XjO1o90LuV-PT4Doq_AKp_3cKVTGQ2iHrvWM.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JvXOa3gPurWM9uQ.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JPXKa3gPurWM9uQ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9J43Ka3gPurWM9uQ.ttf",
      italic:
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JvXKa3gPurWM9uQ.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9Jj3Ka3gPurWM9uQ.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JY3Wa3gPurWM9uQ.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JWnWa3gPurWM9uQ.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JPXWa3gPurWM9uQ.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/notosansdisplay/v26/RLpZK4fy6r6tOBEJg0IAKzqdFZVZxrktbnDB5UzBIup9PwAcHtEsOFNBZqyu6r9JFHWa3gPurWM9uQ.ttf",
    },
  },
  {
    family: "Gloria Hallelujah",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/gloriahallelujah/v21/LYjYdHv3kUk9BMV96EIswT9DIbW-MLSy3TKEvkCF.ttf",
    },
  },
  {
    family: "Alata",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alata/v9/PbytFmztEwbIofe6xKcRQEOX.ttf",
    },
  },
  {
    family: "Bodoni Moda",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "500":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oXzawIBytVjMYwE.ttf",
      "600":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oZDdwIBytVjMYwE.ttf",
      "700":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oandwIBytVjMYwE.ttf",
      "800":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oc7dwIBytVjMYwE.ttf",
      "900":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oefdwIBytVjMYwE.ttf",
      regular:
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oU7awIBytVjMYwE.ttf",
      italic:
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZKMN4sXrJcwHqoQ.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZGsN4sXrJcwHqoQ.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZ9sR4sXrJcwHqoQ.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZz8R4sXrJcwHqoQ.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZqMR4sXrJcwHqoQ.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/bodonimoda/v23/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZgcR4sXrJcwHqoQ.ttf",
    },
  },
  {
    family: "Cookie",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/cookie/v21/syky-y18lb0tSbfNlQCT9tPdpw.ttf",
    },
  },
  {
    family: "Lexend Deca",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U48MxArBPCqLNflg.ttf",
      "200":
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4cM1ArBPCqLNflg.ttf",
      "300":
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4rs1ArBPCqLNflg.ttf",
      "500":
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4ws1ArBPCqLNflg.ttf",
      "600":
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4LspArBPCqLNflg.ttf",
      "700":
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4F8pArBPCqLNflg.ttf",
      "800":
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4cMpArBPCqLNflg.ttf",
      "900":
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U4WcpArBPCqLNflg.ttf",
      regular:
        "http://fonts.gstatic.com/s/lexenddeca/v21/K2FifZFYk-dHSE0UPPuwQ7CrD94i-NCKm-U48M1ArBPCqLNflg.ttf",
    },
  },
  {
    family: "Gruppo",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/gruppo/v21/WwkfxPmzE06v_ZWFWXDAOIEQUQ.ttf",
    },
  },
  {
    family: "Creepster",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/creepster/v13/AlZy_zVUqJz4yMrniH4hdXf4XB0Tow.ttf",
    },
  },
  {
    family: "Alegreya Sans SC",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGn4-RGJqfMvt7P8FUr0Q1j-Hf1Dipl8g5FPYtmMg.ttf",
      "300":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DuJH0iRrMYJ_K-4.ttf",
      "500":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DrpG0iRrMYJ_K-4.ttf",
      "700":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DvJA0iRrMYJ_K-4.ttf",
      "800":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1Du5D0iRrMYJ_K-4.ttf",
      "900":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGm4-RGJqfMvt7P8FUr0Q1j-Hf1DspC0iRrMYJ_K-4.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGl4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdlgRBH452Mvds.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdXiZhNaB6O-51OA.ttf",
      regular:
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGh4-RGJqfMvt7P8FUr0Q1j-Hf1Nk5v9ixALYs.ttf",
      italic:
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGn4-RGJqfMvt7P8FUr0Q1j-Hf1Bkxl8g5FPYtmMg.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdBidhNaB6O-51OA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdTiFhNaB6O-51OA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxdUiJhNaB6O-51OA.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/alegreyasanssc/v23/mtGk4-RGJqfMvt7P8FUr0Q1j-Hf1BkxddiNhNaB6O-51OA.ttf",
    },
  },
  {
    family: "Pathway Gothic One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/pathwaygothicone/v15/MwQrbgD32-KAvjkYGNUUxAtW7pEBwx-dTFxeb80flQ.ttf",
    },
  },
  {
    family: "Concert One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/concertone/v21/VEM1Ro9xs5PjtzCu-srDqRTlhv-CuVAQ.ttf",
    },
  },
  {
    family: "Old Standard TT",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQrbh3o1vLImiwAVvYawgcf2eVWEX-dTFxeb80flQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQubh3o1vLImiwAVvYawgcf2eVurVC5RHdCZg.ttf",
      italic:
        "http://fonts.gstatic.com/s/oldstandardtt/v20/MwQsbh3o1vLImiwAVvYawgcf2eVer1q9ZnJSZtQG.ttf",
    },
  },
  {
    family: "Advent Pro",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLQyJPTJoonw1aBA.ttf",
      "200":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLwyNPTJoonw1aBA.ttf",
      "300":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLHSNPTJoonw1aBA.ttf",
      "500":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLcSNPTJoonw1aBA.ttf",
      "600":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLnSRPTJoonw1aBA.ttf",
      "700":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLpCRPTJoonw1aBA.ttf",
      "800":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLwyRPTJoonw1aBA.ttf",
      "900":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpL6iRPTJoonw1aBA.ttf",
      regular:
        "http://fonts.gstatic.com/s/adventpro/v23/V8mqoQfxVT4Dvddr_yOwrzaFxV7JtdQgFqXdUAQrGp_zgX5sWCpLQyNPTJoonw1aBA.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CnDpAsvQhKBH4C.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AnD5AsvQhKBH4C.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2D5D5AsvQhKBH4C.ttf",
      italic:
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CnD5AsvQhKBH4C.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2CVD5AsvQhKBH4C.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2B5CJAsvQhKBH4C.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2BACJAsvQhKBH4C.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AnCJAsvQhKBH4C.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/adventpro/v23/V8mkoQfxVT4Dvddr_yOwhT-3Jr6w5kKOEbAVEvZiKGAr6BX29i1ei2AOCJAsvQhKBH4C.ttf",
    },
  },
  {
    family: "Rokkitt",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1rydpDLE76HvN6n.ttf",
      "200":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pyd5DLE76HvN6n.ttf",
      "300":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1qsd5DLE76HvN6n.ttf",
      "500":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1rAd5DLE76HvN6n.ttf",
      "600":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1oscJDLE76HvN6n.ttf",
      "700":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1oVcJDLE76HvN6n.ttf",
      "800":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pycJDLE76HvN6n.ttf",
      "900":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1pbcJDLE76HvN6n.ttf",
      regular:
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdb35qfgYFjGy5hukqqhw5XeRgdi1ryd5DLE76HvN6n.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NHiJGbqluc6nu9E.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NPiIGbqluc6nu9E.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NCaIGbqluc6nu9E.ttf",
      italic:
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NHiIGbqluc6nu9E.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NEqIGbqluc6nu9E.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NKaPGbqluc6nu9E.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NJ-PGbqluc6nu9E.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NPiPGbqluc6nu9E.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/rokkitt/v36/qFdV35qfgYFjGy5hkEOYeNY-EoKzjE86NNGPGbqluc6nu9E.ttf",
    },
  },
  {
    family: "Luckiest Guy",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/luckiestguy/v22/_gP_1RrxsjcxVyin9l9n_j2RStR3qDpraA.ttf",
    },
  },
  {
    family: "Gothic A1",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100": "http://fonts.gstatic.com/s/gothica1/v13/CSR74z5ZnPydRjlCCwlCCMcqYtd2vfwk.ttf",
      "200": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCpOYKSPl6tOU9Eg.ttf",
      "300": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCwOUKSPl6tOU9Eg.ttf",
      "500": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCmOQKSPl6tOU9Eg.ttf",
      "600": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCtOMKSPl6tOU9Eg.ttf",
      "700": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlC0OIKSPl6tOU9Eg.ttf",
      "800": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlCzOEKSPl6tOU9Eg.ttf",
      "900": "http://fonts.gstatic.com/s/gothica1/v13/CSR44z5ZnPydRjlCCwlC6OAKSPl6tOU9Eg.ttf",
      regular: "http://fonts.gstatic.com/s/gothica1/v13/CSR94z5ZnPydRjlCCwl6bM0uQNJmvQ.ttf",
    },
  },
  {
    family: "Sanchez",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/sanchez/v15/Ycm2sZJORluHnXbITm5b_BwE1l0.ttf",
      italic: "http://fonts.gstatic.com/s/sanchez/v15/Ycm0sZJORluHnXbIfmxR-D4Bxl3gkw.ttf",
    },
  },
  {
    family: "Mate",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/mate/v17/m8JdjftRd7WZ2z28WoXSaLU.ttf",
      italic: "http://fonts.gstatic.com/s/mate/v17/m8JTjftRd7WZ6z-2XqfXeLVdbw.ttf",
    },
  },
  {
    family: "Quattrocento Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/quattrocentosans/v18/va9Z4lja2NVIDdIAAoMR5MfuElaRB0RykmrWN33AiasJ.ttf",
      regular:
        "http://fonts.gstatic.com/s/quattrocentosans/v18/va9c4lja2NVIDdIAAoMR5MfuElaRB3zOvU7eHGHJ.ttf",
      italic:
        "http://fonts.gstatic.com/s/quattrocentosans/v18/va9a4lja2NVIDdIAAoMR5MfuElaRB0zMt0r8GXHJkLI.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/quattrocentosans/v18/va9X4lja2NVIDdIAAoMR5MfuElaRB0zMj_bTPXnijLsJV7E.ttf",
    },
  },
  {
    family: "Crimson Pro",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZTm18OJE_VNWoyQ.ttf",
      "300":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZkG18OJE_VNWoyQ.ttf",
      "500":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZ_G18OJE_VNWoyQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZEGp8OJE_VNWoyQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZKWp8OJE_VNWoyQ.ttf",
      "800":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZTmp8OJE_VNWoyQ.ttf",
      "900":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZZ2p8OJE_VNWoyQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uUsoa5M_tv7IihmnkabC5XiXCAlXGks1WZzm18OJE_VNWoyQ.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi4Ue5s7dtC4yZNE.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi7Ke5s7dtC4yZNE.ttf",
      italic:
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi6Ue5s7dtC4yZNE.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi6me5s7dtC4yZNE.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi5KfJs7dtC4yZNE.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi5zfJs7dtC4yZNE.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi4UfJs7dtC4yZNE.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/crimsonpro/v24/q5uSsoa5M_tv7IihmnkabAReu49Y_Bo-HVKMBi49fJs7dtC4yZNE.ttf",
    },
  },
  {
    family: "Antic Slab",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/anticslab/v16/bWt97fPFfRzkCa9Jlp6IWcJWXW5p5Qo.ttf",
    },
  },
  {
    family: "Khand",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bL5cFE3ZwaH__-C.ttf",
      "500": "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bKhcVE3ZwaH__-C.ttf",
      "600": "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bKNdlE3ZwaH__-C.ttf",
      "700": "http://fonts.gstatic.com/s/khand/v17/TwMN-IINQlQQ0bLpd1E3ZwaH__-C.ttf",
      regular: "http://fonts.gstatic.com/s/khand/v17/TwMA-IINQlQQ0YpVWHU_TBqO.ttf",
    },
  },
  {
    family: "Press Start 2P",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK0nSgPJE4580.ttf",
    },
  },
  {
    family: "Sawarabi Gothic",
    category: "sans-serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/sawarabigothic/v12/x3d4ckfVaqqa-BEj-I9mE65u3k3NBSk3E2YljQ.ttf",
    },
  },
  {
    family: "Saira",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA71rDosg7lwYmUVY.ttf",
      "200":
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA79rCosg7lwYmUVY.ttf",
      "300":
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA7wTCosg7lwYmUVY.ttf",
      "500":
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA72jCosg7lwYmUVY.ttf",
      "600":
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA74TFosg7lwYmUVY.ttf",
      "700":
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA773Fosg7lwYmUVY.ttf",
      "800":
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA79rFosg7lwYmUVY.ttf",
      "900":
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA7_PFosg7lwYmUVY.ttf",
      regular:
        "http://fonts.gstatic.com/s/saira/v19/memWYa2wxmKQyPMrZX79wwYZQMhsyuShhKMjjbU9uXuA71rCosg7lwYmUVY.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBSooxkyQjQVYmxA.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKByosxkyQjQVYmxA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBFIsxkyQjQVYmxA.ttf",
      italic:
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBSosxkyQjQVYmxA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBeIsxkyQjQVYmxA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBlIwxkyQjQVYmxA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKBrYwxkyQjQVYmxA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKByowxkyQjQVYmxA.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/saira/v19/memUYa2wxmKQyNkiV50dulWP7s95AqZTzZHcVdxWI9WH-pKB44wxkyQjQVYmxA.ttf",
    },
  },
  {
    family: "Ubuntu Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/ubuntumono/v17/KFO-CneDtsqEr0keqCMhbC-BL-Hyv4xGemO1.ttf",
      regular: "http://fonts.gstatic.com/s/ubuntumono/v17/KFOjCneDtsqEr0keqCMhbBc9AMX6lJBP.ttf",
      italic: "http://fonts.gstatic.com/s/ubuntumono/v17/KFOhCneDtsqEr0keqCMhbCc_CsHYkYBPY3o.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/ubuntumono/v17/KFO8CneDtsqEr0keqCMhbCc_Mn33tYhkf3O1GVg.ttf",
    },
  },
  {
    family: "Yeseva One",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/yesevaone/v22/OpNJno4ck8vc-xYpwWWxpipfWhXD00c.ttf",
    },
  },
  {
    family: "Josefin Slab",
    category: "serif",
    subsets: ["latin"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W71mtd3k3K6CcEyI.ttf",
      "200":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W79msd3k3K6CcEyI.ttf",
      "300":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W7wesd3k3K6CcEyI.ttf",
      "500":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W72usd3k3K6CcEyI.ttf",
      "600":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W74erd3k3K6CcEyI.ttf",
      "700":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W776rd3k3K6CcEyI.ttf",
      regular:
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-swjwOK3Ps5GSJlNNkMalNpiZe_ldbOR4W71msd3k3K6CcEyI.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvnzs9L4KZAyK43w.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvHzo9L4KZAyK43w.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvwTo9L4KZAyK43w.ttf",
      italic:
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvnzo9L4KZAyK43w.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvrTo9L4KZAyK43w.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHvQT09L4KZAyK43w.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/josefinslab/v26/lW-qwjwOK3Ps5GSJlNNkMalnrxShJj4wo7AR-pHveD09L4KZAyK43w.ttf",
    },
  },
  {
    family: "Unna",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/unna/v23/AYCLpXzofN0NMiQusGnpRFpr3vc.ttf",
      regular: "http://fonts.gstatic.com/s/unna/v23/AYCEpXzofN0NCpgBlGHCWFM.ttf",
      italic: "http://fonts.gstatic.com/s/unna/v23/AYCKpXzofN0NOpoLkEPHSFNyxw.ttf",
      "700italic": "http://fonts.gstatic.com/s/unna/v23/AYCJpXzofN0NOpozLGzjQHhuzvef5Q.ttf",
    },
  },
  {
    family: "Patrick Hand",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/patrickhand/v23/LDI1apSQOAYtSuYWp8ZhfYeMWcjKm7sp8g.ttf",
    },
  },
  {
    family: "Quattrocento",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/quattrocento/v21/OZpbg_xvsDZQL_LKIF7q4jP_eE3fd6PZsXcM9w.ttf",
      regular: "http://fonts.gstatic.com/s/quattrocento/v21/OZpEg_xvsDZQL_LKIF7q4jPHxGL7f4jFuA.ttf",
    },
  },
  {
    family: "Handlee",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/handlee/v18/-F6xfjBsISg9aMakDmr6oilJ3ik.ttf",
    },
  },
  {
    family: "IBM Plex Sans Condensed",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8nN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY7KyKvBgYsMDhM.ttf",
      "200":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY5m6Yvrr4cFFwq5.ttf",
      "300":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY4C6ovrr4cFFwq5.ttf",
      "500":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY5a64vrr4cFFwq5.ttf",
      "600":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY527Ivrr4cFFwq5.ttf",
      "700":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8gN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHY4S7Yvrr4cFFwq5.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8hN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8M_LhakJHhOgBg.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8GPqpYMnEhq5H1w.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8AfppYMnEhq5H1w.ttf",
      regular:
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8lN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHbauwq_jhJsM.ttf",
      italic:
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8nN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYasyKvBgYsMDhM.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8F_opYMnEhq5H1w.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8HPvpYMnEhq5H1w.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/ibmplexsanscondensed/v14/Gg8iN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYas8BfupYMnEhq5H1w.ttf",
    },
  },
  {
    family: "Gelasio",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "500", "500italic", "600", "600italic", "700", "700italic"],
    files: {
      "500": "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_N2CRGEsnIJkWL4.ttf",
      "600": "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_PGFRGEsnIJkWL4.ttf",
      "700": "http://fonts.gstatic.com/s/gelasio/v10/cIf4MaFfvUQxTTqS_JWERGEsnIJkWL4.ttf",
      regular: "http://fonts.gstatic.com/s/gelasio/v10/cIf9MaFfvUQxTTqSxCmrYGkHgIs.ttf",
      italic: "http://fonts.gstatic.com/s/gelasio/v10/cIf_MaFfvUQxTTqS9CuhZEsCkIt9QQ.ttf",
      "500italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZkGImmKBhSL7Y1Q.ttf",
      "600italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZvGUmmKBhSL7Y1Q.ttf",
      "700italic": "http://fonts.gstatic.com/s/gelasio/v10/cIf6MaFfvUQxTTqS9CuZ2GQmmKBhSL7Y1Q.ttf",
    },
  },
  {
    family: "Poiret One",
    category: "display",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/poiretone/v16/UqyVK80NJXN4zfRgbdfbk5lWVscxdKE.ttf",
    },
  },
  {
    family: "Staatliches",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/staatliches/v13/HI_OiY8KO6hCsQSoAPmtMbectJG9O9PS.ttf",
    },
  },
  {
    family: "Mate SC",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/matesc/v22/-nF8OGQ1-uoVr2wKyiXZ95OkJwA.ttf",
    },
  },
  {
    family: "Noto Sans Thai",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RspzF-QRvzzXg.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUxRtpzF-QRvzzXg.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU8ptpzF-QRvzzXg.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU6ZtpzF-QRvzzXg.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU0pqpzF-QRvzzXg.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU3NqpzF-QRvzzXg.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUxRqpzF-QRvzzXg.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdUz1qpzF-QRvzzXg.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosansthai/v20/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xyN9wd43SofNWcd1MKVQt_So_9CdU5RtpzF-QRvzzXg.ttf",
    },
  },
  {
    family: "Cuprum",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmg9f6ZjzSJjQjgnU.ttf",
      "600":
        "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmgzv9ZjzSJjQjgnU.ttf",
      "700":
        "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmgwL9ZjzSJjQjgnU.ttf",
      regular:
        "http://fonts.gstatic.com/s/cuprum/v25/dg45_pLmvrkcOkBnKsOzXyGWTBcmg-X6ZjzSJjQjgnU.ttf",
      italic:
        "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25jn_YIhYmknUPEA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25vH_YIhYmknUPEA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25UHjYIhYmknUPEA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/cuprum/v25/dg47_pLmvrkcOkBNI_FMh0j91rkhli25aXjYIhYmknUPEA.ttf",
    },
  },
  {
    family: "Encode Sans Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_76_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-5a-JLQoFI2KR.ttf",
      "200":
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-SY6pByQJKnuIFA.ttf",
      "300":
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-LY2pByQJKnuIFA.ttf",
      "500":
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-dYypByQJKnuIFA.ttf",
      "600":
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-WYupByQJKnuIFA.ttf",
      "700":
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-PYqpByQJKnuIFA.ttf",
      "800":
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-IYmpByQJKnuIFA.ttf",
      "900":
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_46_LD37rqfuwxyIuaZhE6cRXOLtm2gfT-BYipByQJKnuIFA.ttf",
      regular:
        "http://fonts.gstatic.com/s/encodesanscondensed/v10/j8_16_LD37rqfuwxyIuaZhE6cRXOLtm2gfTGgaWNDw8VIw.ttf",
    },
  },
  {
    family: "Rubik Mono One",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/rubikmonoone/v18/UqyJK8kPP3hjw6ANTdfRk9YSN-8wRqQrc_j9.ttf",
    },
  },
  {
    family: "Yatra One",
    category: "display",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/yatraone/v14/C8ch4copsHzj8p7NaF0xw1OBbRDvXw.ttf",
    },
  },
  {
    family: "Bangers",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bangers/v24/FeVQS0BTqb0h60ACL5la2bxii28.ttf",
    },
  },
  {
    family: "Special Elite",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/specialelite/v18/XLYgIZbkc4JPUL5CVArUVL0nhncESXFtUsM.ttf",
    },
  },
  {
    family: "Readex Pro",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCYUSmgmsglvjkag.ttf",
      "300":
        "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCv0Smgmsglvjkag.ttf",
      "500":
        "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTC00Smgmsglvjkag.ttf",
      "600":
        "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCP0Omgmsglvjkag.ttf",
      "700":
        "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTCBkOmgmsglvjkag.ttf",
      regular:
        "http://fonts.gstatic.com/s/readexpro/v21/SLXnc1bJ7HE5YDoGPuzj_dh8uc7wUy8ZQQyX2KY8TL0kGZN6blTC4USmgmsglvjkag.ttf",
    },
  },
  {
    family: "Vidaloka",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/vidaloka/v18/7cHrv4c3ipenMKlEass8yn4hnCci.ttf",
    },
  },
  {
    family: "Roboto Serif",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliosp6d2Af5fR4k.ttf",
      "200":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElqotp6d2Af5fR4k.ttf",
      "300":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElnQtp6d2Af5fR4k.ttf",
      "500":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElhgtp6d2Af5fR4k.ttf",
      "600":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElvQqp6d2Af5fR4k.ttf",
      "700":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEls0qp6d2Af5fR4k.ttf",
      "800":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcElqoqp6d2Af5fR4k.ttf",
      "900":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEloMqp6d2Af5fR4k.ttf",
      regular:
        "http://fonts.gstatic.com/s/robotoserif/v13/R71RjywflP6FLr3gZx7K8UyuXDs9zVwDmXCb8lxYgmuii32UGoVldX6UgfjL4-3sMM_kB_qXSEXTJQCFLH5-_bcEliotp6d2Af5fR4k.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuT-V8BdxaV4nUFw.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Juz-R8BdxaV4nUFw.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuEeR8BdxaV4nUFw.ttf",
      italic:
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuT-R8BdxaV4nUFw.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JufeR8BdxaV4nUFw.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JukeN8BdxaV4nUFw.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-JuqON8BdxaV4nUFw.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Juz-N8BdxaV4nUFw.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/robotoserif/v13/R71XjywflP6FLr3gZx7K8UyEVQnyR1E7VN-f51xYuGCQepOvB0KLc2v0wKKB0Q4MSZxyqf2CgAchbDJ69BcVZxkDg-Ju5uN8BdxaV4nUFw.ttf",
    },
  },
  {
    family: "Fira Sans Extra Condensed",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPMcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3Zyuv1WarE9ncg.ttf",
      "200":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3TCPn3-0oEZ-a2Q.ttf",
      "300":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3VSMn3-0oEZ-a2Q.ttf",
      "500":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3QyNn3-0oEZ-a2Q.ttf",
      "600":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3SCKn3-0oEZ-a2Q.ttf",
      "700":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3USLn3-0oEZ-a2Q.ttf",
      "800":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3ViIn3-0oEZ-a2Q.ttf",
      "900":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPPcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda3XyJn3-0oEZ-a2Q.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPOcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqW21-ejkp3cn22.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWd36-pGR7e2SvJQ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWE32-pGR7e2SvJQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPKcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda5fiku3efvE8.ttf",
      italic:
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPMcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fquv1WarE9ncg.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWS3y-pGR7e2SvJQ.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWZ3u-pGR7e2SvJQ.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWA3q-pGR7e2SvJQ.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWH3m-pGR7e2SvJQ.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/firasansextracondensed/v10/NaPxcYDaAO5dirw6IaFn7lPJFqXmS-M9Atn3wgda1fqWO3i-pGR7e2SvJQ.ttf",
    },
  },
  {
    family: "News Cycle",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/newscycle/v23/CSR54z1Qlv-GDxkbKVQ_dFsvaNNUuOwkC2s.ttf",
      regular: "http://fonts.gstatic.com/s/newscycle/v23/CSR64z1Qlv-GDxkbKVQ_TOcATNt_pOU.ttf",
    },
  },
  {
    family: "Commissioner",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTMNcGPe7Fu0jUdk.ttf",
      "200":
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTENdGPe7Fu0jUdk.ttf",
      "300":
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTJ1dGPe7Fu0jUdk.ttf",
      "500":
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTPFdGPe7Fu0jUdk.ttf",
      "600":
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTB1aGPe7Fu0jUdk.ttf",
      "700":
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTCRaGPe7Fu0jUdk.ttf",
      "800":
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTENaGPe7Fu0jUdk.ttf",
      "900":
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTGpaGPe7Fu0jUdk.ttf",
      regular:
        "http://fonts.gstatic.com/s/commissioner/v20/tDaH2o2WnlgI0FNDgduEk4jAhwgumbU1SVfU5BD8OuRL8OstC6KOhgvBYWSFJ-Mgdrgiju6fF8meZm0rk4eF-ZugTMNdGPe7Fu0jUdk.ttf",
    },
  },
  {
    family: "Unbounded",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG65jx043HgP6LR0Y.ttf",
      "300":
        "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG60bx043HgP6LR0Y.ttf",
      "500":
        "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6yrx043HgP6LR0Y.ttf",
      "600":
        "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG68b2043HgP6LR0Y.ttf",
      "700":
        "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6__2043HgP6LR0Y.ttf",
      "800":
        "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG65j2043HgP6LR0Y.ttf",
      "900":
        "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG67H2043HgP6LR0Y.ttf",
      regular:
        "http://fonts.gstatic.com/s/unbounded/v7/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6xjx043HgP6LR0Y.ttf",
    },
  },
  {
    family: "Tangerine",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/tangerine/v17/Iurd6Y5j_oScZZow4VO5srNpjJtM6G0t9w.ttf",
      regular: "http://fonts.gstatic.com/s/tangerine/v17/IurY6Y5j_oScZZow4VOBDpxNhLBQ4Q.ttf",
    },
  },
  {
    family: "Sen",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      "500": "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISBi5H47KlD9q78A.ttf",
      "600": "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISPS-H47KlD9q78A.ttf",
      "700": "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISM2-H47KlD9q78A.ttf",
      "800": "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISKq-H47KlD9q78A.ttf",
      regular: "http://fonts.gstatic.com/s/sen/v9/6xK0dSxYI9_dkN18-vZKK2EISCq5H47KlD9q78A.ttf",
    },
  },
  {
    family: "Be Vietnam Pro",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVNSTAyLFyeg_IDWvOJmVES_HRUBX8YYbAiah8.ttf",
      "200":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HT4JF8yT7wrcwap.ttf",
      "300":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HScJ18yT7wrcwap.ttf",
      "500":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HTEJl8yT7wrcwap.ttf",
      "600":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HToIV8yT7wrcwap.ttf",
      "700":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HSMIF8yT7wrcwap.ttf",
      "800":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HSQI18yT7wrcwap.ttf",
      "900":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVMSTAyLFyeg_IDWvOJmVES_HS0Il8yT7wrcwap.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVLSTAyLFyeg_IDWvOJmVES_HwyPRsSZZIneh-waA.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPbczRbgJdhapcUU.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPdMwRbgJdhapcUU.ttf",
      regular:
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVPSTAyLFyeg_IDWvOJmVES_EwwD3s6ZKAi.ttf",
      italic:
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVNSTAyLFyeg_IDWvOJmVES_HwyBX8YYbAiah8.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPYsxRbgJdhapcUU.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPac2RbgJdhapcUU.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPcM3RbgJdhapcUU.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPd80RbgJdhapcUU.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/bevietnampro/v11/QdVKSTAyLFyeg_IDWvOJmVES_HwyPfs1RbgJdhapcUU.ttf",
    },
  },
  {
    family: "Caladea",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/caladea/v7/kJE2BugZ7AAjhybUtaNY39oYqO52FZ0.ttf",
      regular: "http://fonts.gstatic.com/s/caladea/v7/kJEzBugZ7AAjhybUjR93-9IztOc.ttf",
      italic: "http://fonts.gstatic.com/s/caladea/v7/kJExBugZ7AAjhybUvR19__A2pOdvDA.ttf",
      "700italic": "http://fonts.gstatic.com/s/caladea/v7/kJE0BugZ7AAjhybUvR1FQ98SrMxzBZ2lDA.ttf",
    },
  },
  {
    family: "Aleo",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJ3G2P9HI4qCBtJ.ttf",
      "200": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KL3GmP9HI4qCBtJ.ttf",
      "300": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KIpGmP9HI4qCBtJ.ttf",
      "500": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJFGmP9HI4qCBtJ.ttf",
      "600": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KKpHWP9HI4qCBtJ.ttf",
      "700": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KKQHWP9HI4qCBtJ.ttf",
      "800": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KL3HWP9HI4qCBtJ.ttf",
      "900": "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KLeHWP9HI4qCBtJ.ttf",
      regular: "http://fonts.gstatic.com/s/aleo/v14/c4m61nF8G8_s6gHhIOX0IYBo_KJ3GmP9HI4qCBtJ.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WYu_FooIDQtJbok.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WQu-FooIDQtJbok.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WdW-FooIDQtJbok.ttf",
      italic: "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WYu-FooIDQtJbok.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_Wbm-FooIDQtJbok.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WVW5FooIDQtJbok.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WWy5FooIDQtJbok.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WQu5FooIDQtJbok.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/aleo/v14/c4m81nF8G8_swAjT3z2dShrG-7e_WSK5FooIDQtJbok.ttf",
    },
  },
  {
    family: "Mukta Malar",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "tamil"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      "200": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMwBtAB62ruoAZW.ttf",
      "300": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINUBdAB62ruoAZW.ttf",
      "500": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMMBNAB62ruoAZW.ttf",
      "600": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqIMgA9AB62ruoAZW.ttf",
      "700": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINEAtAB62ruoAZW.ttf",
      "800": "http://fonts.gstatic.com/s/muktamalar/v12/MCoKzAXyz8LOE2FpJMxZqINYAdAB62ruoAZW.ttf",
      regular: "http://fonts.gstatic.com/s/muktamalar/v12/MCoXzAXyz8LOE2FpJMxZqLv4LfQJwHbn.ttf",
    },
  },
  {
    family: "Secular One",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/secularone/v12/8QINdiTajsj_87rMuMdKypDlMul7LJpK.ttf",
    },
  },
  {
    family: "Playfair Display SC",
    category: "serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic", "700", "700italic", "900", "900italic"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke80OhoaMkR6-hSn7kbHVoFf7ZfgMPr_nQIpNcsdL4IUMyE.ttf",
      "900":
        "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke80OhoaMkR6-hSn7kbHVoFf7ZfgMPr_nTorNcsdL4IUMyE.ttf",
      regular:
        "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke85OhoaMkR6-hSn7kbHVoFf7ZfgMPr_pb4GEcM2M4s.ttf",
      italic:
        "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke87OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbwMFeEzI4sNKg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke82OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbw0qc4XK6ARIyH5IA.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/playfairdisplaysc/v15/ke82OhoaMkR6-hSn7kbHVoFf7ZfgMPr_lbw0kcwXK6ARIyH5IA.ttf",
    },
  },
  {
    family: "Noto Naskh Arabic",
    category: "serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwj85krK0z9_Mnuw.ttf",
      "600":
        "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwY8lkrK0z9_Mnuw.ttf",
      "700":
        "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwWslkrK0z9_Mnuw.ttf",
      regular:
        "http://fonts.gstatic.com/s/notonaskharabic/v33/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwvc5krK0z9_Mnuw.ttf",
    },
  },
  {
    family: "Baloo 2",
    category: "display",
    subsets: ["devanagari", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgozapv9Fat7WcN.ttf",
      "600":
        "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdjEyqpv9Fat7WcN.ttf",
      "700":
        "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdj9yqpv9Fat7WcN.ttf",
      "800":
        "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdiayqpv9Fat7WcN.ttf",
      regular:
        "http://fonts.gstatic.com/s/baloo2/v21/wXK0E3kTposypRydzVT08TS3JnAmtdgazapv9Fat7WcN.ttf",
    },
  },
  {
    family: "Faustina",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHls3IEvGVWWe8tbEg.ttf",
      "500":
        "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlssIEvGVWWe8tbEg.ttf",
      "600":
        "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsXIYvGVWWe8tbEg.ttf",
      "700":
        "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsZYYvGVWWe8tbEg.ttf",
      "800":
        "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsAoYvGVWWe8tbEg.ttf",
      regular:
        "http://fonts.gstatic.com/s/faustina/v20/XLY4IZPxYpJfTbZAFXWzNT2SO8wpWHlsgoEvGVWWe8tbEg.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsKZWl-SWc5LEnoF.ttf",
      italic:
        "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsLHWl-SWc5LEnoF.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsL1Wl-SWc5LEnoF.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsIZXV-SWc5LEnoF.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsIgXV-SWc5LEnoF.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/faustina/v20/XLY2IZPxYpJfTbZAFV-6B8JKUqez9n55SsJHXV-SWc5LEnoF.ttf",
    },
  },
  {
    family: "Mitr",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      "200": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8fMZFJDUc1NECPY.ttf",
      "300": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8ZcaFJDUc1NECPY.ttf",
      "500": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8c8bFJDUc1NECPY.ttf",
      "600": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8eMcFJDUc1NECPY.ttf",
      "700": "http://fonts.gstatic.com/s/mitr/v11/pxiEypw5ucZF8YcdFJDUc1NECPY.ttf",
      regular: "http://fonts.gstatic.com/s/mitr/v11/pxiLypw5ucZFyTsyMJj_b1o.ttf",
    },
  },
  {
    family: "Allura",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/allura/v21/9oRPNYsQpS4zjuAPjAIXPtrrGA.ttf",
    },
  },
  {
    family: "Literata",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbJG_F_bcTWCWp8g.ttf",
      "300":
        "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbE-_F_bcTWCWp8g.ttf",
      "500":
        "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbCO_F_bcTWCWp8g.ttf",
      "600":
        "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbM-4F_bcTWCWp8g.ttf",
      "700":
        "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbPa4F_bcTWCWp8g.ttf",
      "800":
        "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbJG4F_bcTWCWp8g.ttf",
      "900":
        "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbLi4F_bcTWCWp8g.ttf",
      regular:
        "http://fonts.gstatic.com/s/literata/v35/or3PQ6P12-iJxAIgLa78DkrbXsDgk0oVDaDPYLanFLHpPf2TbBG_F_bcTWCWp8g.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8f7XWSUKTt8iVow.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8obXWSUKTt8iVow.ttf",
      italic:
        "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8_7XWSUKTt8iVow.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8zbXWSUKTt8iVow.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8IbLWSUKTt8iVow.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8GLLWSUKTt8iVow.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8f7LWSUKTt8iVow.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/literata/v35/or3NQ6P12-iJxAIgLYT1PLs1Zd0nfUwAbeGVKoRYzNiCp1OUedn8VrLWSUKTt8iVow.ttf",
    },
  },
  {
    family: "Volkhov",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/volkhov/v17/SlGVmQieoJcKemNeeY4hoHRYbDQUego.ttf",
      regular: "http://fonts.gstatic.com/s/volkhov/v17/SlGQmQieoJcKemNeQTIOhHxzcD0.ttf",
      italic: "http://fonts.gstatic.com/s/volkhov/v17/SlGSmQieoJcKemNecTAEgF52YD0NYw.ttf",
      "700italic": "http://fonts.gstatic.com/s/volkhov/v17/SlGXmQieoJcKemNecTA8PHFSaBYRagrQrA.ttf",
    },
  },
  {
    family: "DM Serif Text",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/dmseriftext/v12/rnCu-xZa_krGokauCeNq1wWyafOPXHIJErY.ttf",
      italic:
        "http://fonts.gstatic.com/s/dmseriftext/v12/rnCw-xZa_krGokauCeNq1wWyWfGFWFAMArZKqQ.ttf",
    },
  },
  {
    family: "Kosugi Maru",
    category: "sans-serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/kosugimaru/v14/0nksC9PgP_wGh21A2KeqGiTqivr9iBq_.ttf",
    },
  },
  {
    family: "Ultra",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/ultra/v23/zOLy4prXmrtY-tT6yLOD6NxF.ttf",
    },
  },
  {
    family: "PT Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/ptmono/v13/9oRONYoBnWILk-9ArCg5MtPyAcg.ttf",
    },
  },
  {
    family: "Carter One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/carterone/v17/q5uCsoe5IOB2-pXv9UcNIxR2hYxREMs.ttf",
    },
  },
  {
    family: "Nanum Gothic Coding",
    category: "handwriting",
    subsets: ["korean", "latin"],
    variants: ["regular", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/nanumgothiccoding/v21/8QIYdjzHisX_8vv59_xMxtPFW4IXROws8xgecsV88t5V9r4.ttf",
      regular:
        "http://fonts.gstatic.com/s/nanumgothiccoding/v21/8QIVdjzHisX_8vv59_xMxtPFW4IXROwsy6QxVs1X7tc.ttf",
    },
  },
  {
    family: "Viga",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/viga/v14/xMQbuFFdSaiX_QIjD4e2OX8.ttf",
    },
  },
  {
    family: "Libre Caslon Text",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/librecaslontext/v5/DdT578IGsGw1aF1JU10PUbTvNNaDMfID8sdjNR-8ssPt.ttf",
      regular:
        "http://fonts.gstatic.com/s/librecaslontext/v5/DdT878IGsGw1aF1JU10PUbTvNNaDMcq_3eNrHgO1.ttf",
      italic:
        "http://fonts.gstatic.com/s/librecaslontext/v5/DdT678IGsGw1aF1JU10PUbTvNNaDMfq91-dJGxO1q9o.ttf",
    },
  },
  {
    family: "Tenor Sans",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/tenorsans/v19/bx6ANxqUneKx06UkIXISr3JyC22IyqI.ttf",
    },
  },
  {
    family: "Ropa Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/ropasans/v15/EYqxmaNOzLlWtsZSScyKWjloU5KP2g.ttf",
      italic: "http://fonts.gstatic.com/s/ropasans/v15/EYq3maNOzLlWtsZSScy6WDNscZef2mNE.ttf",
    },
  },
  {
    family: "Voltaire",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/voltaire/v20/1Pttg8PcRfSblAvGvQooYKVnBOif.ttf",
    },
  },
  {
    family: "Red Hat Text",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML-ZwVrbacYVFtIY.ttf",
      "500":
        "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML4pwVrbacYVFtIY.ttf",
      "600":
        "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML2Z3VrbacYVFtIY.ttf",
      "700":
        "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML193VrbacYVFtIY.ttf",
      regular:
        "http://fonts.gstatic.com/s/redhattext/v14/RrQCbohi_ic6B3yVSzGBrMx6ZI_cy1A6Ok2ML7hwVrbacYVFtIY.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAz4PXQdadApIYv_g.ttf",
      italic:
        "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzvvXQdadApIYv_g.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzjPXQdadApIYv_g.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzYPLQdadApIYv_g.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/redhattext/v14/RrQEbohi_ic6B3yVSzGBrMxQbb0jEzlRoOOLOnAzWfLQdadApIYv_g.ttf",
    },
  },
  {
    family: "Marck Script",
    category: "handwriting",
    subsets: ["cyrillic", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/marckscript/v20/nwpTtK2oNgBA3Or78gapdwuCzyI-aMPF7Q.ttf",
    },
  },
  {
    family: "Fugaz One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/fugazone/v19/rax_HiWKp9EAITukFslMBBJek0vA8A.ttf",
    },
  },
  {
    family: "Baskervville",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/baskervville/v16/YA9Ur0yU4l_XOrogbkun3kQgt5OohvbJ9A.ttf",
      italic:
        "http://fonts.gstatic.com/s/baskervville/v16/YA9Kr0yU4l_XOrogbkun3kQQtZmspPPZ9Mlt.ttf",
    },
  },
  {
    family: "Bungee",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bungee/v13/N0bU2SZBIuF2PU_ECn50Kd_PmA.ttf",
    },
  },
  {
    family: "League Spartan",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvM_oXpBMdcFguczA.ttf",
      "200":
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMfoTpBMdcFguczA.ttf",
      "300":
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMoITpBMdcFguczA.ttf",
      "500":
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMzITpBMdcFguczA.ttf",
      "600":
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMIIPpBMdcFguczA.ttf",
      "700":
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMGYPpBMdcFguczA.ttf",
      "800":
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMfoPpBMdcFguczA.ttf",
      "900":
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvMV4PpBMdcFguczA.ttf",
      regular:
        "http://fonts.gstatic.com/s/leaguespartan/v11/kJEnBuEW6A0lliaV_m88ja5Twtx8BWhtkDVmjZvM_oTpBMdcFguczA.ttf",
    },
  },
  {
    family: "Inter Tight",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjDw6qXCRToK8EPg.ttf",
      "200":
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjjw-qXCRToK8EPg.ttf",
      "300":
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjUQ-qXCRToK8EPg.ttf",
      "500":
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjPQ-qXCRToK8EPg.ttf",
      "600":
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mj0QiqXCRToK8EPg.ttf",
      "700":
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mj6AiqXCRToK8EPg.ttf",
      "800":
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjjwiqXCRToK8EPg.ttf",
      "900":
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjpgiqXCRToK8EPg.ttf",
      regular:
        "http://fonts.gstatic.com/s/intertight/v7/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjDw-qXCRToK8EPg.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xCHi5XgqoUPvi5.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zCHy5XgqoUPvi5.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0wcHy5XgqoUPvi5.ttf",
      italic:
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xCHy5XgqoUPvi5.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0xwHy5XgqoUPvi5.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0ycGC5XgqoUPvi5.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0ylGC5XgqoUPvi5.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zCGC5XgqoUPvi5.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/intertight/v7/NGShv5HMAFg6IuGlBNMjxLsC66ZMtb8hyW62x0zrGC5XgqoUPvi5.ttf",
    },
  },
  {
    family: "Antonio",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxx8BtIY2DwSXlM.ttf",
      "200":
        "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVzx8RtIY2DwSXlM.ttf",
      "300":
        "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVwv8RtIY2DwSXlM.ttf",
      "500":
        "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxD8RtIY2DwSXlM.ttf",
      "600":
        "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVyv9htIY2DwSXlM.ttf",
      "700":
        "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVyW9htIY2DwSXlM.ttf",
      regular:
        "http://fonts.gstatic.com/s/antonio/v19/gNMbW3NwSYq_9WD34ngK5F8vR8T0PVxx8RtIY2DwSXlM.ttf",
    },
  },
  {
    family: "Gudea",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/gudea/v15/neIIzCqgsI0mp9gz26WGHK06UY30.ttf",
      regular: "http://fonts.gstatic.com/s/gudea/v15/neIFzCqgsI0mp-CP9IGON7Ez.ttf",
      italic: "http://fonts.gstatic.com/s/gudea/v15/neILzCqgsI0mp9CN_oWsMqEzSJQ.ttf",
    },
  },
  {
    family: "Parisienne",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/parisienne/v13/E21i_d3kivvAkxhLEVZpcy96DuKuavM.ttf",
    },
  },
  {
    family: "Adamina",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/adamina/v21/j8_r6-DH1bjoc-dwu-reETl4Bno.ttf",
    },
  },
  {
    family: "Taviraj",
    category: "serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/taviraj/v13/ahcbv8Cj3ylylTXzRIorV8N1jU2gog.ttf",
      "200": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRCYKd-lbgUS5u0s.ttf",
      "300": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzREIJd-lbgUS5u0s.ttf",
      "500": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRBoId-lbgUS5u0s.ttf",
      "600": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRDYPd-lbgUS5u0s.ttf",
      "700": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRFIOd-lbgUS5u0s.ttf",
      "800": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRE4Nd-lbgUS5u0s.ttf",
      "900": "http://fonts.gstatic.com/s/taviraj/v13/ahccv8Cj3ylylTXzRGoMd-lbgUS5u0s.ttf",
      "100italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcdv8Cj3ylylTXzTOwTM8lxr0iwolLl.ttf",
      "200italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTn-hRhWa8q0v8ag.ttf",
      "300italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT--tRhWa8q0v8ag.ttf",
      regular: "http://fonts.gstatic.com/s/taviraj/v13/ahcZv8Cj3ylylTXzfO4hU-FwnU0.ttf",
      italic: "http://fonts.gstatic.com/s/taviraj/v13/ahcbv8Cj3ylylTXzTOwrV8N1jU2gog.ttf",
      "500italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTo-pRhWa8q0v8ag.ttf",
      "600italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwTj-1RhWa8q0v8ag.ttf",
      "700italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT6-xRhWa8q0v8ag.ttf",
      "800italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT9-9RhWa8q0v8ag.ttf",
      "900italic": "http://fonts.gstatic.com/s/taviraj/v13/ahcev8Cj3ylylTXzTOwT0-5RhWa8q0v8ag.ttf",
    },
  },
  {
    family: "Sriracha",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sriracha/v14/0nkrC9D4IuYBgWcI9ObYRQDioeb0.ttf",
    },
  },
  {
    family: "Blinker",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "600", "700", "800", "900"],
    files: {
      "100": "http://fonts.gstatic.com/s/blinker/v13/cIf_MaFatEE-VTaP_E2hZEsCkIt9QQ.ttf",
      "200": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_OGARGEsnIJkWL4.ttf",
      "300": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_IWDRGEsnIJkWL4.ttf",
      "600": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_PGFRGEsnIJkWL4.ttf",
      "700": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_JWERGEsnIJkWL4.ttf",
      "800": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_ImHRGEsnIJkWL4.ttf",
      "900": "http://fonts.gstatic.com/s/blinker/v13/cIf4MaFatEE-VTaP_K2GRGEsnIJkWL4.ttf",
      regular: "http://fonts.gstatic.com/s/blinker/v13/cIf9MaFatEE-VTaPxCmrYGkHgIs.ttf",
    },
  },
  {
    family: "Rock Salt",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rocksalt/v22/MwQ0bhv11fWD6QsAVOZbsEk7hbBWrA.ttf",
    },
  },
  {
    family: "Hind Vadodara",
    category: "sans-serif",
    subsets: ["gujarati", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSDn3iXM0oSOL2Yw.ttf",
      "500":
        "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSGH2iXM0oSOL2Yw.ttf",
      "600":
        "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSE3xiXM0oSOL2Yw.ttf",
      "700":
        "http://fonts.gstatic.com/s/hindvadodara/v13/neIQzCKvrIcn5pbuuuriV9tTSCnwiXM0oSOL2Yw.ttf",
      regular:
        "http://fonts.gstatic.com/s/hindvadodara/v13/neINzCKvrIcn5pbuuuriV9tTcJXfrXsfvSo.ttf",
    },
  },
  {
    family: "Kumbh Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "math"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQkZcA8bTuUkqaLg.ttf",
      "200":
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQEZYA8bTuUkqaLg.ttf",
      "300":
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQz5YA8bTuUkqaLg.ttf",
      "500":
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQo5YA8bTuUkqaLg.ttf",
      "600":
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQT5EA8bTuUkqaLg.ttf",
      "700":
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQdpEA8bTuUkqaLg.ttf",
      "800":
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQEZEA8bTuUkqaLg.ttf",
      "900":
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQOJEA8bTuUkqaLg.ttf",
      regular:
        "http://fonts.gstatic.com/s/kumbhsans/v20/c4mP1n92AsfhuCq6tVsaoIx1LQICk0boNoq0SjlDfnzKo-bF3mdQkZYA8bTuUkqaLg.ttf",
    },
  },
  {
    family: "Amaranth",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/amaranth/v18/KtkpALODe433f0j1zMF-OPWi6WDfFpuc.ttf",
      regular: "http://fonts.gstatic.com/s/amaranth/v18/KtkuALODe433f0j1zPnCF9GqwnzW.ttf",
      italic: "http://fonts.gstatic.com/s/amaranth/v18/KtkoALODe433f0j1zMnAHdWIx2zWD4I.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/amaranth/v18/KtkrALODe433f0j1zMnAJWmn42T9E4ucRY8.ttf",
    },
  },
  {
    family: "Mada",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "200": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlOkHkw2-m9x2iC.ttf",
      "300": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFmQkHkw2-m9x2iC.ttf",
      "500": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFn8kHkw2-m9x2iC.ttf",
      "600": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFkQl3kw2-m9x2iC.ttf",
      "700": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFkpl3kw2-m9x2iC.ttf",
      "800": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlOl3kw2-m9x2iC.ttf",
      "900": "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFlnl3kw2-m9x2iC.ttf",
      regular: "http://fonts.gstatic.com/s/mada/v19/7Aulp_0qnzeSVz7u3PJLcUMYOFnOkHkw2-m9x2iC.ttf",
    },
  },
  {
    family: "Neucha",
    category: "handwriting",
    subsets: ["cyrillic", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/neucha/v17/q5uGsou0JOdh94bvugNsCxVEgA.ttf",
    },
  },
  {
    family: "Homemade Apple",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/homemadeapple/v22/Qw3EZQFXECDrI2q789EKQZJob3x9Vnksi4M7.ttf",
    },
  },
  {
    family: "Epilogue",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXMDLiDJXVigHPVA.ttf",
      "200":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXsDPiDJXVigHPVA.ttf",
      "300":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXbjPiDJXVigHPVA.ttf",
      "500":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXAjPiDJXVigHPVA.ttf",
      "600":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OX7jTiDJXVigHPVA.ttf",
      "700":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OX1zTiDJXVigHPVA.ttf",
      "800":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXsDTiDJXVigHPVA.ttf",
      "900":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXmTTiDJXVigHPVA.ttf",
      regular:
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZMFGj5hxF0EhjimngomvnCCtqb30OXMDPiDJXVigHPVA.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HAKTp_RqATfVHNU.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCKT5_RqATfVHNU.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HBUT5_RqATfVHNU.ttf",
      italic:
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HAKT5_RqATfVHNU.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HA4T5_RqATfVHNU.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HDUSJ_RqATfVHNU.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HDtSJ_RqATfVHNU.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCKSJ_RqATfVHNU.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/epilogue/v17/O4ZCFGj5hxF0EhjimlIhqAYaY7EBcUSC-HCjSJ_RqATfVHNU.ttf",
    },
  },
  {
    family: "Cabin Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwilMH97F15-K1oqQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwiuMb97F15-K1oqQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/cabincondensed/v20/nwpJtK6mNhBK2err_hqkYhHRqmwi3Mf97F15-K1oqQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/cabincondensed/v20/nwpMtK6mNhBK2err_hqkYhHRqmwaYOjZ5HZl8Q.ttf",
    },
  },
  {
    family: "Abhaya Libre",
    category: "serif",
    subsets: ["latin", "latin-ext", "sinhala"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYj2ryqtxI6oYtBA.ttf",
      "600":
        "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYo23yqtxI6oYtBA.ttf",
      "700":
        "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEYx2zyqtxI6oYtBA.ttf",
      "800":
        "http://fonts.gstatic.com/s/abhayalibre/v14/e3t5euGtX-Co5MNzeAOqinEY22_yqtxI6oYtBA.ttf",
      regular: "http://fonts.gstatic.com/s/abhayalibre/v14/e3tmeuGtX-Co5MNzeAOqinEge0PWovdU4w.ttf",
    },
  },
  {
    family: "Istok Web",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/istokweb/v24/3qTqojGmgSyUukBzKslhvU5a_mkUYBfcMw.ttf",
      regular: "http://fonts.gstatic.com/s/istokweb/v24/3qTvojGmgSyUukBzKslZAWF-9kIIaQ.ttf",
      italic: "http://fonts.gstatic.com/s/istokweb/v24/3qTpojGmgSyUukBzKslpA2t61EcYaQ7F.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/istokweb/v24/3qT0ojGmgSyUukBzKslpA1PG-2MQQhLMMygN.ttf",
    },
  },
  {
    family: "Noto Sans Devanagari",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQky-AzoFoW4Ow.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlfQly-AzoFoW4Ow.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlSoly-AzoFoW4Ow.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlUYly-AzoFoW4Ow.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08Alaoiy-AzoFoW4Ow.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlZMiy-AzoFoW4Ow.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlfQiy-AzoFoW4Ow.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08Ald0iy-AzoFoW4Ow.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosansdevanagari/v25/TuGoUUFzXI5FBtUq5a8bjKYTZjtRU6Sgv3NaV_SNmI0b8QQCQmHn6B2OHjbL_08AlXQly-AzoFoW4Ow.ttf",
    },
  },
  {
    family: "Zen Kaku Gothic New",
    category: "sans-serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "700", "900"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqpdKaWTSTGlMyd8.ttf",
      "500":
        "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqs9LaWTSTGlMyd8.ttf",
      "700":
        "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqodNaWTSTGlMyd8.ttf",
      "900":
        "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMVW2drQpDw0GjzrVNFf_valaDBcznOqr9PaWTSTGlMyd8.ttf",
      regular:
        "http://fonts.gstatic.com/s/zenkakugothicnew/v15/gNMYW2drQpDw0GjzrVNFf_valaDBcznOkjtiTWz5UGA.ttf",
    },
  },
  {
    family: "Alex Brush",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EtUL57DtOmCc.ttf",
    },
  },
  {
    family: "Itim",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/itim/v14/0nknC9ziJOYewARKkc7ZdwU.ttf",
    },
  },
  {
    family: "Albert Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHq5L_rI32TxAj1g.ttf",
      "200":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHK5P_rI32TxAj1g.ttf",
      "300":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSH9ZP_rI32TxAj1g.ttf",
      "500":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHmZP_rI32TxAj1g.ttf",
      "600":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHdZT_rI32TxAj1g.ttf",
      "700":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHTJT_rI32TxAj1g.ttf",
      "800":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHK5T_rI32TxAj1g.ttf",
      "900":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHApT_rI32TxAj1g.ttf",
      regular:
        "http://fonts.gstatic.com/s/albertsans/v1/i7dZIFdwYjGaAMFtZd_QA3xXSKZqhr-TenSHq5P_rI32TxAj1g.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9AX7ofybRUz1r5t.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9CX74fybRUz1r5t.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9BJ74fybRUz1r5t.ttf",
      italic:
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9AX74fybRUz1r5t.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9Al74fybRUz1r5t.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9DJ6IfybRUz1r5t.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9Dw6IfybRUz1r5t.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9CX6IfybRUz1r5t.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/albertsans/v1/i7dfIFdwYjGaAMFtZd_QA1Zeelmy79QJ1HOSY9C-6IfybRUz1r5t.ttf",
    },
  },
  {
    family: "Cousine",
    category: "monospace",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "hebrew",
      "latin",
      "latin-ext",
      "vietnamese",
    ],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/cousine/v27/d6lNkaiiRdih4SpP9Z8K6T7G09BlnmQ.ttf",
      regular: "http://fonts.gstatic.com/s/cousine/v27/d6lIkaiiRdih4SpPzSMlzTbtz9k.ttf",
      italic: "http://fonts.gstatic.com/s/cousine/v27/d6lKkaiiRdih4SpP_SEvyRTo39l8hw.ttf",
      "700italic": "http://fonts.gstatic.com/s/cousine/v27/d6lPkaiiRdih4SpP_SEXdTvM1_JgjmRpOA.ttf",
    },
  },
  {
    family: "Courier Prime",
    category: "monospace",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/courierprime/v9/u-4k0q2lgwslOqpF_6gQ8kELY7pMf-fVqvHoJXw.ttf",
      regular: "http://fonts.gstatic.com/s/courierprime/v9/u-450q2lgwslOqpF_6gQ8kELWwZjW-_-tvg.ttf",
      italic:
        "http://fonts.gstatic.com/s/courierprime/v9/u-4n0q2lgwslOqpF_6gQ8kELawRpX837pvjxPA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/courierprime/v9/u-4i0q2lgwslOqpF_6gQ8kELawRR4-LfrtPtNXyeAg.ttf",
    },
  },
  {
    family: "Mr Dafoe",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/mrdafoe/v14/lJwE-pIzkS5NXuMMrGiqg7MCxz_C.ttf",
    },
  },
  {
    family: "Playball",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/playball/v20/TK3gWksYAxQ7jbsKcj8Dl-tPKo2t.ttf",
    },
  },
  {
    family: "Anonymous Pro",
    category: "monospace",
    subsets: ["cyrillic", "greek", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/anonymouspro/v21/rP2cp2a15UIB7Un-bOeISG3pFuAT0CnW7KOywKo.ttf",
      regular:
        "http://fonts.gstatic.com/s/anonymouspro/v21/rP2Bp2a15UIB7Un-bOeISG3pLlw89CH98Ko.ttf",
      italic:
        "http://fonts.gstatic.com/s/anonymouspro/v21/rP2fp2a15UIB7Un-bOeISG3pHl428AP44Kqr2Q.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/anonymouspro/v21/rP2ap2a15UIB7Un-bOeISG3pHl4OTCzc6IG30KqB9Q.ttf",
    },
  },
  {
    family: "Bad Script",
    category: "handwriting",
    subsets: ["cyrillic", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/badscript/v16/6NUT8F6PJgbFWQn47_x7lOwuzd1AZtw.ttf",
    },
  },
  {
    family: "Nanum Pen Script",
    category: "handwriting",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/nanumpenscript/v19/daaDSSYiLGqEal3MvdA_FOL_3FkN2z7-aMFCcTU.ttf",
    },
  },
  {
    family: "Merienda",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5JHhoSU78QGBV0A.ttf",
      "500":
        "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5SHhoSU78QGBV0A.ttf",
      "600":
        "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5pH9oSU78QGBV0A.ttf",
      "700":
        "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5nX9oSU78QGBV0A.ttf",
      "800":
        "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5-n9oSU78QGBV0A.ttf",
      "900":
        "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5039oSU78QGBV0A.ttf",
      regular:
        "http://fonts.gstatic.com/s/merienda/v19/gNMaW3x8Qoy5_mf8uUkJGHtiYXjmKFy5enhoSU78QGBV0A.ttf",
    },
  },
  {
    family: "Hammersmith One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/hammersmithone/v17/qWcyB624q4L_C4jGQ9IK0O_dFlnbshsks4MRXw.ttf",
    },
  },
  {
    family: "Ruda",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "800", "900"],
    files: {
      "500": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaJ3si_-2KiSGg-H.ttf",
      "600": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaKbtS_-2KiSGg-H.ttf",
      "700": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaKitS_-2KiSGg-H.ttf",
      "800": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaLFtS_-2KiSGg-H.ttf",
      "900": "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaLstS_-2KiSGg-H.ttf",
      regular: "http://fonts.gstatic.com/s/ruda/v28/k3kKo8YQJOpFgHQ1mQ5VkEbUKaJFsi_-2KiSGg-H.ttf",
    },
  },
  {
    family: "Monoton",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/monoton/v19/5h1aiZUrOngCibe4fkbBQ2S7FU8.ttf",
    },
  },
  {
    family: "Lusitana",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/lusitana/v13/CSR74z9ShvucWzsMKyDmaccqYtd2vfwk.ttf",
      regular: "http://fonts.gstatic.com/s/lusitana/v13/CSR84z9ShvucWzsMKxhaRuMiSct_.ttf",
    },
  },
  {
    family: "Comic Neue",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
    files: {
      "300": "http://fonts.gstatic.com/s/comicneue/v8/4UaErEJDsxBrF37olUeD_wHLwpteLwtHJlc.ttf",
      "700": "http://fonts.gstatic.com/s/comicneue/v8/4UaErEJDsxBrF37olUeD_xHMwpteLwtHJlc.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/comicneue/v8/4UaarEJDsxBrF37olUeD96_RTplUKylCNlcw_Q.ttf",
      regular: "http://fonts.gstatic.com/s/comicneue/v8/4UaHrEJDsxBrF37olUeDx63j5pN1MwI.ttf",
      italic: "http://fonts.gstatic.com/s/comicneue/v8/4UaFrEJDsxBrF37olUeD96_p4rFwIwJePw.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/comicneue/v8/4UaarEJDsxBrF37olUeD96_RXp5UKylCNlcw_Q.ttf",
    },
  },
  {
    family: "Bai Jamjuree",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0kePuk5A1-yiSgA.ttf",
      "300":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa09eDuk5A1-yiSgA.ttf",
      "500":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0reHuk5A1-yiSgA.ttf",
      "600":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa0gebuk5A1-yiSgA.ttf",
      "700":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIqapSCOBt_aeQQ7ftydoa05efuk5A1-yiSgA.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_oGkpox2S2CgOva.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_pikZox2S2CgOva.ttf",
      regular: "http://fonts.gstatic.com/s/baijamjuree/v11/LDI1apSCOBt_aeQQ7ftydoaMWcjKm7sp8g.ttf",
      italic: "http://fonts.gstatic.com/s/baijamjuree/v11/LDIrapSCOBt_aeQQ7ftydoa8W8LOub458jGL.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_o6kJox2S2CgOva.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_oWl5ox2S2CgOva.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/baijamjuree/v11/LDIoapSCOBt_aeQQ7ftydoa8W_pylpox2S2CgOva.ttf",
    },
  },
  {
    family: "Pragati Narrow",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/pragatinarrow/v13/vm8sdRf0T0bS1ffgsPB7WZ-mD2ZD5fd_GJMTlo_4.ttf",
      regular:
        "http://fonts.gstatic.com/s/pragatinarrow/v13/vm8vdRf0T0bS1ffgsPB7WZ-mD17_ytN3M48a.ttf",
    },
  },
  {
    family: "BIZ UDPGothic",
    category: "sans-serif",
    subsets: ["cyrillic", "greek-ext", "japanese", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/bizudpgothic/v9/hESq6X5pHAIBjmS84VL0Bue85skjZWEnTABCSQo.ttf",
      regular: "http://fonts.gstatic.com/s/bizudpgothic/v9/hES36X5pHAIBjmS84VL0Bue83nUMQWkMUAk.ttf",
    },
  },
  {
    family: "Noto Sans Malayalam",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "malayalam"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_RuH9BFzEr6HxEA.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_xuD9BFzEr6HxEA.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_GOD9BFzEr6HxEA.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_dOD9BFzEr6HxEA.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_mOf9BFzEr6HxEA.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_oef9BFzEr6HxEA.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_xuf9BFzEr6HxEA.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_7-f9BFzEr6HxEA.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosansmalayalam/v26/sJoi3K5XjsSdcnzn071rL37lpAOsUThnDZIfPdbeSNzVakglNM-Qw8EaeB8Nss-_RuD9BFzEr6HxEA.ttf",
    },
  },
  {
    family: "Varela",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/varela/v16/DPEtYwqExx0AWHXJBBQFfvzDsQ.ttf",
    },
  },
  {
    family: "Lalezar",
    category: "display",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/lalezar/v14/zrfl0HLVx-HwTP82UaDyIiL0RCg.ttf",
    },
  },
  {
    family: "Noto Serif SC",
    category: "serif",
    subsets: ["chinese-simplified", "latin"],
    variants: ["200", "300", "regular", "500", "600", "700", "900"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mm63SzZBEtERe7U.otf",
      "300":
        "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mgq0SzZBEtERe7U.otf",
      "500":
        "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mlK1SzZBEtERe7U.otf",
      "600":
        "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mn6ySzZBEtERe7U.otf",
      "700":
        "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7mhqzSzZBEtERe7U.otf",
      "900":
        "http://fonts.gstatic.com/s/notoserifsc/v22/H4c8BXePl9DZ0Xe7gG9cyOj7miKxSzZBEtERe7U.otf",
      regular: "http://fonts.gstatic.com/s/notoserifsc/v22/H4chBXePl9DZ0Xe7gG9cyOj7oqCcbzhqDtg.otf",
    },
  },
  {
    family: "Saira Semi Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MN6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXdvaOM8rXT-8V8.ttf",
      "200":
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXfDScMWg3j36Ebz.ttf",
      "300":
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXenSsMWg3j36Ebz.ttf",
      "500":
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXf_S8MWg3j36Ebz.ttf",
      "600":
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXfTTMMWg3j36Ebz.ttf",
      "700":
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXe3TcMWg3j36Ebz.ttf",
      "800":
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXerTsMWg3j36Ebz.ttf",
      "900":
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MM6c-2-nnJkHxyCjRcnMHcWVWV1cWRRXePT8MWg3j36Ebz.ttf",
      regular:
        "http://fonts.gstatic.com/s/sairasemicondensed/v13/U9MD6c-2-nnJkHxyCjRcnMHcWVWV1cWRRU8LYuceqGT-.ttf",
    },
  },
  {
    family: "Alexandria",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9r7T6bHHJ8BRq0b.ttf",
      "200":
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9p7TqbHHJ8BRq0b.ttf",
      "300":
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9qlTqbHHJ8BRq0b.ttf",
      "500":
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9rJTqbHHJ8BRq0b.ttf",
      "600":
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9olSabHHJ8BRq0b.ttf",
      "700":
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9ocSabHHJ8BRq0b.ttf",
      "800":
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9p7SabHHJ8BRq0b.ttf",
      "900":
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9pSSabHHJ8BRq0b.ttf",
      regular:
        "http://fonts.gstatic.com/s/alexandria/v3/UMBCrPdDqW66y0Y2usFeQCH18mulUxBvI9r7TqbHHJ8BRq0b.ttf",
    },
  },
  {
    family: "Mandali",
    category: "sans-serif",
    subsets: ["latin", "telugu"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/mandali/v14/LhWlMVbYOfASNfNUVFk1ZPdcKtA.ttf",
    },
  },
  {
    family: "Calistoga",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/calistoga/v15/6NUU8F2OJg6MeR7l4e0vtMYAwdRZfw.ttf",
    },
  },
  {
    family: "Jura",
    category: "sans-serif",
    subsets: [
      "cyrillic",
      "cyrillic-ext",
      "greek",
      "greek-ext",
      "kayah-li",
      "latin",
      "latin-ext",
      "vietnamese",
    ],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP0D7auhTfmrH_rt.ttf",
      "500": "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1v7auhTfmrH_rt.ttf",
      "600": "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP2D6quhTfmrH_rt.ttf",
      "700": "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP266quhTfmrH_rt.ttf",
      regular: "http://fonts.gstatic.com/s/jura/v31/z7NOdRfiaC4Vd8hhoPzfb5vBTP1d7auhTfmrH_rt.ttf",
    },
  },
  {
    family: "Audiowide",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/audiowide/v20/l7gdbjpo0cum0ckerWCtkQXPExpQBw.ttf",
    },
  },
  {
    family: "Unica One",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/unicaone/v18/DPEuYwWHyAYGVTSmalshdtffuEY7FA.ttf",
    },
  },
  {
    family: "Fira Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["regular", "500", "700"],
    files: {
      "500": "http://fonts.gstatic.com/s/firamono/v14/N0bS2SlFPv1weGeLZDto1d33mf3VaZBRBQ.ttf",
      "700": "http://fonts.gstatic.com/s/firamono/v14/N0bS2SlFPv1weGeLZDtondv3mf3VaZBRBQ.ttf",
      regular: "http://fonts.gstatic.com/s/firamono/v14/N0bX2SlFPv1weGeLZDtQIfTTkdbJYA.ttf",
    },
  },
  {
    family: "Zen Maru Gothic",
    category: "sans-serif",
    subsets: ["cyrillic", "greek", "japanese", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "700", "900"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cQWpCPJqa_ajlvw.ttf",
      "500":
        "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cGWtCPJqa_ajlvw.ttf",
      "700":
        "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-cUW1CPJqa_ajlvw.ttf",
      "900":
        "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0XIpIxzW5b-RxT-6A8jWAtCp-caW9CPJqa_ajlvw.ttf",
      regular:
        "http://fonts.gstatic.com/s/zenmarugothic/v16/o-0SIpIxzW5b-RxT-6A8jWAtCp-k7UJmNLGG9A.ttf",
    },
  },
  {
    family: "Reem Kufi",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQttRnEGGf3qGuvM4.ttf",
      "600":
        "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtjhgEGGf3qGuvM4.ttf",
      "700":
        "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtgFgEGGf3qGuvM4.ttf",
      regular:
        "http://fonts.gstatic.com/s/reemkufi/v21/2sDPZGJLip7W2J7v7wQZZE1I0yCmYzzQtuZnEGGf3qGuvM4.ttf",
    },
  },
  {
    family: "Castoro",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/castoro/v19/1q2GY5yMCld3-O4cHYhEzOYenEU.ttf",
      italic: "http://fonts.gstatic.com/s/castoro/v19/1q2EY5yMCld3-O4cLYpOyMQbjEX5fw.ttf",
    },
  },
  {
    family: "Petrona",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsARBH452Mvds.ttf",
      "200":
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4NsQRBH452Mvds.ttf",
      "300":
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk7TsQRBH452Mvds.ttf",
      "500":
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6_sQRBH452Mvds.ttf",
      "600":
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk5TtgRBH452Mvds.ttf",
      "700":
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk5qtgRBH452Mvds.ttf",
      "800":
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4NtgRBH452Mvds.ttf",
      "900":
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk4ktgRBH452Mvds.ttf",
      regular:
        "http://fonts.gstatic.com/s/petrona/v32/mtGl4_NXL7bZo9XXq35wRLONYyOjFk6NsQRBH452Mvds.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8uwDFYpUN-dsIWs.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8mwCFYpUN-dsIWs.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8rICFYpUN-dsIWs.ttf",
      italic:
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8uwCFYpUN-dsIWs.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8t4CFYpUN-dsIWs.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8jIFFYpUN-dsIWs.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8gsFFYpUN-dsIWs.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8mwFFYpUN-dsIWs.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/petrona/v32/mtGr4_NXL7bZo9XXgXdCu2vkCLkNEVtF8kUFFYpUN-dsIWs.ttf",
    },
  },
  {
    family: "BenchNine",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "regular", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/benchnine/v16/ahcev8612zF4jxrwMosT--tRhWa8q0v8ag.ttf",
      "700": "http://fonts.gstatic.com/s/benchnine/v16/ahcev8612zF4jxrwMosT6-xRhWa8q0v8ag.ttf",
      regular: "http://fonts.gstatic.com/s/benchnine/v16/ahcbv8612zF4jxrwMosrV8N1jU2gog.ttf",
    },
  },
  {
    family: "Niramit",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "200": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVXx7tiiEr5_BdZ8.ttf",
      "300": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVRh4tiiEr5_BdZ8.ttf",
      "500": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVUB5tiiEr5_BdZ8.ttf",
      "600": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVWx-tiiEr5_BdZ8.ttf",
      "700": "http://fonts.gstatic.com/s/niramit/v10/I_urMpWdvgLdNxVLVQh_tiiEr5_BdZ8.ttf",
      "200italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiXimOq73EZZ_f6w.ttf",
      "300italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiOiqOq73EZZ_f6w.ttf",
      regular: "http://fonts.gstatic.com/s/niramit/v10/I_uuMpWdvgLdNxVLbbRQkiCvs5Y.ttf",
      italic: "http://fonts.gstatic.com/s/niramit/v10/I_usMpWdvgLdNxVLXbZalgKqo5bYbA.ttf",
      "500italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiYiuOq73EZZ_f6w.ttf",
      "600italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiTiyOq73EZZ_f6w.ttf",
      "700italic": "http://fonts.gstatic.com/s/niramit/v10/I_upMpWdvgLdNxVLXbZiKi2Oq73EZZ_f6w.ttf",
    },
  },
  {
    family: "Krub",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "200": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZo47KLF4R6gWaf8.ttf",
      "300": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZuo4KLF4R6gWaf8.ttf",
      "500": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZrI5KLF4R6gWaf8.ttf",
      "600": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZp4-KLF4R6gWaf8.ttf",
      "700": "http://fonts.gstatic.com/s/krub/v9/sZlEdRyC6CRYZvo_KLF4R6gWaf8.ttf",
      "200italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQiwLByQ4oTef_6gQ.ttf",
      "300italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQipLNyQ4oTef_6gQ.ttf",
      regular: "http://fonts.gstatic.com/s/krub/v9/sZlLdRyC6CRYXkYQDLlTW6E.ttf",
      italic: "http://fonts.gstatic.com/s/krub/v9/sZlFdRyC6CRYbkQaCJtWS6EPcA.ttf",
      "500italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQi_LJyQ4oTef_6gQ.ttf",
      "600italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQi0LVyQ4oTef_6gQ.ttf",
      "700italic": "http://fonts.gstatic.com/s/krub/v9/sZlGdRyC6CRYbkQitLRyQ4oTef_6gQ.ttf",
    },
  },
  {
    family: "Jaldi",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/jaldi/v12/or3hQ67z0_CI33voSbT3LLQ1niPn.ttf",
      regular: "http://fonts.gstatic.com/s/jaldi/v12/or3sQ67z0_CI30NUZpD_B6g8.ttf",
    },
  },
  {
    family: "Big Shoulders Display",
    category: "display",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdY86JF46SRP4yZQ.ttf",
      "200":
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdQ87JF46SRP4yZQ.ttf",
      "300":
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YddE7JF46SRP4yZQ.ttf",
      "500":
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0Ydb07JF46SRP4yZQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdVE8JF46SRP4yZQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdWg8JF46SRP4yZQ.ttf",
      "800":
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdQ88JF46SRP4yZQ.ttf",
      "900":
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdSY8JF46SRP4yZQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/bigshouldersdisplay/v21/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdY87JF46SRP4yZQ.ttf",
    },
  },
  {
    family: "Monda",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/monda/v16/TK3gWkYFABsmjsLaGz8Dl-tPKo2t.ttf",
      regular: "http://fonts.gstatic.com/s/monda/v16/TK3tWkYFABsmjvpmNBsLvPdG.ttf",
    },
  },
  {
    family: "Days One",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/daysone/v18/mem9YaCnxnKRiYZOCLYVeLkWVNBt.ttf",
    },
  },
  {
    family: "Actor",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/actor/v17/wEOzEBbCkc5cO3ekXygtUMIO.ttf",
    },
  },
  {
    family: "Laila",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLzxogNAh14nVcfe.ttf",
      "500": "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLypowNAh14nVcfe.ttf",
      "600": "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLyFpANAh14nVcfe.ttf",
      "700": "http://fonts.gstatic.com/s/laila/v15/LYjBdG_8nE8jDLzhpQNAh14nVcfe.ttf",
      regular: "http://fonts.gstatic.com/s/laila/v15/LYjMdG_8nE8jDIRdiidIrEIu.ttf",
    },
  },
  {
    family: "Reenie Beanie",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/reeniebeanie/v20/z7NSdR76eDkaJKZJFkkjuvWxbP2_qoOgf_w.ttf",
    },
  },
  {
    family: "Julius Sans One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/juliussansone/v18/1Pt2g8TAX_SGgBGUi0tGOYEga5W-xXEW6aGXHw.ttf",
    },
  },
  {
    family: "Shippori Mincho",
    category: "serif",
    subsets: ["japanese", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4L9am5JEO5--2zg.ttf",
      "600":
        "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4A9Gm5JEO5--2zg.ttf",
      "700":
        "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4Z9Cm5JEO5--2zg.ttf",
      "800":
        "http://fonts.gstatic.com/s/shipporimincho/v14/VdGDAZweH5EbgHY6YExcZfDoj0B4e9Om5JEO5--2zg.ttf",
      regular:
        "http://fonts.gstatic.com/s/shipporimincho/v14/VdGGAZweH5EbgHY6YExcZfDoj0BA2_-C7LoS7g.ttf",
    },
  },
  {
    family: "Economica",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/economica/v15/Qw3aZQZaHCLgIWa29ZBTjeckCnZ5dHw8iw.ttf",
      regular: "http://fonts.gstatic.com/s/economica/v15/Qw3fZQZaHCLgIWa29ZBrMcgAAl1lfQ.ttf",
      italic: "http://fonts.gstatic.com/s/economica/v15/Qw3ZZQZaHCLgIWa29ZBbM8IEIFh1fWUl.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/economica/v15/Qw3EZQZaHCLgIWa29ZBbM_q4D3x9Vnksi4M7.ttf",
    },
  },
  {
    family: "Pridi",
    category: "serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      "200": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1SiE0jRUG0AqUc.ttf",
      "300": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc02i00jRUG0AqUc.ttf",
      "500": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1uik0jRUG0AqUc.ttf",
      "600": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc1CjU0jRUG0AqUc.ttf",
      "700": "http://fonts.gstatic.com/s/pridi/v13/2sDdZG5JnZLfkc0mjE0jRUG0AqUc.ttf",
      regular: "http://fonts.gstatic.com/s/pridi/v13/2sDQZG5JnZLfkfWao2krbl29.ttf",
    },
  },
  {
    family: "Fraunces",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIctxqjDvTShUtWNg.ttf",
      "200":
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcNxujDvTShUtWNg.ttf",
      "300":
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIc6RujDvTShUtWNg.ttf",
      "500":
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIchRujDvTShUtWNg.ttf",
      "600":
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcaRyjDvTShUtWNg.ttf",
      "700":
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcUByjDvTShUtWNg.ttf",
      "800":
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcNxyjDvTShUtWNg.ttf",
      "900":
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcHhyjDvTShUtWNg.ttf",
      regular:
        "http://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIctxujDvTShUtWNg.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1hLTP7Wp05GNi3k.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jLTf7Wp05GNi3k.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1gVTf7Wp05GNi3k.ttf",
      italic:
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1hLTf7Wp05GNi3k.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1h5Tf7Wp05GNi3k.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1iVSv7Wp05GNi3k.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1isSv7Wp05GNi3k.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jLSv7Wp05GNi3k.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/fraunces/v31/6NVf8FyLNQOQZAnv9ZwNjucMHVn85Ni7emAe9lKqZTnbB-gzTK0K1ChJdt9vIVYX9G37lvd9sPEKsxx664UJf1jiSv7Wp05GNi3k.ttf",
    },
  },
  {
    family: "Rufina",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/rufina/v15/Yq6W-LyURyLy-aKKHztAvMxenxE0SA.ttf",
      regular: "http://fonts.gstatic.com/s/rufina/v15/Yq6V-LyURyLy-aKyoxRktOdClg.ttf",
    },
  },
  {
    family: "Gochi Hand",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/gochihand/v23/hES06XlsOjtJsgCkx1PkTo71-n0nXWA.ttf",
    },
  },
  {
    family: "Forum",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/forum/v18/6aey4Ky-Vb8Ew_IWMJMa3mnT.ttf",
    },
  },
  {
    family: "Newsreader",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    files: {
      "200":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438w-I_ADOxEPjCggA.ttf",
      "300":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wJo_ADOxEPjCggA.ttf",
      "500":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wSo_ADOxEPjCggA.ttf",
      "600":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wpojADOxEPjCggA.ttf",
      "700":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438wn4jADOxEPjCggA.ttf",
      "800":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438w-IjADOxEPjCggA.ttf",
      regular:
        "http://fonts.gstatic.com/s/newsreader/v20/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438weI_ADOxEPjCggA.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMyoT-ZAHDWwgECi.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMx2T-ZAHDWwgECi.ttf",
      italic:
        "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMwoT-ZAHDWwgECi.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMwaT-ZAHDWwgECi.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMz2SOZAHDWwgECi.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMzPSOZAHDWwgECi.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/newsreader/v20/cY9kfjOCX1hbuyalUrK439vogqC9yFZCYg7oRZaLP4obnf7fTXglsMyoSOZAHDWwgECi.ttf",
    },
  },
  {
    family: "Allerta Stencil",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/allertastencil/v22/HTx0L209KT-LmIE9N7OR6eiycOeF-zz313DuvQ.ttf",
    },
  },
  {
    family: "Sorts Mill Goudy",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/sortsmillgoudy/v15/Qw3GZR9MED_6PSuS_50nEaVrfzgEXH0OjpM75PE.ttf",
      italic:
        "http://fonts.gstatic.com/s/sortsmillgoudy/v15/Qw3AZR9MED_6PSuS_50nEaVrfzgEbH8EirE-9PGLfQ.ttf",
    },
  },
  {
    family: "Pontano Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOSzMncaMp9gzWsE.ttf",
      "500":
        "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOUDMncaMp9gzWsE.ttf",
      "600":
        "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOazLncaMp9gzWsE.ttf",
      "700":
        "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOZXLncaMp9gzWsE.ttf",
      regular:
        "http://fonts.gstatic.com/s/pontanosans/v16/qFdW35GdgYR8EzR6oBLDHa3wyRf8W8eBM6XLOXLMncaMp9gzWsE.ttf",
    },
  },
  {
    family: "Martel Sans",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "600", "700", "800", "900"],
    files: {
      "200": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hAX5suHFUknqMxQ.ttf",
      "300": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBz5cuHFUknqMxQ.ttf",
      "600": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hAH48uHFUknqMxQ.ttf",
      "700": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBj4suHFUknqMxQ.ttf",
      "800": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hB_4cuHFUknqMxQ.ttf",
      "900": "http://fonts.gstatic.com/s/martelsans/v12/h0GxssGi7VdzDgKjM-4d8hBb4MuHFUknqMxQ.ttf",
      regular: "http://fonts.gstatic.com/s/martelsans/v12/h0GsssGi7VdzDgKjM-4d8ijfze-PPlUu.ttf",
    },
  },
  {
    family: "Alef",
    category: "sans-serif",
    subsets: ["hebrew", "latin"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/alef/v21/FeVQS0NQpLYglo50L5la2bxii28.ttf",
      regular: "http://fonts.gstatic.com/s/alef/v21/FeVfS0NQpLYgrjJbC5FxxbU.ttf",
    },
  },
  {
    family: "Londrina Solid",
    category: "display",
    subsets: ["latin"],
    variants: ["100", "300", "regular", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/londrinasolid/v17/flUjRq6sw40kQEJxWNgkLuudGfs9KBYesZHhV64.ttf",
      "300":
        "http://fonts.gstatic.com/s/londrinasolid/v17/flUiRq6sw40kQEJxWNgkLuudGfv1CjY0n53oTrcL.ttf",
      "900":
        "http://fonts.gstatic.com/s/londrinasolid/v17/flUiRq6sw40kQEJxWNgkLuudGfvdDzY0n53oTrcL.ttf",
      regular:
        "http://fonts.gstatic.com/s/londrinasolid/v17/flUhRq6sw40kQEJxWNgkLuudGcNZIhI8tIHh.ttf",
    },
  },
  {
    family: "Noto Serif Bengali",
    category: "serif",
    subsets: ["bengali", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAH3qn4LjQH8yD.ttf",
      "200":
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfeAHnqn4LjQH8yD.ttf",
      "300":
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfdeHnqn4LjQH8yD.ttf",
      "500":
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcyHnqn4LjQH8yD.ttf",
      "600":
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JffeGXqn4LjQH8yD.ttf",
      "700":
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JffnGXqn4LjQH8yD.ttf",
      "800":
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfeAGXqn4LjQH8yD.ttf",
      "900":
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfepGXqn4LjQH8yD.ttf",
      regular:
        "http://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAHnqn4LjQH8yD.ttf",
    },
  },
  {
    family: "Squada One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/squadaone/v18/BCasqZ8XsOrx4mcOk6MtWaA8WDBkHgs.ttf",
    },
  },
  {
    family: "Pangolin",
    category: "handwriting",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pangolin/v11/cY9GfjGcW0FPpi-tWPfK5d3aiLBG.ttf",
    },
  },
  {
    family: "Palanquin",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700"],
    files: {
      "100": "http://fonts.gstatic.com/s/palanquin/v13/9XUhlJ90n1fBFg7ceXwUEltI7rWmZzTH.ttf",
      "200": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUvnpoxJuqbi3ezg.ttf",
      "300": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwU2nloxJuqbi3ezg.ttf",
      "500": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUgnhoxJuqbi3ezg.ttf",
      "600": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUrn9oxJuqbi3ezg.ttf",
      "700": "http://fonts.gstatic.com/s/palanquin/v13/9XUilJ90n1fBFg7ceXwUyn5oxJuqbi3ezg.ttf",
      regular: "http://fonts.gstatic.com/s/palanquin/v13/9XUnlJ90n1fBFg7ceXwsdlFMzLC2Zw.ttf",
    },
  },
  {
    family: "Nothing You Could Do",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/nothingyoucoulddo/v19/oY1B8fbBpaP5OX3DtrRYf_Q2BPB1SnfZb0OJl1ol2Ymo.ttf",
    },
  },
  {
    family: "Sarala",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/sarala/v12/uK_x4riEZv4o1w9ptjI3OtWYVkMpXA.ttf",
      regular: "http://fonts.gstatic.com/s/sarala/v12/uK_y4riEZv4o1w9RCh0TMv6EXw.ttf",
    },
  },
  {
    family: "Khula",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "600", "700", "800"],
    files: {
      "300": "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-ljCvUrC59XwXD.ttf",
      "600": "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G_RiivUrC59XwXD.ttf",
      "700": "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-1iyvUrC59XwXD.ttf",
      "800": "http://fonts.gstatic.com/s/khula/v12/OpNPnoEOns3V7G-piCvUrC59XwXD.ttf",
      regular: "http://fonts.gstatic.com/s/khula/v12/OpNCnoEOns3V7FcJpA_chzJ0.ttf",
    },
  },
  {
    family: "Electrolize",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/electrolize/v18/cIf5Ma1dtE0zSiGSiED7AUEGso5tQafB.ttf",
    },
  },
  {
    family: "Sansita",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic", "800", "800italic", "900", "900italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JKWUaXl0wqVv3_g.ttf",
      "800": "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JLmXaXl0wqVv3_g.ttf",
      "900": "http://fonts.gstatic.com/s/sansita/v11/QldLNTRRphEb_-V7JJ2WaXl0wqVv3_g.ttf",
      regular: "http://fonts.gstatic.com/s/sansita/v11/QldONTRRphEb_-V7HBm7TXFf3qw.ttf",
      italic: "http://fonts.gstatic.com/s/sansita/v11/QldMNTRRphEb_-V7LBuxSVNazqx2xg.ttf",
      "700italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJ9Xx-xodqz_joDQ.ttf",
      "800italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJ6X9-xodqz_joDQ.ttf",
      "900italic": "http://fonts.gstatic.com/s/sansita/v11/QldJNTRRphEb_-V7LBuJzX5-xodqz_joDQ.ttf",
    },
  },
  {
    family: "Gilda Display",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/gildadisplay/v18/t5tmIRoYMoaYG0WEOh7HwMeR7TnFrpOHYh4.ttf",
    },
  },
  {
    family: "Damion",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/damion/v14/hv-XlzJ3KEUe_YZUbWY3MTFgVg.ttf",
    },
  },
  {
    family: "Italianno",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/italianno/v17/dg4n_p3sv6gCJkwzT6Rnj5YpQwM-gg.ttf",
    },
  },
  {
    family: "Oleo Script",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/oleoscript/v14/raxkHieDvtMOe0iICsUccCDmnmrY2zqUKafv.ttf",
      regular: "http://fonts.gstatic.com/s/oleoscript/v14/rax5HieDvtMOe0iICsUccBhasU7Q8Cad.ttf",
    },
  },
  {
    family: "Noto Sans Tamil",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "tamil"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGor0RqKDt_EvT.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tGo70RqKDt_EvT.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7uYo70RqKDt_EvT.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7v0o70RqKDt_EvT.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7sYpL0RqKDt_EvT.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7shpL0RqKDt_EvT.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tGpL0RqKDt_EvT.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7tvpL0RqKDt_EvT.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosanstamil/v27/ieVc2YdFI3GCY6SyQy1KfStzYKZgzN1z4LKDbeZce-0429tBManUktuex7vGo70RqKDt_EvT.ttf",
    },
  },
  {
    family: "Share Tech Mono",
    category: "monospace",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/sharetechmono/v15/J7aHnp1uDWRBEqV98dVQztYldFc7pAsEIc3Xew.ttf",
    },
  },
  {
    family: "Syne",
    category: "sans-serif",
    subsets: ["greek", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700", "800"],
    files: {
      "500": "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_0KuT6kR47NCV5Z.ttf",
      "600": "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_3mvj6kR47NCV5Z.ttf",
      "700": "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_3fvj6kR47NCV5Z.ttf",
      "800": "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_24vj6kR47NCV5Z.ttf",
      regular: "http://fonts.gstatic.com/s/syne/v22/8vIS7w4qzmVxsWxjBZRjr0FKM_04uT6kR47NCV5Z.ttf",
    },
  },
  {
    family: "Shrikhand",
    category: "display",
    subsets: ["gujarati", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/shrikhand/v15/a8IbNovtLWfR7T7bMJwbBIiQ0zhMtA.ttf",
    },
  },
  {
    family: "DM Mono",
    category: "monospace",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "300italic", "regular", "italic", "500", "500italic"],
    files: {
      "300": "http://fonts.gstatic.com/s/dmmono/v14/aFTR7PB1QTsUX8KYvrGyIYSnbKX9Rlk.ttf",
      "500": "http://fonts.gstatic.com/s/dmmono/v14/aFTR7PB1QTsUX8KYvumzIYSnbKX9Rlk.ttf",
      "300italic": "http://fonts.gstatic.com/s/dmmono/v14/aFTT7PB1QTsUX8KYth-orYataIf4VllXuA.ttf",
      regular: "http://fonts.gstatic.com/s/dmmono/v14/aFTU7PB1QTsUX8KYhh2aBYyMcKw.ttf",
      italic: "http://fonts.gstatic.com/s/dmmono/v14/aFTW7PB1QTsUX8KYth-QAa6JYKzkXw.ttf",
      "500italic": "http://fonts.gstatic.com/s/dmmono/v14/aFTT7PB1QTsUX8KYth-o9YetaIf4VllXuA.ttf",
    },
  },
  {
    family: "Cabin Sketch",
    category: "display",
    subsets: ["latin"],
    variants: ["regular", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/cabinsketch/v21/QGY2z_kZZAGCONcK2A4bGOj0I_1o4dLyI4CMFw.ttf",
      regular: "http://fonts.gstatic.com/s/cabinsketch/v21/QGYpz_kZZAGCONcK2A4bGOjMn9JM6fnuKg.ttf",
    },
  },
  {
    family: "Black Han Sans",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/blackhansans/v17/ea8Aad44WunzF9a-dL6toA8r8nqVIXSkH-Hc.ttf",
    },
  },
  {
    family: "Ramabhadra",
    category: "sans-serif",
    subsets: ["latin", "telugu"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/ramabhadra/v15/EYq2maBOwqRW9P1SQ83LehNGX5uWw3o.ttf",
    },
  },
  {
    family: "Armata",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/armata/v20/gokvH63_HV5jQ-E9lD53Q2u_mQ.ttf",
    },
  },
  {
    family: "Six Caps",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/sixcaps/v20/6ae_4KGrU7VR7bNmabcS9XXaPCop.ttf",
    },
  },
  {
    family: "Cutive Mono",
    category: "monospace",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/cutivemono/v20/m8JWjfRfY7WVjVi2E-K9H5RFRG-K3Mud.ttf",
    },
  },
  {
    family: "Pinyon Script",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/pinyonscript/v21/6xKpdSJbL9-e9LuoeQiDRQR8aOLQO4bhiDY.ttf",
    },
  },
  {
    family: "Quantico",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/quantico/v17/rax5HiSdp9cPL3KIF7TQARhasU7Q8Cad.ttf",
      regular: "http://fonts.gstatic.com/s/quantico/v17/rax-HiSdp9cPL3KIF4xsLjxSmlLZ.ttf",
      italic: "http://fonts.gstatic.com/s/quantico/v17/rax4HiSdp9cPL3KIF7xuJDhwn0LZ6T8.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/quantico/v17/rax7HiSdp9cPL3KIF7xuHIRfu0ry9TadML4.ttf",
    },
  },
  {
    family: "Libre Barcode 39",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/librebarcode39/v21/-nFnOHM08vwC6h8Li1eQnP_AHzI2K_d709jy92k.ttf",
    },
  },
  {
    family: "Glegoo",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/glegoo/v16/_Xmu-HQyrTKWaw2xN4a9CKRpzimMsg.ttf",
      regular: "http://fonts.gstatic.com/s/glegoo/v16/_Xmt-HQyrTKWaw2Ji6mZAI91xw.ttf",
    },
  },
  {
    family: "Sintony",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/sintony/v15/XoHj2YDqR7-98cVUGYgIn9cDkjLp6C8.ttf",
      regular: "http://fonts.gstatic.com/s/sintony/v15/XoHm2YDqR7-98cVUITQnu98ojjs.ttf",
    },
  },
  {
    family: "Chewy",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/chewy/v18/uK_94ruUb-k-wk5xIDMfO-ed.ttf",
    },
  },
  {
    family: "Antic",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/antic/v19/TuGfUVB8XY5DRaZLodgzydtk.ttf",
    },
  },
  {
    family: "Noto Sans Bengali",
    category: "sans-serif",
    subsets: ["bengali", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolKudCk8izI0lc.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsglLudCk8izI0lc.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmstdLudCk8izI0lc.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsrtLudCk8izI0lc.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsldMudCk8izI0lc.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6Kmsm5MudCk8izI0lc.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsglMudCk8izI0lc.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsiBMudCk8izI0lc.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosansbengali/v20/Cn-SJsCGWQxOjaGwMQ6fIiMywrNJIky6nvd8BjzVMvJx2mcSPVFpVEqE-6KmsolLudCk8izI0lc.ttf",
    },
  },
  {
    family: "VT323",
    category: "monospace",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/vt323/v17/pxiKyp0ihIEF2hsYHpT2dkNE.ttf",
    },
  },
  {
    family: "Short Stack",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/shortstack/v15/bMrzmS2X6p0jZC6EcmPFX-SScX8D0nq6.ttf",
    },
  },
  {
    family: "Leckerli One",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/leckerlione/v20/V8mCoQH8VCsNttEnxnGQ-1itLZxcBtItFw.ttf",
    },
  },
  {
    family: "Karma",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjDY8Z_uqzGQC_-.ttf",
      "500": "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLibYsZ_uqzGQC_-.ttf",
      "600": "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLi3ZcZ_uqzGQC_-.ttf",
      "700": "http://fonts.gstatic.com/s/karma/v16/va9F4kzAzMZRGLjTZMZ_uqzGQC_-.ttf",
      regular: "http://fonts.gstatic.com/s/karma/v16/va9I4kzAzMZRGIBvS-J3kbDP.ttf",
    },
  },
  {
    family: "Koulen",
    category: "display",
    subsets: ["khmer", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/koulen/v27/AMOQz46as3KIBPeWgnA9kuYMUg.ttf",
    },
  },
  {
    family: "Holtwood One SC",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/holtwoodonesc/v20/yYLx0hLR0P-3vMFSk1TCq3Txg5B3cbb6LZttyg.ttf",
    },
  },
  {
    family: "Aclonica",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/aclonica/v22/K2FyfZJVlfNNSEBXGb7TCI6oBjLz.ttf",
    },
  },
  {
    family: "Oxanium",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["200", "300", "regular", "500", "600", "700", "800"],
    files: {
      "200":
        "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G83JfniMBXQ7d67x.ttf",
      "300":
        "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G80XfniMBXQ7d67x.ttf",
      "500":
        "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G817fniMBXQ7d67x.ttf",
      "600":
        "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G82XeXiMBXQ7d67x.ttf",
      "700":
        "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G82ueXiMBXQ7d67x.ttf",
      "800":
        "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G83JeXiMBXQ7d67x.ttf",
      regular:
        "http://fonts.gstatic.com/s/oxanium/v19/RrQPboN_4yJ0JmiMUW7sIGjd1IA9G81JfniMBXQ7d67x.ttf",
    },
  },
  {
    family: "Basic",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/basic/v17/xfu_0WLxV2_XKQN34lDVyR7D.ttf",
    },
  },
  {
    family: "K2D",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/k2d/v11/J7aRnpF2V0ErE6UpvrIw74NL.ttf",
      "200": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Erv4QJlJw85ppSGw.ttf",
      "300": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Er24cJlJw85ppSGw.ttf",
      "500": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Erg4YJlJw85ppSGw.ttf",
      "600": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Err4EJlJw85ppSGw.ttf",
      "700": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Ery4AJlJw85ppSGw.ttf",
      "800": "http://fonts.gstatic.com/s/k2d/v11/J7aenpF2V0Er14MJlJw85ppSGw.ttf",
      "100italic": "http://fonts.gstatic.com/s/k2d/v11/J7afnpF2V0EjdZ1NtLYS6pNLAjk.ttf",
      "200italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3hlZY4xJ9CGyAa.ttf",
      "300italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2FlpY4xJ9CGyAa.ttf",
      regular: "http://fonts.gstatic.com/s/k2d/v11/J7aTnpF2V0ETd68tnLcg7w.ttf",
      italic: "http://fonts.gstatic.com/s/k2d/v11/J7aRnpF2V0EjdaUpvrIw74NL.ttf",
      "500italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3dl5Y4xJ9CGyAa.ttf",
      "600italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ3xkJY4xJ9CGyAa.ttf",
      "700italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2VkZY4xJ9CGyAa.ttf",
      "800italic": "http://fonts.gstatic.com/s/k2d/v11/J7acnpF2V0EjdZ2JkpY4xJ9CGyAa.ttf",
    },
  },
  {
    family: "JetBrains Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yK1jPVmUsaaDhw.ttf",
      "200":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8SKxjPVmUsaaDhw.ttf",
      "300":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8lqxjPVmUsaaDhw.ttf",
      "500":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPVmUsaaDhw.ttf",
      "600":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8FqtjPVmUsaaDhw.ttf",
      "700":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPVmUsaaDhw.ttf",
      "800":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8SKtjPVmUsaaDhw.ttf",
      regular:
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-Lf1OQk6OThxPA.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO8LflOQk6OThxPA.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO_VflOQk6OThxPA.ttf",
      italic:
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-LflOQk6OThxPA.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO-5flOQk6OThxPA.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO9VeVOQk6OThxPA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO9seVOQk6OThxPA.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/jetbrainsmono/v18/tDba2o-flEEny0FZhsfKu5WU4xD-IQ-PuZJJXxfpAO8LeVOQk6OThxPA.ttf",
    },
  },
  {
    family: "Arapey",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/arapey/v16/-W__XJn-UDDA2RC6Z9AcZkIzeg.ttf",
      italic: "http://fonts.gstatic.com/s/arapey/v16/-W_9XJn-UDDA2RCKZdoYREcjeo0k.ttf",
    },
  },
  {
    family: "Alatsi",
    category: "sans-serif",
    subsets: ["cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alatsi/v11/TK3iWkUJAxQ2nLNGHjUHte5fKg.ttf",
    },
  },
  {
    family: "Playfair",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPlKetgdoSMw5ifm.ttf",
      "500":
        "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPkmetgdoSMw5ifm.ttf",
      "600":
        "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPnKfdgdoSMw5ifm.ttf",
      "700":
        "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPnzfdgdoSMw5ifm.ttf",
      "800":
        "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPmUfdgdoSMw5ifm.ttf",
      "900":
        "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPm9fdgdoSMw5ifm.ttf",
      regular:
        "http://fonts.gstatic.com/s/playfair/v2/0nkQC9D7PO4KhmUJ5_zTZ_4MYQXznAK-TUcZXKO3UMnW6VNpe4-SiiZ4b8h5G3GutPkUetgdoSMw5ifm.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOW5eqycS4zfmNrE.ttf",
      italic:
        "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOTBeqycS4zfmNrE.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOQJeqycS4zfmNrE.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOe5ZqycS4zfmNrE.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOddZqycS4zfmNrE.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcObBZqycS4zfmNrE.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/playfair/v2/0nkSC9D7PO4KhmUJ59baVQ_iWhg0cgSrLQZDFpFUsLCFf_1ubkfQeG9KkBAQcOsAs-zcOZlZqycS4zfmNrE.ttf",
    },
  },
  {
    family: "Athiti",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["200", "300", "regular", "500", "600", "700"],
    files: {
      "200": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAxDNyAv2-C99ycg.ttf",
      "300": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAoDByAv2-C99ycg.ttf",
      "500": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wA-DFyAv2-C99ycg.ttf",
      "600": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wA1DZyAv2-C99ycg.ttf",
      "700": "http://fonts.gstatic.com/s/athiti/v12/pe0sMISdLIZIv1wAsDdyAv2-C99ycg.ttf",
      regular: "http://fonts.gstatic.com/s/athiti/v12/pe0vMISdLIZIv1w4DBhWCtaiAg.ttf",
    },
  },
  {
    family: "Rammetto One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rammettoone/v18/LhWiMV3HOfMbMetJG3lQDpp9Mvuciu-_SQ.ttf",
    },
  },
  {
    family: "Berkshire Swash",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/berkshireswash/v20/ptRRTi-cavZOGqCvnNJDl5m5XmNPrcQybX4pQA.ttf",
    },
  },
  {
    family: "Noto Sans Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_FNI49rXVEQQL8Y.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_NNJ49rXVEQQL8Y.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_A1J49rXVEQQL8Y.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_GFJ49rXVEQQL8Y.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_I1O49rXVEQQL8Y.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_LRO49rXVEQQL8Y.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_NNO49rXVEQQL8Y.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_PpO49rXVEQQL8Y.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosansmono/v29/BngrUXNETWXI6LwhGYvaxZikqZqK6fBq6kPvUce2oAZcdthSBUsYck4-_FNJ49rXVEQQL8Y.ttf",
    },
  },
  {
    family: "Saira Extra Condensed",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFsOHYr-vcC7h8MklGBkrvmUG9rbpkisrTri0jx9i5ss3a3.ttf",
      "200":
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrJ2nR3ABgum-uoQ.ttf",
      "300":
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrQ2rR3ABgum-uoQ.ttf",
      "500":
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrG2vR3ABgum-uoQ.ttf",
      "600":
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrN2zR3ABgum-uoQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrU23R3ABgum-uoQ.ttf",
      "800":
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTrT27R3ABgum-uoQ.ttf",
      "900":
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFvOHYr-vcC7h8MklGBkrvmUG9rbpkisrTra2_R3ABgum-uoQ.ttf",
      regular:
        "http://fonts.gstatic.com/s/sairaextracondensed/v13/-nFiOHYr-vcC7h8MklGBkrvmUG9rbpkisrTT70L11Ct8sw.ttf",
    },
  },
  {
    family: "Kreon",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvPNimejUfp2dWNg.ttf",
      "500": "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvUNimejUfp2dWNg.ttf",
      "600": "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvvN-mejUfp2dWNg.ttf",
      "700": "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2Dnvhd-mejUfp2dWNg.ttf",
      regular:
        "http://fonts.gstatic.com/s/kreon/v37/t5t9IRIUKY-TFF_LW5lnMR3v2DnvYtimejUfp2dWNg.ttf",
    },
  },
  {
    family: "Hind Guntur",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "telugu"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300": "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_yGn1czn9zaj5Ju.ttf",
      "500": "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_zenlczn9zaj5Ju.ttf",
      "600": "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_zymVczn9zaj5Ju.ttf",
      "700": "http://fonts.gstatic.com/s/hindguntur/v12/wXKyE3UZrok56nvamSuJd_yWmFczn9zaj5Ju.ttf",
      regular: "http://fonts.gstatic.com/s/hindguntur/v12/wXKvE3UZrok56nvamSuJd8Qqt3M7tMDT.ttf",
    },
  },
  {
    family: "STIX Two Text",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5YihS2SOYWxFMN1WD.ttf",
      "600":
        "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5Yii-3iOYWxFMN1WD.ttf",
      "700":
        "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5YiiH3iOYWxFMN1WD.ttf",
      regular:
        "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Gr02F12Xkf5whdwKf11l0jbKkeidMTtZ5Yihg2SOYWxFMN1WD.ttf",
      italic:
        "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omsvbURVuMkWDmSo.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omvnbURVuMkWDmSo.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omhXcURVuMkWDmSo.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/stixtwotext/v12/YA9Er02F12Xkf5whdwKf11l0p7uWhf8lJUzXZT2omizcURVuMkWDmSo.ttf",
    },
  },
  {
    family: "Amita",
    category: "handwriting",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/amita/v18/HhyXU5si9Om7PTHTLtCCOopCTKkI.ttf",
      regular: "http://fonts.gstatic.com/s/amita/v18/HhyaU5si9Om7PQlvAfSKEZZL.ttf",
    },
  },
  {
    family: "PT Serif Caption",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/ptserifcaption/v17/ieVl2ZhbGCW-JoW6S34pSDpqYKU059WxDCs5cvI.ttf",
      italic:
        "http://fonts.gstatic.com/s/ptserifcaption/v17/ieVj2ZhbGCW-JoW6S34pSDpqYKU019e7CAk8YvJEeg.ttf",
    },
  },
  {
    family: "Caveat Brush",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/caveatbrush/v11/EYq0maZfwr9S9-ETZc3fKXtMW7mT03pdQw.ttf",
    },
  },
  {
    family: "Lemonada",
    category: "display",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGJOt2mfWc3Z2pTg.ttf",
      "500":
        "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGSOt2mfWc3Z2pTg.ttf",
      "600":
        "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGpOx2mfWc3Z2pTg.ttf",
      "700":
        "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGnex2mfWc3Z2pTg.ttf",
      regular:
        "http://fonts.gstatic.com/s/lemonada/v28/0QI-MXFD9oygTWy_R-FFlwV-bgfR7QJGeut2mfWc3Z2pTg.ttf",
    },
  },
  {
    family: "Racing Sans One",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/racingsansone/v15/sykr-yRtm7EvTrXNxkv5jfKKyDCwL3rmWpIBtA.ttf",
    },
  },
  {
    family: "Atkinson Hyperlegible",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt73C1KxNDXMspQ1lPyU89-1h6ONRlW45G8WbcNcy-OZFy-FA.ttf",
      regular:
        "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt23C1KxNDXMspQ1lPyU89-1h6ONRlW45GE5ZgpewSSbQ.ttf",
      italic:
        "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt43C1KxNDXMspQ1lPyU89-1h6ONRlW45G055ItWQGCbUWn.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/atkinsonhyperlegible/v11/9Bt93C1KxNDXMspQ1lPyU89-1h6ONRlW45G056qRdiWKRlmuFH24.ttf",
    },
  },
  {
    family: "Markazi Text",
    category: "serif",
    subsets: ["arabic", "latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtcaQT4MlBekmJLo.ttf",
      "600":
        "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtSqXT4MlBekmJLo.ttf",
      "700":
        "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtROXT4MlBekmJLo.ttf",
      regular:
        "http://fonts.gstatic.com/s/markazitext/v23/sykh-ydym6AtQaiEtX7yhqb_rV1k_81ZVYYZtfSQT4MlBekmJLo.ttf",
    },
  },
  {
    family: "GFS Didot",
    category: "serif",
    subsets: ["greek"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/gfsdidot/v15/Jqzh5TybZ9vZMWFssvwiF-fGFSCGAA.ttf",
    },
  },
  {
    family: "Charm",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/charm/v11/7cHrv4oii5K0Md6TDss8yn4hnCci.ttf",
      regular: "http://fonts.gstatic.com/s/charm/v11/7cHmv4oii5K0MeYvIe804WIo.ttf",
    },
  },
  {
    family: "Changa One",
    category: "display",
    subsets: ["latin"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/changaone/v20/xfu00W3wXn3QLUJXhzq46AbouLfbK64.ttf",
      italic: "http://fonts.gstatic.com/s/changaone/v20/xfu20W3wXn3QLUJXhzq42ATivJXeO67ISw.ttf",
    },
  },
  {
    family: "Boogaloo",
    category: "display",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/boogaloo/v23/kmK-Zq45GAvOdnaW6x1F_SrQo_1K.ttf",
    },
  },
  {
    family: "Julee",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/julee/v25/TuGfUVB3RpZPQ6ZLodgzydtk.ttf",
    },
  },
  {
    family: "Covered By Your Grace",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/coveredbyyourgrace/v15/QGYwz-AZahWOJJI9kykWW9mD6opopoqXSOS0FgItq6bFIg.ttf",
    },
  },
  {
    family: "Cantata One",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/cantataone/v15/PlI5Fl60Nb5obNzNe2jslVxEt8CwfGaD.ttf",
    },
  },
  {
    family: "Yrsa",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "regular",
      "500",
      "600",
      "700",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
    ],
    files: {
      "300": "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCjASNNV9rRPfrKu.ttf",
      "500": "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCisSNNV9rRPfrKu.ttf",
      "600": "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaChAT9NV9rRPfrKu.ttf",
      "700": "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCh5T9NV9rRPfrKu.ttf",
      regular: "http://fonts.gstatic.com/s/yrsa/v20/wlprgwnQFlxs_wD3CFSMYmFaaCieSNNV9rRPfrKu.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC2UW_LBte6KuGEo.ttf",
      italic: "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WCzsW_LBte6KuGEo.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WCwkW_LBte6KuGEo.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC-UR_LBte6KuGEo.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/yrsa/v20/wlptgwnQFlxs1QnF94zlCfv0bz1WC9wR_LBte6KuGEo.ttf",
    },
  },
  {
    family: "Nanum Brush Script",
    category: "handwriting",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/nanumbrushscript/v22/wXK2E2wfpokopxzthSqPbcR5_gVaxazyjqBr1lO97Q.ttf",
    },
  },
  {
    family: "Trirong",
    category: "serif",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "800",
      "800italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/trirong/v15/7r3EqXNgp8wxdOdOl-go3YRl6ujngw.ttf",
      "200": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl0QJ_a5L5uH-mts.ttf",
      "300": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlyAK_a5L5uH-mts.ttf",
      "500": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl3gL_a5L5uH-mts.ttf",
      "600": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOl1QM_a5L5uH-mts.ttf",
      "700": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlzAN_a5L5uH-mts.ttf",
      "800": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlywO_a5L5uH-mts.ttf",
      "900": "http://fonts.gstatic.com/s/trirong/v15/7r3DqXNgp8wxdOdOlwgP_a5L5uH-mts.ttf",
      "100italic": "http://fonts.gstatic.com/s/trirong/v15/7r3CqXNgp8wxdOdOn44QuY5hyO33g8IY.ttf",
      "200italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QFa9B4sP7itsB5g.ttf",
      "300italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QcaxB4sP7itsB5g.ttf",
      regular: "http://fonts.gstatic.com/s/trirong/v15/7r3GqXNgp8wxdOdOr4wi2aZg-ug.ttf",
      italic: "http://fonts.gstatic.com/s/trirong/v15/7r3EqXNgp8wxdOdOn44o3YRl6ujngw.ttf",
      "500italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QKa1B4sP7itsB5g.ttf",
      "600italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QBapB4sP7itsB5g.ttf",
      "700italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QYatB4sP7itsB5g.ttf",
      "800italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QfahB4sP7itsB5g.ttf",
      "900italic": "http://fonts.gstatic.com/s/trirong/v15/7r3BqXNgp8wxdOdOn44QWalB4sP7itsB5g.ttf",
    },
  },
  {
    family: "Mali",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "thai", "vietnamese"],
    variants: [
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "200": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QOLlKlRaJdbWgdY.ttf",
      "300": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QIbmKlRaJdbWgdY.ttf",
      "500": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QN7nKlRaJdbWgdY.ttf",
      "600": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QPLgKlRaJdbWgdY.ttf",
      "700": "http://fonts.gstatic.com/s/mali/v10/N0bV2SRONuN4QJbhKlRaJdbWgdY.ttf",
      "200italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8wlVQIfTTkdbJYA.ttf",
      "300italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8plZQIfTTkdbJYA.ttf",
      regular: "http://fonts.gstatic.com/s/mali/v10/N0ba2SRONuN4eCrODlxxOd8.ttf",
      italic: "http://fonts.gstatic.com/s/mali/v10/N0bU2SRONuN4SCjECn50Kd_PmA.ttf",
      "500italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8_ldQIfTTkdbJYA.ttf",
      "600italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj80lBQIfTTkdbJYA.ttf",
      "700italic": "http://fonts.gstatic.com/s/mali/v10/N0bX2SRONuN4SCj8tlFQIfTTkdbJYA.ttf",
    },
  },
  {
    family: "Quintessential",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/quintessential/v22/fdNn9sOGq31Yjnh3qWU14DdtjY5wS7kmAyxM.ttf",
    },
  },
  {
    family: "Cinzel Decorative",
    category: "display",
    subsets: ["latin"],
    variants: ["regular", "700", "900"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPniZoaelDQzCLlQXE.ttf",
      "900":
        "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPniZQa-lDQzCLlQXE.ttf",
      regular:
        "http://fonts.gstatic.com/s/cinzeldecorative/v16/daaCSScvJGqLYhG8nNt8KPPswUAPnh7URs1LaCyC.ttf",
    },
  },
  {
    family: "Carrois Gothic",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/carroisgothic/v16/Z9XPDmFATg-N1PLtLOOxvIHl9ZmD3i7ajcJ-.ttf",
    },
  },
  {
    family: "Just Another Hand",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/justanotherhand/v19/845CNN4-AJyIGvIou-6yJKyptyOpOcr_BmmlS5aw.ttf",
    },
  },
  {
    family: "La Belle Aurore",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/labelleaurore/v20/RrQIbot8-mNYKnGNDkWlocovHeIIG-eFNVmULg.ttf",
    },
  },
  {
    family: "Candal",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/candal/v15/XoHn2YH6T7-t_8cNAR4Jt9Yxlw.ttf",
    },
  },
  {
    family: "Fredericka the Great",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/frederickathegreat/v21/9Bt33CxNwt7aOctW2xjbCstzwVKsIBVV-9Skz7Ylch2L.ttf",
    },
  },
  {
    family: "Syncopate",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/syncopate/v21/pe0pMIuPIYBCpEV5eFdKvtKaA_Rue1UwVg.ttf",
      regular: "http://fonts.gstatic.com/s/syncopate/v21/pe0sMIuPIYBCpEV5eFdyAv2-C99ycg.ttf",
    },
  },
  {
    family: "Aldrich",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/aldrich/v21/MCoTzAn-1s3IGyJMZaAS3pP5H_E.ttf",
    },
  },
  {
    family: "Libre Bodoni",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "500", "600", "700", "italic", "500italic", "600italic", "700italic"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6L9fwWzZcOb3U3s.ttf",
      "600":
        "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6FNYwWzZcOb3U3s.ttf",
      "700":
        "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6GpYwWzZcOb3U3s.ttf",
      regular:
        "http://fonts.gstatic.com/s/librebodoni/v5/_Xm--H45qDWDYULr5OfyZudXzSBgY2oMBGte6I1fwWzZcOb3U3s.ttf",
      italic:
        "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUcKS_TdMTyQ3syLg.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUcGy_TdMTyQ3syLg.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUc9yjTdMTyQ3syLg.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/librebodoni/v5/_Xm4-H45qDWDYULr5OfyZud9xBKfuwNnnsVZ_UUczijTdMTyQ3syLg.ttf",
    },
  },
  {
    family: "Michroma",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/michroma/v19/PN_zRfy9qWD8fEagAMg6rzjb_-Da.ttf",
    },
  },
  {
    family: "Palanquin Dark",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500":
        "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8Z6ZW41fcvN2KT4.ttf",
      "600":
        "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8ZWYm41fcvN2KT4.ttf",
      "700":
        "http://fonts.gstatic.com/s/palanquindark/v14/xn76YHgl1nqmANMB-26xC7yuF8YyY241fcvN2KT4.ttf",
      regular:
        "http://fonts.gstatic.com/s/palanquindark/v14/xn75YHgl1nqmANMB-26xC7yuF_6OTEo9VtfE.ttf",
    },
  },
  {
    family: "Fira Code",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_GNsFVfxN87gsj0.ttf",
      "500":
        "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_A9sFVfxN87gsj0.ttf",
      "600":
        "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_ONrFVfxN87gsj0.ttf",
      "700":
        "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_NprFVfxN87gsj0.ttf",
      regular:
        "http://fonts.gstatic.com/s/firacode/v22/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sFVfxN87gsj0.ttf",
    },
  },
  {
    family: "Capriola",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/capriola/v14/wXKoE3YSppcvo1PDln_8L-AinG8y.ttf",
    },
  },
  {
    family: "Mrs Saint Delafield",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/mrssaintdelafield/v13/v6-IGZDIOVXH9xtmTZfRagunqBw5WC62cK4tLsubB2w.ttf",
    },
  },
  {
    family: "Averia Serif Libre",
    category: "display",
    subsets: ["latin"],
    variants: ["300", "300italic", "regular", "italic", "700", "700italic"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIVzD2ms4wxr6GvjeD0X88SHPyX2xYGCSmqwacqdrKvbQ.ttf",
      "700":
        "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIVzD2ms4wxr6GvjeD0X88SHPyX2xYGGS6qwacqdrKvbQ.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIbzD2ms4wxr6GvjeD0X88SHPyX2xYOpzMmw60uVLe_bXHq.ttf",
      regular:
        "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIWzD2ms4wxr6GvjeD0X88SHPyX2xY-pQGOyYw2fw.ttf",
      italic:
        "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIUzD2ms4wxr6GvjeD0X88SHPyX2xYOpwuK64kmf6u2.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/averiaseriflibre/v18/neIbzD2ms4wxr6GvjeD0X88SHPyX2xYOpzM2xK0uVLe_bXHq.ttf",
    },
  },
  {
    family: "Herr Von Muellerhoff",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/herrvonmuellerhoff/v21/WBL6rFjRZkREW8WqmCWYLgCkQKXb4CAft3c6_qJY3QPQ.ttf",
    },
  },
  {
    family: "Coda",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "800"],
    files: {
      "800": "http://fonts.gstatic.com/s/coda/v21/SLXIc1jY5nQ8HeIgTp6mw9t1cX8.ttf",
      regular: "http://fonts.gstatic.com/s/coda/v21/SLXHc1jY5nQ8JUIMapaN39I.ttf",
    },
  },
  {
    family: "Krona One",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/kronaone/v14/jAnEgHdjHcjgfIb1ZcUCMY-h3cWkWg.ttf",
    },
  },
  {
    family: "Balsamiq Sans",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sZzZiAbNrN8SB3lQQX7PncyWUyBY9mAzLFRQI.ttf",
      regular:
        "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sEzZiAbNrN8SB3lQQX7Pnc8dkdIYdNHzs.ttf",
      italic:
        "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sazZiAbNrN8SB3lQQX7PncwdsXJaVIDzvcXA.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/balsamiqsans/v14/P5sfzZiAbNrN8SB3lQQX7PncwdsvmYpsBxDAVQI4aA.ttf",
    },
  },
  {
    family: "Livvic",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "100italic",
      "200",
      "200italic",
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
      "900",
      "900italic",
    ],
    files: {
      "100": "http://fonts.gstatic.com/s/livvic/v14/rnCr-x1S2hzjrlffC-M-mHnOSOuk.ttf",
      "200": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffp8IeslfCQfK9WQ.ttf",
      "300": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffw8EeslfCQfK9WQ.ttf",
      "500": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlffm8AeslfCQfK9WQ.ttf",
      "600": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlfft8ceslfCQfK9WQ.ttf",
      "700": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlff08YeslfCQfK9WQ.ttf",
      "900": "http://fonts.gstatic.com/s/livvic/v14/rnCq-x1S2hzjrlff68QeslfCQfK9WQ.ttf",
      "100italic": "http://fonts.gstatic.com/s/livvic/v14/rnCt-x1S2hzjrlfXbdtakn3sTfukQHs.ttf",
      "200italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdv2s13GY_etWWIJ.ttf",
      "300italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbduSsF3GY_etWWIJ.ttf",
      regular: "http://fonts.gstatic.com/s/livvic/v14/rnCp-x1S2hzjrlfnb-k6unzeSA.ttf",
      italic: "http://fonts.gstatic.com/s/livvic/v14/rnCr-x1S2hzjrlfXbeM-mHnOSOuk.ttf",
      "500italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdvKsV3GY_etWWIJ.ttf",
      "600italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdvmtl3GY_etWWIJ.ttf",
      "700italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbduCt13GY_etWWIJ.ttf",
      "900italic": "http://fonts.gstatic.com/s/livvic/v14/rnCs-x1S2hzjrlfXbdu6tV3GY_etWWIJ.ttf",
    },
  },
  {
    family: "Scada",
    category: "sans-serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/scada/v15/RLp8K5Pv5qumeVrU6BEgRVfmZOE5.ttf",
      regular: "http://fonts.gstatic.com/s/scada/v15/RLpxK5Pv5qumeWJoxzUobkvv.ttf",
      italic: "http://fonts.gstatic.com/s/scada/v15/RLp_K5Pv5qumeVJqzTEKa1vvffg.ttf",
      "700italic": "http://fonts.gstatic.com/s/scada/v15/RLp6K5Pv5qumeVJq9Y0lT1PEYfE5p6g.ttf",
    },
  },
  {
    family: "Shadows Into Light Two",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/shadowsintolighttwo/v17/4iC86LVlZsRSjQhpWGedwyOoW-0A6_kpsyNmlAvNGLNnIF0.ttf",
    },
  },
  {
    family: "Telex",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/telex/v17/ieVw2Y1fKWmIO9fTB1piKFIf.ttf",
    },
  },
  {
    family: "Rancho",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rancho/v21/46kulbzmXjLaqZRlbWXgd0RY1g.ttf",
    },
  },
  {
    family: "Bowlby One SC",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bowlbyonesc/v25/DtVlJxerQqQm37tzN3wMug9Pzgj8owhNjuE.ttf",
    },
  },
  {
    family: "Graduate",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/graduate/v17/C8cg4cs3o2n15t_2YxgR6X2NZAn2.ttf",
    },
  },
  {
    family: "Oranienbaum",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/oranienbaum/v15/OZpHg_txtzZKMuXLIVrx-3zn7kz3dpHc.ttf",
    },
  },
  {
    family: "Miriam Libre",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700":
        "http://fonts.gstatic.com/s/miriamlibre/v14/DdT-798HsHwubBAqfkcBTL_X3LbbRcC7_-Z7Hg.ttf",
      regular: "http://fonts.gstatic.com/s/miriamlibre/v14/DdTh798HsHwubBAqfkcBTL_vYJn_Teun9g.ttf",
    },
  },
  {
    family: "Vazirmatn",
    category: "sans-serif",
    subsets: ["arabic", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklWgyOReZ72DF_QY.ttf",
      "200":
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklegzOReZ72DF_QY.ttf",
      "300":
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklTYzOReZ72DF_QY.ttf",
      "500":
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklVozOReZ72DF_QY.ttf",
      "600":
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklbY0OReZ72DF_QY.ttf",
      "700":
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklY80OReZ72DF_QY.ttf",
      "800":
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRkleg0OReZ72DF_QY.ttf",
      "900":
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklcE0OReZ72DF_QY.ttf",
      regular:
        "http://fonts.gstatic.com/s/vazirmatn/v13/Dxx78j6PP2D_kU2muijPEe1n2vVbfJRklWgzOReZ72DF_QY.ttf",
    },
  },
  {
    family: "Corben",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/corben/v21/LYjAdGzzklQtCMpFHCZgrXArXN7HWQ.ttf",
      regular: "http://fonts.gstatic.com/s/corben/v21/LYjDdGzzklQtCMp9oAlEpVs3VQ.ttf",
    },
  },
  {
    family: "Cormorant Infant",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "300",
      "300italic",
      "regular",
      "italic",
      "500",
      "500italic",
      "600",
      "600italic",
      "700",
      "700italic",
    ],
    files: {
      "300":
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN9951w3_DMrQqcdJrk.ttf",
      "500":
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN995wQ2_DMrQqcdJrk.ttf",
      "600":
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN995ygx_DMrQqcdJrk.ttf",
      "700":
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyIU44g9vKiM1sORYSiWeAsLN9950ww_DMrQqcdJrk.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItcDEhRoUYNrn_Ig.ttf",
      regular:
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyPU44g9vKiM1sORYSiWeAsLN993_Af2DsAXq4.ttf",
      italic:
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyJU44g9vKiM1sORYSiWeAsLN997_IV3BkFTq4EPw.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItKDAhRoUYNrn_Ig.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItBDchRoUYNrn_Ig.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/cormorantinfant/v17/HhyKU44g9vKiM1sORYSiWeAsLN997_ItYDYhRoUYNrn_Ig.ttf",
    },
  },
  {
    family: "Belleza",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/belleza/v17/0nkoC9_pNeMfhX4BtcbyawzruP8.ttf",
    },
  },
  {
    family: "Annie Use Your Telescope",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/annieuseyourtelescope/v18/daaLSS4tI2qYYl3Jq9s_Hu74xwktnlKxH6osGVGjlDfB3UUVZA.ttf",
    },
  },
  {
    family: "Jua",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/jua/v15/co3KmW9ljjAjc-DZCsKgsg.ttf",
    },
  },
  {
    family: "Bevan",
    category: "serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular", "italic"],
    files: {
      regular: "http://fonts.gstatic.com/s/bevan/v24/4iCj6KZ0a9NXjF8aUir7tlSJ.ttf",
      italic: "http://fonts.gstatic.com/s/bevan/v24/4iCt6KZ0a9NXjG8YWC7Zs0SJD4U.ttf",
    },
  },
  {
    family: "BioRhyme",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["200", "300", "regular", "700", "800"],
    files: {
      "200": "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ESOjnGAq8Sk1PoH.ttf",
      "300": "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ETqjXGAq8Sk1PoH.ttf",
      "700": "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ET6inGAq8Sk1PoH.ttf",
      "800": "http://fonts.gstatic.com/s/biorhyme/v16/1cX3aULHBpDMsHYW_ETmiXGAq8Sk1PoH.ttf",
      regular: "http://fonts.gstatic.com/s/biorhyme/v16/1cXwaULHBpDMsHYW_HxGpVWIgNit.ttf",
    },
  },
  {
    family: "Kiwi Maru",
    category: "serif",
    subsets: ["cyrillic", "japanese", "latin", "latin-ext"],
    variants: ["300", "regular", "500"],
    files: {
      "300": "http://fonts.gstatic.com/s/kiwimaru/v14/R70djykGkuuDep-hRg6gNCi0Vxn9R5ShnA.ttf",
      "500": "http://fonts.gstatic.com/s/kiwimaru/v14/R70djykGkuuDep-hRg6gbCm0Vxn9R5ShnA.ttf",
      regular: "http://fonts.gstatic.com/s/kiwimaru/v14/R70YjykGkuuDep-hRg6YmACQXzLhTg.ttf",
    },
  },
  {
    family: "Average Sans",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/averagesans/v16/1Ptpg8fLXP2dlAXR-HlJJNJPBdqazVoK4A.ttf",
    },
  },
  {
    family: "Overpass Mono",
    category: "monospace",
    subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EWKokzzXur-SmIr.ttf",
      "500":
        "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EXmokzzXur-SmIr.ttf",
      "600":
        "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EUKpUzzXur-SmIr.ttf",
      "700":
        "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EUzpUzzXur-SmIr.ttf",
      regular:
        "http://fonts.gstatic.com/s/overpassmono/v16/_Xm5-H86tzKDdAPa-KPQZ-AC_COcRycquHlL6EXUokzzXur-SmIr.ttf",
    },
  },
  {
    family: "Noto Sans Hebrew",
    category: "sans-serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4utoiJltutR2g.ttf",
      "200":
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX94qtoiJltutR2g.ttf",
      "300":
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXKYqtoiJltutR2g.ttf",
      "500":
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXRYqtoiJltutR2g.ttf",
      "600":
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXqY2toiJltutR2g.ttf",
      "700":
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXkI2toiJltutR2g.ttf",
      "800":
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX942toiJltutR2g.ttf",
      "900":
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiX3o2toiJltutR2g.ttf",
      regular:
        "http://fonts.gstatic.com/s/notosanshebrew/v43/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4qtoiJltutR2g.ttf",
    },
  },
  {
    family: "Bellefair",
    category: "serif",
    subsets: ["hebrew", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/bellefair/v14/kJExBuYY6AAuhiXUxG19__A2pOdvDA.ttf",
    },
  },
  {
    family: "Bubblegum Sans",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/bubblegumsans/v20/AYCSpXb_Z9EORv1M5QTjEzMEtdaHzoPPb7R4.ttf",
    },
  },
  {
    family: "Marvel",
    category: "sans-serif",
    subsets: ["latin"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/marvel/v16/nwpWtKeoNgBV0qawLXHgB1WmxwkiYQ.ttf",
      regular: "http://fonts.gstatic.com/s/marvel/v16/nwpVtKeoNgBV0qaIkV7ED366zg.ttf",
      italic: "http://fonts.gstatic.com/s/marvel/v16/nwpXtKeoNgBV0qa4k1TALXuqzhA7.ttf",
      "700italic": "http://fonts.gstatic.com/s/marvel/v16/nwpQtKeoNgBV0qa4k2x8Al-i5QwyYdrc.ttf",
    },
  },
  {
    family: "Noto Serif Devanagari",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["100", "200", "300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTA-og-HMUe1u_dv.ttf",
      "200":
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTC-ow-HMUe1u_dv.ttf",
      "300":
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTBgow-HMUe1u_dv.ttf",
      "500":
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTAMow-HMUe1u_dv.ttf",
      "600":
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTDgpA-HMUe1u_dv.ttf",
      "700":
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTDZpA-HMUe1u_dv.ttf",
      "800":
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTC-pA-HMUe1u_dv.ttf",
      "900":
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTCXpA-HMUe1u_dv.ttf",
      regular:
        "http://fonts.gstatic.com/s/notoserifdevanagari/v28/x3dYcl3IZKmUqiMk48ZHXJ5jwU-DZGRSaQ4Hh2dGyFzPLcQPVbnRNeFsw0xRWb6uxTA-ow-HMUe1u_dv.ttf",
    },
  },
  {
    family: "Rozha One",
    category: "serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/rozhaone/v15/AlZy_zVFtYP12Zncg2khdXf4XB0Tow.ttf",
    },
  },
  {
    family: "Knewave",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/knewave/v14/sykz-yx0lLcxQaSItSq9-trEvlQ.ttf",
    },
  },
  {
    family: "Pattaya",
    category: "sans-serif",
    subsets: ["cyrillic", "latin", "latin-ext", "thai", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/pattaya/v16/ea8ZadcqV_zkHY-XNdCn92ZEmVs.ttf",
    },
  },
  {
    family: "Enriqueta",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "500", "600", "700"],
    files: {
      "500": "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVrv2mHmNZEq6TTFw.ttf",
      "600": "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVrk26HmNZEq6TTFw.ttf",
      "700": "http://fonts.gstatic.com/s/enriqueta/v17/gokpH6L7AUFrRvV44HVr92-HmNZEq6TTFw.ttf",
      regular: "http://fonts.gstatic.com/s/enriqueta/v17/goksH6L7AUFrRvV44HVTS0CjkP1Yog.ttf",
    },
  },
  {
    family: "Lustria",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/lustria/v13/9oRONYodvDEyjuhOrCg5MtPyAcg.ttf",
    },
  },
  {
    family: "Rambla",
    category: "sans-serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/rambla/v13/snfos0ip98hx6mrMn50qPvN4yJuDYQ.ttf",
      regular: "http://fonts.gstatic.com/s/rambla/v13/snfrs0ip98hx6mr0I7IONthkwQ.ttf",
      italic: "http://fonts.gstatic.com/s/rambla/v13/snfps0ip98hx6mrEIbgKFN10wYKa.ttf",
      "700italic": "http://fonts.gstatic.com/s/rambla/v13/snfus0ip98hx6mrEIYC2O_l86p6TYS-Y.ttf",
    },
  },
  {
    family: "Darker Grotesque",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["300", "regular", "500", "600", "700", "800", "900"],
    files: {
      "300":
        "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXxpqn7y-XFyZFUB.ttf",
      "500":
        "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXwFqn7y-XFyZFUB.ttf",
      "600":
        "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXzprX7y-XFyZFUB.ttf",
      "700":
        "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXzQrX7y-XFyZFUB.ttf",
      "800":
        "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXy3rX7y-XFyZFUB.ttf",
      "900":
        "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXyerX7y-XFyZFUB.ttf",
      regular:
        "http://fonts.gstatic.com/s/darkergrotesque/v8/U9MK6cuh-mLQlC4BKCtayOfARkSVgb381b-W8-QDqXw3qn7y-XFyZFUB.ttf",
    },
  },
  {
    family: "Overlock",
    category: "display",
    subsets: ["latin", "latin-ext"],
    variants: ["regular", "italic", "700", "700italic", "900", "900italic"],
    files: {
      "700": "http://fonts.gstatic.com/s/overlock/v17/Z9XSDmdMWRiN1_T9Z7xizcmMvL2L9TLT.ttf",
      "900": "http://fonts.gstatic.com/s/overlock/v17/Z9XSDmdMWRiN1_T9Z7xaz8mMvL2L9TLT.ttf",
      regular: "http://fonts.gstatic.com/s/overlock/v17/Z9XVDmdMWRiN1_T9Z4Te4u2El6GC.ttf",
      italic: "http://fonts.gstatic.com/s/overlock/v17/Z9XTDmdMWRiN1_T9Z7Tc6OmmkrGC7Cs.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/overlock/v17/Z9XQDmdMWRiN1_T9Z7Tc0FWJtrmp8CLTlNs.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/overlock/v17/Z9XQDmdMWRiN1_T9Z7Tc0G2Ltrmp8CLTlNs.ttf",
    },
  },
  {
    family: "Arizonia",
    category: "handwriting",
    subsets: ["latin", "latin-ext", "vietnamese"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/arizonia/v21/neIIzCemt4A5qa7mv6WGHK06UY30.ttf",
    },
  },
  {
    family: "Arbutus Slab",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/arbutusslab/v16/oY1Z8e7OuLXkJGbXtr5ba7ZVa68dJlaFAQ.ttf",
    },
  },
  {
    family: "Headland One",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/headlandone/v16/yYLu0hHR2vKnp89Tk1TCq3Tx0PlTeZ3mJA.ttf",
    },
  },
  {
    family: "Noto Serif Display",
    category: "serif",
    subsets: ["cyrillic", "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    variants: [
      "100",
      "200",
      "300",
      "regular",
      "500",
      "600",
      "700",
      "800",
      "900",
      "100italic",
      "200italic",
      "300italic",
      "italic",
      "500italic",
      "600italic",
      "700italic",
      "800italic",
      "900italic",
    ],
    files: {
      "100":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpd49gKaDU9hvzC.ttf",
      "200":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVrd4tgKaDU9hvzC.ttf",
      "300":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVoD4tgKaDU9hvzC.ttf",
      "500":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpv4tgKaDU9hvzC.ttf",
      "600":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVqD5dgKaDU9hvzC.ttf",
      "700":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVq65dgKaDU9hvzC.ttf",
      "800":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVrd5dgKaDU9hvzC.ttf",
      "900":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVr05dgKaDU9hvzC.ttf",
      regular:
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buERppa9f8_vkXaZLAgP0G5Wi6QmA1QaeYah2sovLCDq_ZgLyt3idQfktOG-PVpd4tgKaDU9hvzC.ttf",
      "100italic":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoTBIYjEfg-zCmf4.ttf",
      "200italic":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VobBJYjEfg-zCmf4.ttf",
      "300italic":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoW5JYjEfg-zCmf4.ttf",
      italic:
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoTBJYjEfg-zCmf4.ttf",
      "500italic":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoQJJYjEfg-zCmf4.ttf",
      "600italic":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-Voe5OYjEfg-zCmf4.ttf",
      "700italic":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoddOYjEfg-zCmf4.ttf",
      "800italic":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VobBOYjEfg-zCmf4.ttf",
      "900italic":
        "http://fonts.gstatic.com/s/notoserifdisplay/v24/buEPppa9f8_vkXaZLAgP0G5Wi6QmA1QwcLRCOrN8uo7t6FBJOJTQit-N33sQOk-VoZlOYjEfg-zCmf4.ttf",
    },
  },
  {
    family: "Do Hyeon",
    category: "sans-serif",
    subsets: ["korean", "latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/dohyeon/v18/TwMN-I8CRRU2zM86HFE3ZwaH__-C.ttf",
    },
  },
  {
    family: "Alike",
    category: "serif",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/alike/v20/HI_EiYEYI6BIoEjBSZXAQ4-d.ttf",
    },
  },
  {
    family: "Coming Soon",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/comingsoon/v19/qWcuB6mzpYL7AJ2VfdQR1u-SUjjzsykh.ttf",
    },
  },
  {
    family: "Cedarville Cursive",
    category: "handwriting",
    subsets: ["latin"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/cedarvillecursive/v17/yYL00g_a2veiudhUmxjo5VKkoqA-B_neJbBxw8BeTg.ttf",
    },
  },
  {
    family: "Marcellus SC",
    category: "serif",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/marcellussc/v13/ke8iOgUHP1dg-Rmi6RWjbLEPgdydGKikhA.ttf",
    },
  },
  {
    family: "Rubik Moonrocks",
    category: "display",
    subsets: ["cyrillic", "cyrillic-ext", "hebrew", "latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular:
        "http://fonts.gstatic.com/s/rubikmoonrocks/v5/845ANMAmAI2VUZMLu_W0M7HqlDHnXcD7JGy1Sw.ttf",
    },
  },
  {
    family: "Niconne",
    category: "handwriting",
    subsets: ["latin", "latin-ext"],
    variants: ["regular"],
    files: {
      regular: "http://fonts.gstatic.com/s/niconne/v15/w8gaH2QvRug1_rTfrQut2F4OuOo.ttf",
    },
  },
  {
    family: "Padauk",
    category: "sans-serif",
    subsets: ["latin", "latin-ext", "myanmar"],
    variants: ["regular", "700"],
    files: {
      "700": "http://fonts.gstatic.com/s/padauk/v16/RrQSboJg-id7Onb512DE1JJEZ4YwGg.ttf",
      regular: "http://fonts.gstatic.com/s/padauk/v16/RrQRboJg-id7OnbBa0_g3LlYbg.ttf",
    },
  },
  {
    family: "Biryani",
    category: "sans-serif",
    subsets: ["devanagari", "latin", "latin-ext"],
    variants: ["200", "300", "regular", "600", "700", "800", "900"],
    files: {
      "200": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddYQyGTBSU-J-RxQ.ttf",
      "300": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddeAxGTBSU-J-RxQ.ttf",
      "600": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddZQ3GTBSU-J-RxQ.ttf",
      "700": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84YddfA2GTBSU-J-RxQ.ttf",
      "800": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84Yddew1GTBSU-J-RxQ.ttf",
      "900": "http://fonts.gstatic.com/s/biryani/v13/hv-TlzNxIFoO84Yddcg0GTBSU-J-RxQ.ttf",
      regular: "http://fonts.gstatic.com/s/biryani/v13/hv-WlzNxIFoO84YdTUwZPTh5T-s.ttf",
    },
  },
  {
    family: "Hanuman",
    category: "serif",
    subsets: ["khmer", "latin"],
    variants: ["100", "300", "regular", "700", "900"],
    files: {
      "100": "http://fonts.gstatic.com/s/hanuman/v22/VuJzdNvD15HhpJJBQMLdPKNiaRpFvg.ttf",
      "300": "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQAr_HIlMZRNcp0o.ttf",
      "700": "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQBr4HIlMZRNcp0o.ttf",
      "900": "http://fonts.gstatic.com/s/hanuman/v22/VuJ0dNvD15HhpJJBQCL6HIlMZRNcp0o.ttf",
      regular: "http://fonts.gstatic.com/s/hanuman/v22/VuJxdNvD15HhpJJBeKbXOIFneRo.ttf",
    },
  },
];

export const getFontUrls = (family: string, variants: string[]): string[] => {
  const font = fonts.find((font) => font.family === family);

  if (!font) return [];

  return Object.entries(font.files)
    .filter(([variant]) => variants.includes(variant))
    .map(([, url]) => url);
};
