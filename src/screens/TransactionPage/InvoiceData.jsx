import React from 'react'

export default function InvoiceData({UserInfo,formattedDate,TransactionDataById,ControlledNumber}) {
  return (
    <div>
       {/* <div className="row expanded my-5 d-none">
        <main className="columns">
          <div className="inner-container">
            <section className="row">
              <div className="callout large invoice-container border">
                <table className="invoice w-100">
                  <tbody className="p-4">
                    <tr className="header">
                      <td className="">
                        <img
                          src="https://dev.legalremitnepal.com.au/image/logo2.png"
                          alt="LegalRemit"
                          height={70}
                          width={170}
                        />
                      </td>
                      <td className="m-0 p-0">
                        <h3 className="mb-0 text-end pe-3 purpleText">
                          Transaction Details
                        </h3>
                      </td>
                    </tr>
                    <tr className="intro border-bottom">
                      <td className="">
                        <div className="d-flex justify-content-start">
                          <div>Tel: </div> &nbsp; <div>{UserInfo && UserInfo.phoneCode == null ? "" : UserInfo.phoneCode+UserInfo.phone}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-start">
                          <div>Email :</div> &nbsp;{" "}
                          <div>{UserInfo.email}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-start">
                          <div>ABN : </div> &nbsp; <div> 572699</div>
                        </div>
                      </td>

                      <td className="">
                        <div className="d-flex justify-content-end">
                          <div>Date: </div> &nbsp; 
                          <div>
                            {formattedDate}
                          </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div>Transaction No.: </div> &nbsp; <div> {TransactionDataById.id}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div>Customer ID: </div> &nbsp; <div> {UserInfo.customerId}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div className="purpleText d-flex">
                            Control No: </div><div className="">{ControlledNumber && ControlledNumber} </div>{" "}
                          
                        </div>
                      </td>
                    </tr>

                    <tr className="header border-bottom">
                        <td>
                      <section className="additional-info">
                        <div className="row">
                          <div className="columns">
                            <h5 className="text-info mb-3">Sender</h5>
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Name: </div> &nbsp; <div className="col-lg-6 ps-0">{UserInfo && UserInfo.fName + " " + UserInfo.mName + " " + UserInfo.lName}</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Country: </div> &nbsp; <div className="col-lg-6 ps-0">{UserInfoKyc && UserInfoKyc.countryName}</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">State: </div> &nbsp; <div className="col-lg-6 ps-0">{State}</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Address: </div> &nbsp; <div className="col-lg-6 ps-0">{UserInfoKyc && UserInfoKyc.streetName + " , " + UserInfoKyc.suburb + " , " + State }</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Contact No. : </div> &nbsp; <div className="col-lg-6 ps-0">{UserInfo && UserInfo.phoneCode + " " +UserInfo.phone}</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Email: </div> &nbsp; <div className="col-lg-6 ps-0">{UserInfo && UserInfo.email}</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Purpose: </div> &nbsp; <div className="col-lg-6 ps-0">{TransactionDataById && TransactionDataById.transferPurpose}</div>
                            </div>
                            <br />
                          </div>
                         
                        </div>
                      </section>
                        </td>
                        <td className="d-block"> 
                        <section className="additional-info">
                            <div className="row">
                            <div className="columns">
                            <h5 className="text-info mb-3">Reciever</h5>
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Name: </div> &nbsp; <div className="col-lg-6 ps-0">{ReciptionDetails.firstName != "" ? ReciptionDetails.firstName + " " + ReciptionDetails.middleName + " " + ReciptionDetails.lastName : ReciptionDetails.businessName != "" ? ReciptionDetails.businessName : ReciptionDetails.fullName != '[]' ? ReciptionDetails.fullName :""} </div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Relation: </div> &nbsp; <div className="col-lg-6 ps-0"> {ReciptionDetails.relationName} </div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Country: </div> &nbsp; <div className="col-lg-6 ps-0">{ReciptionDetails.countryName}</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Address: </div> &nbsp; <div className="col-lg-6 ps-0">{ReciptionDetails.address}</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Contact No : </div> &nbsp; <div className="col-lg-6 ps-0">{ReciptionDetails.phone}</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Method: </div> &nbsp; <div className="col-lg-6 ps-0">{ReciptionDetails.deliveryMethodName}</div>
                            </div>
                            <br />
                       
                            <br />
                          </div>
                            </div>
                            </section>
                        </td>
                    </tr>
                  

                      
                  </tbody>
                </table>
                <table className="bg-white pt-2 w-100">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th colspan="4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td className="bolder border-right" colspan="4">
                        Money To Send
                      </td>
                      <td className="item-stock">{TransactionDataById.amount}&nbsp;{TransactionDataById.sendingCurrencyCode} </td>
                    </tr>
                      <tr>
                      <td className="bolder border-right" colspan="4">
                        Money To Recieve
                      </td>
                      <td className="item-stock">{TransactionDataById.receivingAmount}&nbsp;{TransactionDataById.recevingCurrencyCode}</td>
                    </tr>
                      <tr>
                      <td className="bolder border-right" colspan="4">
                      Exchange Rate
                      </td>
                      <td className="item-stock">{TransactionDataById.exchangeRate}&nbsp;{TransactionDataById.recevingCurrencyCode}</td>
                    </tr>
                      <tr>
                      <td className="bolder border-right" colspan="4">
                      Service Charge
                      </td>
                      <td className="item-stock">{TransactionDataById.serviceCharge}&nbsp;{TransactionDataById.sendingCurrencyCode} </td>
                    </tr>
                      <tr>
                      <td className="bolder border-right" colspan="4">
                      GST
                      </td>
                      <td className="item-stock">0.00&nbsp;{TransactionDataById.sendingCurrencyCode}</td>
                    </tr>

                    
                  </tbody>
                  
                  <tfoot>
                    <tr className="text-offset border-top">
                      <td colspan="4" className="bolder border-right">Total Amount</td>
                      <td>{TransactionDataById.totalPayable}&nbsp;{TransactionDataById.sendingCurrencyCode}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div> */}
    </div>
  )
}
