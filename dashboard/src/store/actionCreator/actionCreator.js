import * as authActions from "../reducers/authReducer/actions";
import * as usersActions from "../reducers/userReducer/actions";
import * as themeActions from "../reducers/themeReducer/actions";
import * as rolesActions from "../reducers/roleReducer/actions";

const actionCreator = {
    ...authActions,
    ...usersActions,
    ...themeActions,
    ...rolesActions
};

export default actionCreator;