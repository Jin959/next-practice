import NavBar from "@/components/NavBar";
import type { AppProps } from "next/app";
import "../styles/globals.css";

// Next.js 는 최초로 이 컴포넌트를 두개의 Props와 함께 호출한다.
function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>{`
        div {
          text-align: center;
          font-size: 200%;
        }
      `}</style>
    </>
  );
}

export default CustomApp;
