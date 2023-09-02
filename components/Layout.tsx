import NavBar from "./NavBar";

export interface ChildrenProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ChildrenProps) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>      
      <style jsx global>{`
        div {
          text-align: center;
          font-size: 200%;
        }
      `}</style>
    </>
  );
};

export default Layout;
