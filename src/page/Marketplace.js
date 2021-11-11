import React from 'react'
import "./styled/about.scss"
import H1 from "../assets/images/bg/about-1.jpeg"
import H2 from "../assets/images/bg/about-2.jpeg"
import H3 from "../assets/images/bg/about-3.jpeg"
import H4 from "../assets/images/bg/about-4.jpeg"
import * as s from "../styles/globalStyles";
const Marketplace = () => {
    return (
      <s.Screen>
<div className="">
            <div className="explore-main">
              <div className="explore-image">
                <img srcset={H1} alt="" />
              </div>
              <div className="explore-content">
                <h2 className="heading heading--small explore-heading">
                  A new way to explore the world
                </h2>
                <p className="text explore-desc">
                  For decades travellers have reached for Lonely Planet books
                  when looking to plan and execute their perfect trip, but now,
                  they can also let Lonely Planet Experiences lead the way
                </p>
                <a href="#!" className="btn1 btn--primary">Learn more</a>
              </div>
            </div>
            <div className="explore-main reverse">
              <div className="explore-image">
                <img srcset={H2} alt="" />
              </div>
              <div className="explore-content">
                <h2 className="heading heading--small explore-heading">
                  A new way to explore the world
                </h2>
                <p className="text explore-desc">
                  For decades travellers have reached for Lonely Planet books
                  when looking to plan and execute their perfect trip, but now,
                  they can also let Lonely Planet Experiences lead the way
                </p>
                <a href="#!" className="btn1 btn--primary">Learn more</a>
              </div>
            </div>
            <div className="explore-main">
              <div className="explore-image">
                <img srcset={H3} alt="" />
              </div>
              <div className="explore-content">
                <h2 className="heading heading--small explore-heading">
                  A new way to explore the world
                </h2>
                <p className="text explore-desc">
                  For decades travellers have reached for Lonely Planet books
                  when looking to plan and execute their perfect trip, but now,
                  they can also let Lonely Planet Experiences lead the way
                </p>
                <a href="#!" className="btn1 btn--primary">Learn more</a>
              </div>
            </div>
            <div className="explore-main reverse">
              <div className="explore-image">
                <img srcset={H4} alt="" />
              </div>
              <div className="explore-content">
                <h2 className="heading heading--small explore-heading">
                  A new way to explore the world
                </h2>
                <p className="text explore-desc">
                  For decades travellers have reached for Lonely Planet books
                  when looking to plan and execute their perfect trip, but now,
                  they can also let Lonely Planet Experiences lead the way
                </p>
                <a href="#!" className="btn1 btn--primary">Learn more</a>
              </div>
            </div>

      </div>
            
      </s.Screen>
    )
}
export default Marketplace

// const Container = styled.div `
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     gap: 0 50px;
//     padding: 16px 44px;
// `

// const Image = styled.div `
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     gap: 0 50px;
//     padding: 16px 44px;
//     img {
//         width: 800px;
//         border-radius: 10px;
//     }
// `
// const Text = styled.p `
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     gap: 0 50px;
//     padding: 16px 44px;
// `

