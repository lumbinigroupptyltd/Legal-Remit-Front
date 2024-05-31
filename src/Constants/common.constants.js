// const base_url = 'http://testapi.gvmtechnologies.com:8080';
// const newbase_url = 'http://testapi.gvmtechnologies.com:8081';
// const newbase_url2 = 'http://testapi.gvmtechnologies.com:8082';
// const newbase_url3 = 'http://testapi.gvmtechnologies.com:8083';
// const chat_base_url = 'http://testapi.gvmtechnologies.com:8084';
// const imageUrl = 'http://testapi.gvmtechnologies.com:8080/downloadFile/payment_method/payment_method_1683709636067.png'


const base_url = 'https://core.dev.legalremit.com';
const newbase_url = 'https://transaction.dev.legalremit.com';
const newbase_url2 = 'https://compliance.dev.legalremit.com';
const newbase_url3 = 'https://accounting.legalremit.xyz';
const chat_base_url = 'https://chat.dev.legalremit.com';
const imageUrl = 'https://core.dev.legalremit.com/downloadFile/payment_method/payment_method_1683709636067.png';

//Google API email Authantication Start
// const CLIENT_ID = '70271022962-vclajnhvde7gr2ssj9tn2sv0oi6anu0k.apps.googleusercontent.com'
// const CLIENT_KEY = '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'
//Google API Ends

//Google Scope Start
const SCOPE =
  'https://mail.google.com https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.other.readonly'
//Google Scope End

// redirect url start
// const REDIRECT_URL="http://localhost:3000/email_account/AuthCallback"
// redirect url end

// redirect url start
const HomePage = 'http://localhost:5000/#/home'
const LoginPage = 'http://localhost:5000/#/login'
// const WebScoketURL = "http://localhost:8080/ws"
const WebScoketURL = chat_base_url + '/ws'
// redirect url end

const MaxSendingAmt = 10000

export const CommonConstants = {
  BASE_URL: base_url,
  NEW_BASE_URL: newbase_url,
  NEW_BASE_URL2: newbase_url2,
  NEW_BASE_URL3: newbase_url3,
  SCOPE: SCOPE,
  HomePage: HomePage,
  LoginPage: LoginPage,
  Title: ' | Legal Remit', //Title of page
  api_key: '7c261633d2-0d7fbcc486-rqgviv',
  show_rows: [3, 10, 20, 50, 100],
  DefaultPageSize: 50,
  minMarkup: 0.9,
  standardMarkup: 1.5,
  ImagUrl: imageUrl,
  WebScoketURL: WebScoketURL,
  ChatBaseUrl: chat_base_url,
  maxSendingAmount: MaxSendingAmt
}

export const Option = [
  { value: 1, name: 'Amount threshold' },
  { value: 2, name: 'Number of transaction' },
  { value: 3, name: 'Number of active recipients' }
]
export const ReportingFraud = [
  { value: 'option1', name: 'Who is reporting fraud' },
  { value: 'Sender', name: 'Sender' },
  { value: 'Receiver', name: 'Receiver' },
  {
    value: '3rd Party on Behalf of Sender',
    name: '3rd Party on Behalf of Sender'
  },
  {
    value: '3rd Party on Behalf of Receiver',
    name: '3rd Party on Behalf of Receiver'
  }
]

export const NumberOfDays = [
  { value: 1, name: 1 },
  { value: 7, name: 7 },
  { value: 30, name: 30 },
  { value: 90, name: 90 },
  { value: 180, name: 180 },
  { value: 365, name: 365 }
]

export const Types = [
  { value: 1, name: 'An inactive user for more than 90 days' },
  { value: 2, name: 'Inactive users for more than 180  days' },
  { value: 3, name: 'Inactivate user for more than 365 days' },
  { value: 4, name: 'KYC Incompleted more than 14 Days' },
  {
    value: 5,
    name: 'KYC completed but transaction not done more than 60 days'
  },
  { value: 6, name: 'Regarding Transaction' },
  { value: 7, name: 'Regarding Signup' }
]

export const DataTypes = [
  { value: 1, name: 'For inactive users (more than 90 days)' },
  { value: 2, name: 'For inactive users (more than 180 days)' },
  { value: 3, name: 'For inactive users (more than 365 days)' },
  { value: 4, name: 'For KYC incomplete users (more than 14 days)' },
  {
    value: 5,
    name: 'For KYC completed but No Transaction (more than 60 days)'
  },
  { value: 6, name: 'Regarding Transaction' },
  { value: 7, name: 'Regarding Signup' }
]

export const TransactionStatus = [
  { value: 1, name: 'Draft' },
  { value: 2, name: 'Confirmed' },
  { value: 3, name: 'Unconfirmed' },
  { value: 4, name: 'Processing' },
  { value: 5, name: 'Compliance Hold' },
  { value: 6, name: 'Pending' },
  { value: 7, name: 'Delivered' },
  { value: 8, name: 'Cancelled' },
  { value: 9, name: 'Refunded' }
]
export const Config = [
  { value: 'AC Name', name: 'AC Name' },
  { value: 'BSB', name: 'BSB' },
  { value: 'AC No', name: 'AC No' },
  { value: 'PayID Name', name: 'PayID Name' },
  { value: 'PayID', name: 'PayID' }
]
