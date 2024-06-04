import React, { useEffect, useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container } from "react-bootstrap";
import axios from "axios";
import parse from 'html-react-parser';
import { CommonConstants } from "../../Constants/common.constants";
import { styled } from '@mui/material/styles';



const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: 0,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },

}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  justifyContent: "flex-start", // Add this line to left-align the content
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
    border: 0,
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));


const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: 0

}));

// Define a FAQItem component to display individual FAQ items
const FAQItem = ({ title, details }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      sx={{
        justifyContent: "flex-start", // Left-align content
      }}
    >
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>{details}</Typography>
    </AccordionDetails>
  </Accordion>

);
// ...

// Your FAQPage component
export default function FAQPage() {
  const [expanded, setExpanded] = useState("panel1");
  const [faqData, setFaqData] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Function to fetch FAQ data from the API
  const fetchFAQData = async () => {
    try {
      const response = await axios.post(CommonConstants.BASE_URL + "/getallfaq", {
        pageindex: 1,
        pagesize: 1000,
        searchdata: "",
        sortparam: "created_at",
        sortorder: "ASC",
      });

      console.log("API Response:", response.data.data); // Log the entire API response

      if (response.status === 200) {
        const data = response.data.data;
        setFaqData(data); // Set the FAQ data received from the API
      } else {
        console.error("Failed to fetch FAQ data");
      }
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };



  useEffect(() => {
    fetchFAQData(); // Fetch FAQ data when the component mounts
  }, []);

  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage">
            <h2 className="bolder purpleText text-center">FAQ</h2>

            <div className="mt-5">
              {faqData && Array.isArray(faqData) && faqData.length > 0 ? (
                faqData.map((faq, index) => (
                  <FAQItem
                    key={index}
                    title={faq?.question} // Replace with the actual FAQ title field
                    //   {parse(answerModalContent)}
                    details={parse(faq?.answer)} // Replace with the actual FAQ details field
                  />
                ))
              ) : (
                <p>No FAQ data available.</p>
              )}
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
