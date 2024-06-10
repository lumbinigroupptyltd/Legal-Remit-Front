import React from "react";
import { nanoid } from "nanoid";

const Dashboard = React.lazy(() => import("../screens/Dashbord/Dashbord"));
const CreatePaymentMethods = React.lazy(() => import("../screens/Dashbord/Settings/CreatePaymentMethods/CreatePaymentMethods"));
const UpdatePaymentMethods = React.lazy(() => import("../screens/Dashbord/Settings/UpdatePaymentMethods/UpdatePaymentMethods"));
const FileManagerDashboard = React.lazy(() => import("../screens/FileManager/FileManagerDashboard"));
const AddPoints = React.lazy(() => import("../screens/Dashbord/Rewards/RewardsForms/AddPoints"));
const Users = React.lazy(() => import("../screens/Dashbord/Users"));
const AppInbox = React.lazy(() => import("../screens/App/Inbox"));
const AppChat = React.lazy(() => import("../screens/App/Chat"));
const AppCalendar = React.lazy(() => import("../screens/App/Calendar"));
const AppContact = React.lazy(() => import("../screens/App/Contact"));
const AppTaskbar = React.lazy(() => import("../screens/App/Taskbar"));
const Filedocuments = React.lazy(() => import("../screens/FileManager/Documents"));
const Filemedia = React.lazy(() => import("../screens/FileManager/Media"));
const Fileimages = React.lazy(() => import("../screens/FileManager/Images"));
const BlognewPost = React.lazy(() => import("../screens/Blog/NewPost"));
const Blogdetails = React.lazy(() => import("../screens/Blog/BlogDetails"));
const Bloglist = React.lazy(() => import("../screens/Blog/BlogList"));
const Uitypography = React.lazy(() => import("../screens/UIElements/Typography"));
const Uitabs = React.lazy(() => import("../screens/UIElements/Tabs"));
const Uibuttons = React.lazy(() => import("../screens/UIElements/Button"));
const Bootstrapui = React.lazy(() => import("../screens/UIElements/BootstrapUI"));
const Uiicons = React.lazy(() => import("../screens/UIElements/Icons"));
const Uinotifications = React.lazy(() => import("../screens/UIElements/Notifications"));
const Uicolors = React.lazy(() => import("../screens/UIElements/Colors"));
const Uilistgroup = React.lazy(() => import("../screens/UIElements/ListGroup"));
const Uimediaobject = React.lazy(() => import("../screens/UIElements/MediaObject"));
const Uimodal = React.lazy(() => import("../screens/UIElements/Modals"));
const Uiprogressbar = React.lazy(() => import("../screens/UIElements/ProgressBar"));
const Widgetsdata = React.lazy(() => import("../screens/Widgets/Data"));
const Widgetsweather = React.lazy(() => import("../screens/Widgets/Weather"));
const Widgetsblog = React.lazy(() => import("../screens/Widgets/Blog"));
const Widgetsecommers = React.lazy(() => import("../screens/Widgets/ECommers"));
const Blankpage = React.lazy(() => import("../screens/Pages/BlankPage"));
const Profilev1page = React.lazy(() => import("../screens/Pages/ProfileV1"));
const Profilev2page = React.lazy(() => import("../screens/Pages/ProfileV2"));
const Imagegalleryprofile = React.lazy(() => import("../screens/Pages/ImageGallery"));
const Timeline = React.lazy(() => import("../screens/Pages/TimeLine"));
const Pricing = React.lazy(() => import("../screens/Pages/Pricing"));
const Invoices = React.lazy(() => import("../screens/Pages/Invoices"));
const Invoicesv2 = React.lazy(() => import("../screens/Pages/InvoicesV2"));
const Searchresult = React.lazy(() => import("../screens/Pages/SearchResults"));
const Helperclass = React.lazy(() => import("../screens/Pages/HelperClass"));
const Teamsboard = React.lazy(() => import("../screens/Pages/TeamsBoard"));
const Projectslist = React.lazy(() => import("../screens/Pages/ProjectsList"));
const Testimonials = React.lazy(() => import("../screens/Pages/Testimonials"));
const Faqs = React.lazy(() => import("../screens/Pages/Faqs"));
const Formvalidation = React.lazy(() => import("../screens/Forms/FormValidation"));
const Basicelements = React.lazy(() => import("../screens/Forms/BasicElements"));
const Tablenormal = React.lazy(() => import("../screens/Tables/TableNormal"));
const Echart = React.lazy(() => import("../screens/Charts/Echart"));
const Leafletmap = React.lazy(() => import("../screens/Maps/GoogleMaps"));
const Chat = React.lazy(() => import("../screens/Dashbord/Chat"));
const FlightEnquiry = React.lazy(() => import("../screens/Dashbord/FlightEnquiry"));
const Promocode = React.lazy(() => import("../screens/Dashbord/Promocode"));
const ExchangeRate = React.lazy(() => import("../screens/Dashbord/ExchangeRate"));
const IndividualUser = React.lazy(() => import("../screens/Dashbord/IndividualUser"));
const Demo = React.lazy(() => import("../screens/Dashbord/Demo/Demo"));
const Info = React.lazy(() => import("../screens/Dashbord/Info"));
const ExchangeRateForm = React.lazy(() => import("../screens/Dashbord/ExchangeRateForm"));
const DeliveryMethod = React.lazy(() => import("../screens/Dashbord/Settings/DeliveryMethods/DeliveryMethod"));
const DeliveryMethodCreate = React.lazy(() => import("../screens/Dashbord/Settings/DeliveryMethods/DeliveryMethodCreate"));
const ServiceCharge = React.lazy(() => import("../screens/Dashbord/ServiceCharge"));
const CreateServiceCharge = React.lazy(() => import("../screens/Dashbord/CreateServiceCharge"));
const IdIssuingAuthority = React.lazy(() => import("../screens/Dashbord/Settings/IdIssuingAuthority/IdIssuingAuthority"));
const CreateIdIssuingAuthority = React.lazy(() => import("../screens/Dashbord/Settings/CreateIdIssuingAuthority/CreateIdIssuingAuthority"));
const PartnerBank = React.lazy(() => import("../screens/Dashbord/PartnerBank/PartnerBank"));
const CreatePartnerBank = React.lazy(() => import("../screens/Dashbord/CreatePartnerBank/CreatePartnerBank"));
const PaymentMethods = React.lazy(() => import("../screens/Dashbord/Settings/PaymentMethods/PaymentMethods"));
const CountrySettings = React.lazy(() => import("../screens/Dashbord/Settings/CountrySettings/CountrySettings"));
const RiskManagement = React.lazy(() => import("../screens/Dashbord/Compliance/RiskManagement/RiskManagement"));
const CreateRiskManagement = React.lazy(() => import("../screens/Dashbord/Compliance/RiskManagement/CreateRiskManagement"));
const Recievers = React.lazy(() => import("../screens/Dashbord/Recievers/Recievers"));
const NotificationTemplate = React.lazy(() => import("../screens/Dashbord/NotificationTemplate/NotificationTemplate"));
const NotificationTemplateCreate = React.lazy(() => import("../screens/Dashbord/NotificationTemplate/NotificationTemplateCreate"));
const Compliance = React.lazy(() => import("../screens/Dashbord/Compliance/Compliance"));
const Rewards = React.lazy(() => import("../screens/Dashbord/Rewards/Rewards"));
const Accounts = React.lazy(() => import("../screens/Dashbord/Accounts/Accounts"));
const Agents = React.lazy(() => import("../screens/Dashbord/Agents/Agents"));
const PayoutPartner = React.lazy(() => import("../screens/Dashbord/Settings/PayoutPartner/PayoutPartner"));
const PurposeOfTransfer = React.lazy(() => import("../screens/Dashbord/Settings/PurposeOfTransfer/PurposeOfTransfer"));
const Relation = React.lazy(() => import("../screens/Dashbord/Settings/Relation/Relation"));
const Occupation = React.lazy(() => import("../screens/Dashbord/Settings/Occupation/Occupation"));
const TypeOfID = React.lazy(() => import("../screens/Dashbord/Settings/TypeOfID/TypeOfID"));
const CreateTypeOfID = React.lazy(() => import("../screens/Dashbord/Settings/TypeOfID/CreateTypeOfID"));
const SendMoneyForms = React.lazy(() => import("../screens/Dashbord/Settings/SendMoneyForms/SendMoneyForms"));
const UtilityServiceTransaction = React.lazy(() => import("../screens/Dashbord/UtilityServiceTransaction/UtilityServiceTransaction"));
const ReportedFund = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/ReportedFund/ReportedFund"));
const Complaints = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/Complaints/Complaints"));
const DeviceInfo = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/DeviceInfo/DeviceInfo"));
const Reviews = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/Reviews/Reviews"));
const ApiLogs = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/ApiLogs/ApiLogs"));
const Refunds = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/Refunds/Refunds"));
const CountrySettingList = React.lazy(() => import("../screens/Dashbord/Settings/CountrySettings/CountrySettingList"));
const DeliveryMethodList = React.lazy(() => import("../screens/Dashbord/Settings/DeliveryMethods/DeliveryMethodList"));
const AddDeliveryType = React.lazy(() => import("../screens/Dashbord/Settings/DeliveryMethods/AddDeliveryType"));
const PaymentType = React.lazy(() => import("../screens/Dashbord/Settings/PaymentMethods/PaymentType"));
const AddPaymenttype = React.lazy(() => import("../screens/Dashbord/Settings/PaymentMethods/AddPaymenttype"));
const SendMoneyFormsCreate = React.lazy(() => import("../screens/Dashbord/Settings/SendMoneyForms/SendMoneyFormsCreate"));
const TransactionViewPage = React.lazy(() => import("../screens/Dashbord/TransactionUtility/TransactionViewPage/TransactionViewPage"));
const UserTransactionView = React.lazy(() => import("../screens/Dashbord/UserTransactionView"));
const TransactionInvoice = React.lazy(() => import("../screens/Dashbord/TransactionUtility/TransactionInvoice/TransactionInvoice"));
const AddAccounts = React.lazy(() => import("../screens/Dashbord/Accounts/AddAccounts/AddAccounts"));
const ChatScreen = React.lazy(() => import("../screens/Dashbord/ChatScreen/ChatScreen"));
const TableResponsive = React.lazy(() => import("../screens/Dashbord/TransactionUtility/TableResponsive/TableResponsive"));
const KycFormManagement = React.lazy(() => import("../screens/Dashbord/Settings/KYC/KycFormManagement/KycFormManagement"));
const ContactUs = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/ConatctUs/ContactUs"));
const FAQContent = React.lazy(() => import("../screens/Dashbord/SiteContent/FAQContent/FAQContent"));
const AddFAQContent = React.lazy(() => import("../screens/Dashbord/SiteContent/FAQContent/AddFAQContent/AddFAQContent"));
const CMSManagement = React.lazy(() => import("../screens/Dashbord/SiteContent/CMSManagement/CMSManagement"));
const EditCMSPage = React.lazy(() => import("../screens/Dashbord/SiteContent/CMSManagement/EditCMSPage/EditCMSPage"));
const AboutUSContent = React.lazy(() => import("../screens/Dashbord/SiteContent/AboutUSContent/AboutUSContent"));
const EditAboutUSContentPage = React.lazy(() => import("../screens/Dashbord/SiteContent/AboutUSContent/EditAboutUSContentPage/EditAboutUSContentPage"));
const OurAgents = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/OurAgents/OurAgents"));
const AgentsDetails = React.lazy(() => import("../screens/Dashbord/Agents/AgentDetails/AgentDetails"));
const BlogsManagement = React.lazy(() => import("../screens/Dashbord/SiteContent/BlogsManagement/BlogsManagement"));
const EditBlogsManagement = React.lazy(() => import("../screens/Dashbord/SiteContent/BlogsManagement/EditBlogsManagement/EditBlogsManagement"));
const CareerManagement = React.lazy(() => import("../screens/Dashbord/SiteContent/CareerManagement/CareerManagement"));
const ViewCareerManagement = React.lazy(() => import("../screens/Dashbord/SiteContent/CareerManagement/ViewCareerManagement/ViewCareerManagement"));
const EditReviews = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/Reviews/EditReviews/EditReviews"));
const NewsPage = React.lazy(() => import("../screens/Dashbord/SiteContent/NewsPage/NewsPage"));
const AddCareerManagement = React.lazy(() => import("../screens/Dashbord/SiteContent/CareerManagement/AddCareerManagement"));
const Conference = React.lazy(() => import("../screens/Dashbord/Calls/Conference"));
const Notification = React.lazy(() => import("../screens/Dashbord/Notifications/Notification"));
const Configuration = React.lazy(() => import("../screens/Dashbord/SiteContent/Configuration/Configuration"));
const AddUpdateConfig = React.lazy(() => import("../screens/Dashbord/SiteContent/Configuration/AddUpdateConfig"));
const CancelTransactions = React.lazy(() => import("../screens/Dashbord/AdditionalSettings/CancelTransactions/CancelTransactions"));

