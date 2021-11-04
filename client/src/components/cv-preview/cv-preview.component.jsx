import PDFViewer from './../pdf-preview/pdf-preview.component';
import CvTemplateOne from './../cv-template/cv-template-one/cv-template-one';

const CvPreview = () => {
  return (
    <PDFViewer>
      <CvTemplateOne />
    </PDFViewer>
  );
};

export default CvPreview;
