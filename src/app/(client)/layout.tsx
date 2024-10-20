"use client";

import SideNav from "@/components/SideNav";
import TopNav from "@/components/TopNav";
import { Box, Drawer, LinearProgress } from "@mui/material";
import React, { Suspense, useState } from "react";
import {
  AssuredWorkload,
  BackupTable,
  BarChart,
  Groups2,
  Message,
  Settings,
} from "@mui/icons-material";
import ProtectedRouteHOC from "@/lib/ProtectedRoute";
import theme from "@/theme";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);

  const items = [
    {
      label: "Overview",
      path: "/",
      icon: <BarChart />,
    },
    {
      label: "All Clients",
      path: "/clients",
      icon: <Groups2 />,
    },
    {
      label: "Visa Files",
      path: "/visa-files",
      icon: <AssuredWorkload />,
    },
    {
      label: "Services Slug",
      path: "/service-slugs",
      icon: <BackupTable />,
    },

    {
      label: "Settings",
      path: "/settings",
      icon: <Settings />,
      subPath: [
        {
          label: "Company Setup",
          path: "/settings/company-setup",
        },
        {
          label: "User Accounts",
          path: "/settings/user-accounts",
        },
        {
          label: "SMS Setup",
          path: "/settings/sms-setup",
        },
      ],
    },
  ];

  return (
    <Box
      display="flex"
      minHeight={"100vh"}
      sx={{ bgcolor: theme.colorConstants.whitishGray }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "block" },
        }}
        width={"15%"}
        position={"fixed"}
      >
        <SideNav setOpen={setOpen} navigateItems={items} />
      </Box>

      <Box
        marginLeft={{ xs: "0px", md: "15%" }}
        width={{ xs: "100%", md: "85%" }}
      >
        <Box
          position={"fixed"}
          width={{ xs: "100%", md: "85%" }}
          zIndex={10}
          bgcolor={theme.colorConstants.whitishGray}
        >
          <TopNav setOpen={setOpen} open={open} />
        </Box>

        <Box
          zIndex={5}
          marginTop={{ xs: "70px", md: "100px" }}
          sx={{ overflow: "hidden" }}
        >
          <Suspense fallback={<LinearProgress />}>{children}</Suspense>
        </Box>
      </Box>

      <Drawer
        sx={{
          // width: "100%",
          // width: { xs: "100%", md: "15%" },
          "& .MuiDrawer-paper": {
            width: "300px",
            boxSizing: "border-box",
            "@media (min-width: 900px)": {
              // width: "100%",
            },
          },
          "@media (min-width: 900px)": {
            // width: "300px",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <SideNav setOpen={setOpen} navigateItems={items} />
      </Drawer>
    </Box>
  );
};

export default DashboardLayout;
// export default ProtectedRouteHOC(DashboardLayout);
