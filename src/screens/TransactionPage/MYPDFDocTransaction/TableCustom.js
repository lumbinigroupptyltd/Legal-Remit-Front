import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
const borderColor = '#90e5fc'
const TableCustom = () => {
  const transactions = [
    {
      transactionDate: '2023-08-10 10:00',
      controlNo: '123456',
      receiverDetails: 'John Doe',
      sendAmount: '$100',
      receivedAmount: '$95',
      serviceCharge: '$5',
      rate: '1 USD = 0.95 EUR',
      status: 'Completed',
    },
    {
        transactionDate: '2023-08-10 10:00',
        controlNo: '123456',
        receiverDetails: 'John Doe',
        sendAmount: '$100',
        receivedAmount: '$95',
        serviceCharge: '$5',
        rate: '1 USD = 0.95 EUR',
        status: 'Completed',
      },
      {
        transactionDate: '2023-08-10 10:00',
        controlNo: '123456',
        receiverDetails: 'John Doe',
        sendAmount: '$100',
        receivedAmount: '$95',
        serviceCharge: '$5',
        rate: '1 USD = 0.95 EUR',
        status: 'Completed',
      },
      {
        transactionDate: '2023-08-10 10:00',
        controlNo: '123456',
        receiverDetails: 'John Doe',
        sendAmount: '$100',
        receivedAmount: '$95',
        serviceCharge: '$5',
        rate: '1 USD = 0.95 EUR',
        status: 'Completed',
      },
      {
        transactionDate: '2023-08-10 10:00',
        controlNo: '123456',
        receiverDetails: 'John Doe',
        sendAmount: '$100',
        receivedAmount: '$95',
        serviceCharge: '$5',
        rate: '1 USD = 0.95 EUR',
        status: 'Completed',
      },
      {
        transactionDate: '2023-08-10 10:00',
        controlNo: '123456',
        receiverDetails: 'John Doe',
        sendAmount: '$100',
        receivedAmount: '$95',
        serviceCharge: '$5',
        rate: '1 USD = 0.95 EUR',
        status: 'Completed',
      },
    // Add more transaction data here
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.header, styles.description]}>Description</Text>
        <Text style={[styles.header, styles.qty]}></Text>

      </View>
     
        <View style={styles.row} >
          <Text style={styles.description}>Money To Send</Text>
          <Text style={styles.qty}>170 AUD</Text>
        </View>
        <View style={styles.row} >
          <Text style={styles.description}>Money To Recieve </Text>
          <Text style={styles.qty}>8683.65 NPR</Text>
        </View>
        <View style={styles.row} >
          <Text style={styles.description}>Exchange Rate </Text>
          <Text style={styles.qty}>86.8365 NPR</Text>
        </View>
        <View style={styles.row} >
          <Text style={styles.description}>Service Charge </Text>
          <Text style={styles.qty}>0.7 AUD</Text>
        </View>
        <View style={styles.row} >
          <Text style={styles.description}>GST</Text>
          <Text style={styles.qty}>0.00 AUD</Text>
        </View>
        <View style={styles.row1} >
          <Text style={styles.description}>Total Amount</Text>
          <Text style={styles.qty}>170.7 AUD</Text>
        </View>
        
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    marginTop:30
  },
  row1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderColor: '#ccc',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems:'center',
    fontWeight: 'bold',
    backgroundColor:'#F7EAFC',
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:8,
  },
  description: {
    flex: 2,
    paddingLeft:8,
  },
  qty: {
    flex: 1,
  },
  rate: {
    flex: 2,
  },
  amount: {
    flex: 1,
  },
});

export default TableCustom;
