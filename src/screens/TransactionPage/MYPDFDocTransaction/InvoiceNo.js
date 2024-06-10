import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        // width: 50
    },
    Addresslabel: {
        // width: 120
    },
    trans_No:{
        // width: 200
    },
    labelReg:{
        paddingRight:3
        // marginLeft:'auto'
    },
    mainInvoiceContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderTop:1
    },
    noRegisterd:{
        flex:1
    },
    tel:{
        flex:1
    }
    
  });


  const InvoiceNo = ({invoice}) => (
        <Fragment>
            <View style={styles.mainInvoiceContainer}>
        <View>
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.tel}>Tel: </Text>
                <Text >+610415168551</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Email: </Text>
                <Text style={styles.Addresslabel}>xyz@yopmail.com</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>ABN: </Text>
                <Text style={styles.noRegisterd}>682678</Text>
            </View >
            </View>

            <View>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.labelReg}>Date:</Text>
                <Text >2019-10-12</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>Transaction No :</Text>
                <Text >201</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>Customer ID:</Text>
                <Text >2031</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>Control No:  </Text>
                <Text>LR979319</Text>
            </View >
    
            </View>
        </View>
        </Fragment>
  );
  
  export default InvoiceNo