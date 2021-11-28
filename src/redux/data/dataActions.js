// log
import store from "../store";

const fetchDataRequest = () => {
    return {
        type: "CHECK_DATA_REQUEST",
    };
};

const fetchDataSuccess = (payload) => {
    return {
        type: "CHECK_DATA_SUCCESS",
        payload: payload,
    };
};

const fetchDataFailed = (payload) => {
    return {
        type: "CHECK_DATA_FAILED",
        payload: payload,
    };
};
const removeSelectedProduct = () => {
    return {
        type: "REMOVE_SELECTED_PRODUCT",
    };
};


export const fetchData = (account) => {
    return async(dispatch) => {
        dispatch(fetchDataRequest());
        try {
            let AllProjects = await store
                .getState()
                .blockchain.Charity.methods.getAllProjects()
                .call();
            let AllOwnerProjects = await store
                .getState()
                .blockchain.Charity.methods.getOwnerProjects(account)
                .call();
            let Donors = await store
                .getState()
                .blockchain.Charity.methods.getAllDonors()
                .call();
            let Receivers = await store
                .getState()
                .blockchain.Charity.methods.getAllReceiver()
                .call();


            dispatch(
                fetchDataSuccess({
                    AllProjects,
                    AllOwnerProjects,
                    Donors,
                    Receivers,

                })
            );
        } catch (err) {
            console.log(err);
            dispatch(fetchDataFailed("Could not load data from contract."));

        }
    };
};
export const removeData = () => {
    return async(dispatch) => {
        dispatch(removeSelectedProduct());
    };
};