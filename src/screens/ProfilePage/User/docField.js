export const userKycDocField = [
    {
      name: "documentType",
      label: "Select Document Type",
      md: 12,
      sm: 12,
      lg: 4,
      xs: 12,
      required: true,
      type: "dropDown",
      options: [
        { id: 1, value: "KYC", label: "KYC" },
      ],
    },
    {
        name: "kycfront",
        label: "KYC Document",
        required: true,
        type: "newDocumentUpload",
        title: "Document ID Front",
       
        md: 6,
        sm: 6,
        xs: 12,
      },
      {
        name: "kycback",
        label: "KYC Document",
        required: true,
        type: "newDocumentUpload",
        title: "Document ID Back",
       
        md: 6,
        sm: 6,
        xs: 12,
      },
  ];