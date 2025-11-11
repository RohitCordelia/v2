import { ReactNode } from "react";
import Header from "../../components/Header/header";
import Footer from "../Footer/footer";
// import { Header } from "/src/Header";
type Props = {
  children?: ReactNode;
  title?: string;
  className?: string;
  isLoading?: boolean;
  headerAnimation?:string,
  showTopHeader?:boolean,
  showStripeHeader?: boolean,
  setShowStripeHeader?: (value: boolean) => void,
  onStripeHeightChange?: (height: number) => void,
};

const Layout = ({
  children,
  className,
  isLoading = false,
  headerAnimation,
  showTopHeader,
  showStripeHeader,
  setShowStripeHeader,
  onStripeHeightChange,
}: Props) => (
  <div className={className}>
    {isLoading && (
      <div className="w-screen h-screen text-center fixed bg-black/50 z-50 pt-80">
        {/* <svg
          className="animate-spin h-8 w-8 inline-block rounded-full border border-primary"
          viewBox="0 0 64 64"
          fill="primary"
        ></svg> */}
        <div
          className="animate-ping rounded-full w-8 h-8 
            bg-white/[0.5] mx-auto absolute top-1/2 left-1/2"
        ></div>
      </div>
    )}
    <Header showTopHeader={showTopHeader} headerAnimation={headerAnimation} showStripeHeader={showStripeHeader} setShowStripeHeader={setShowStripeHeader} onStripeHeightChange={onStripeHeightChange} />
    <div>
      {children}
    </div>
    {<Footer/>}
  </div>
);

export default Layout;
