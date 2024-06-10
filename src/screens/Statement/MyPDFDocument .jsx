import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  invoice: {
    width: 970,
    margin: 50,
  },
  invoiceHeader: {
    padding: 25,
  },
  h1: {
    fontSize: 24,
    marginBottom: 0,
  },
  small: {
    fontSize: 14,
  },
  textMuted: {
    color: '#999',
  },
  col8: {
    flex: 8,
  },
  col4: {
    flex: 4,
  },
  media: {
    flexDirection: 'row',
  },
  mediaLeft: {
    marginRight: 10,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  mediaBody: {
    fontSize: 14,
  },
  strong: {
    fontWeight: 'bold',
  },
  invoiceBody: {
    borderRadius: 10,
    padding: 25,
    backgroundColor: '#FFF',
  },
  panel: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  col5: {
    flex: 5,
  },
  col7: {
    flex: 7,
  },
  mono: {
    fontFamily: 'monospace',
  },
  invoiceFooter: {
    padding: 15,
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
  },

});

const MyPDFDocument = () => (
  <Document>
    <Page style={styles.container}>
    <View style={styles.invoice}>
      <View style={styles.invoiceHeader}>
        <View style={styles.row}>
          <View style={styles.col8}>
            <Text style={styles.h1}>Invoice <Text style={styles.small}>With Credit</Text></Text>
            <Text style={styles.textMuted}>NO: 554775/R1 | Date: 01/01/2015</Text>
          </View>
          <View style={styles.col4}>
            <View style={styles.media}>
              <View style={styles.mediaLeft}>
                <Image
                  style={styles.logo}
                  source={{ uri: 'https://dummyimage.com/70x70/000/fff&text=ACME' }}
                />
              </View>
              <View style={styles.mediaBody}>
                <Text style={styles.strong}>Acme Corporation</Text>
                <Text>Software Development</Text>
                <Text>Field 3, Moon</Text>
                <Text>info@acme.com</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.invoiceBody}>
        {/* Company and Customer Details */}
        <View style={styles.row}>
          {/* Company Details */}
          <View style={styles.col5}>
            {/* ... */}
          </View>
          {/* Customer Details */}
          <View style={styles.col7}>
            {/* ... */}
          </View>
        </View>
        {/* Services / Products */}
        <View style={styles.panel}>
          {/* ... */}
        </View>
        {/* Total Summary */}
        <View style={styles.panel}>
          {/* ... */}
        </View>
        {/* Comments / Notes */}
        <View style={styles.row}>
          {/* ... */}
        </View>
        {/* Payment Method */}
        <View style={styles.row}>
          {/* ... */}
        </View>
      </View>
      <View style={styles.invoiceFooter}>
        <Text>Thank you for choosing our services.</Text>
        <Text>We hope to see you again soon</Text>
        <Text style={styles.strong}>~ACME~</Text>
      </View>
    </View>
    </Page>
  </Document>
);

export default MyPDFDocument;
