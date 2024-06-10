import React from 'react'
import { Row,Col } from 'react-bootstrap';

export default function ImageView({BusinessDataImageFront,BusinessDataImageBack,AdditionalImageArray,UserIdType}) {
  return (
    <div>
                            <Row className="border-bottom pb-3">
                        <div className="bolder ms-2 text-black text-center mb-3">
                          Uploaded Document ({UserIdType})
                        </div>
                        <Col>
                          <div className="bolder ms-2 text-black text-center">
                            ID Front view 
                          </div>
                          <div className=" d-flex">
                            {BusinessDataImageFront &&
                              BusinessDataImageFront.map((image, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="image position relative"
                                  >
                                    <div className="img-box effect-image-1 ">
                                      <img
                                        src={image}
                                        height="100"
                                        width="200"
                                        className="d-flex justify-content-center hoverView uploadedImage roundedCorner"
                                        alt="upload"
                                      />
                                      <div className="overlay simple-overlay roundedCorner">
                                        <div className="mainBtnClose"></div>
                                        <div className="cta"></div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </Col>

                        <Col className={UserIdType == 'Passport' ? 'd-none' : 'd-block'}>
                          <div className="bolder ms-2 text-black text-center">
                            ID Back view
                          </div>
                          <div className="l">
                            {BusinessDataImageBack &&
                              BusinessDataImageBack.map((image, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="image position relative"
                                  >
                                    <div className="img-box effect-image-1">
                                      <img
                                        src={image}
                                        height="100"
                                        width="200"
                                        className="hoverView uploadedImage roundedCorner"
                                        alt="upload"
                                      />
                                      <div className="overlay simple-overlay roundedCorner">
                                        <div className="mainBtnClose"></div>
                                        <div className="cta"></div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                      <div className="bolder ms-2 text-black d-flex justify-content-center my-3">
                        Uploaded Additional Documents
                      </div>
                      <div className="">
                            {AdditionalImageArray &&
                              AdditionalImageArray.map((images, index) => {
                                return (
                                  <div key={index}>
                                    {/* <div>Hello</div> */}
                                    {images.ImageArray.length > 0 ? (
                                    <>
                                    <div>
                                      <b>
                                        <div>{images.typeName}</div>
                                      </b>
                                    </div>

                                      <div className="images2 imageblock border rounded-2 py-2 my-2">
                                        {images.ImageArray &&
                                          images.ImageArray.map(
                                            (image, index) => {
                                              return (
                                                <div
                                                  key={index}
                                                  className="image position relative"
                                                >
                                                  <div className="img-box effect-image-1">
                                                    <img
                                                      src={image}
                                                      height="100"
                                                      width="200"
                                                      className="hoverView uploadedImage roundedCorner"
                                                      alt="upload"
                                                    />
                                                    <div className="overlay simple-overlay roundedCorner">
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    <hr />
                                    </>
                                    ) : ''}
                                  </div>
                                );
                              })}
                          </div>
                      </Row>
    </div>
  )
}
