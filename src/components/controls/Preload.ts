"use client";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

export const Preload: FC<{ url: string }> = ({ url }) => {
  const router = useRouter();

  useEffect(() => {
    console.log("Prefetching url ", url, "...");
    router.prefetch(url);
  }, [router, url]);

  return null;
};
