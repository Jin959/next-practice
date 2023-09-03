import NavBar from "./NavBar";

export interface ChildrenProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ChildrenProps) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>      
    </>
  );
};

export default Layout;
