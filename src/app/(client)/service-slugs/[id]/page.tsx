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
import theme from "@/theme";
import { Close } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { ServiceSlug, User, VisaFile } from "@prisma/client";
import { FormikValues } from "formik";
import React from "react";

const ServiceSlugDetails = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const [deletingIndex, setDeletingIndex] = React.useState<number>(-1);

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

  const removeHandlar = async (fielId: string, index: number) => {
    setDeletingIndex(index);

    const data = {
      slugId: null,
      id: fielId,
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
  };

  const formattedDate = (date: Date) => {
    const d = new Date(date);
    const daysDifference = Math.round(
      (new Date().getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${d.getDate()} ${d
      .toLocaleString("default", { month: "short" })
      .toUpperCase()}, ${d.getFullYear()} (${daysDifference} Days)`;
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
        {(selectedSlug?.visaFiles?.length ?? -1) > 0 ? (
          <Grid container spacing={2}>
            {selectedSlug?.visaFiles?.map((file, index) => {
              const appointmentFile = JSON.parse(
                file?.appointmentFile as string
              );
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Paper sx={{ padding: "1rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: "600",
                        }}
                      >
                        {index + 1}. Web Files - {appointmentFile?.info?.length}
                      </Typography>

                      <IconButton
                        onClick={removeHandlar.bind(null, file?.id, index)}
                        color="error"
                        size="small"
                        sx={{
                          bgcolor: alpha(
                            theme.colorConstants.crossRed as string,
                            0.1
                          ),
                        }}
                      >
                        {updateLoading && deletingIndex === index ? (
                          <CircularProgress
                            size="20px"
                            variant="indeterminate"
                          />
                        ) : (
                          <Close />
                        )}
                      </IconButton>
                    </Box>

                    <Box sx={{ marginTop: "5px", minHeight: "100px" }}>
                      {appointmentFile?.info?.map((info: any, i: number) => {
                        return (
                          <Box key={i}>
                            <Box
                              sx={{
                                display: "flex",
                              }}
                            >
                              <Typography>{i + 1}.</Typography>
                              <Box sx={{ marginLeft: "10px" }}>
                                <Typography sx={{ fontWeight: "600" }}>
                                  {info?.web_id}
                                </Typography>
                                <Typography>{info?.name}</Typography>
                              </Box>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>

                    <Box
                      sx={{
                        marginTop: "10px",
                        padding: "5px",
                        borderRadius: "5px",
                        bgcolor: alpha(
                          theme.colorConstants.crossRed as string,
                          0.1
                        ),
                      }}
                    >
                      <Typography>
                        {formattedDate(
                          file?.createdAt ?? new Date().toISOString()
                        )}
                      </Typography>
                      <Typography
                        sx={{
                          color: theme.colorConstants.crossRed,
                          fontWeight: 600,
                        }}
                      >
                        Pending
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              No file added in this Slug - {slugIndex + 1}.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ServiceSlugDetails;
