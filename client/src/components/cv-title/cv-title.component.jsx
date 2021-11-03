import React from 'react';
import { Text, StyleSheet, View } from '@react-pdf/renderer';

const CvTitle = ({ title }) => (
  <View style={styles.title}>
    <Text style={styles.text}>{title}</Text>
    <Text style={styles.line}></Text>
  </View>
);

// Create style with font-family

const styles = StyleSheet.create({
  title: {
    display: 'flex',
    width: '100%',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: '#1a936f',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 14,
    marginRight: 10,
  },
  line: {
    borderStyle: 'solid',
    opacity: 0.2,
    flexGrow: 1,
    borderTop: 1,
  },
});

export default CvTitle;
