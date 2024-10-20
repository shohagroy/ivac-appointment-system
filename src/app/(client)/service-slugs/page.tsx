"use client";

import GlobalButton from "@/components/Buttons/GlobalButton";
import GlobalDrawer from "@/components/Drawers/GlobalDrawer";
import FormProvaider from "@/components/Forms";
import FormInputField, { IInputType } from "@/components/Forms/FormInputField";
import FormSelectField from "@/components/Forms/FormSelectField";
import GlobalLoader from "@/components/GlobalLoader";
import GlobalModal from "@/components/Modals/GlobalModal";
import PageHeader from "@/components/PageHeader";
import GlobalTable from "@/components/Tables/GlobalTable";
import { centerOptions, ivacOptions, visaOptions } from "@/constanse/visa";
import { useGetAllClientsQuery } from "@/lib/Redux/features/clients/clientApi";
import {
  useCreateServiceSlugMutation,
  useDeleteServiceSlugMutation,
  useGetAllServiceSlugQuery,
  useUpdateServiceSlugMutation,
} from "@/lib/Redux/features/serviceSlug/serviceSlugApi";
import { openSnackbar } from "@/lib/Redux/features/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/store";
import theme from "@/theme";
import { ErrorOutline, Search } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Client, ServiceSlug, VisaFile } from "@prisma/client";
import { FormikValues } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";

const validateSchema = Yup.object().shape({
  center: Yup.number().required("Center is required"),
  ivac: Yup.number().required("IVAC is required"),
  phone: Yup.string()
    .required("Phone Number is Required")
    .matches(/^\d{11}$/, "Phone Number must be exactly 11 digits"),
  asignUserId: Yup.string().required("User is required"),
});

