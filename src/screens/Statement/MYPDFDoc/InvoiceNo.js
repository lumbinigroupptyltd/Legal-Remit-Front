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
        marginTop: 6,
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
    },
    label: {
        width: 50
    },
    Addresslabel: {
        width: 120
    },
    trans_No:{
        width: 200
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
    }
    
  });


  const InvoiceNo = ({userInfo}) => (
        <Fragment>
            <View style={styles.mainInvoiceContainer}>
        <View>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.Addresslabel}>{userInfo.FullName}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.label}>Address: </Text>
                <Text style={styles.Addresslabel}>{userInfo.Address}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>Registered Date: </Text>
                <Text style={styles.noRegisterd}>{userInfo.Registered_date}</Text>
            </View >
            </View>

            <View>
            <View style={styles.invoiceNoContainer}>
                <Text style={styles.labelReg}>Issue Date:</Text>
                <Text >{userInfo.Issue_Date}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>From :</Text>
                <Text >{userInfo.Start_Date}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>To :</Text>
                <Text >{userInfo.End_Date}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>Total no. of transaction: </Text>
                <Text>{userInfo.Total_Transaction}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>Total amt. transaferred:</Text>
                <Text >{userInfo.TotalAmount}{" "}{userInfo.SendingCurruncy}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text style={styles.labelReg}>Transaction for: </Text>
                <Text >{userInfo.TransactionFor}</Text>
            </View >
            </View>
        </View>
        </Fragment>
  );
  
  export default InvoiceNo