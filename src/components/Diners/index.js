import React , { useState }  from 'react';
import _ from 'lodash';
import useForm from '../../hooks/form';

const Diners = (props) => {
    //console.log('props',props);

  const submitDiner = () => {
    
    //depending on quantity add however much
    const diner = {id:props.diners.length,name:inputs.dinerName,items:[]};

    //set new list
    props.setDiners([...props.diners,diner]);

  
  }

  //const [diners, setDiners] = useState([]);
  const dinerDefaults = {id:'',dinerName:'',items:[]};
  
  const {inputs, handleInputChange, handleSubmit} = useForm(submitDiner, dinerDefaults, true);




  return (
    <React.Fragment>
          <div className="section-box">
            <span className="section-box--title">Hello!</span><br/>
            <span>Insert the people in the group. In the instance a person is paying for someone, still add that person to the group and select their items, it will help with the calculation</span>
          </div>
          <div className="people__list">
            <ul>
              {/*console.log('diners list',props.diners)*/}
              {props.diners.map((diner, key) => {
                //console.log(index);
                return (<li key={key} 
                    onClick={props.onDinerClick}
                    id={key}
                >
                  {diner.name} 
                </li>);
              })}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input id="dinerName" onChange={handleInputChange} type="text" value={inputs.dinerName} placeholder="Name" required={true} />
            </div>

        
            
            <button type="submit">Add Item</button>
          </form>

    </React.Fragment>
  );
};
 
export default Diners;