import React , { useState }  from 'react';
import _ from 'lodash';
import useForm from '../../hooks/form';

const ExtraCharges = (props) => {
    //console.log('props',props);

  const submitExtraCharges = () => {
    
    //depending on quantity add however much
    const charges = {id:props.extraCharges.length,chargeName:inputs.chargeName,amount:inputs.amount};

    //set new list
    props.setExtraCharges([...props.extraCharges,charges]);

  
  }

  //const [diners, setDiners] = useState([]);
  const chargeDefaults = {id:'',chargeName:'',amount:''};
  
  const {inputs, handleInputChange, handleSubmit} = useForm(submitExtraCharges, chargeDefaults, true);




  return (
    <React.Fragment>
          <h4 className="title">Extra Charges / Discounts</h4>
          <div className="charges__list">
            <ul>
              {/*console.log('charges list',props.extraCharges)*/}
              {props.extraCharges.map((charge, key) => {
                //console.log(index);
                return (<li key={key} 
                    id={key}
                >
                  {charge.chargeName} @ £{charge.amount}
                </li>);
              })}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input id="chargeName" onChange={handleInputChange} type="text" value={inputs.chargeName} placeholder="Charge Name" required={true}/>
            </div>

            <div className="form-group">
              <input id="amount" onChange={handleInputChange} type="text" value={inputs.amount} placeholder="Amount" required={true}/>
            </div>
            
            <button type="submit">Add Extra Charge</button>
          </form>

    </React.Fragment>
  );
};
 
export default ExtraCharges;