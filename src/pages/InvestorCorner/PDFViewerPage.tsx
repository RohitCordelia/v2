import { useLocation } from "react-router-dom";
import ViewOnlyPDF from "./component/ViewOnlyPDF";

const PDFViewerPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const file = params.get("file");

  if (!file) return <p>No file provided.</p>;

  return (
    <div>
      <ViewOnlyPDF pdfUrl={file} />
    </div>
  );
};

export default PDFViewerPage;
