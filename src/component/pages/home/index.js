import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";

import Userctions from "../../../redux/userRedux";
import taskActions from "../../../redux/taskRedux";
import AddTodo from "../../molecules/addTodo";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: this.props.task.fetch,
      errorMessage: this.props.user.error,
      successRegister: this.props.user.successRegister,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (nextProps.task.fetch !== prevState.showLoading) {
      update.showLoading = nextProps.task.fetch;
    }

    return update;
  }

  componentDidMount() {
    // this.props.fetchTaskSaga();
  }

  render() {
    const { showLoading } = this.state;
    return (
      <LoadingOverlay active={showLoading} spinner>
        <Container>
          <TodoContainer>
            <AddTodo />

            <div style={{ marginTop: 20 }}>
              {this.props.task.task.map((item, index) => {
                return (
                  <div
                    style={{
                      background: "#F4F4F4",
                      padding: "10px",
                      borderBottom: "1px #ccc dotted",
                      width: 700,
                    }}>
                    <p style={{ marginBottom: 0 }}>
                      <input
                        type="checkbox"
                        // onChange={this.props.markComplete.bind(this, id)}
                        // checked={completed ? "checked" : ""}
                      />{" "}
                      {item.task}
                      <button style={{ float: "right" }}>
                        <i class="fa fa-trash" aria-hidden="true" />
                      </button>
                    </p>
                  </div>
                );
              })}
            </div>
          </TodoContainer>
        </Container>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = ({ user, task }) => {
  return {
    user,
    task,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // loginRequest: () => dispatch(Userctions.loginRequest()),
    fetchTaskSaga: () => dispatch(taskActions.fetchTask()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

Home.propTypes = {
  user: PropTypes.object,
  task: PropTypes.object,
};

Home.defaultProps = {
  user: {
    user: {},
    token: "",
    fetch: false,
    fetchSuccess: false,
    error: null,
    successRegister: false,
  },
  task: {
    task: [],
    fetch: false,
    fetchSuccess: true,
    error: null,
  },
};

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 100vh;
  background-color: green;
  align-items: center;
  margin-top: 150px;
`;
