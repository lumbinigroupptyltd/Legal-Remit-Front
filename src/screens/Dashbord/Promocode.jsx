import React from "react";
import { connect } from "react-redux";
import PageHeader from "../../components/PageHeader";
import SparkleCard from "../../components/SparkleCard";
import SecurityMainCard from "../../components/SecurityMainCard";
import InstumateStatusCard from "../../components/InstumateStatusCard";
import SwitchBordCard from "../../components/SwitchBordCard";

import AcIcon from "../../assets/images/air-conditioner.png";
import AcIconGray from "../../assets/images/air-conditioner-grey.png";
import FridgeIcon from "../../assets/images/fridge.png";
import FridgeIconGray from "../../assets/images/fridge-grey.png";
import WMIcon from "../../assets/images/washing-machine.png";
import WMIconGray from "../../assets/images/washing-machine-grey.png";

import {
  sparkleCardData,
  buttonsIndoor,
  buttonsOutdoor,
  buttonsAppliences,
} from "../../Data/IoTData";
import {
  onPressSecuritySystem,
  onPressMainGate,
  onPressSwitchBordButton,
  onPressOutSwitchBordButton,
  onPressAppliencesSwitchBordButton,
  onPressSwitchBordDropDown,
  onPressOutdoorDropDown,
  onPressSwithOnAllOut,
  onPressAllOffLightOut,
  onPressSwithOnAllIn,
  onPressAllOffLightIn,
} from "../../redux/actions";

class Promocode extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const {
      isSecuritySystem,
      isMaingate,
      switchBoardSwitch,
      switchOutBoardSwitch,
      switchAppliencesBoardSwitch,
      isIndoorDropdown,
      isOutdoorDropdown,
    } = this.props;
    return (
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid"      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
            <PageHeader
              HeaderText="PromoCode"
              Breadcrumb={[
                { name: "Dashboard", navigate: "" },
                { name: "IoT Dashboard", navigate: "" },
              ]}
            />
             <div className="row clearfix">
              <div className="container">
                <div className="wrapper ">
                  <div className="content ">
                    <div className="item border-0 d-flex justfy-content-center flex-column">
                      <h1>COMING SOON</h1>
                      <p className="mt-3">This website is under construction.</p>
                    </div>
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

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, {
  onPressSecuritySystem,
  onPressMainGate,
  onPressSwitchBordButton,
  onPressOutSwitchBordButton,
  onPressAppliencesSwitchBordButton,
  onPressSwitchBordDropDown,
  onPressOutdoorDropDown,
  onPressSwithOnAllOut,
  onPressAllOffLightOut,
  onPressSwithOnAllIn,
  onPressAllOffLightIn,
})(Promocode);
