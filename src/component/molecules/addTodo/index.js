import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

export default class AddTodo extends Component {
  state = {
    title: "",
  };

  onSubmit = (e) => {
    if (this.state.title === "") {
      alert("Please add task first");
      return;
    }

    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  onChange = (e) => this.setState({ title: e.target.value });

  render() {
    return (
      <Container style={{ display: "flex" }}>
        <Input type="text" name="title" placeholder="Add Todo..." value={this.state.title} onChange={this.onChange} />
        <Submit onClick={this.onSubmit}>Add</Submit>
      </Container>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func,
};

AddTodo.propTypes = {
  addTodo: () => {},
};

const Container = styled.div`
  display: flex;
  width: 350px;
`;

const Submit = styled.button`
  background-color: #49c6e5;
  color: #19647e;
  margin-bottom: 10px;
  height: 100%;

  &:focus {
    outline: 0;
  }
`;

const Input = styled.input`
  display: flex;
  flex: 1;
  &:focus {
    outline: 0;
  }
`;