const formatDate = (isoString: Date): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const ClientsListing = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [slugInfo, setSlugInfo] = useState<Partial<VisaFile>>({});

  const [renderFileStatus, setRenderFileStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const loginUser = useAppSelector((state) => state?.auth?.user);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: clientResponse, isLoading: initialLoading } =
    useGetAllClientsQuery({});

  const { allUsers } = useAppSelector((state) => state?.auth);

  const userOptions = allUsers
    ?.filter((user) => user?.isActive)
    ?.map((user) => {
      return {
        value: user?.id,
        label: user?.username,
      };
    });

  const [createServiceSlug, { isLoading: createLoading }] =
    useCreateServiceSlugMutation();

  const [updateServiceSlug, { isLoading: updateLoading }] =
    useUpdateServiceSlugMutation();

  const [deleteServiceSlug, { isLoading: deleteLoading }] =
    useDeleteServiceSlugMutation();

  const { data: allServiceSlugs, isLoading: allServiceSlugsLoading } =
    useGetAllServiceSlugQuery({});

  const servicesSlug = allServiceSlugs?.data;

  const updateHandler = (id: string) => {
    const selected = allServiceSlugs?.data?.find(
      (item: ServiceSlug) => item?.id === id
    );

    setSlugInfo(selected);
    setIsOpenDrawer(true);
  };

  const submitHandler = async (values: FormikValues) => {
    let response;

    try {
      if (!values?.id) {
        response = await createServiceSlug(values).unwrap();
      } else {
        response = await updateServiceSlug(values).unwrap();
      }
      if (response?.success) {
        dispatch(
          openSnackbar({
            message: response?.message,
            type: "success",
          })
        );
        setIsOpenDrawer(false);
        setSlugInfo({});
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

  const openDeleteModal = (id: string) => {
    const selected = allServiceSlugs?.data?.find(
      (item: VisaFile) => item?.id === id
    );
    setSlugInfo(selected);
    setIsOpenDeleteModal(true);
  };

  const deleteUserHandler = async () => {
    console.log(slugInfo);
    try {
      const res = await deleteServiceSlug({ id: slugInfo?.id }).unwrap();
      if (res.success) {
        dispatch(
          openSnackbar({
            type: "success",
            message: res?.message,
          })
        );
        setIsOpenDeleteModal(false);
        setSlugInfo({});
      } else {
        dispatch(
          openSnackbar({
            type: "error",
            message: res.message || "Something went wrong",
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        openSnackbar({
          type: "error",
          message: "Something went wrong",
        })
      );
    }
  };

  if (initialLoading || allServiceSlugsLoading) {
    return <GlobalLoader height="40vh" />;
  }

  const filterOptions = [
    { label: "Uncompleted", value: "uncompleted" },
    { label: "Completed", value: "completed" },
  ];

  const filteredData = clientResponse?.data?.filter((item: Client) => {
    return item?.isActive;
  });

  const searchAbleData: Client[] = filteredData?.filter((item: Client) => {
    const searchInLowerCase = search.toLocaleLowerCase();

    const { companyName, propritor, address, contact, email } = item;

    return (
      companyName?.toLocaleLowerCase().includes(searchInLowerCase) ||
      propritor?.toLocaleLowerCase().includes(searchInLowerCase) ||
      address?.toLocaleLowerCase().includes(searchInLowerCase) ||
      contact?.toLocaleLowerCase().includes(searchInLowerCase) ||
      email?.toLocaleLowerCase().includes(searchInLowerCase)
    );
  });

  const tableHeaders = [
    {
      label: "Identifier",
      align: "left",
      width: "100px",
    },

    {
      label: "Web File",
      align: "center",
      width: "100px",
    },
    {
      label: "Mission",
      align: "left",
      width: "100px",
    },
    {
      label: "IVAC",
      align: "left",
      width: "180px",
    },
    {
      label: "Type",
      align: "left",
      width: "300px",
    },
    {
      label: "Asign To",
      align: "left",
      width: "100px",
    },
    {
      label: "Status",
      align: "left",
      width: "100px",
    },
    {
      label: "Actions",
      align: "center",
      width: "100px",
    },
  ];

  const filesData = allServiceSlugs?.data?.map((item: any, i: number) => {
    return {
      _id: item?.id,
      Identifier: `Slug - ${i + 1}`,
      webFile: item?.visaFiles
        ?.map((file: VisaFile) => {
          const webFile = JSON.parse(file?.appointmentFile as string);
          return webFile?.info?.length;
        })
        .reduce((a: number, b: number) => a + b, 0),
      mission: centerOptions.find((c) => c.value === item?.center)?.label,
      ivac: ivacOptions.find((c) => c.value === item?.ivac)?.label,
      visaType: visaOptions.find((v) => v.value === item?.visa)?.label,
      asignTo: item?.asignUser?.username,
      status: item?.status ? "Completed" : "Uncompleted",
      navigateTo: `/service-slugs/${item?.id}`,
    };
  });

  // const tableItems = searchAbleData?.map((item: Client) => {
  //   return {
  //     _id: item.id,
  //     companyName: item.companyName,
  //     propritor: item.propritor,
  //     contact: item.contact,
  //     email: item.email,
  //     address: item.address,
  //     status: item.isActive ? "Active" : "Deactive",
  //   };
  // });

  const modalInfo = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ErrorOutline
        color="error"
        sx={{ fontSize: { xs: "50px", md: "100px" } }}
      />
      <Typography
        variant="h3"
        sx={{
          color: theme.colorConstants.crossRed,
          fontSize: { xs: "16px", md: "24px" },
          paddingTop: { xs: "10px", md: "20px" },
          lineHeight: { xs: "18px", md: "24px" },
        }}
      >
        Are you sure delete this File?
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.colorConstants.darkBlue,
          textAlign: "center",
          fontSize: { xs: "12px", md: "16px" },
          lineHeight: { xs: "14px", md: "20px" },
          marginTop: "10px",
        }}
      >
        If you click on the <b>Yes</b> button, this file will be permanently
        deleted.
      </Typography>
    </Box>
  );

  return (
    <Box>
      <PageHeader title="Services Slug" />
      <Box sx={{ paddingX: "5%", mx: "auto", my: "20px", minHeight: "40vh" }}>
        <Box
          sx={{
            paddingY: "10px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "start", md: "center" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              xs: "18px",
              md: "24px",
              pb: { xs: "16px", md: "0px" },
            }}
          >
            Total Result -{" "}
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              {servicesSlug?.length ?? 0}
            </span>
          </Typography>

          <Stack direction="row" gap="10px">
            <Select
              defaultValue="uncompleted"
              size="small"
              sx={{
                width: "150px",
                height: "40px",
                color: theme?.colorConstants.darkGray,
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                bgcolor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  boxShadow:
                    "0px 2px 4px 0px #60617029, 0px 0px 1px 0px #28293D0A",
                },
              }}
              renderValue={(e: unknown) => {
                if (e === "all" || e === null || e === undefined) {
                  return `All Files`;
                } else if (e === "uncompleted") {
                  return "Uncompleted";
                } else {
                  return "Completed";
                }
              }}
              inputProps={{ "aria-label": "Without label" }}
              MenuProps={{ disableScrollLock: true }}
              onChange={(e) => {
                setRenderFileStatus(e.target.value);
              }}
              onBlur={(e) => {
                setRenderFileStatus(e.target.value);
              }}
            >
              <MenuItem
                sx={{
                  color: theme?.colorConstants.darkGray,
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                value={"all"}
              >
                All Status
              </MenuItem>

              {filterOptions?.map((item, i) => {
                return (
                  <MenuItem
                    key={i}
                    sx={{
                      color: theme?.colorConstants.darkGray,
                      fontSize: { xs: "14px", md: "16px" },
                      fontWeight: 500,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    value={item?.value}
                  >
                    {item?.label}
                  </MenuItem>
                );
              })}
            </Select>

            <TextField
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type={"text"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{<Search />}</InputAdornment>
                ),
              }}
              sx={{
                width: { xs: "100%", md: "350px" },
                bgcolor: "white",
                fontSize: "14px",
                fontWeight: 500,
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                },
              }}
              variant="outlined"
              placeholder={"Search..."}
            />
          </Stack>
        </Box>

        <GlobalTable
          tableHeaders={tableHeaders}
          tableItems={filesData}
          deleteHandler={openDeleteModal}
          updateHandler={updateHandler}
          loginUser={loginUser}
          isNavigate
        />
      </Box>

      <Box paddingX="5%">
        <Box marginY="50px">
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <GlobalButton
              onClick={() => router.back()}
              color="error"
              title="Back"
            />
            <GlobalButton
              onClick={() => {
                setSlugInfo({});
                setIsOpenDrawer(true);
                setIsOpenDrawer(true);
              }}
              title="Add New"
            />
          </Stack>
        </Box>
      </Box>

      <GlobalDrawer
        title={slugInfo?.id ? "Update Service Slug" : "Create Service Slug"}
        open={isOpenDrawer}
        setOpen={setIsOpenDrawer}
      >
        <Box marginBottom="1.5rem">
          <Typography
            sx={{
              fontSize: "2rem",
              fontWeight: 600,
            }}
          >
            Slug - {servicesSlug?.length + 1}
          </Typography>
        </Box>
        <FormProvaider
          submitHandlar={submitHandler}
          initialValues={slugInfo}
          validationSchema={validateSchema}
        >
          <Box marginTop={{ xs: "30px", md: "0px" }}>
            <FormSelectField
              options={centerOptions}
              name="center"
              label="Select IVAC Mission"
              required
              placeholder="Select IVAC Mission"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormSelectField
              options={ivacOptions}
              name="ivac"
              label="Select IVAC center"
              required
              placeholder="Select IVAC Mission"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormSelectField
              options={visaOptions}
              name="visa"
              label="Select Visa Type"
              required
              placeholder="Select Visa Type"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormInputField
              name="phone"
              label="Phone Number"
              required
              placeholder="Enter Phone Number"
            />
          </Box>

          <Box marginTop={"16px"}>
            <FormSelectField
              options={userOptions}
              name="asignUserId"
              label="Select Asignd User"
              required
              placeholder="Select User"
            />
          </Box>

          <Box marginTop="50px">
            <Stack direction="row" spacing={2} justifyContent={"center"}>
              <GlobalButton
                onClick={() => {
                  setIsOpenDrawer(false);
                  setIsOpenDrawer(false);
                  setSlugInfo({});
                }}
                color="error"
                title="Cancel"
              />

              <GlobalButton
                isLoading={createLoading || updateLoading}
                title={slugInfo?.id ? "Update" : "Create"}
                type="submit"
              />
            </Stack>
          </Box>
        </FormProvaider>
      </GlobalDrawer>

      <GlobalModal
        title=""
        info={modalInfo}
        okFn={deleteUserHandler}
        open={isOpenDeleteModal}
        setOpen={setIsOpenDeleteModal}
        loading={deleteLoading}
      />
    </Box>
  );
};

export default ClientsListing;
