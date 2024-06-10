import React, { useState, useRef } from "react";
import "./ServiceRemittance.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function ServiceRemittance() {
  const contentRef = useRef(null);

  const [showCommonRemit, setshowCommonRemit] = useState("RemitService");
  const [showRemit, setShowRemit] = useState(true);
  const [showBill, setShowBill] = useState(false);
  const [showTravel, setShowTravel] = useState(false);

  const commonClickRemit = (e, name) => {
    setshowCommonRemit(name);
    window.scrollTo(0, contentRef.current.offsetTop);
  };

  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            <h2 className="bolder purpleText text-center">
              Remittance Services
            </h2>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                Sending Money Made Easy with Legal Remit
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Legal Remit takes pride in providing seamless and secure
                remittance services, enabling individuals and businesses to send
                money across borders with ease. With our reliable platform and
                trusted network, we strive to make the process efficient,
                cost-effective, and hassle-free for our valued customers.
                Discover how Legal Remit's remittance services can simplify your
                international money transfers and help you stay connected with
                your loved ones or meet your business needs.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Our remittance service allows you to transfer money within Legal
                Remit's extensive network of countries and communities
                worldwide. Whether you need to support family members, make
                payments, or manage international transactions, our platform
                offers a seamless solution. By leveraging our established
                partnerships and advanced technology, we ensure swift and secure
                money transfers, eliminating the complexities and delays often
                associated with traditional remittance methods.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                With Legal Remit's innovative real-time remittance service, we
                strive to provide you with the fastest and most efficient money
                transfer experience possible. We are proud to state that 99% of
                our transactions are completed in minutes or less, ensuring that
                your funds reach the recipient swiftly and securely.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Gone are the days of enduring long waiting times and unnecessary
                delays associated with traditional banking methods. With Legal
                Remit, you can say goodbye to the frustration of uncertain
                transfer timelines. Our real-time remittance service leverages
                advanced technology and secure electronic channels to expedite
                the transfer process, giving you immediate access to the
                transferred money.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                The speed at which Legal Remit completes transactions is truly
                remarkable. Within minutes, your loved ones or business partners
                can receive the funds and utilize them to meet their financial
                needs promptly. Whether it's supporting family members, paying
                bills, or making time-sensitive business payments, our real-time
                remittance service ensures that the money is available when it's
                needed most.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                We understand the importance of efficient financial management,
                which is why we have developed a service that empowers you to
                control your funds in a timely manner. Legal Remit's real-time
                remittance service not only saves you precious time but also
                provides peace of mind, knowing that your money is reaching its
                intended destination without unnecessary delays.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Trust Legal Remit to deliver your funds swiftly, securely, and
                reliably. Experience the convenience and efficiency of our
                real-time remittance service, where 99% of transactions are
                completed in minutes or less. Take advantage of our fast service
                to support your loved ones and maintain seamless business
                operations with ease.
              </p>
            </div>

            <div className="mt-5">
              <div className="row gx-4">
                <div className="col">
                  <figure className="snip1519 h-100 mh-100 position-relative">
                    <figcaption>
                      <ManageAccountsIcon
                        sx={{ fontSize: 80 }}
                        className="purpleText"
                      />
                      <h5 className="text-black py-2">Remittance Services</h5>
                      <small className="text-black">
                        Discover how Legal Remit's remittance services can
                        simplify your international money transfers and help you
                        stay connected with your loved ones or meet your
                        business needs.
                      </small>
                    </figcaption>
                    <div className="">
                      <button
                        href="#"
                        className="purpleText button bg-transparent border-0 m-0 w-auto"
                        onClick={(e) => commonClickRemit(e, "RemitService")}
                      >
                        Read More
                      </button>
                    </div>
                  </figure>
                </div>
                <div className="col">
                  <figure className="snip1519 h-100 mh-100 position-relative">
                    <figcaption>
                      <CreditScoreIcon
                        sx={{ fontSize: 80 }}
                        className="purpleText"
                      />
                      <h5 className="text-black py-2">Utility Bill Payment<br/><small className="fs-6 text-black">(Available in Nepal Only)</small></h5>
                      <small className="text-black">
                        Legal Remit recognizes the importance of hassle-free
                        utility bill payments. In Nepal, we offer a dedicated
                        utility bill payment service, allowing customers to
                        conveniently pay their electricity,
                      </small>
                    </figcaption>
                    <div className="">
                      <button
                        href="#"
                        className="purpleText button bg-transparent border-0 m-0 w-auto"
                        onClick={(e) => commonClickRemit(e, "BillSection")}
                      >
                        Read More
                      </button>
                    </div>
                  </figure>
                </div>
                <div className="col">
                  <figure className="snip1519 h-100 mh-100 position-relative">
                    <figcaption>
                      <FlightTakeoffIcon
                        sx={{ fontSize: 80 }}
                        className="purpleText"
                      />
                      <h5 className="text-black py-2">Travel And Ticketing<br/><small className="fs-6 text-black text-justify">Your Gateway to Memorable Journeys with Fly Lumbini</small></h5>
                      <small className="text-black">
                        Legal Remit is not just about financial services; we
                        also offer comprehensive travel and ticketing services
                        under its sister company Fly Lumbini to make your travel
                        experiences seamless and unforgettable.
                      </small>
                    </figcaption>
                    <div className="">
                      <button
                        href="#"
                        className="purpleText button bg-transparent border-0 m-0 w-auto"
                        onClick={(e) => commonClickRemit(e, "TravelSection")}
                      >
                        Read More
                      </button>
                    </div>
                  </figure>
                </div>
                <div className="col">
                  <figure className="snip1519 h-100 mh-100 position-relative">
                    <figcaption>
                      <ContactMailIcon
                        sx={{ fontSize: 80 }}
                        className="purpleText"
                      />
                      <h5 className="text-black py-2">Accountings</h5>
                      <small className="text-black">
                        Legal Remit is delighted to offer account opening
                        services at Everest Bank Limited, one of Nepal's premier
                        financial institutions. With a strong commitment to
                        customer satisfaction and a reputation for exceptional
                        service
                      </small>
                    </figcaption>
                    <div className="">
                      <button
                        href="#"
                        className="purpleText button bg-transparent border-0 m-0 w-auto"
                        onClick={(e) => commonClickRemit(e, "AccountSection")}
                      >
                        Read More
                      </button>
                    </div>
                  </figure>
                </div>
              </div>
            </div>

            <div className="mt-4" ref={contentRef}>
              {showCommonRemit == "BillSection" ? (
                <div>
                  <div>
                    <div>
                      <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                        Legal Remit recognizes the importance of hassle-free
                        utility bill payments. In Nepal, we offer a dedicated
                        utility bill payment service, allowing customers to
                        conveniently pay their electricity, water, internet, and
                        other utility bills in real-time. Say goodbye to long
                        queues and time-consuming processes. With Legal Remit,
                        you can effortlessly manage your utility bills and
                        ensure timely payments, contributing to a stress-free
                        financial management experience.
                      </p>
                      <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                        Legal Remit's utility bill payment service in Nepal
                        simplifies the process of managing and paying utility
                        bills. By offering real-time payments, we eliminate the
                        need for manual processing, reducing the risk of late
                        payments and associated penalties. Our user-friendly
                        platform allows you to view and track your utility
                        bills, set up automated payments, and receive
                        notifications, ensuring that you stay on top of your
                        financial responsibilities. With Legal Remit, you can
                        enjoy convenience and peace of mind, knowing that your
                        utility bills are taken care of efficiently and
                        promptly.
                      </p>
                      <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                        At Legal Remit, our remittance services are designed to
                        simplify the process of sending money globally. We
                        understand the significance of secure, reliable, and
                        cost-effective remittance solutions in today's
                        interconnected world. Whether you are supporting your
                        loved ones, managing international transactions, or
                        meeting business obligations, Legal Remit is your
                        trusted partner in simplifying your remittance needs.
                        Experience the convenience, security, and peace of mind
                        that come with Legal Remit's remittance services and
                        stay connected with your global network.
                      </p>
                    </div>
                  </div>
                </div>
              ) : showCommonRemit == "TravelSection" ? (
                <div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Introduction:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Legal Remit is not just about financial services; we also
                      offer comprehensive travel and ticketing services under
                      its sister company Fly Lumbini to make your travel
                      experiences seamless and unforgettable. Whether you're
                      planning a vacation, a business trip, or a family reunion,
                      our dedicated team is here to assist you every step of the
                      way. From flight bookings and accommodation to car rentals
                      and travel insurance, Fly Lumbini has got you covered.
                      Explore the world with confidence, convenience, and peace
                      of mind through our extensive range of travel-related
                      services.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Flight Booking:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Fly Lumbini’s flight booking service allows you to plan
                      and book your air travel with ease. Our user-friendly
                      platform provides access to a vast inventory of domestic
                      and international flights, ensuring that you have ample
                      options to choose from. Whether you're traveling for
                      business or leisure, our platform offers competitive
                      prices, reliable schedules, and a seamless booking
                      experience.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Our dedicated team works closely with major airlines,
                      ensuring that you have access to the best fares, special
                      deals, and promotions. Fly Lumbini understands the
                      importance of flexibility in travel plans, which is why we
                      offer the option to search for one-way, round-trip, or
                      multi-city flights. We also provide filters to narrow down
                      your search based on preferred airlines, flight durations,
                      and layover options, allowing you to find the most
                      convenient and suitable flights for your journey.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Accommodation:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Finding the perfect accommodation is essential for a
                      comfortable and enjoyable trip. Fly Lumbini's
                      accommodation services offer a wide range of options to
                      cater to various budgets, preferences, and travel styles.
                      Whether you're looking for luxury resorts, boutique
                      hotels, budget-friendly guesthouses, or serviced
                      apartments, our platform has an extensive selection to
                      meet your needs.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Our partnerships with reputable accommodation providers
                      around the world ensure that you have access to quality
                      stays in prime locations. Fly Lumbiniunderstands that each
                      traveler has unique preferences, which is why we offer
                      filters to refine your search based on factors such as
                      price range, star ratings, guest reviews, and amenities.
                      With Fly Lumbini, you can discover accommodations that
                      align with your travel plans and preferences, ensuring a
                      comfortable and memorable stay.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Car Rentals:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      For travelers who prefer to explore their destinations at
                      their own pace, Fly Lumbini offers reliable car rental
                      services. Our platform connects you with trusted car
                      rental companies worldwide, allowing you to choose from a
                      wide range of vehicles to suit your needs. Whether you
                      need a compact car for urban exploration or a spacious SUV
                      for a family road trip, Fly Lumbini has the perfect
                      vehicle for you.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Our car rental partners offer well-maintained vehicles,
                      competitive prices, and flexible rental periods. Fly
                      Lumbiniunderstands the importance of convenience and
                      transparency, which is why we provide detailed information
                      about vehicle specifications, rental terms, and insurance
                      options. With Fly Lumbini, you can enjoy the freedom and
                      flexibility of exploring your destination at your own
                      pace, creating unforgettable memories along the way.
                    </p>
                  </div>

                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Transfers:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Efficient airport transfers and transportation services
                      are essential for a smooth and stress-free travel
                      experience. Fly Lumbini offers a range of transfer
                      options, ensuring that you arrive at your destination
                      comfortably and on time. Our platform allows you to book
                      private transfers, shared shuttles, or convenient public
                      transportation services, depending on your preferences and
                      budget.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      We understand that navigating unfamiliar airports or
                      cities can be challenging, especially after a long
                      journey. Fly Lumbini's transfer services provide peace of
                      mind, as our experienced drivers or reliable shuttle
                      services will be waiting to greet you upon arrival. With
                      Fly Lumbini, you can relax and focus on enjoying your trip
                      while leaving the logistics of transportation in our
                      capable hands.
                    </p>
                  </div>

                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Tours:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Immerse yourself in the local culture, history, and
                      natural wonders of your destination with Fly Lumbini's
                      extensive range of tours and sightseeing experiences. Our
                      platform connects you with reputable tour operators,
                      ensuring that you have access to well-curated itineraries
                      and knowledgeable guides. Whether you're interested in
                      city tours, cultural excursions, outdoor adventures, or
                      immersive experiences, Fly Lumbini offers a wide variety
                      of options to cater to every traveler's interests.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Fly Lumbini’s tour partners are carefully selected based
                      on their expertise, professionalism, and commitment to
                      delivering exceptional experiences. Whether you're
                      exploring ancient ruins, embarking on wildlife safaris, or
                      indulging in culinary tours, our tours and sightseeing
                      services provide an opportunity to truly immerse yourself
                      in the local culture and create lasting memories.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Holiday Packages:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Fly Lumbini understands that planning a holiday can be
                      overwhelming, with various elements to consider. To
                      simplify the process, we offer a range of holiday packages
                      that cater to different preferences and budgets. Our
                      carefully crafted packages include flights,
                      accommodations, transfers, and selected activities,
                      providing a hassle-free and comprehensive travel
                      experience.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Whether you're dreaming of a tropical beach getaway, a
                      thrilling adventure in the mountains, or a cultural
                      exploration in a vibrant city, Fly Lumbini's holiday
                      packages offer a convenient and cost-effective way to
                      bring your travel aspirations to life. Our team works
                      closely with trusted partners to curate packages that
                      showcase the best of each destination, ensuring that you
                      make the most of your
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Trekking:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      For adventure enthusiasts and nature lovers,Fly Lumbini
                      offers an array of exhilarating trekking experiences in
                      some of the world's most breathtaking landscapes. Trekking
                      is a unique way to connect with nature, challenge oneself,
                      and experience the raw beauty of remote and untamed
                      regions.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Our trekking services cater to all levels of trekkers,
                      from beginners to seasoned hikers, providing a range of
                      trekking options to suit different preferences and fitness
                      levels. Fly Lumbini ‘s trekking partners are experienced
                      and knowledgeable, ensuring safe and enjoyable trekking
                      experiences.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      From the iconic trails of the Himalayas in Nepal to the
                      rugged terrains of the Andes in South America, Fly
                      Lumbini’s trekking experiences take you on unforgettable
                      journeys through diverse landscapes and unique cultures.
                      Whether you're seeking the serenity of alpine meadows, the
                      thrill of conquering high mountain passes, or the wonder
                      of witnessing stunning vistas, our trekking packages offer
                      a once-in-a-lifetime adventure.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Fly Lumbini's trekking partners prioritize responsible and
                      sustainable trekking practices, ensuring that your
                      trekking experience has a positive impact on local
                      communities and the environment. We are committed to
                      promoting ethical trekking practices, supporting local
                      economies, and preserving the natural beauty of trekking
                      destinations for generations to come.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Cruise:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      For travelers seeking a luxurious and relaxing getaway,
                      Fly Lumbini offers a range of cruise experiences that take
                      you to some of the world's most captivating destinations.
                      Cruise vacations combine the comforts of modern amenities
                      with the allure of exploring multiple destinations without
                      the hassle of frequent packing and unpacking.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Our cruise services connect you with reputable cruise
                      lines, offering a variety of itineraries that cater to
                      different interests and preferences. Whether you're
                      dreaming of exploring the azure waters of the Caribbean,
                      navigating the majestic rivers of Europe, or embarking on
                      an expedition cruise to remote polar regions, Fly Lumbini
                      has the perfect cruise for you.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Cruise vacations provide a wealth of onboard activities
                      and entertainment options, from gourmet dining experiences
                      to live performances and enriching lectures. Fly Lumbini's
                      cruise partners prioritize the safety and comfort of their
                      guests, ensuring that you have a seamless and enriching
                      cruise experience from start to finish.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Travel Insurance:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      At Fly Lumbini, we understand that unforeseen
                      circumstances can disrupt travel plans. To safeguard your
                      journey and provide peace of mind, we offer comprehensive
                      travel insurance options to protect you and your loved
                      ones during your travels.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Our travel insurance services cover a range of
                      eventualities, including trip cancellations, flight
                      delays, medical emergencies, lost baggage, and more. Fly
                      Lumbini’s travel insurance partners offer flexible plans
                      that can be customized to suit your travel itinerary and
                      individual needs.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                    By investing in
                      travel insurance through Fly Lumbini, you can travel with
                      confidence, knowing that you are protected against
                      unexpected expenses and disruptions. Our team is dedicated
                      to assisting you with selecting the most suitable travel
                      insurance plan, ensuring that you can focus on creating
                      cherished memories during your travels.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      At Fly Lumbini our travel and ticketing services open up a
                      world of possibilities for your journeys, whether for
                      leisure, business, or adventure. From seamless flight
                      bookings and comfortable accommodations to exhilarating
                      trekking experiences and luxurious cruises, we are
                      committed to curating memorable and hassle-free travel
                      experiences for our valued customers. 
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      With Fly Lumbini's expertise, global network, and
                      dedication to exceptional service, you can explore the
                      world with confidence, convenience, and peace of mind. Let
                      us be your trusted partner in making your travel dreams
                      come true, creating cherished memories that last a
                      lifetime.
                    </p>
                  </div>
                </div>
              ) : showCommonRemit == "AccountSection" ? (
                <div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Account Opening Service at Everest Bank in Nepal:
                      Experience Higher Interest Rates and Unparalleled Security
                    </p>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Introduction:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Legal Remit is delighted to offer account opening services
                      at Everest Bank Limited, one of Nepal's premier financial
                      institutions. With a strong commitment to customer
                      satisfaction and a reputation for exceptional service,
                      Everest Bank provides a secure and reliable banking
                      experience. By opening an account at Everest Bank, you can
                      enjoy competitive interest rates, personalized service,
                      and the peace of mind that comes with banking at a highly
                      reputable institution.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Higher Interest Rates:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      At Everest Bank, we understand the value of your
                      hard-earned money and aim to maximize its growth
                      potential. By opening an account with us, you gain access
                      to competitive interest rates that help your savings grow
                      faster. Our commitment to providing attractive interest
                      rates ensures that your funds work harder for you, helping
                      you achieve your financial goals and aspirations.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      We recognize the importance of earning a strong return on
                      your savings, and our dedicated team works diligently to
                      offer interest rates that outperform the market. Whether
                      you choose a savings account, fixed deposit, or other
                      investment options, Everest Bank strives to provide you
                      with the best possible returns on your deposits, ensuring
                      that your money grows steadily over time.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Amazing Service:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      At Everest Bank, we believe that exceptional service is at
                      the heart of a truly rewarding banking experience. Our
                      highly trained and professional staff are committed to
                      delivering personalized service and catering to your
                      unique banking needs. From the moment you step into our
                      branches or interact with our customer service
                      representatives, you will experience a warm and welcoming
                      environment where your financial well-being is our top
                      priority.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Our customer-centric approach means that we listen to your
                      requirements, offer tailored solutions, and provide prompt
                      assistance at every step. Whether you need assistance with
                      account opening procedures, transaction inquiries, or
                      general banking advice, our dedicated team is ready to
                      guide and support you. We value your trust and strive to
                      exceed your expectations with our amazing service.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Most Secure Bank with High Capital Investment:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Security is paramount when it comes to banking, and
                      Everest Bank is committed to ensuring the utmost safety
                      and protection of your funds. With a robust
                      infrastructure, cutting-edge technology, and stringent
                      security protocols, we have established ourselves as one
                      of the most secure banks in Nepal.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Everest Bank's high capital investment and adherence to
                      international banking standards provide you with
                      confidence in the stability and reliability of our
                      operations. We employ state-of-the-art security measures
                      to safeguard your accounts and transactions, protecting
                      your financial assets from unauthorized access or
                      fraudulent activities.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      In addition, Everest Bank strictly complies with
                      regulatory requirements and industry best practices to
                      ensure the integrity of our banking services. We
                      continuously invest in upgrading our systems, training our
                      staff, and implementing advanced security measures to
                      maintain the highest level of protection for your funds.
                      Your peace of mind is our priority, and we are committed
                      to maintaining the trust you place in us.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      By choosing to open an account at Everest Bank in Nepal,
                      you gain access to a secure, customer-focused banking
                      experience that offers higher interest rates and
                      unparalleled service. Our commitment to providing
                      competitive interest rates ensures that your savings grow
                      steadily, while our dedicated team of professionals is
                      ready to assist you with personalized service at every
                      stage of your banking journey.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      With Everest Bank, you can enjoy the peace of mind that
                      comes from banking with a highly secure institution that
                      prioritizes your financial well-being. We invite you to
                      experience the exceptional service, higher interest rates,
                      and unmatched security that make Everest Bank the
                      preferred choice for individuals seeking a reliable and
                      rewarding banking relationship.
                    </p>
                  </div>

                  <div className="">
                    <div className="text-black my-2">Account Opening Link: <a target="_blank" href="https://www.eblzone.com/onlineaccountopening/">EBL | Online Account Opening Form (eblzone.com)</a></div>
                    <div className="text-black my-2">Check interest rates: <a target="_blank" href="https://everestbankltd.com/supports/interest-and-rates/interest-rates-deposit/">Highest Interest Rate - Savings & Fixed Deposit Account - Everest Bank (everestbankltd.com)</a></div>
                    <div className="text-black my-2">Open a popup with account opening link. <a target="_blank" className="my-2" href="https://www.eblzone.com/onlineaccountopening/">https://www.eblzone.com/onlineaccountopening/</a></div>
                    <div className="text-black my-2">Please click on the below link to open an account: <a target="_blank" href="https://www.eblzone.com/onlineaccountopening/">EBL | Online Account Opening Form (eblzone.com)</a></div>


                  </div>
                </div>
              ) : (
                <div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Bank Deposit:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Legal Remit facilitates convenient and secure bank
                      deposits, providing you with the flexibility to deposit
                      funds directly into your desired bank account. This
                      service caters to both individuals and businesses,
                      streamlining financial operations and facilitating
                      seamless transactions.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      With our B2B payment feature, businesses can effortlessly
                      process transactions between their accounts or make
                      payments to suppliers, ensuring smooth financial
                      operations. This eliminates the need for manual
                      processing, reduces paperwork, and simplifies financial
                      management for enterprises. Moreover, Legal Remit's B2B
                      payment service offers transparency and auditability,
                      facilitating efficient record-keeping and financial
                      reporting.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                      Similarly, our P2B payment option allows individuals to
                      transfer funds from their personal accounts to businesses
                      against any outstanding invoices. This offers a simplified
                      and efficient payment experience, allowing individuals to
                      settle their financial obligations quickly and
                      conveniently. By bridging the gap between personal and
                      business transactions, Legal Remit empowers individuals
                      and supports the growth of enterprises.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Cash Pickup:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      For those who prefer to receive cash directly, Legal Remit
                      offers reliable and secure cash pickup services. Simply
                      select a convenient cash pickup location within our
                      network, and your recipient can collect the funds swiftly
                      and conveniently. With our strategic partnerships with
                      trusted cash pickup providers, we ensure the safety and
                      accessibility of the transferred funds, making the process
                      worry-free.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      Legal Remit's cash pickup service provides convenience,
                      especially in regions where access to banking services may
                      be limited. It offers peace of mind to both the sender and
                      the recipient, as the funds are readily available for
                      pickup within a designated timeframe. By providing
                      multiple cash pickup locations, we ensure accessibility
                      and ease of collection, even in remote areas. Our
                      commitment to security and reliability ensures a smooth
                      cash pickup experience for all parties involved.
                    </p>
                  </div>
                  <div>
                    <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
                      Wallet Deposit:
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      As digital wallets gain popularity, Legal Remit supports
                      hassle-free wallet deposits, empowering you to top up your
                      digital wallet with ease. By connecting with popular
                      e-wallets and mobile payment apps, we provide a seamless
                      transfer of funds, enabling you to make digital payments
                      conveniently and securely. Say goodbye to carrying cash
                      and enjoy the benefits of a cashless transaction
                      experience.
                    </p>
                    <p className="text-justify responsiveFontLarge first text-black fs-6  ">
                      With Legal Remit's wallet deposit service, you can
                      conveniently add funds to your digital wallet, offering
                      increased flexibility and convenience in your financial
                      transactions. This service eliminates the need for
                      physical cash, making it ideal for digital payments,
                      online shopping, and peer-to-peer transfers. Moreover, by
                      leveraging secure and encrypted payment gateways, Legal
                      Remit ensures the safety of your transactions, protecting
                      your financial information and providing peace of mind.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
