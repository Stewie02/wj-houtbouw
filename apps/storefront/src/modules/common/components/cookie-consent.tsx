"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";

const PIXEL_ID =
  process.env.NODE_ENV === "production"
    ? "888628420227307"
    : "1538987397892937";
const CONSENT_KEY = "wj_marketing_cookie_consent";

interface ConsentPreferences {
  version: 1;
  marketing?: boolean;
}

export default function CookieConsent() {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(
    null
  );
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const prevPreferencesRef = useRef<ConsentPreferences | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    try {
      setPreferences(stored ? JSON.parse(stored) : null);
    } catch {
      setPreferences(null);
    }
    setMounted(true);
  }, []);

  // Fire PageView on navigation; skip when consent just changed (script handles initial PageView)
  useEffect(() => {
    if (!preferences?.marketing) {
      prevPreferencesRef.current = preferences;
      return;
    }
    const prevPreferences = prevPreferencesRef.current;
    prevPreferencesRef.current = preferences;
    if (!prevPreferences?.marketing) return;
    window.fbq?.("track", "PageView");
  }, [pathname, preferences]);

  const accept = () => {
    const newPreferences: ConsentPreferences = {
      version: 1,
      marketing: true,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newPreferences));
    setPreferences(newPreferences);
  };

  const reject = () => {
    const newPreferences: ConsentPreferences = {
      version: 1,
      marketing: false,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newPreferences));
    setPreferences(newPreferences);
  };

  if (!mounted) return null;

  return (
    <>
      {preferences?.marketing && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
          >{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}</Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
      {(preferences === null || preferences?.marketing === undefined) && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-wj-border bg-wj-white shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="font-body text-[14px] text-wj-muted leading-[1.6] flex-1">
              We gebruiken noodzakelijke cookies om de website goed te laten
              werken. Met jouw toestemming gebruiken we daarnaast
              marketingcookies. Lees meer in ons{" "}
              <LocalizedClientLink
                href="/cookiebeleid"
                className="text-wj-green underline hover:text-wj-text transition-colors"
              >
                cookiebeleid
              </LocalizedClientLink>
              .
            </p>
            <div className="flex gap-3 shrink-0">
              <BrandButton variant="outline" size="sm" onClick={reject}>
                Alleen noodzakelijk
              </BrandButton>
              <BrandButton size="sm" onClick={accept}>
                Alles accepteren
              </BrandButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function ConsentResetButton() {
  const reset = useCallback(() => {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  }, []);

  return (
    <button
      onClick={reset}
      className="font-body text-[15px] text-wj-green underline hover:text-wj-text transition-colors"
    >
      Cookie-instellingen wijzigen
    </button>
  );
}
