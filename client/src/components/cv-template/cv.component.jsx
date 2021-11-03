import CvTemplateOne from './cv-template-one/cv-template-one.jsx';
import CvTemplateTwo from './cv-template-two/cv-template-two.jsx';

const temp = {
  one: <CvTemplateOne />,
  two: <CvTemplateTwo />,
};

const CvComponent = ({ template = 'one' }) => temp[template];

export default CvComponent;
