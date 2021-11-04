import React from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
} from '@react-pdf/renderer';
import robotoNormal from '../../../fonts/Roboto-Regular.ttf';
import CvTitle from '../../cv-title/cv-title.component';
import CvProfile from './../../cv-pdf-profile/cv-pdf-profile.component';

const CvTemplateOne = () => {
  return (
    <Document title="LD-CV" author="LDK">
      <Page style={styles.container} size="A4">
        <View style={styles.row}>
          <View style={styles.col}>
            <CvProfile />
            <View style={styles.section}>
              <CvTitle title="Mục tiêu nghề nghiệp" />
              <View>
                <Text>
                  {`
                Khi được nhận vào công ty em mong muốn:
                + Ứng dụng kiến thức lập
                trình web đã học vào môi trường làm việc thực tế. 
                + Thu thập kiến
                thức mới, mong được học hỏi từ công ty để phát triển bản thân cũng
                như làm việc ở công ty sau này.
                + Muốn phát triển theo hướng
                full-stack. 
                + Trải nghiệm môi trường làm việc chuyên nghiệp.
                  `}
                </Text>
              </View>
            </View>
            <View>
              <CvTitle title="Người tham chiếu" />
              <View>
                <Text>
                  {`
              Anh: LDK - Trưởng phòng Maketing
              Công ty: Top CV
              Điện thoại: 0914078960
                  `}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.section}>
              <CvTitle title="Học Vấn" />
              <View>
                <Text>10/2017 - Hiện tại</Text>
                <Text style={styles.s1}>Đại học Bách Khoa Hà Nội</Text>
                <Text style={styles.s2}>Chuyên ngành: Công nghệ thông tin</Text>
                <Text>CPA: 2.5</Text>
              </View>
            </View>
            <View style={styles.section}>
              <CvTitle title="KINH NGHIỆM LÀM VIỆC" />
              <View>
                <View>
                  <Text>10/2017 - Hiện tại</Text>
                  <Text style={styles.s1}>Đại học Bách Khoa Hà Nội</Text>
                  <Text style={styles.s2}>Game Ma Sói</Text>
                  <Text>{`
                Front-end: Reactjs
                Back-end: Nodejs
                Database: Mongodb
                Github: https://github.com/khanhleemtp/ld_game
                `}</Text>
                </View>
                <View>
                  <Text>10/2017 - Hiện tại</Text>
                  <Text style={styles.s1}>Đại học Bách Khoa Hà Nội</Text>
                  <Text style={styles.s2}>
                    Làm trang web quiz app: https://five-animals.herokuapp.com/
                  </Text>
                  <Text>{`
                  Front-end: Reactjs.
                  Back-end: Nodejs.
                  Github: https://github.com/khanhleemtp/animals-quiz-app
                `}</Text>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <CvTitle title="Hoạt động" />
              <View>
                <Text>10/2017 - Hiện tại</Text>
                <Text style={styles.s2}>Vị trí tham gia: Sinh Viên</Text>
                <Text>Sự kiện: SOICT Innovation 2019</Text>
              </View>
            </View>
            <View style={styles.section}>
              <CvTitle title="Chứng chỉ" />
              <View>
                <Text style={styles.s3}>Giải nhất Tài năng TOPCV</Text>
                <Text style={styles.s2}>2013</Text>
              </View>
            </View>
            <View style={styles.section}>
              <CvTitle title="Giải thưởng" />
              <View>
                <Text style={styles.s3}>
                  Nhân viên xuất sắc năm công ty TOPCV
                </Text>
                <Text style={styles.s2}>2014</Text>
              </View>
            </View>
            <View style={styles.section}>
              <CvTitle title="Thông tin thêm" />
              <View>
                <Text>
                  Khi xin vào công ty em mong muốn được học hỏi, phát triển bản
                  thân và làm việc ở công ty sau này
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

Font.register({
  family: 'Roboto',
  src: robotoNormal,
  fontWeight: 'normal',
});

// Create style with font-family

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 65,
    paddingHorizontal: 30,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#666',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    width: '48%',
  },
  name: {
    fontSize: 24,
    marginVertical: 10,
    color: '#1a936f',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    border: 2,
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1a936f',
  },
  contact: {
    display: 'flex',
    width: '100%',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 14,
    marginRight: 16,
    fontWeight: 'extrabold',
  },
  line: {
    borderTop: 1,
    borderStyle: 'solid',
    borderColor: '#1a936f',
    flexGrow: 1,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  section: {
    marginBottom: 10,
  },
  s1: {
    fontSize: 13,
    color: '#1a936f',
    fontWeight: 'bold',
  },
  s2: {
    fontWeight: 'bold',
  },
  s3: {
    color: '#1a936f',
  },
});

export default CvTemplateOne;
