const commonState = {
    isLoading: false
}

const commonReducer = (state = commonState, action) => {
    switch (action.type) {
        case "START_LOADING":
            return {...state, isLoading: true};
        case "STOP_LOADING":
            return { ...state, isLoading: false };
        default:
            return state;
    }
}

export default commonReducer;