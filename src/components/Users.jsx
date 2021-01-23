import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUsers } from "../store/users";

class Users extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <ul>
        {this.props.users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.entities.users.list,
});

export default connect(mapStateToProps, { loadUsers })(Users);
