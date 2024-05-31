import React from 'react';
import { Page, Document, Image, StyleSheet, View } from '@react-pdf/renderer';
import InvoiceTitle from './InvoiceTitle';
import InvoiceNo from './InvoiceNo';
import TableCustom from './TableCustom';
import logo from './logo2.png';
import watermarkImage from './logo2.png'; // Import the watermark image

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 15,
    paddingLeft: 12,
    paddingRight: 12,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: 120,
    height: 50,
  },
  watermarkContainer: {
    position: 'absolute',
    top: '15%',   // Center vertically
    left: '25%',  // Center horizontally
    transform: 'translate(-50%, -50%)', // Center the watermark
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  watermarkImage: {
    objectFit: 'contain', // Use 'contain' to fit the watermark image within the container
    width: '70%',         // Adjust the width of the watermark image
    height: '70%',        // Adjust the height of the watermark image
  },

  mainLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

const Invoice = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.mainLogoContainer}>
        <Image style={styles.logo} src={logo} />
        <InvoiceTitle title="Transaction Details" />
      </View>
      <View style={styles.watermarkContainer}>
        <Image style={styles.watermarkImage} src={watermarkImage} />
      </View>
      <InvoiceNo invoice={invoice} />
      <TableCustom />
    </Page>
  </Document>
);

export default Invoice;
