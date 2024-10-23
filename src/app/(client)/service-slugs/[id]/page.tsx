"use client";

import FormProvaider from "@/components/Forms";
import FormSelectField from "@/components/Forms/FormSelectField";
import GlobalLoader from "@/components/GlobalLoader";
import { centerOptions, ivacOptions, visaOptions } from "@/constanse/visa";
import {
  useGetAllFilesQuery,
  useUpdateFileMutation,
} from "@/lib/Redux/features/applicationFiles/applicationFilesApi";
import { useGetAllServiceSlugQuery } from "@/lib/Redux/features/serviceSlug/serviceSlugApi";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useAppDispatch } from "@/lib/Redux/store";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { ServiceSlug, User, VisaFile } from "@prisma/client";
import { FormikValues } from "formik";
import React from "react";

const ServiceSlugDetails = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const { data: slugResponse, isLoading: initialLoading } =
    useGetAllServiceSlugQuery({});

  const { data: filesResponse, isLoading: filesLoading } = useGetAllFilesQuery(
    {}
  );

  const [updateFile, { isLoading: updateLoading }] = useUpdateFileMutation();

  if (initialLoading || filesLoading) {
    return <GlobalLoader height="70vh" />;
  }

  const slugIndex = slugResponse?.data?.findIndex(
    (slug: ServiceSlug) => slug?.id === params?.id
  );

  const selectedSlug = slugResponse?.data?.[slugIndex] as ServiceSlug & {
    asignUser?: User;
    visaFiles?: VisaFile[];
  };

  console.log(selectedSlug);

  const totalWebFilesCount = selectedSlug?.visaFiles
    ?.map((file) => {
      const webFile = JSON.parse(file?.appointmentFile as string);
      return webFile?.info?.length;
    })
    .reduce((a, b) => a + b, 0);

  const unAsignFiles = filesResponse?.data?.filter(
    (file: VisaFile) => !file?.slugId
  );

  const slugWebFilesOptions = unAsignFiles
    ?.filter((file: VisaFile) => {
      const application = JSON.parse(file?.appointmentFile as string);
      const data = application?.info?.filter((item: any) => {
        if (
          item?.center?.id === selectedSlug?.center &&
          item?.ivac?.id === selectedSlug?.ivac &&
          item?.visa_type?.id === selectedSlug?.visa
        ) {
          return true;
        } else {
          return false;
        }
      });

      if (data?.length > 0) {
        return true;
      } else {
        return false;
      }
    })
    ?.map((file: VisaFile) => {
      const application = JSON.parse(file?.appointmentFile as string);
      return {
        value: file?.id,
        label: `${application?.info?.[0]?.web_id} - (${application?.info?.length})`,
      };
    });

  const submitHandlar = async (values: FormikValues) => {
    const application = filesResponse?.data?.find(
      (item: VisaFile) => item?.id === values?.visaFileId
    )?.appointmentFile;

    const selectedWebFileCount = JSON.parse(application)?.info?.length;

    if (totalWebFilesCount + selectedWebFileCount > 5) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "You can not add more than 5 files",
        })
      );
    } else {
      const data = {
        slugId: selectedSlug?.id,
        id: values?.visaFileId,
      };

      let response;

      try {
        response = await updateFile(data).unwrap();
        if (response?.success) {
          dispatch(
            openSnackbar({
              message: response?.message,
              type: "success",
            })
          );
        } else {
          dispatch(
            openSnackbar({
              message: response?.message || "Something went wrong",
              type: "error",
            })
          );
        }
      } catch (error) {
        dispatch(
          openSnackbar({
            message: response?.message || "Something went wrong",
            type: "error",
          })
        );
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          paddingX: "5%",
          mx: "auto",
          my: "20px",
          paddingBottom: "20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "2rem",
                  fontWeight: "700",
                }}
              >
                Slug - {slugIndex + 1}
              </Typography>

              <Typography
                sx={{
                  lineHeight: "1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                {
                  centerOptions?.find(
                    (item) => item?.value === selectedSlug?.center
                  )?.label
                }{" "}
                |{" "}
                {
                  ivacOptions?.find(
                    (item) => item?.value === selectedSlug?.ivac
                  )?.label
                }
              </Typography>

              <Typography
                sx={{
                  lineHeight: "1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                {
                  visaOptions?.find(
                    (item) => item?.value === selectedSlug?.visa
                  )?.label
                }
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Asign to:
              </Typography>

              <Typography
                sx={{
                  lineHeight: "1.5rem",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  textTransform: "capitalize",
                }}
              >
                {selectedSlug?.asignUser?.username}
              </Typography>

              <Typography
                sx={{
                  lineHeight: "1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                {selectedSlug?.asignUser?.email} |{" "}
                {selectedSlug?.asignUser?.contact}
              </Typography>

              <Typography
                sx={{
                  lineHeight: "1.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Send OTP to - {selectedSlug?.phone}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                Total Web File: {totalWebFilesCount}
              </Typography>

              <FormProvaider initialValues={{}} submitHandlar={submitHandlar}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "flex-end",
                  }}
                >
                  <FormSelectField
                    name="visaFileId"
                    options={slugWebFilesOptions}
                    placeholder="Select Web File"
                    required
                    label="Select Web File"
                  />

                  <Box>
                    <Button
                      type="submit"
                      disabled={updateLoading}
                      sx={{
                        textTransform: "none",
                        fontSize: "1rem",
                        fontFamily: "inherit",
                        marginLeft: "10px",
                      }}
                      variant="contained"
                    >
                      Add
                    </Button>
                  </Box>
                </Box>
              </FormProvaider>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          paddingX: "5%",
          my: "2rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Paper sx={{ padding: "1rem" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Web Files -2
              </Typography>

              <Box marginY="10px">
                <List disablePadding>
                  <ListItem
                    disablePadding
                    sx={{
                      display: "listItem",
                    }}
                  >
                    <ListItemText primary="one" />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemText primary="two" />
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            2
          </Grid>
          <Grid item xs={4}>
            3
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ServiceSlugDetails;
