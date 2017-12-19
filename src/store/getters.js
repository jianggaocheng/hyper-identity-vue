const getters = {
  token: (state) => {
    let token = null;
    token = state.user.token;

    return token;
  }
};

export default getters;
