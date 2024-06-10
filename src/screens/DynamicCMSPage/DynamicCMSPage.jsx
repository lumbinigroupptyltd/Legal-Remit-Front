import React, { useState, useEffect } from "react";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import { Container, Row } from "react-bootstrap";
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

export default function DynamicCMSPage({ props }) {
  const [path, setPath] = useState("");
  const [pageDesign, setPageDesign] = useState([]);
  const { id } = useParams();

  if (id !== path) {

    const response = axios.post(
      CommonConstants.BASE_URL + "/getcmsbyslug",
      {
        slug: id,
      }
    ).then((response) => {
      setPageDesign(response.data.data);
      setPath(id);
    })
  }
  return (
    <>
      <section className="abtPage">
        <Container className="bg-white mt-5 rounded-4 mb-5  py-4 px-4">
          <>
            <h2 className="bolder purpleText text-center">
              {pageDesign?.title}
            </h2>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-3">
              {typeof pageDesign?.description === 'string' ? parse(pageDesign?.description) : ''}
            </p>
          </>
        </Container>
      </section>
    </>
  );
}
