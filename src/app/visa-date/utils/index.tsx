import { RequestPayload } from "@/app/data";
import axios from "axios";

// export const getOtp = async (
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
//   setOtpResponse: React.Dispatch<React.SetStateAction<any>>,
//   setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>,
//   data: RequestPayload,
//   recall: number
// ) => {
//   setIsLoading(true);
//   setOtpResponse(null);
//   setErrorMessages([]);

//   const makeRequest = async (attempt: number): Promise<void> => {
//     try {
//       const response = await axios.post("/api/v1/queue-manage", data, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         // timeout: 30000, // 30 seconds timeout
//       });

//       // If successful, update OTP response and stop loading
//       setIsLoading(false);
//       setOtpResponse(response.data);
//     } catch (error: any) {
//       const errorMessage =
//         error?.response?.data?.message[0] || "Request timed out,";
//       setErrorMessages((prevErrors) => [...prevErrors, errorMessage]);

//       if (attempt + 1 < recall) {
//         console.log(`Retrying... Attempt ${attempt + 1}`);
//         setTimeout(() => makeRequest(attempt + 1), 100);
//       } else {
//         setIsLoading(false);
//         const message = `Failed after ${recall} attempts, please retry.`;
//         console.error(message);
//         setErrorMessages((prevErrors) => [...prevErrors, message]);
//       }
//     }
//   };

//   makeRequest(0);
// };

export const getOtp = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setOtpResponse: React.Dispatch<React.SetStateAction<any>>,
  setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>,
  data: RequestPayload,
  recall: number
) => {
  setIsLoading(true);
  setOtpResponse(null);
  setErrorMessages([]);
  const makeRequest = async (attempt: number): Promise<void> => {
    try {
      const response = await axios.post("/api/v1/queue-manage", data, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 50000,
      });
      if (response?.data?.code !== 200) {
        if (attempt + 1 < recall) {
          console.log(`Retrying... Attempt ${attempt + 1}`);
          setTimeout(() => makeRequest(attempt + 1), 100);
        } else {
          setIsLoading(false);
        }
        const errorMessage =
          response.data.message[0] || "Unknown error occurred.";
        setErrorMessages((prevErrors) => [...prevErrors, errorMessage]);
      } else {
        setIsLoading(false);
        setOtpResponse(response.data);
      }
    } catch (error: any) {
      let errorMessage = "An error occurred.";
      if (error?.response?.data?.message) {
        errorMessage =
          error.response.data.message[0] || "Unknown error occurred.";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Request timed out.";
      } else if (error.message === "Network Error") {
        errorMessage = "Network error. Please check your connection.";
      }
      setErrorMessages((prevErrors) => [...prevErrors, errorMessage]);
      if (attempt + 1 < recall) {
        console.log(`Retrying... Attempt ${attempt + 1}`);
        setTimeout(() => makeRequest(attempt + 1), 100);
      } else {
        setIsLoading(false);
      }
    }
  };
  makeRequest(0);
};

export const verifyOtp = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setVerifyResponse: React.Dispatch<React.SetStateAction<any>>,
  setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>,
  data: RequestPayload,
  recall: number
) => {
  setIsLoading(true);
  setVerifyResponse(null);
  setErrorMessages([]);

  const makeRequest = async (attempt: number): Promise<void> => {
    try {
      const response = await axios.post("/api/v1/verify-otp", data, {
        headers: {
          "Content-Type": "application/json",
        },
        // timeout: 30000,
      });

      setIsLoading(false);
      setVerifyResponse(response.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message[0] || "Request timed out,";
      setErrorMessages((prevErrors) => [...prevErrors, errorMessage]);

      if (attempt + 1 < recall) {
        console.log(`Retrying... Attempt ${attempt + 1}`);
        setTimeout(() => makeRequest(attempt + 1), 100);
      } else {
        setIsLoading(false);
      }
    }
  };

  makeRequest(0);
};

export const getTimesSlots = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setVerifyResponse: React.Dispatch<React.SetStateAction<any>>,
  setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>,
  data: RequestPayload,
  recall: number
) => {
  setIsLoading(true);
  setVerifyResponse(null);
  setErrorMessages([]);

  const makeRequest = async (attempt: number): Promise<void> => {
    try {
      const response = await axios.post("/api/v1/get-times-slot", data, {
        headers: {
          "Content-Type": "application/json",
        },
        // timeout: 30000,
      });

      setIsLoading(false);
      setVerifyResponse(response.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message[0] || "Request timed out,";
      setErrorMessages((prevErrors) => [...prevErrors, errorMessage]);

      if (attempt + 1 < recall) {
        console.log(`Retrying... Attempt ${attempt + 1}`);
        setTimeout(() => makeRequest(attempt + 1), 100);
      } else {
        setIsLoading(false);
      }
    }
  };

  makeRequest(0);
};

export const payInvoice = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPaymentResponse: React.Dispatch<React.SetStateAction<any>>,
  setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>,
  data: RequestPayload,
  recall: number
) => {
  setIsLoading(true);
  setPaymentResponse(null);
  setErrorMessages([]);

  const makeRequest = async (attempt: number): Promise<void> => {
    try {
      const response = await axios.post("/api/v1/payment-invoice", data, {
        headers: {
          "Content-Type": "application/json",
        },
        // timeout: 30000,
      });

      setIsLoading(false);
      setPaymentResponse(response.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message[0] || "Request timed out,";
      setErrorMessages((prevErrors) => [...prevErrors, errorMessage]);

      if (attempt + 1 < recall) {
        console.log(`Retrying... Attempt ${attempt + 1}`);
        setTimeout(() => makeRequest(attempt + 1), 100);
      } else {
        setIsLoading(false);
      }
    }
  };

  makeRequest(0);
};
