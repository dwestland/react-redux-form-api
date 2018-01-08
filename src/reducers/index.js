import { combineReducers } from 'redux'
import {
  REQUEST_USERS, RECEIVE_USERS, ADD_USER
} from '../actions'

// Users Reducers
// Fetch users

// User Filter Reducers
// Sort By Name
// Sort By creation date

const usersReducerDefaultState = {
  users: {}
};

const fetchUsers = (state = [], action) => {
  switch (action.type) {
    case 'REQUEST_USERS':
      return [
        ...state,
        action.users
      ];
    default:
      return state
  }
}

const addUsers = (state = usersReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      state.concat(action.users)
    default:
      return state
  }
}


const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  users: 
  postsBySubreddit,
  selectedSubreddit
})

export default rootReducer