"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

const protectedPaths = [
  "/me",
];

const publicPaths = [
  "/",
  "/login",
  "/register",
];

export default function RouteGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const path = (pathname || "/").split("?")[0];

    const isProtectedRoute = protectedPaths.some(
      (route) => path === route || (path.startsWith(route + "/") && route !== "/")
    );
    const isPublicRoute = publicPaths.some(
      (route) => path === route || (path.startsWith(route + "/") && route !== "/")
    );

    if (isProtectedRoute && !user) {
      router.replace("/login");
    } else if (isPublicRoute && user) {
      router.replace("/me");
    } else {
      setIsLoading(false);
    }
  }, [user, pathname, router]);

  if (isLoading) return null;
  return children;
}