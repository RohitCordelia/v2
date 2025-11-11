import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ViewOnlyPDF = ({ pdfUrl }: { pdfUrl: string }) => {
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const res = await fetch(pdfUrl);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const contentType = res.headers.get("Content-Type");
        if (!contentType?.includes("application/pdf")) {
          throw new Error("File is not a PDF");
        }
        
        const blob = await res.blob();
        setFileBlob(blob);
      } catch (err) {
        console.error("Error fetching PDF", err);
      }
    };
    fetchPDF();
  }, [pdfUrl]);

  return (
    <div
      className="p-4 flex justify-center"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onSelect={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (
          (e.ctrlKey || e.metaKey) &&
          ["c", "x", "s", "p", "u", "a"].includes(e.key.toLowerCase())
        ) {
          e.preventDefault();
        }
      }}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none"
      }}
    >
      {fileBlob ? (
        <Document
          file={fileBlob}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading="Loading PDF..."
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              width={window.innerWidth > 768 ? 800 : window.innerWidth - 32}
            />
          ))}
        </Document>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewOnlyPDF;

