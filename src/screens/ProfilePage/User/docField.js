export const userKycDocField = [
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
    ],
  },
];

export const Passport_FIELD = [
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
    ],
  },
  {
    name: "Front",
    label: "Passport Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Front",

    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "Back",
    label: "Passport Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Back",

    md: 6,
    sm: 6,
    xs: 12,
  },
];

export const License_FIELD = [
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
    ],
  },
  {
    name: "Front",
    label: "Passport Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Front",

    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "Back",
    label: "Passport Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Back",

    md: 6,
    sm: 6,
    xs: 12,
  },
];

export const userKycBussDocField = [
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
      { id: 3, value: "Additional", label: "Additional" },
      { id: 2, value: "Driving License", label: "Driving License" },
    ],
  },
];

export const Additional_FIELD = [
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
      { id: 3, value: "Additional", label: "Additional" },
      { id: 2, value: "Driving License", label: "Driving License" },
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