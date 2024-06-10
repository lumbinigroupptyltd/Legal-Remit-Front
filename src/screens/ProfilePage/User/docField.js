export const USER_DOC_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    lg: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
    ],
  },
];

export const USER_CITIZENSHIP_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    lg: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
    ],
  },
  {
    name: "Front",
    label: "Citizenship Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Front",
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "Back",
    label: "Citizenship Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Back",
    md: 6,
    sm: 6,
    xs: 12,
  },
];

export const USER_PASSPORT_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    lg: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
    ],
  },
  {
    name: "Front",
    label: "Passport Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID",
    md: 6,
    sm: 6,
    xs: 12,
  },
];

export const USER_LICENSE_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    lg: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
    ],
  },
  {
    name: "Front",
    label: "License Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID",
    md: 6,
    sm: 6,
    xs: 12,
  },
];


export const BUSS_Additional_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    lg: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
      { id: 4, value: "Additional", label: "Additional" },
    ],
  },
  {
    name: "additional",
    label: "Additonal Document",
    required: true,
    type: "newDocumentUpload",
    title: "Additonal Document",
    md: 6,
    sm: 6,
    xs: 12,
  },
];

export const BUSS_CITIZENSHIP_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    lg: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
      { id: 4, value: "Additional", label: "Additional" },
    ],
  },
  {
    name: "Front",
    label: "Citizenship Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Front",
    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "Back",
    label: "Citizenship Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Back",
    md: 6,
    sm: 6,
    xs: 12,
  },
];

export const BUSS_PASSPORT_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
      { id: 4, value: "Additional", label: "Additional" },
    ],
  },
  {
    name: "Front",
    label: "Passport Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID",
    md: 6,
    sm: 6,
    xs: 12,
  },
];

export const BUSS_LICENSE_FIELD = [
  {
    name: "documentType",
    label: "Select Document Type",
    md: 12,
    sm: 12,
    xs: 12,
    required: true,
    type: "dropDown",
    options: [
      { id: 1, value: "Passport", label: "Passport" },
      { id: 2, value: "Driving License", label: "Driving License" },
      { id: 3, value: "Citizenship", label: "Citizenship" },
      { id: 4, value: "Additional", label: "Additional" },
    ],
  },
  {
    name: "Front",
    label: "License Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID",
    md: 6,
    sm: 6,
    xs: 12,
  },
];