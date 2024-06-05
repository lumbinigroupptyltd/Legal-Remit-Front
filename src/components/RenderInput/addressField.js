export const AddressField = [
    {
      name: "country",
      label: "Country",
      md: 3,
      sm: 6,
      lg: 4,
      xs: 12,
      required: true,
      type: "dropDown",
      options: [{ id: 1, value: "Nepal", label: "Nepal" }],
    },
    {
      name: "wardNo",
      label: "Ward No.",
      md: 3,
      sm: 6,
      lg: 4,
      xs: 12,
      max: 2,
      type: "onlyNumber",
      required: true,
    },
    {
      name: "tole",
      label: "Tole",
      md: 3,
      sm: 6,
      lg: 4,
      xs: 12,
      type: "text",
      required: true,
    },
    {
      name: "mobileNo",
      label: "Mobile No.",
      md: 3,
      sm: 6,
      lg: 4,
      xs: 12,
      type: "onlyNumber",
      required: true,
      max: 10,
    },
    {
      name: "telephoneNo",
      label: "Telephone No.",
      md: 3,
      sm: 6,
      lg: 4,
      xs: 12,
      max: 9,
      type: "onlyNumber",
    },
    {
      name: "email",
      label: "Email",
      md: 3,
      sm: 6,
      lg: 4,
      xs: 12,
      type: "text",
      max: 50,
      required: true,
    },
    {
      name: "website",
      label: "Website",
      md: 3,
      sm: 6,
      lg: 4,
      xs: 12,
      type: "text",
    },  
    {
      name: "perAndCurAddressSame",
      label: "Do you have different Temporary Address?",
      display: "flex",
      direction: "row-reverse",
      justify: "flex-end",
      margin: "0px",
      type: "fieldArraySwitch",
    },
  ];