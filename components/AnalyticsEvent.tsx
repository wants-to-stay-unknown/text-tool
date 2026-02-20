"use client";

import { useEffect } from "react";

import { trackEvent, type AnalyticsMeta } from "../lib/analytics";

type AnalyticsEventProps = {
  event: string;
  props?: AnalyticsMeta;
};

export default function AnalyticsEvent({ event, props }: AnalyticsEventProps) {
  useEffect(() => {
    trackEvent(event, props);
  }, [event, props]);

  return null;
}
