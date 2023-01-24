import { combineReducers } from "redux"
import todoReducer from "./todo"
import problemReducer from './problem'
import answerReducer from "./answer"
import userReducer from "./user"

const reducer = combineReducers({
  problemReducer,
  todoReducer,
  answerReducer,
  userReducer,
})

export default reducer