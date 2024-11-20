import { mappingValue } from "@/client/util/mapping";

export type IEvent = {
  pdfJson: Record<string, unknown>;
  mappingCode: Record<string, string>;
};

onmessage = function (event: MessageEvent<IEvent>) {
  const { pdfJson, mappingCode } = event.data;
  try {
    console.log(pdfJson, mappingCode);
    const result = mappingValue(pdfJson, mappingCode);
    postMessage({ success: true, data: result });
  } catch (error) {
    postMessage({ success: false, error: (error as unknown as Error).message });
  }
};
