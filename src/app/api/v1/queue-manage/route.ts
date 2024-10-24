import {
  getOtpErrorResponse,
  getOtpSuccessResponse,
} from "@/app/constens/queueManage";
import axios from "axios";

import Queue from "bull";

// Create a new Bull queue
const apiQueue = new Queue("apiQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

apiQueue.process(async (job, done) => {
  try {
    const { data } = job;
    const response = await axios.post(
      "https://payment.ivacbd.com/api/v1/queue-manage",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    done(null, response.data);
  } catch (error) {
    done(error as Error);
  }
});

export const POST = async (req: Request) => {
  const body = await req.json();

  // return new Response(JSON.stringify(getOtpErrorResponse), {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // return new Response(JSON.stringify(getOtpSuccessResponse), {
  //   status: 200,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  try {
    const response = await axios.post(
      "https://payment.ivacbd.com/api/v1/queue-manage",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    const errorStatus = error?.response?.status || 500;
    const errorMessage = error?.response?.data || {
      message: "An unknown error occurred.",
    };
    return new Response(JSON.stringify(errorMessage), {
      status: errorStatus,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

// import axios from "axios";

// export const POST = async (req: Request) => {
//   const body = await req.json();

//   // Function to make an individual request with cancellation capability
//   const makeRequest = async (abortController: AbortController) => {
//     try {
//       const response = await axios.post(
//         "https://payment.ivacbd.com/api/v1/queue-manage",
//         body,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           signal: abortController.signal, // Pass the abort signal to axios
//         }
//       );

//       return response.data; // Return the successful data
//     } catch (error: any) {
//       // Check if the request was canceled
//       if (error?.code === "ERR_CANCELED") {
//         return null; // Ignore the canceled requests
//       }
//       // Log detailed error information for debugging
//       console.error("Error making request:", error);
//       throw error; // Throw other errors
//     }
//   };

//   try {
//     const controllers: AbortController[] = [];
//     const requestPromises: Promise<any>[] = [];

//     // Start 100 requests
//     for (let i = 0; i < 100; i++) {
//       const controller = new AbortController();
//       controllers.push(controller);

//       // Push each request promise into the array
//       requestPromises.push(makeRequest(controller));
//     }

//     // Use Promise.race to get the first successful request
//     const successfulResponse = await Promise.race(requestPromises);

//     // Abort all the remaining requests
//     controllers.forEach((controller) => controller.abort());

//     // Return the first successful response
//     return new Response(JSON.stringify(successfulResponse), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error: any) {
//     const errorStatus = error?.response?.status || 500;
//     const errorMessage = error?.response?.data || {
//       message: "An unknown error occurred.",
//     };

//     console.error("Error caught in main:", error); // Log caught error for debugging

//     return new Response(JSON.stringify(errorMessage), {
//       status: errorStatus,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// };
