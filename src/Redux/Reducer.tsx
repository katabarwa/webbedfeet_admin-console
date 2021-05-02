import { Reducer } from 'redux'
type TReduxReducer = Reducer

//This redux reducer sets the redux store data

//The state is the current state, this is fed in by the core Reducer module

//The action is an object = { type: "store property", value: "store property value" }, this is sent by dispatching an action from anywhere within this app. Dispatch action syntax: dispatch({ type: string, value: any });

//For Example, if you want to set a users data in the redux store, dispatch an action from anywhere in the app like this: dispatch({ type: "user", value: *the users data* })

const ReduxReducer: TReduxReducer = (state, action) => {
  return {
    ...state,
    [action.type]: action.value,
  }
}

export type TAppState = ReturnType<typeof ReduxReducer>

export default ReduxReducer
