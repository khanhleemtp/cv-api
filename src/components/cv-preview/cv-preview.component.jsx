import CvTemplate from './../cv-template/cv.component';
import PDFViewer from './../pdf-preview/pdf-preview.component';

const CvPreview = () => {
  return (
    <PDFViewer>
      <CvTemplate />
    </PDFViewer>
  );
};

export default CvPreview;
