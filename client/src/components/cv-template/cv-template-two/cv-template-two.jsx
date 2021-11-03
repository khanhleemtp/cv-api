import { Document, Page, Text, View } from '@react-pdf/renderer';
const CvTemplateTwo = () => {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Text>Template Two</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CvTemplateTwo;
