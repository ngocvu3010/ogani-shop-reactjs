import {combineReducers} from 'redux';
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  categoryReducer,
  productReducer,
  userReducer
});
