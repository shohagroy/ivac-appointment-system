import axios from "axios";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    // const response = await axios.post(
    //   "http://localhost:3000/api/v1/queue-manage",
    //   body,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     maxRedirects: 0,
    //   }
    // );

    const response = await axios.post(
      "https://payment.ivacbd.com/slot_pay_now",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
        maxRedirects: 0,
      }
    );

    console.log(response);

    // Check if the response requires a redirect
    if (response.data?.redirectUrl) {
      return new Response(
        JSON.stringify({
          message: "Redirecting to payment page",
          redirectUrl: response.data.redirectUrl,
        }),
        {
          status: 302, // HTTP 302 Found status code for redirection
          headers: {
            "Content-Type": "application/json",
            Location: response.data.redirectUrl, // Set the redirect URL in the Location header
          },
        }
      );
    }

    // If no redirect is required, return the data normally
    return new Response(JSON.stringify(response), {
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
