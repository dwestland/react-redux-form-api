import React from 'react'
import PropTypes from 'prop-types'

const Users = ({users}) => (
  <ul>
    {users.map((user, i) =>
      <li key={i}>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.email}</p>
        <button>Edit</button>
        <button>Edit</button>
      </li>
    )}
  </ul>
)

User.propTypes = {
  users: PropTypes.firstName.isRequired
}

export default Users