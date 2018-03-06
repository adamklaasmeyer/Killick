import services from "./services";

const promiseMiddleware = store => next => action => {
  console.log(action);
  if (isPromise(action.payload)) {
    store.dispatch({ type: "ASYNC_START", subtype: action.type });
    action.payload
      .then(res => {
        action.payload = res;
        store.dispatch(action);
      })
      .catch(error => {
        action.error = true;
        console.log(error.response);
        action.payload = error.response.data.errors;
        store.dispatch(action);
      });
    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === "LOGIN" || action.type === "REGISTER") {
    if (!action.error) {
      window.localStorage.setItem("jwt", action.payload.user.token);
      //set axios header auth instance
      services.setToken(action.payload.user.token);
    }
  }
  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}

export { localStorageMiddleware, promiseMiddleware };
