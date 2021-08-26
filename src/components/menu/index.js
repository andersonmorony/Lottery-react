import React from 'react';
import './style.css';

const menu = () => {
    return(
        <div className="row">
              <div className="col-9">
                <h1>Lottery <img src="https://img.icons8.com/nolan/64/fire-element.png"/></h1>
              </div>
              <div className="col-3 value">
                <span>Minimum value is JUST <strong>0.1 Ether</strong>  <img src="https://img.icons8.com/doodle/28/000000/coins--v1.png"/></span>
              </div>
        </div>
    )
}

export default menu;