const DashboardRoutes = [
  {
    id: nanoid(),
    path: "dashboard",
    name: "Dashboard",
    component: <Dashboard />,
  },
  {
    id: nanoid(),
    path: "kycfrommangement",
    name: "kycfrommangement",
    component: <KycFormManagement />,
  },
  {
    id: nanoid(),
    path: "users",
    name: "Users",
    component: <Users />,
  },
  {
    id: nanoid(),
    path: "deliveryMethod",
    name: "deliveryMethod",
    component: <DeliveryMethod />,
  },
  {
    id: nanoid(),
    path: "deliveryMethodCreate",
    name: "DeliveryMethodCreate",
    component: <DeliveryMethodCreate />,
  },
  {
    id: nanoid(),
    path: "individualuser",
    name: "IndividualUser",
    component: <IndividualUser />,
  },
  {
    id: nanoid(),
    path: "info",
    name: "Info",
    component: <Info />,
  },
  {
    id: nanoid(),
    path: "demo",
    name: "Demo",
    component: <Demo />,
  },
  {
    id: nanoid(),
    path: "chat",
    name: "Chat",
    component: <Chat />,
  },
  {
    id: nanoid(),
    path: "reciever",
    name: "Reciever",
    component: <Recievers />,
  },
  {
    id: nanoid(),
    path: "notifications",
    name: "Notifications",
    component: <Notification />,
  },
  {
    id: nanoid(),
    path: "transaction-utility",
    name: "transaction-utility",
    component: <TableResponsive />,
  },
  {
    id: nanoid(),
    path: "transaction-view",
    name: "transaction-view",
    component: <TransactionViewPage />,
  },
  {
    id: nanoid(),
    path: "user-transaction-view",
    name: "user-transaction-view",
    component: <UserTransactionView />,
  },
  {
    id: nanoid(),
    path: "compliance",
    name: "compliance",
    component: <Compliance />,
  },
  {
    id: nanoid(),
    path: "transaction-invoice",
    name: "transaction-invoice",
    component: <TransactionInvoice />,
  },
  {
    id: nanoid(),
    path: "rewards",
    name: "rewards",
    component: <Rewards />,
  },
  {
    id: nanoid(),
    path: "agents",
    name: "agents",
    component: <Agents />,
  },
  {
    id: nanoid(),
    path: "accounts",
    name: "accounts",
    component: <Accounts />,
  },
  {
    id: nanoid(),
    path: "add-accounts",
    name: "add-accounts",
    component: <AddAccounts />,
  },
  {
    id: nanoid(),
    path: "flight-enquiry",
    name: "flight-enquiry",
    component: <FlightEnquiry />,
  },
  {
    id: nanoid(),
    path: "exchange-rate",
    name: "exchange-rate",
    component: <ExchangeRate />,
  },
  {
    id: nanoid(),
    path: "id-issuing-authority",
    name: "id-issuing-authority",
    component: <IdIssuingAuthority />,
  },
  {
    id: nanoid(),
    path: "create-id-issuing-authority",
    name: "create-id-issuing-authority",
    component: <CreateIdIssuingAuthority />,
  },
  {
    id: nanoid(),
    path: "service-charge",
    name: "service-charge",
    component: <ServiceCharge />,
  },
  {
    id: nanoid(),
    path: "create-service-charge",
    name: "create-service-charge",
    component: <CreateServiceCharge />,
  },
  {
    id: nanoid(),
    path: "partner-bank",
    name: "partner-bank",
    component: <PartnerBank />,
  },
  {
    id: nanoid(),
    path: "create-partner-bank",
    name: "create-partner-bank",
    component: <CreatePartnerBank />,
  },
  {
    id: nanoid(),
    path: "payment-methods",
    name: "payment-methods",
    component: <PaymentMethods />,
  },
  {
    id: nanoid(),
    path: "create-payment-methods",
    name: "create-payment-methods",
    component: <CreatePaymentMethods />,
  },
  {
    id: nanoid(),
    path: "update-payment-methods",
    name: "update-payment-methods",
    component: <UpdatePaymentMethods />,
  },
  {
    id: nanoid(),
    path: "payout-partners",
    name: "payout-partners",
    component: <PayoutPartner />,
  },
  {
    id: nanoid(),
    path: "purpose-of-transfer",
    name: "purpose-of-transfer",
    component: <PurposeOfTransfer />,
  },
  {
    id: nanoid(),
    path: "relation",
    name: "relation",
    component: <Relation />,
  },
  {
    id: nanoid(),
    path: "occupation",
    name: "occupation",
    component: <Occupation />,
  },
  {
    id: nanoid(),
    path: "typeofid",
    name: "typeofid",
    component: <TypeOfID />,
  },
  {
    id: nanoid(),
    path: "create-type-of-id",
    name: "create-type-of-id",
    component: <CreateTypeOfID />,
  },
  {
    id: nanoid(),
    path: "country-settings-list",
    name: "country-settings-list",
    component: <CountrySettingList />,
  },
  {
    id: nanoid(),
    path: "country-settings",
    name: "country-settings",
    component: <CountrySettings />,
  },
  {
    id: nanoid(),
    path: "send-money-forms",
    name: "send-money-forms",
    component: <SendMoneyForms />,
  },
  {
    id: nanoid(),
    path: "send-money-forms-create",
    name: "send-money-forms-create",
    component: <SendMoneyFormsCreate />,
  },
  {
    id: nanoid(),
    path: "reported-fraud",
    name: "reported-fraud",
    component: <ReportedFund />,
  },
  {
    id: nanoid(),
    path: "faq-content",
    name: "faq-content",
    component: <FAQContent />,
  },
  {
    id: nanoid(),
    path: "news",
    name: "news",
    component: <NewsPage />,
  },
  {
    id: nanoid(),
    path: "add-faq-content",
    name: "add-faq-content",
    component: <AddFAQContent />,
  },
  {
    id: nanoid(),
    path: "CMS",
    name: "CMS",
    component: <CMSManagement />,
  },
  {
    id: nanoid(),
    path: "edit-CMS",
    name: "edit-CMS",
    component: <EditCMSPage />,
  },
  {
    id: nanoid(),
    path: "blogsmangement",
    name: "blogsmangement",
    component: <BlogsManagement />,
  },
  {
    id: nanoid(),
    path: "edit-blogs",
    name: "edit-blogs",
    component: <EditBlogsManagement />,
  },
  {
    id: nanoid(),
    path: "edit-reviews",
    name: "edit-reviews",
    component: <EditReviews />,
  },
  {
    id: nanoid(),
    path: "aboutus-CMS",
    name: "aboutus-CMS",
    component: <AboutUSContent />,
  },
  {
    id: nanoid(),
    path: "siteconfig",
    name: "siteconfig",
    component: <Configuration />,
  },
  {
    id: nanoid(),
    path: "addupdateconfig",
    name: "addupdateconfig",
    component: <AddUpdateConfig />,
  },
  {
    id: nanoid(),
    path: "editaboutus-CMS",
    name: "editaboutus-CMS",
    component: <EditAboutUSContentPage />,
  },
  {
    id: nanoid(),
    path: "careermanagement",
    name: "careermanagement",
    component: <CareerManagement />,
  },
  {
    id: nanoid(),
    path: "view-careermanagement",
    name: "view-careermanagement",
    component: <ViewCareerManagement />,
  },
  {
    id: nanoid(),
    path: "add-careermanagement",
    name: "add-careermanagement",
    component: <AddCareerManagement />,
  },
  {
    id: nanoid(),
    path: "refund",
    name: "refund",
    component: <Refunds />,
  },
  {
    id: nanoid(),
    path: "canceltransactions",
    name: "canceltransactions",
    component: <CancelTransactions />,
  },
  {
    id: nanoid(),
    path: "complaints-admin",
    name: "complaints-admin",
    component: <Complaints />,
  },
  {
    id: nanoid(),
    path: "refunds",
    name: "refunds",
    component: <Refunds />,
  },
  {
    id: nanoid(),
    path: "contactUs",
    name: "contactUs",
    component: <ContactUs />,
  },
  {
    id: nanoid(),
    path: "ouragents",
    name: "ouragents",
    component: <OurAgents />,
  },
  {
    id: nanoid(),
    path: "agent-details",
    name: "agent-details",
    component: <AgentsDetails />,
  },
  {
    id: nanoid(),
    path: "deviceinfo",
    name: "deviceinfo",
    component: <DeviceInfo />,
  },
  {
    id: nanoid(),
    path: "api-logs",
    name: "api-logs",
    component: <ApiLogs />,
  },
  {
    id: nanoid(),
    path: "reviews",
    name: "reviews",
    component: <Reviews />,
  },
  {
    id: nanoid(),
    path: "utility-service-transaction",
    name: "utility-service-transaction",
    component: <UtilityServiceTransaction />,
  },
  {
    id: nanoid(),
    path: "exchange-rate-form",
    name: "exchange-rate-form",
    component: <ExchangeRateForm />,
  },
  {
    id: nanoid(),
    path: "risk-management",
    name: "risk-management",
    component: <RiskManagement />,
  },
  {
    id: nanoid(),
    path: "create-risk-management",
    name: "create-risk-management",
    component: <CreateRiskManagement />,
  },
  {
    id: nanoid(),
    path: "notification-template",
    name: "notification-template",
    component: <NotificationTemplate />,
  },
  {
    id: nanoid(),
    path: "notification-template-create",
    name: "notification-template-create",
    component: <NotificationTemplateCreate />,
  },
  {
    id: nanoid(),
    path: "promocode",
    name: "promocode",
    component: <Promocode />,
  },
  {
    id: nanoid(),
    path: "appinbox",
    name: "appinbox",
    component: <AppInbox />,
  },
  {
    id: nanoid(),
    path: "appchat",
    name: "appchat",
    component: <AppChat />,
  },
  {
    id: nanoid(),
    path: "appcalendar",
    name: "appcalendar",
    component: <AppCalendar />,
  },
  {
    id: nanoid(),
    path: "appcontact",
    name: "appcontact",
    component: <AppContact />,
  },
  {
    id: nanoid(),
    path: "apptaskbar",
    name: "apptaskbar",
    component: <AppTaskbar />,
  },
  {
    id: nanoid(),
    path: "filemanagerdashboard",
    name: "filemanagerdashboard",
    component: <FileManagerDashboard />,
  },
  {
    id: nanoid(),
    path: "filedocuments",
    name: "filedocuments",
    component: <Filedocuments />,
  },
  {
    id: nanoid(),
    path: "filemedia",
    name: "filemedia",
    component: <Filemedia />,
  },
  {
    id: nanoid(),
    path: "fileimages",
    name: "fileimages",
    component: <Fileimages />,
  },
  {
    id: nanoid(),
    path: "blognewpost",
    name: "blognewpost",
    component: <BlognewPost />,
  },
  {
    id: nanoid(),
    path: "blogdetails",
    name: "blogdetails",
    component: <Blogdetails />,
  },
  {
    id: nanoid(),
    path: "bloglist",
    name: "bloglist",
    component: <Bloglist />,
  },
  {
    id: nanoid(),
    path: "uitypography",
    name: "uitypography",
    component: <Uitypography />,
  },
  {
    id: nanoid(),
    path: "uitabs",
    name: "uitabs",
    component: <Uitabs />,
  },
  {
    id: nanoid(),
    path: "bootstrapui",
    name: "bootstrapui",
    component: <Bootstrapui />,
  },
  {
    id: nanoid(),
    path: "uiicons",
    name: "uiicons",
    component: <Uiicons />,
  },
  {
    id: nanoid(),
    path: "uinotifications",
    name: "uinotifications",
    component: <Uinotifications />,
  },
  {
    id: nanoid(),
    path: "uicolors",
    name: "uicolors",
    component: <Uicolors />,
  },
  {
    id: nanoid(),
    path: "uilistgroup",
    name: "uilistgroup",
    component: <Uilistgroup />,
  },
  {
    id: nanoid(),
    path: "uimediaobject",
    name: "uimediaobject",
    component: <Uimediaobject />,
  },
  {
    id: nanoid(),
    path: "uimodal",
    name: "uimodal",
    component: <Uimodal />,
  },
  {
    id: nanoid(),
    path: "uibuttons",
    name: "uibuttons",
    component: <Uibuttons />,
  },
  {
    id: nanoid(),
    path: "uiprogressbar",
    name: "uiprogressbar",
    component: <Uiprogressbar />,
  },
  {
    id: nanoid(),
    path: "widgetsdata",
    name: "widgetsdata",
    component: <Widgetsdata />,
  },
  {
    id: nanoid(),
    path: "widgetsweather",
    name: "widgetsweather",
    component: <Widgetsweather />,
  },
  {
    id: nanoid(),
    path: "widgetsblog",
    name: "widgetsblog",
    component: <Widgetsblog />,
  },
  {
    id: nanoid(),
    path: "widgetsecommers",
    name: "widgetsecommers",
    component: <Widgetsecommers />,
  },
  {
    id: nanoid(),
    path: "blankpage",
    name: "blankpage",
    component: <Blankpage />,
  },
  {
    id: nanoid(),
    path: "profilev1page",
    name: "profilev1page",
    component: <Profilev1page />,
  },
  {
    id: nanoid(),
    path: "profilev2page",
    name: "profilev2page",
    component: <Profilev2page />,
  },
  {
    id: nanoid(),
    path: "imagegalleryprofile",
    name: "imagegalleryprofile",
    component: <Imagegalleryprofile />,
  },
  {
    id: nanoid(),
    path: "timeline",
    name: "timeline",
    component: <Timeline />,
  },
  {
    id: nanoid(),
    path: "pricing",
    name: "pricing",
    component: <Pricing />,
  },
  {
    id: nanoid(),
    path: "chatscreen",
    name: "chatscreen",
    component: <ChatScreen />,
  },
  {
    id: nanoid(),
    path: "invoices",
    name: "invoices",
    component: <Invoices />,
  },
  {
    id: nanoid(),
    path: "invoicesv2",
    name: "invoicesv2",
    component: <Invoicesv2 />,
  },
  {
    id: nanoid(),
    path: "searchresult",
    name: "searchresult",
    component: <Searchresult />,
  },
  {
    id: nanoid(),
    path: "helperclass",
    name: "helperclass",
    component: <Helperclass />,
  },
  {
    id: nanoid(),
    path: "teamsboard",
    name: "teamsboard",
    component: <Teamsboard />,
  },
  {
    id: nanoid(),
    path: "projectslist",
    name: "projectslist",
    component: <Projectslist />,
  },
  {
    id: nanoid(),
    path: "testimonials",
    name: "testimonials",
    component: <Testimonials />,
  },
  {
    id: nanoid(),
    path: "faqs",
    name: "faqs",
    component: <Faqs />,
  },
  {
    id: nanoid(),
    path: "formvalidation",
    name: "formvalidation",
    component: <Formvalidation />,
  },
  {
    id: nanoid(),
    path: "basicelements",
    name: "basicelements",
    component: <Basicelements />,
  },
  {
    id: nanoid(),
    path: "tablenormal",
    name: "tablenormal",
    component: <Tablenormal />,
  },
  {
    id: nanoid(),
    path: "echart",
    name: "echart",
    component: <Echart />,
  },
  {
    id: nanoid(),
    path: "leafletmap",
    name: "leafletmap",
    component: <Leafletmap />,
  },
  {
    id: nanoid(),
    path: "deliverymethodlist",
    name: "deliverymethodlist",
    component: <DeliveryMethodList />,
  },
  {
    id: nanoid(),
    path: "adddeliverytype",
    name: "adddeliverytype",
    component: <AddDeliveryType />,
  },
  {
    id: nanoid(),
    path: "addpoints",
    name: "addpoints",
    component: <AddPoints />,
  },
  {
    id: nanoid(),
    path: "paymenttype",
    name: "paymenttype",
    component: <PaymentType />,
  },
  {
    id: nanoid(),
    path: "addpaymenttype",
    name: "addpaymenttype",
    component: <AddPaymenttype />,
  },
  {
    id: nanoid(),
    path: "call",
    name: "call",
    component: <Conference />,
  },
];

export { DashboardRoutes };
