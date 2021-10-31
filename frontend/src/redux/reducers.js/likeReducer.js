// import {
//   ADD_LIKE_REQUEST,
//   ADD_LIKE_SUCCESS,
//   ADD_LIKE_FAIL,
//   REMOVE_LIKE_SUCCESS,
//   REMOVE_LIKE_REQUEST,
//   REMOVE_LIKE_FAIL,
//   RESET_LIKE_STATE,
// } from "../types";

// const initialLikeState = {
//   isLoading: false,
//   isUpdated: false,
//   error: null,
// };

// const likeReducer = (state = initialLikeState, action) => {
//   switch (action.type) {
//     case ADD_LIKE_REQUEST:
//     case REMOVE_LIKE_REQUEST:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case ADD_LIKE_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         isUpdated: true,
//         // message :
//       };
//     case REMOVE_LIKE_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         isUpdated: true,
//       };

//     case ADD_LIKE_FAIL:
//       return {
//         ...state,
//         isLoading: false,
//         isUpdated: false,
//         error: action.payload,
//       };
//     case RESET_LIKE_STATE:
//       return {
//         ...initialLikeState,
//       };
//     default:
//       return state;
//   }
// };

// export default likeReducer;
