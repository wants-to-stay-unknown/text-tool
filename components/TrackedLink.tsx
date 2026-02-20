"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

import { trackEvent, trackOutboundLink, type AnalyticsMeta } from "../lib/analytics";

type TrackedLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  eventName: string;
  eventProps?: AnalyticsMeta;
};

export default function TrackedLink({
  children,
  className,
  eventName,
  eventProps,
  ...props
}: TrackedLinkProps) {
  const hrefValue =
    typeof props.href === "string"
      ? props.href
      : props.href?.pathname ?? "";
  const isOutbound = hrefValue.startsWith("http");

  return (
    <Link
      {...props}
      className={className}
      onClick={() => {
        if (isOutbound) {
          trackOutboundLink(hrefValue, eventProps?.context as string | undefined);
        } else {
          trackEvent(eventName, eventProps);
        }
      }}
    >
      {children}
    </Link>
  );
}
