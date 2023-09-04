import NavBar from "./NavBar";

interface ChildrenProps {
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
