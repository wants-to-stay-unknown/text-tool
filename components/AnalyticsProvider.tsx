"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { initAnalytics, trackPageView } from "../lib/analytics";

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(`${window.location.origin}${url}`);
  }, [pathname, searchParams]);

  return null;
}
