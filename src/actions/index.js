export const REQUEST_POSTS = 'REQUEST_USERS'
export const RECEIVE_POSTS = 'RECEIVE_USERS'
export const REMOVE_USER = 'REMOVE_USER'
export const ADD_USERS = 'ADD_USERS'

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit
})

const url = 'http://rest.learncode.academy/api/xanadu/users/';

export const fetchUsers  = () => {
  return (dispatch) => {
    fetch(url)
      .then(res => res.json())
      .then(users => {
        dispatch({
          type: REQUEST_USERS,
          payload: users
        })
      })
  }
}
export const addUsers  = (
  {
    firstName = '',
    lastName = '',
    email = '',
    zipCode = '',
    dateCreated = 0
  } = {}
) => ({
  type: 'ADD_USERS',
  user: {
    firstName,
    lastName,
    email,
    zipCode,
    dateCreated
  }
});

const removeUser = ({ id } = {}) => ({
  type: 'REMOVE_USER',
  id
});




export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
