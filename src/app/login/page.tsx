"use client";
// import { images } from "@/assets/images";
import FormProvaider from "@/components/Forms";
import FormInputField, { IInputType } from "@/components/Forms/FormInputField";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { FormikValues } from "formik";
import Image from "next/image";
import React from "react";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const onSubmit = async (values: FormikValues): Promise<void> => {
    try {
      // const response = await login(values).unwrap();
      // if (!response.success) {
      //   dispatch(
      //     snackbarSliceActions.open({
      //       type: "error",
      //       message: response.message,
      //     })
      //   );
      // } else {
      //   router.replace("/");
      //   dispatch(
      //     snackbarSliceActions.open({
      //       type: "success",
      //       message: response.message,
      //     })
      //   );
      // }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          padding: "2rem",
          boxShadow: { xs: "none", md: "none" },
        }}
      >
        {/* <Image
          src={images?.imperialLogo}
          height={100}
          width={300}
          alt="logo"
          layout="intrinsic"
        /> */}
        <Divider
          sx={{
            marginTop: "0.2rem",
            marginBottom: "2rem",
          }}
        />

        <FormProvaider
          submitHandlar={onSubmit}
          initialValues={{ username: "", password: "" }}
          validationSchema={validateSchema}
        >
          <Box marginTop={"20px"}>
            <FormInputField
              name="username"
              label="Username"
              required
              placeholder="Username"
            />
          </Box>

          <Box marginTop={"20px"}>
            <FormInputField
              type={IInputType.PASSWORD}
              name="password"
              label="Password"
              required
              placeholder="********"
            />

            <Box
              sx={{
                width: "100%",
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  width: "150px",
                  height: "40px",
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </FormProvaider>
      </Paper>
    </Box>
  );
};

export default LoginPage;
