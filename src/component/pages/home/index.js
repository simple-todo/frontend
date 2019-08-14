import "font-awesome/css/font-awesome.min.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import LoadingOverlay from "react-loading-overlay";

import taskActions from "../../../redux/taskRedux";
import AddTodo from "../../molecules/addTodo";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: this.props.task.fetch,
      message: this.props.task.message,
      errorMessage: this.props.user.error,
      successRegister: this.props.user.successRegister,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};

    if (nextProps.task.fetch !== prevState.showLoading) {
      update.showLoading = nextProps.task.fetch;
    }

    if (nextProps.task.message !== prevState.message) {
      update.message = nextProps.task.message;
      nextProps.task.message !== "" && alert(nextProps.task.message); // Show message to user everytime we receive feedback from server
      nextProps.fetchTaskSaga(); // Fetch all task again, every time user have changed
    }

    return update;
  }

  componentDidMount() {
    this.props.fetchTaskSaga();
  }

  renderTask(item, index) {
    return (
      <TaskContainer key={index} is_completed={item.is_completed}>
        <p style={{ marginBottom: 0 }}>
          <input
            type="checkbox"
            onChange={() => this.props.fetchUpdateTaskSaga(item.id)}
            checked={item.is_completed ? "checked" : ""}
          />
          {` ${item.task} `}
          <button style={{ float: "right" }} onClick={() => this.props.fetchDeleteTaskSaga(item.id)}>
            <i class="fa fa-times" aria-hidden="true" style={{ color: "red" }} />
          </button>
        </p>
      </TaskContainer>
    );
  }

  render() {
    const { showLoading } = this.state;
    return (
      <LoadingOverlay active={showLoading} spinner>
        <Container>
          <TodoContainer>
            <AddTodo addTodo={this.props.fetchAddTaskSaga} />

            <div style={{ marginTop: 20 }}>
              {this.props.task.task.map((item, index) => {
                return this.renderTask(item, index);
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
    fetchDeleteTaskSaga: (todo_id) => dispatch(taskActions.fetchDeleteTask(todo_id)),
    fetchUpdateTaskSaga: (todo_id) => dispatch(taskActions.fetchUpdateTask(todo_id)),
    fetchAddTaskSaga: (task) => dispatch(taskActions.fetchAddTask(task)),
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
    message: "",
  },
};

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  overflow: auto;
  justify-content: center;
  align-items: center;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 100vh;
  // background-color: green;
  align-items: center;
  margin-top: 150px;
`;

const TaskContainer = styled.div`
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
  width: 700px;
  text-decoration: ${(props) => (props.is_completed ? "line-through" : `none`)};
`;
