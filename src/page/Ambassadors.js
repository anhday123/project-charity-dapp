import React from 'react'
import * as s from "../styles/globalStyles";
import { useSelector } from "react-redux";

const Ambassadors = () => {


    const data = useSelector((state) => state.data);

    console.log(data.AllProjects )

    return (
        <s.Screen>
            <h1>huhuhu</h1>
        </s.Screen>
    )
}

export default Ambassadors
