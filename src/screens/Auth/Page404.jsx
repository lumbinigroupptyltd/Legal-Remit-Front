import React from "react";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../assets/images/logo-white.svg";

const Page404 = () => {

    return (
      <div className="theme-cyan">
<div className="error-page-container">
    {/* <img src="https://www.awardspace.com/wp-content/uploads/2021/01/403-forbidden-1.jpg" alt="403"/> */}


    <img src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/page_not_found_su7k.svg" alt="404"/>

    
    <h2 className="purpleText">
    Page Not Found
    </h2>

    <p className="pt-3">OOPPS! THE PAGE YOU WERE LOOKING DOESN'T EXIST.</p>
    
    <p>
      <a href="" className="button purpleBackground text-white">
      <i className="fa fa-home text-white"/> &nbsp;  Go to home page
      </a>
    </p>
    
  </div>
      </div>
    );
  }

// Page404.propTypes = {
// };

// const mapStateToProps = ({ loginReducer }) => ({
// });

export default Page404;
