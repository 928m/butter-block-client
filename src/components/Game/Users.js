import React, { Component } from 'react';
import Cube from '../elements/Cube';
import { UserList } from '../StyledComponents';
import { Message } from './Message';

class Users extends Component {
  render() {
    const { users, submissionUserId, id } = this.props;

    return (
      <ul className="users">
        {
          users.map((user) => (
            <UserList
              key={user.id}
              data-id={user.id}
              className={`${(submissionUserId === user.id) && 'on'} ${(id === user.id) && 'me'}`}
            >
              <Cube />
              <span>{user.nickname}</span>
              <em className="score">{user.score}</em>
              {user.message && <Message text={user.message} />}
            </UserList>
          ))
        }
      </ul>
    );
  }
};

export default Users;
