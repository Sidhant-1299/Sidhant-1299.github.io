import { serverURL } from "../../utils";
import { errorResponseMsg } from "./ButtonLabels";

export const formDataHandling = (name, email, message, setButtonLabel) => {
  const data = JSON.stringify({ name, email, message });
  const path = "contact";
  const request = new Request(`${serverURL}${path}`, {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" },
  });

  fetch(request)
    .then((response) => {
      if (!response.ok) {
        setButtonLabel(errorResponseMsg);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse response as JSON
    })
    .then((data) => {
      //   console.log(data); // Log import data message
    })
    .catch((error) => {
      setButtonLabel(errorResponseMsg);
      console.error("Error:", error);
    });
};

export const formHandlingDevelopment = (name, email, message) => {
  console.log({ name, email, message });
};
