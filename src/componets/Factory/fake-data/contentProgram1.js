import React from 'react'
import PropTypes from 'prop-types'
import * as s from "../../../styles/globalStyles";


const ContentProgram = props => {
    return (
    
            <s.ContentHd2>
                <s.ContentBg2>
                        <s.Icon2/>
                    <s.ContentH12>{props.name}</s.ContentH12>
                    <s.ContentP2>{props.sub}</s.ContentP2>
                </s.ContentBg2>
            </s.ContentHd2>
       
    )
}
ContentProgram.propTypes = {
    name: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
   
}

export default ContentProgram