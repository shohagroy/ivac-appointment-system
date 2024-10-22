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
