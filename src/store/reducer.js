import { combineReducers } from 'redux'
import { loginReducer } from './Login'
import { myUnionReducer } from './MyUnion'
import { applicationReducer } from './Application'
import { taskListReducer } from './TaskList'

export default combineReducers({
  loginPage: loginReducer,
  myUnionPage: myUnionReducer,
  applicationPage: applicationReducer,
  taskListPage: taskListReducer,
})