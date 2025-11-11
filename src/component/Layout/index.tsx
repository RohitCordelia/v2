import { ReactNode } from "react";
import Header from "/src/component/Header";
import Footer from "../../components/Footer/footer";
// import { Header } from "/src/Header";
type Props = {
  children?: ReactNode;
  title?: string;
  className?: string;
  isLoading?: boolean;
  headerAnimation?: string,
  footerClassName?: string,
  showStripeHeader?: boolean,
  setShowStripeHeader?: (value: boolean) => void,
  onStripeHeightChange?: (height: number) => void,
};

const Layout = ({
  children,
  className,
  isLoading = false,
  headerAnimation,
  footerClassName,
  showStripeHeader,
  setShowStripeHeader,
  onStripeHeightChange,
}: Props) => (
  <div className={className}>
    {isLoading && (
      <div className="w-screen h-screen text-center fixed bg-black/50 z-50 pt-80">
        <div
          className="animate-ping rounded-full w-8 h-8 
            bg-white/[0.5] mx-auto absolute top-1/2 left-1/2"
        ></div>
      </div>
    )}
    <Header headerAnimation={headerAnimation} isVideo={true} showStripeHeader={showStripeHeader} setShowStripeHeader={setShowStripeHeader} onStripeHeightChange={onStripeHeightChange} />
    <div>{children}</div>
    {<Footer footerClassName={footerClassName} />}
  </div>
);

export default Layout;
