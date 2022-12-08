import React, { Component } from "react";
import DatePicker from "react-flatpickr";
import { connect } from "react-redux";
// import "./RemedyModa.scss";
import { CommonUtils } from "../../../utils";
import moment from "moment";
import { getAllPatientForDoctor } from "../../../services/userService";
import { Toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataConfirmModal) {
      this.setState({
        email: this.props.dataConfirmModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevstate, snapshot) {
    if (prevProps.dataConfirmModal !== this.props.dataConfirmModal) {
      this.setState({
        email: this.props.dataConfirmModal.email,
      });
    }
  }

  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleSendConfirmModal = () => {
    this.props.sendConfirmModal(this.state);
  };

  render() {
    let {
      isOpenModal,
      closeConfirmModal,
      dataConfirmModal,
      sendConfirmModal,
    } = this.props;
    // console.log(this.props);
    return (
      <>
        <Modal
          size="md"
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title">xác nhận lịch khám bệnh </h5>
            <button
              className="close"
              type="button"
              aria-label="label"
              onClick={closeConfirmModal}
            >
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email bệnh nhân</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnchangeEmail(event)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.handleSendConfirmModal()}
            >
              Gửi
            </Button>
            <Button color="secondary" onClick={closeConfirmModal}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
