"use client";

import { Suspense } from "react";
import { Box, LinearProgress } from "@mui/material";
import { useGetLoginUserQuery } from "@/lib/Redux/features/auth/authApi";
import GlobalLoader from "@/components/GlobalLoader";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/Redux/store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoading } = useGetLoginUserQuery({});

  const { user } = useAppSelector((state) => state?.auth);

  if (isLoading) return <GlobalLoader height="100vh" />;
  if (!user?.id) router.push("/login");

  return (
    <Box sx={{ display: "flex" }}>
      <Suspense fallback={<LinearProgress />}>{children}</Suspense>
    </Box>
  );
}
