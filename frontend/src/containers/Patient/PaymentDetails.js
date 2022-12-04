import React from "react";
import Card from "react-credit-cards";

// import SupportedCards from "./Cards";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "../../utils/Payment";

import "react-credit-cards/es/styles-compiled.css";

import "./PaymentDetails.scss";

import { toast } from "react-toastify";

import { postPatientPayment } from "../../services/userService";

export default class App extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  showToastMessagePay = async (event) => {
    let res = await postPatientPayment({
      number: this.state.number,
      name: this.state.name,
      expiry: this.state.expiry,
      cvc: this.state.cvc,
    });

    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment succeed!");
    } else {
      toast.error(" Booking a new appointment error!");
    }
    // console.log("check confirm button: ", this.state);
  };
  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment">
        <div className="content">
          <h3>Vui lòng thanh toán để nhận hóa đơn</h3>
          {/* <img
          src="https://befresco.vn/fileuploads/Support/Content/Avatar/d9d0033e5c3c401cb94df4b688a523a9.png"
          alt="Chọn thanh toán"
        /> */}
          <div className="col-12 form-group">
            <label>Họ và tên </label>
            <input
              className="form-control"
              // value={this.state.fullName}
              // onChange={(event) =>
              //   this.handleOnchangeInput(event, "fullName")
              // }
            />
          </div>
          <div className="col-12 form-group">
            <label> Số điện thoại </label>
            <input
              className="form-control"
              // value={this.state.phoneNumber}
              // onChange={(event) =>
              //   this.handleOnchangeInput(event, "phoneNumber")
              // }
            />
          </div>
          <div className="col-12 form-group">
            <label>Địa chỉ email </label>
            <input
              className="form-control"
              // value={this.state.email}
              // onChange={(event) =>
              //   this.handleOnchangeInput(event, "email")
              // }
            />
          </div>
          <div className="col-12 form-group">
            <label>Địa chỉ liên lạc </label>
            <input
              className="form-control"
              // value={this.state.address}
              // onChange={(event) =>
              //   this.handleOnchangeInput(event, "address")
              // }
            />
          </div>
          <div className="col-12 form-group">
            <label>Lý do khám </label>
            <input
              className="form-control"
              // value={this.state.reason}
              // onChange={(event) =>
              //   this.handleOnchangeInput(event, "reason")
              // }
            />
          </div>
          <div className="App-payment">
            <h3>Biling details</h3>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
            <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
                <small>E.g.: 49..., 51..., 36..., 37...</small>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>
              <input type="hidden" name="issuer" value={issuer} />
              <div className="form-actions">
                <button
                  className="btn btn-primary btn-block"
                  onClick={(event) => this.showToastMessagePay(event)}
                >
                  PAY
                </button>
              </div>
            </form>
            {/* {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )} */}
          </div>
        </div>
      </div>
    );
  }
}
