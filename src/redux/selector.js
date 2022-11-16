export const selectCategorySelector = (state) => state.categoryReducer.categoryData;
export const selectCategoryDetailSelector = (state) => state.categoryReducer.category;

export const selectFeatureProductSelector = (state) => state.productReducer.featureProduct;
export const selectLatestProductSelector = (state) => state.productReducer.lastestProduct;
export const selectTopRateProductSelector = (state) => state.productReducer.topRatedPRoduct;
export const selectReviewProductSelector = (state) => state.productReducer.reviewProduct;
export const selectProductSelector = (state) => state.productReducer.product;

export const selectCartSelector = (state) => state.cartReducer;
export const getCurrentUserSelector = (state) => state.userReducer.user;
