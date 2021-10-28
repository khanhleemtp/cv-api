import Form from './../../components/form/form';
import CvPreview from '../../components/cv-preview/cv-preview.component';

const CvEditorPage = () => {
  return (
    <div className="flex bg-gray-300 h-full flex-grow">
      <Form />
      <CvPreview />
    </div>
  );
};

export default CvEditorPage;
