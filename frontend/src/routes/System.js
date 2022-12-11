import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";

import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManagerSpecialtyList from "../containers/System/Specialty/ManagerSpecialtyList";

import ManageClinic from "../containers/System/Clinic/ManageClinic";
import ManagerClinicList from "../containers/System/Clinic/ManagerClinicList";
import ManagerHandbook from "../containers/System/Handbook/ManageHandbook";
import ManageHandbookList from "../containers/System/Handbook/ManageHandbookList";

import BarChart from "../containers/System/Chart/BarChart";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/doctor-redux" component={UserRedux} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />

              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route path="/system/manage-clinic" component={ManageClinic} />
              <Route
                path="/system/manage-clinic-list"
                component={ManagerClinicList}
              />
              <Route
                path="/system/manage-specialty-list"
                component={ManagerSpecialtyList}
              />
              <Route
                path="/system/manage-handbook"
                component={ManagerHandbook}
              />
              <Route
                path="/system/manage-handbook-list"
                component={ManageHandbookList}
              />
              <Route path="/system/manage-chart" component={BarChart} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
