import Toolbar from "../Toolbar/Toolbar.tsx";
import type {FC, PropsWithChildren} from "react";

const Layout: FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main className="container">
        {children}
      </main>
    </>
  );
};

export default Layout;