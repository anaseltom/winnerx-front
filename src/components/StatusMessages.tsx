// A small set of helpers for displaying messages while in development.
import React, { useReducer } from "react";

const useMessages = () => {
  // helper for displaying status messages.
  return useReducer((messages: any, message: any) => {
    // Embed link
    return [...messages, message];
  }, []);
};

const maybeLink = (m: any) => {
  const piDashboardBase = "https://dashboard.stripe.com/test/payments";
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: m.replace(
          /(pi_(\S*)\b)/g,
          `<a href="${piDashboardBase}/$1" target="_blank">$1</a>`
        ),
      }}
    ></span>
  );
};

const StatusMessages = ({ messages }: { messages: any }) => {
  return (
    <>
      {messages.length ? (
        <div id="messages" role="alert">
          {messages.map((m: any, i: number) => (
            <div key={i}>{maybeLink(m)}</div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default StatusMessages;
export { useMessages };
