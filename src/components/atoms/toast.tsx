"use client";

import { useTranslations } from "next-intl";
import { Toast as PrimevueToast } from "primereact/toast";
import { forwardRef, useImperativeHandle, useRef } from "react";

type Props = {
  severity?: "success" | "info" | "warn" | "error";
  summary?: string;
  detail?: string;
  translate?: boolean;
};

export type ToastHandle = {
  show: (props?: Props) => void;
};

const Toast = forwardRef<ToastHandle, Props | null>((componentProps, ref) => {
  const t = useTranslations();
  const toast = useRef<PrimevueToast>(null);

  const show = (showProps?: Props) => {
    const severity = componentProps?.severity || showProps?.severity;
    let summary = componentProps?.summary || showProps?.summary;
    let detail = componentProps?.detail || showProps?.detail;

    const shouldTranslate = showProps?.translate || componentProps?.translate;

    if (severity && !summary) {
      summary = shouldTranslate ? `toast.summary.${severity}` : t(`toast.summary.${severity}`);
    }

    if (shouldTranslate) {
      summary = t(summary!);
      detail = t(detail!);
    }

    toast.current?.show({ severity, summary, detail });
  };

  useImperativeHandle(ref, () => ({ show }));

  return <PrimevueToast ref={toast} />;
});

Toast.displayName = "Toast";

export { Toast };
