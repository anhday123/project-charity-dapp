// constants
import Web3 from "web3";
import Charity from "../../contracts/Charity.json";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    };
};

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    };
};

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    };
};

const updateAccountRequest = (payload) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload,
    };
};

export const connect = () => {
    return async(dispatch) => {
        dispatch(connectRequest());
        if (window.ethereum) {

            let web3 = new Web3(window.ethereum);

            try {
                await window.ethereum.enable();

                const accounts = await window.ethereum.request({
                    method: "eth_accounts",
                });
                const networkId = await window.ethereum.request({
                    method: "net_version",
                });

                // const CharityNetwork = await Charity.networks[networkId]

                if(networkId == 97){
                    const charity = new web3.eth.Contract(
                        Charity.abi,
                        "0x0E70D9Bb7aC7Cf24988d033D91900fC024759f8f"
                );
                // const CharityNetwork = await Charity.networks[networkId]
                // if (CharityNetwork) {
                //     const charity = new web3.eth.Contract(
                //         Charity.abi,
                //         CharityNetwork.address
                //     );
                    dispatch(
                        connectSuccess({
                            account: accounts[0],
                            Charity: charity,
                            web3: web3,
                        })
                    );
                    // Add listeners start
                    window.ethereum.on("accountsChanged", (accounts) => {
                        dispatch(updateAccount(accounts[0]));
                    });
                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });
                    // Add listeners end
                } else {
                    dispatch(connectFailed("Change network to BSC testnet.."));
                }
            } catch (err) {
                dispatch(connectFailed("Something went wrong."));
            }
        } else {
            dispatch(connectFailed("Install Metamask."));
        }
    };
};

export const updateAccount = (account) => {
    return async(dispatch) => {
        dispatch(updateAccountRequest({ account: account }));
        dispatch(fetchData(account));
    };
};