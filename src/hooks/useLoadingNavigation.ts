import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useLoadingNavigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const body = document.querySelector("body");

    const handleStart = () => {
      if (body) body.style.overflow = "hidden";
      setIsLoading(true);
    };
    const handleComplete = () => {
      if (body) body.style.overflow = "auto";
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return { isLoading };
};
