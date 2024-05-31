import React from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import { Tabs, Tab, Dropdown } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

import img1 from "../../assets/images/image-gallery/1.jpg";
import img2 from "../../assets/images/image-gallery/2.jpg";
import img3 from "../../assets/images/image-gallery/3.jpg";
import img4 from "../../assets/images/image-gallery/4.jpg";
import img5 from "../../assets/images/image-gallery/5.jpg";
import img6 from "../../assets/images/image-gallery/6.jpg";
import img7 from "../../assets/images/image-gallery/7.jpg";
import img8 from "../../assets/images/image-gallery/8.jpg";
import img9 from "../../assets/images/image-gallery/9.jpg";
import img10 from "../../assets/images/image-gallery/10.jpg";
import img11 from "../../assets/images/image-gallery/11.jpg";

const images = [
  {
    original: img1,
    thumbnail: img1,
  },
  {
    original: img2,
    thumbnail: img2,
  },
  {
    original: img3,
    thumbnail: img3,
  },
  {
    original: img11,
    thumbnail: img11,
  },
  {
    original: img5,
    thumbnail: img5,
  },
];
const images1 = [
  {
    original: img4,
    thumbnail: img4,
  },
  {
    original: img5,
    thumbnail: img5,
  },
  {
    original: img6,
    thumbnail: img6,
  },
  {
    original: img11,
    thumbnail: img11,
  },
  {
    original: img3,
    thumbnail: img3,
  },
];
const images2 = [
  {
    original: img6,
    thumbnail: img6,
  },
  {
    original: img7,
    thumbnail: img7,
  },
  {
    original: img8,
    thumbnail: img8,
  },
  {
    original: img11,
    thumbnail: img11,
  },
  {
    original: img3,
    thumbnail: img3,
  },
];
const images3 = [
  {
    original: img9,
    thumbnail: img9,
  },
  {
    original: img10,
    thumbnail: img10,
  },
  {
    original: img11,
    thumbnail: img11,
  },
  {
    original: img3,
    thumbnail: img3,
  },
];

class ImageGalleryProfile extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div
          className="container-fluid"
          onClick={() => {
            document.body.classList.remove("offcanvas-active");
          }}
        >
          <PageHeader
            HeaderText="Gallery"
            Breadcrumb={[
              { name: "Page", navigate: "" },
              { name: "Gallery", navigate: "" },
            ]}
          />
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card">
                <div className="header">
                  <h2>
                    Bootstrap 4 Gallery With Lightbox{" "}
                    <small>All pictures taken from pexels.com</small>
                  </h2>
                  {/* <ul className="header-dropdown">
                    <li className="dropdown"><a aria-expanded="false" aria-haspopup="true" className="dropdown-toggle" data-toggle="dropdown"  role="button"></a>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li ><a >Action</a></li>
                      <li ><a >Another Action</a></li>
                      <li ><a >Something else</a></li>
                      </ul></li>
                  </ul> */}
                  <Dropdown className="header-dropdown">
                    <Dropdown.Toggle
                      variant="none"
                      as="a"
                      id="dropdown-basic"
                    ></Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu-right account">
                      <li>
                        <a>Action</a>
                      </li>
                      <li>
                        <a>Another Action</a>
                      </li>
                      <li>
                        <a>Something else</a>
                      </li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="body">
                  <div className="gallery b4gallery">
                    <Tabs
                      defaultActiveKey="All"
                      className="nav nav-pills justify-content-start"
                    >
                      <Tab eventKey="All" title="All" className="nav-item">
                        <ImageGallery items={images} />
                      </Tab>
                      <Tab eventKey="Tab1" title="Tab1" className="nav-item">
                        <ImageGallery items={images1} />
                      </Tab>
                      <Tab eventKey="Tab2" title="Tab2" className="nav-item">
                        <ImageGallery items={images2} />
                      </Tab>
                      <Tab eventKey="Tab3" title="Tab3" className="nav-item">
                        <ImageGallery items={images3} />
                      </Tab>
                      <Tab eventKey="Tab4" title="Tab4" className="nav-item">
                        <div className="clearfix">
                          <p>No Images available.</p>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ioTReducer }) => ({
  isSecuritySystem: ioTReducer.isSecuritySystem,
});

export default connect(mapStateToProps, {})(ImageGalleryProfile);
