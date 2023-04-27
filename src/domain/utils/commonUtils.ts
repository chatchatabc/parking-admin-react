import messageCodesJson from "../../../data/message-codes.json";

export function utilApiMessageGet(messageCode: string) {
  const messageCodes = messageCodesJson as Record<string, any>;

  const message = messageCodes[messageCode];

  if (message) {
    return message;
  }

  return `Unknown message code: ${messageCode}`;
}
