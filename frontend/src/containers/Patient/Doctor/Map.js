import React, { Component } from "react";
import { connect } from "react-redux";

class Map extends Component {
  render() {
    return (
      <div>
        <p>
          <b>Xem địa chỉ khám bệnh: </b>
        </p>
        <div className="content-right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251475.63647380174!2d105.69905679396524!3d9.991494574759697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883fbc944b83%3A0x77fc34233e5e1320!2zTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1669644851642!5m2!1svi!2s"
            allowfullscreen=""
            width="400px"
            height="400px"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
