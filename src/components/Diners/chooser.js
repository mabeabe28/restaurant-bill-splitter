import React , { useState }  from 'react';
import _ from 'lodash';

const DinerChooser = (props) => {
    console.log('props',props);


  return (
    <React.Fragment>
          <div className="people-chooser__list">
            
            <div className="diner-menu">
              {/*console.log('diners list',props.diners)*/}
              {props.diners.map((diner, key) => {
                //console.log(index);
                return (<div className="diner-item" key={key} 
                    onClick={props.onDinerClick}
                    id={key}
                > 
                  <div className={`diner-item__button person-color-${key+1}`}
                  onClick={props.onDinerClick}
                  id={key}
                  >
                    {diner.name.slice(0,1)} 
                  </div>
                  <div className="diner-item__fullname">
                    {diner.name}
                  </div>

                </div>);
              })}
            </div>

            { props.selectedDiner.name && (
                <div>
                  Choosing {props.selectedDiner.name}'s Items
                </div>
              )
            }
          </div>

    </React.Fragment>
  );
};
 
export default DinerChooser;