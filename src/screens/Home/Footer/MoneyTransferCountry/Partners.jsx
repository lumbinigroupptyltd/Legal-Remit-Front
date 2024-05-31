// import React from "react";
// import Container from "react-bootstrap/Container";
// import "../../../../assets/assets/scss/pages/Partner.scss";
// import OwlCarousel from "react-owl-carousel";
// import user1 from "../../../../assets/images/Footer/c1.png";
// import user2 from "../../../../assets/images/Footer/c2.png";
// import user3 from "../../../../assets/images/Footer/c3.png";
// import user4 from "../../../../assets/images/Footer/c4.png";
// import user5 from "../../../../assets/images/Footer/c5.png";
// import user6 from "../../../../assets/images/Footer/c6.png";
// import user7 from "../../../../assets/images/Footer/c7.png";
// import user8 from "../../../../assets/images/Footer/c8.png";
// import Col  from 'react-bootstrap/Col';
// import  Row  from 'react-bootstrap/Row';
// import ListGroup from 'react-bootstrap/ListGroup';



// export default function Services({ children }) {
//   const options1 = {
//     loop: true,
//     margin: 10,
//     items: 5,
//     autoplay: true,
//     nav: false,
//     dots: false,
//     responsive: {
//       0: {
//         items: 3,
//       },
//       576: {
//         items: 4,
//       },
//       992: {
//         items: 5,
//       },
//       1200: {
//         items: 6,
//       },
//     }
//   };
//   return (
//     <>
//       <section className="partner-main position-relative purpleLIghtShade py-5 responsiveMainForMobile">
   
//         <Container>
//           <OwlCarousel className="owl-theme" {...options1}>
//             <Jello right duration={4000}>
//             <div className="item11">
//               <img src={user1} alt="s" className="client-img-main" />
//             </div>
//             <div className="item11">
//               <img src={user2} alt="s" className="client-img-main" />
//             </div>
//             <div className="item11">
//               <img src={user3} alt="s" className="client-img-main" />
//             </div>
//             <div className="item11">
//               <img src={user4} alt="s" className="client-img-main" />
//             </div>
//             </Jello>
       
//             <Jello left duration={4000}> 
//             <div className="item11">
//               <img src={user5} alt="s" className="client-img-main" />
//             </div>
//             <div className="item11">
//               <img src={user6} alt="s" className="client-img-main" />
//             </div>
//             <div className="item11">
//               <img src={user7} alt="s" className="client-img-main" />
//             </div>
//             <div className="item11">
//               <img src={user8} alt="s" className="client-img-main" />
//             </div>
//             </Jello>
           
//           </OwlCarousel>
//         </Container>
//       </section>


//     </>
//   );
// }


import React from "react";
import Container from "react-bootstrap/Container";
import "../../../../assets/assets/scss/pages/Partner.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import user1 from "../../../../assets/images/Footer/c1.png";
import user2 from "../../../../assets/images/Footer/c2.png";
import user3 from "../../../../assets/images/Footer/c3.png";
import user4 from "../../../../assets/images/Footer/c4.png";
import user5 from "../../../../assets/images/Footer/c5.png";
import user6 from "../../../../assets/images/Footer/c6.png";
import user7 from "../../../../assets/images/Footer/c7.png";
import user8 from "../../../../assets/images/Footer/c8.png";

const Services = () => {
  const users = [user1, user2, user3, user4, user5, user6, user7, user8];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <section className="partner-main position-relative purpleLIghtShade py-5 responsiveMainForMobile">
      <Container>
        <Slider {...settings}>
          {users.map((user, index) => (
            <div key={index} className="item11">
              <img src={user} alt={`user-${index}`} className="client-img-main" />
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Services;
