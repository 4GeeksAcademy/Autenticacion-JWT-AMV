export const initialStore = () => {
  return {
    token: sessionStorage.getItem("token") || null,
    message: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      return {
        ...store,
        token: action.payload,
      };
    case "logout":
      sessionStorage.removeItem("token");
      return {
        ...store,
        token: null,
      };
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };
    default:
      return store;
  }
}
