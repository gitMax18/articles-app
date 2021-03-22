/////////// ---Auth---//////////////

// register user :

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";

// login user :

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";

// logout user

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAIL = "LOGOUT_USER_FAIL";

// check user

export const CHECK_USER_SUCCESS = "CHECK_USER_SUCCESS";
export const CHECK_USER_NONE = "CHECK_USER_NONE";

// reset error
export const RESET_AUTH_ERROR = "RESET_ERROR";

/////////// ---User---//////////////

// get user profil

export const PROFIL_USER_REQUEST = "PROFIL_USER_REQUEST";
export const PROFIL_USER_SUCCESS = "PROFIL_USER_SUCCESS";
export const PROFIL_USER_FAIL = "PROFIL_USER_FAIL";

//update user Profil

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

// update user password

export const UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";
export const UPDATE_PASSWORD_FAIL = "UPDATE_PASSWORD_FAIL";

// delete user

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

// reset error

export const RESET_USER_ERROR = "RESET_USER_ERROR";
/////////// ---Paper---//////////////

//get all articles

export const GET_ALL_PAPERS_REQUEST = "GET_ALL_PAPERS_REQUEST";
export const GET_ALL_PAPERS_SUCCESS = "GET_ALL_PAPERS_SUCCESS";
export const GET_ALL_PAPERS_FAIL = "GET_ALL_PAPERS_FAIL";
export const RESET_PAPERS_STATE = "RESET_PAPERS_STATE";

//get one articles

export const GET_ONE_PAPERS_REQUEST = "GET_ONE_PAPERS_REQUEST";
export const GET_ONE_PAPERS_SUCCESS = "GET_ONE_PAPERS_SUCCESS";
export const GET_ONE_PAPERS_FAIL = "GET_ONE_PAPERS_FAIL";
export const RESET_PAPER_STATE = "RESET_PAPER_STATE";

// create new article

export const CREATE_PAPER_REQUEST = "CREATE_PAPER_REQUEST";
export const CREATE_PAPER_SUCCESS = "CREATE_PAPER_SUCCESS";
export const CREATE_PAPER_FAIL = "CREATE_PAPER_FAIL";

//update article

export const UPDATE_PAPER_REQUEST = "UPDATE_PAPER_REQUEST";
export const UPDATE_PAPER_SUCCESS = "UPDATE_PAPER_SUCCESS";
export const UPDATE_PAPER_FAIL = "UPDATE_PAPER_FAIL";

//delete article

export const DELETE_PAPER_REQUEST = "DELETE_PAPER_REQUEST";
export const DELETE_PAPER_SUCCESS = "DELETE_PAPER_SUCCESS";
export const DELETE_PAPER_FAIL = "DELETE_PAPER_FAIL";

export const RESET_NEW_PAPER_STATE = "RESET_NEW_PAPER_STATE";
/////////// ---App---//////////////

export const GET_APP_INFOS_REQUEST = "GET_APP_INFOS_REQUEST";
export const GET_APP_INFOS_SUCCESS = "GET_APP_INFOS_SUCCESS";
export const GET_APP_INFOS_FAIL = "GET_APP_INFOS_FAIL";
