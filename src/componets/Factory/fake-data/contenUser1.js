import React from 'react'
import PropTypes from 'prop-types'
import * as s from "../../../styles/globalStyles";

const ContentUser1 = props => {
    return (

            <s.ContentHd>
                <s.ContentBg>
                    <s.ContentLogo>
                        <s.Icon/>
                    </s.ContentLogo>
                    <s.ContentH1>{props.namecontent}</s.ContentH1>
                    <s.ContentP>{props.sub}</s.ContentP>
 
                </s.ContentBg>
            </s.ContentHd>
  

    )
}
ContentUser1.propTypes = {
    namecontent: PropTypes.string.isRequired,
    sub: PropTypes.string.isRequired,
    btn: PropTypes.string.isRequired,
}


export default ContentUser1