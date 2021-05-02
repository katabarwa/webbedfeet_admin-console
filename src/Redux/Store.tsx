import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";
import ReduxReducer from "./Reducer";

const ReduxStore = createStore(ReduxReducer, {}, devToolsEnhancer({}));

export default ReduxStore;
