import { Text, StyleSheet, Image, View } from '@react-pdf/renderer';
import CvTitle from '../cv-title/cv-title.component';

const ContactItem = ({ src, info }) => (
  <View style={styles.contactItem}>
    <View style={styles.iconContainer}>
      <Image style={styles.icon} src={src} />
    </View>
    <Text style={styles.contactInfo}>{info}</Text>
  </View>
);

const CvProfile = () => (
  <View style={styles.contactContainer}>
    <View style={styles.avatarContainer}>
      <View style={styles.avatar}>
        <Image
          style={styles.image}
          src="data:image/jpeg;base64,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"
        />
      </View>
      <View style={styles.name}>
        <Text>Lê Đình Khánh</Text>
      </View>
      <View
        style={{
          fontSize: 12,
          marginBottom: 10,
          opacity: 0.6,
        }}
      >
        <Text>Front-end Developer</Text>
      </View>
    </View>
    <CvTitle title="Thông tin liên hệ" />
    <ContactItem src="assets/icons/calendar-green.jpg" info="08/10/1998" />
    <ContactItem src="assets/icons/user-green.jpg" info="Nam" />
    <ContactItem src="assets/icons/phone-green.jpg" info="0914078960" />
    <ContactItem
      src="assets/icons/mail-green.jpg"
      info="khanhk62hust@gmail.com"
    />
    <ContactItem
      src="assets/icons/location-green.jpg"
      info="Ngõ 254D  Minh Khai, Hà Nội"
    />
    <ContactItem
      src="assets/icons/link-green.jpg"
      info="https://www.facebook.com/khanh.lee.3958"
    />
  </View>
);

// Create style with font-family

const styles = StyleSheet.create({
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
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
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Roboto',
    marginVertical: 10,
    color: '#1a936f',
  },
  contactItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  contactInfo: {
    fontSize: 12,
    marginLeft: 6,
    color: '#666666',
  },
  iconContainer: {
    width: 20,
    height: 20,
    border: 1,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#1a936f',
  },
  icon: {
    width: 12,
    height: 12,
  },
});

export default CvProfile;
