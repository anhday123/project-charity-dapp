const initialState = {
    loading: false,
    AllProjects: [],
    AllOwnerProjects: [],
    Donors: [],
    Receivers: [],
    error: false,
    errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHECK_DATA_REQUEST":
            return {
                ...initialState,
                loading: true,
            };
        case "CHECK_DATA_SUCCESS":
            return {
                ...initialState,
                loading: false,
                AllProjects: action.payload.AllProjects,
                AllOwnerProjects: action.payload.AllOwnerProjects,
                Donors: action.payload.Donors,
                Receivers: action.payload.Receivers,

            };
        case "CHECK_DATA_FAILED":
            return {
                ...initialState,
                loading: false,
                error: true,
                errorMsg: action.payload,
            };
        default:
            return state;
    }
};

export default dataReducer;