import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
const borderColor = '#90e5fc'
const TableCustom = ({invoiceData}) => {

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
        <Text style={[styles.header, styles.description]}>Transaction Date</Text>
        <Text style={[styles.header, styles.qty]}>Control No.</Text>
        <Text style={[styles.header, styles.rate]}>Receiver Details</Text>
        <Text style={[styles.header, styles.amount]}>Send Amount</Text>
        <Text style={[styles.header, styles.amount]}>Received Amount</Text>
        <Text style={[styles.header, styles.amount]}>Service Charge</Text>
        <Text style={[styles.header, styles.amount]}>Rate</Text>
        <Text style={[styles.header, styles.amount]}>Status</Text>
      </View>
      {invoiceData?.map((transaction, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.description}>17-2-2002 5:46:43 PM</Text>
          <Text style={styles.qty}>{transaction.controlNo}</Text>
          <Text style={styles.rate}>
            {transaction.recipientName}
            {transaction.fullName}
            {transaction.bankAccNo}
          </Text>
          <Text style={styles.amount}>{transaction.amount}</Text>
          <Text style={styles.amount}>{transaction.receivedAmount}</Text>
          <Text style={styles.amount}>{transaction.serviceCharge}</Text>
          <Text style={styles.amount}>{transaction.exchangeRate}</Text>
          <Text style={styles.amount}>{transaction.transactionStatus}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    marginTop:30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
