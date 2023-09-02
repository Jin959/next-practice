import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "@/components/Layout";

// Next.js 는 최초로 이 컴포넌트를 두개의 Props와 함께 호출한다.
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default CustomApp;
