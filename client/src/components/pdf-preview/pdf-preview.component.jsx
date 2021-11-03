import React, { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { pdf } from '@react-pdf/renderer';
import { useResizeDetector } from 'react-resize-detector';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ children }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const child = React.Children.only(children);

    pdf(child)
      .toBlob()
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob));
      });
  }, [children]);
  const { width, ref } = useResizeDetector();
  return (
    <div
      ref={ref}
      className="max-w-md shadow-2xl m-4 hidden md:block md:flex-grow"
    >
      <Document
        file={pdfUrl}
        loading={() => <div>Loading...</div>}
        noData={() => <div>Loading...</div>}
      >
        <Page renderMode="svg" pageNumber={1} width={width ? width : 1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
