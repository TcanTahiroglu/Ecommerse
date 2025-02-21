const initialState = {
<<<<<<< HEAD
  user: null,
  token: localStorage.getItem('token') || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default userReducer;
=======
    user: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_USER":
        return { ...state, user: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
>>>>>>> 53788646f71bbd2f86816460fe09050d2c71013b
