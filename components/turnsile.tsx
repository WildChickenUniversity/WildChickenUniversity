"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTheme } from "next-themes";

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        params: TurnstileParams
      ) => string | undefined;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };

    turnstile_renders?: Array<() => void>;
    onloadTurnstileCallback?: () => void;
  }
}

interface TurnstileParams {
  sitekey: string;
  action?: string;
  cData?: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  tabindex?: number;
}

export type TurnstileRef = {
  reset: () => void;
};

type TurnstileProps = {
  onToken: (token: string) => void;
};

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const SCRIPT_CALLBACK_NAME = "onloadTurnstileCallback";

const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(
  ({ onToken }, ref) => {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);

    useEffect(() => {
      setMounted(true);
    }, []);

    const turnstileTheme =
      (resolvedTheme || theme) === "dark" ? "dark" : "light";

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      if (!mounted) return;

      const renderWidget = () => {
        if (containerRef.current && window.turnstile) {
          if (widgetIdRef.current) {
            window.turnstile.remove(widgetIdRef.current);
          }
          const widgetId = window.turnstile.render(containerRef.current, {
            sitekey: "0x4AAAAAAB1HfSFpcR0MtEX1",
            theme: turnstileTheme,
            callback: (token: string) => {
              onToken(token);
            },
          });
          widgetIdRef.current = widgetId || null;
        }
      };

      if (window.turnstile) {
        renderWidget();
      } else {
        if (!window.turnstile_renders) {
          window.turnstile_renders = [];
          window[SCRIPT_CALLBACK_NAME] = () => {
            window.turnstile_renders?.forEach((f) => f());
            delete window.turnstile_renders;
            delete window[SCRIPT_CALLBACK_NAME];
          };
          const script = document.createElement("script");
          script.src = `${SCRIPT_URL}?onload=${SCRIPT_CALLBACK_NAME}`;
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
        }
        window.turnstile_renders.push(renderWidget);
      }

      return () => {
        // remove from queue if it's there
        if (window.turnstile_renders) {
          const index = window.turnstile_renders.indexOf(renderWidget);
          if (index !== -1) {
            window.turnstile_renders.splice(index, 1);
          }
        }
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {
            // ignore
          }
        }
      };
    }, [mounted, turnstileTheme, onToken]);

    if (!mounted) {
      return <div style={{ height: "65px", width: "300px" }} />;
    }

    return <div ref={containerRef} />;
  }
);

Turnstile.displayName = "Turnstile";

export default Turnstile;
