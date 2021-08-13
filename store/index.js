import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from './reducer'

const middleware = [thunk];
const composeEnhancers = (
  typeof window !== "undefined"
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(
  reducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware)),
);
export default store;
