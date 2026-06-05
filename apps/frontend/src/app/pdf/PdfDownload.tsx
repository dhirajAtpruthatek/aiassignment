"use client";

import { pdf, PDFViewer } from "@react-pdf/renderer";
import AssessmentDocument from "./AssessmentDocument";

export default function PdfDownload() {
     const handleDownload = async () => {
          const blob = await pdf(
               <AssessmentDocument/>
          ).toBlob();

          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");

          link.href = url;
          link.download = "assessment.pdf";

          link.click();

          URL.revokeObjectURL(url);
     };

     return (
          <>
                <button
                    onClick={handleDownload}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
               >
                    Download PDF
               </button>  
               <PDFViewer
                    style={{
                         width: "100%",
                         height: "100vh",
                    }}
               >
                    <AssessmentDocument/>
               </PDFViewer>
          </>

     );
}