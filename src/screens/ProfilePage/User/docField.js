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
      { id: 1, value: "KYC", label: "KYC" },
      { id: 1, value: "additional", label: "Addtional" },
    ],
  },
];

export const kycDocument = [
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
      { id: 1, value: "KYC", label: "KYC" },
      { id: 1, value: "additional", label: "Addtional" },
    ],
  },
  {
    name: "front",
    label: "KYC Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Front",

    md: 6,
    sm: 6,
    xs: 12,
  },
  {
    name: "back",
    label: "KYC Document",
    required: true,
    type: "newDocumentUpload",
    title: "Document ID Back",

    md: 6,
    sm: 6,
    xs: 12,
  },
];

export const additionalDocument = [
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
      { id: 1, value: "KYC", label: "KYC" },
      { id: 1, value: "additional", label: "Addtional" },
    ],
  },
  {
    name: "isAdditional",
    label: "Additional Document",
    required: true,
    type: "newDocumentUpload",
    title: "Additional Document",
    md: 6,
    sm: 6,
    xs: 12,
  },
];
