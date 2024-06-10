import React from "react";
import "./CookiesPolicy.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook


export default function CookiesPolicy() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/legal";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
      <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0' : 'mt-5 rounded-4 '}`}>
          <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : ''}`}>
            <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`} >  Cookies Policy</h2>
            <div className="termsFAQ">
              {/* <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                1. OVERVIEW
              </p> */}

              <p className="text-justify responsiveFontLarge first text-black fs-6 mt-3">
              Visitors of Legal Remit and affiliated websites (collectively, "our websites") are treated with respect. This cookie notice gives you clear, thorough information regarding the cookies we use and their intended uses. Please refer to our Privacy Policy to evaluate the privacy notice that is relevant to users of our websites.

              </p>

            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
              What is a COOKIE?
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              Cookies are text files that web browsers use to store information. On computers, mobile phones, and other devices, cookies are used to store and receive identifiers and other information. For similar objectives, we also utilize other technologies, such as data we save on your web browser or device, device identifiers, and other applications. All of these technologies are referred to as "Cookies" throughout this document. Local shared objects, sometimes known as "flash cookies," web beacons, and other related technologies for gathering and storing information are also included under the umbrella term "cookies" (including transparent or clear gifs). Please get in touch with us via our CONTACT US page if you need more details regarding our cookie notice.
              </p>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
              Why do we (Legal Remit)use Cookies?

              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              Cookies enable our servers to collect statistical data about the overall performance and use of our websites by anonymously compiling usage data (including IP addresses). In order to offer you information that may be useful to you or that best matches your stated preferences, cookies may also be used to identify you as a repeat user of our website or a Legal Remit customer. In order to prevent you from having to repeatedly enter your password when using our websites, we also employ Cookies to recognize you as a legitimate user who has already signed into our website. Additionally, if you use Legal Remit goods, such as our website, have a Legal Remit account, or visit other websites and apps that use Legal Remit products, we may use cookies to identify you.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              Regardless of whether you are signed in or registered, cookies allow Legal Remit to offer you products, as well as information on how you use other websites and apps. By modifying your browser's settings or going to the Cookie Consent Manager, you can control the cookie settings on your computer or other devices when you visit our website.
              </p>
            </div>
            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                 What are the types of cookies we use?
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              The particular Cookies that are used on our site fall into the following categories:

              </p>

              <ul className="round">
                <li className="liCustom">
                Required Cookies
                </li>
                <li className="liCustom">
                Functional Cookies and

                </li>
                <li className="liCustom">
                Advertising Cookies.

                </li>
            
              </ul>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                 Required Cookies
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              When you access a Legal Remit website or log in using your Legal Remit profile, these Cookies are saved on your computer. These Cookies are necessary for the efficient operation of our website. Since some Cookies are essential, we do not need your permission to use them. Without these Cookies, we are unable to ensure the functionality of the website or its security during your visit. We assume that by using the Legal Remit website, you consent to the installation, usage, and storage of these Cookies and the related Privacy Policy.

              </p>

              <ul className="round">
              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              We utilize the required cookies to:
              </p>
                <li className="liCustom">
                Manage the content of the website and your cookie choices set using Cookie Consent Manager;

                </li>
                <li className="liCustom">
                to recognize you as being logged in to the website and to verify your identity;

                </li>
                <li className="liCustom">
                When we make any modifications to the website's functionality, ensure sure you connect to the appropriate service; and


                </li>
                <li className="liCustom">
                for reasons of security.


                </li>
              </ul>
           
            </div>

    

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
                 Functional Cookies
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              These cookies gather data on how users interact with a website, including the most popular pages visited and any problem warnings that are seen. Some of them are analytics cookies, which help us learn more about how people use our website, and are placed by third-party web analytics software. For instance, we use Google Analytics like many other businesses. You can learn more about how we share data with Google, an independent organization, in Google's privacy statement. These Cookies are also used to showcase Legal Remit products or services that we believe will be of interest to you based on how you use our websites, manage the performance of marketing tools, and plan our marketing and customer experience actions.

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              Additionally, we employ other useful Cookies to give you access to more functionality and customization. These third-party service providers whose services we have added to our pages might set these Cookies. Where permitted by law, we will first get your permission before installing these Cookies on your computer or device. Some of these services might not work properly if you don't add certain Cookies.

              </p>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
                Advertising Cookies
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
              Advertising cookies are used to show you advertising that is relevant to your interests and to provide you with a better browsing experience whether using the Internet, social media, or other websites. Where permitted by law, we will first get your permission before installing these Cookies on your computer or device. We mainly employ two kinds of advertising cookies

              </p>

              <ul className="round">
                <li className="liCustom">
                <div className="bolder">Targeting cookies </div>
                Ads that are more relevant to you and your interests are delivered using these cookies. Additionally, they help determine the success of the advertising campaign and reduce the number of times you are exposed to advertisements. Usually, advertising networks place them with the owner of the website's consent. They keep track of the websites you've visited, and they share this information with other businesses like marketers. Targeting Cookies are frequently connected to website functionality offered by the other organization.
                </li>
                <li className="liCustom">
                <div className="bolder">Social Media cookies </div> 
                To allow you to share our material with your networks or peers, we have integrated a number of social media services into our website. These services set cookies in your browser. They have the ability to follow your browser on other websites and compile a profile of your interests. You could notice different messages and content on other websites you visit as a result of this. More than one of these functions may be served by some cookies.
                </li>
          
              </ul>
 
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
                 Cookies are managed by many companies

              </p>

    

              <ul className="round">
                <li className="liCustom">
                <div className="bolder">First-party cookies </div>  
                These Cookies are delivered to your computer or device from a Legal Remit-managed computer or domain.
                </li>
                <li className="liCustom">
                <div className="bolder">Third-party cookies </div>   
                These Cookies are delivered to your computer or device from a domain or computer that Legal Remit may or may not control. In certain situations, a third party will process the information that the Cookies collected.
                </li>
          
              </ul>
 
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
                 Cookies with various time periods

              </p>

    

              <ul className="round">
                <li className="liCustom">
                <div className="bolder">Persistent cookies </div>  
                For the time frame provided in the cookie, which can be anywhere from a few minutes to several years, these Cookies stay on your device. Every time you go to the website that set the particular cookie, they become active.
                </li>
                <li className="liCustom">
                <div className="bolder">Session cookies </div>  
                These Cookies are made to gather and store information whenever you use a website or an app. They are used to store information that is only necessary for performing the function once. All session cookies are erased when the browser is closed.
                </li>
          
              </ul>
 
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
                 Management of Cookie Settings
              </p>

    

              <ul className="round mainUL">
                <li className="liCustom">
                <div className="bolder">Browser Settings: </div>   
                Your browser's settings allow you to block, restrict, disable, or delete Cookies. However, you might not be able to access all or portions of our site if you adjust your browser's settings to reject all Cookies (including Required Cookies). These options are typically located in your internet browser's "options" or "preferences" menu.
                </li>
                <li className="liCustom">
                <div className="bolder">Cookies consent Manager:</div>  
                Users can manage their choices for cookie settings with the aid of Legal Remit's cookie management tool, Cookie Consent Manager. When you visit our website, you have the option to modify your cookie selections for Functional and Advertising Cookies via the Cookie Consent Manager.
                </li>
                <li className="liCustom">
                <div className="bolder">Third-Party Tools:</div>   
                To manage Cookies, you can also use tools from third parties. Please be aware that Legal Remit does not offer or support solutions for third-party cookie management. One such tool is a Google-made extension for popular browsers that permanently disable Google Analytics.
                </li>
          
              </ul>
 
            </div>
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
