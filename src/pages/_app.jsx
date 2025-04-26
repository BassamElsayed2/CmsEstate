import "@/src/styles/index.scss";
import { NextIntlProvider } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import RouteLoadingProvider from "../common/RouteLoadingProvider";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();
  let messages;

  try {
    messages = require(`../locales/${locale}.json`);
  } catch (error) {
    messages = require(`../locales/en.json`); // fallback
  }

  useEffect(() => {
    document.documentElement.lang = locale; // تعيين لغة الصفحة
    document.documentElement.dir = "rtl"; // تغيير الاتجاه
  }, [locale]);

  return (
    <NextIntlProvider messages={messages} locale={locale}>
      <RouteLoadingProvider>
        <Component {...pageProps} />
      </RouteLoadingProvider>
    </NextIntlProvider>
  );
}
