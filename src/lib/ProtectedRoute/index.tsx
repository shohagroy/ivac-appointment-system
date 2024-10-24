"use client";

import React, { ComponentType } from "react";
import { useRouter } from "next/navigation";
import GlobalLoader from "@/components/GlobalLoader";
import {
  useGetAllUserQuery,
  useGetLoginUserQuery,
} from "../Redux/features/auth/authApi";
import { useGetAllClientsQuery } from "../Redux/features/clients/clientApi";

export default function ProtectedRouteHOC<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  const ProtectedRoute: React.FC<P> = (props) => {
    const { data, isLoading, isFetching } = useGetLoginUserQuery({});
    const router = useRouter();

    const { isLoading: userLoading } = useGetAllUserQuery({});

    const loginUser = data?.data;

    if (isLoading || userLoading || isFetching) {
      return <GlobalLoader height="100vh" />;
    }

    if (!loginUser?.isActive || !loginUser?.id) {
      router.replace("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedRoute;
}
