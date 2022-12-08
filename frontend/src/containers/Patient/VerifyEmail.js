import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import "./VerifyEmail.scss";
import HomeHeader from "../HomePage/HomeHeader";

import Paypal from "../Patient/Paypal";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data ....</div>
          ) : (
            <div>
              {" "}
              {+errCode === 0 ? (
                <div>
                  <div>
                    <img
                      src="https://www.controls-explorer.com/wp-content/uploads/2017/04/Tik-Mark-300x293.png"
                      alt="Xác nhận thành công"
                    />
                  </div>
                  <div className="infor-booking">
                    Xác nhận lịch hẹn thành công
                  </div>
                  <Paypal />
                </div>
              ) : (
                <div>
                  <div>
                    <img
                      src="https://image.freepik.com/free-vector/red-green-ok-not-ok-icons_17-1106090017.jpg"
                      alt="Xác nhận không thành công"
                    />
                  </div>
                  <div className="infor-booking">
                    Lịch hẹn không tồn tại hoặc đã được xác nhận
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
