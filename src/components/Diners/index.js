import React , { useState }  from 'react';
import _ from 'lodash';
import useForm from '../../hooks/form';

const Diners = (props) => {
    console.log('props',props);

  const submitDiner = () => {
    
    //depending on quantity add however much
    const diner = {id:props.diners.length,name:inputs.dinerName};

    //set new list
    props.setDiners([...props.diners,diner]);

  
  }

  //const [diners, setDiners] = useState([]);
  const dinerDefaults = {id:'',dinerName:''};
  
  const {inputs, handleInputChange, handleSubmit} = useForm(submitDiner, dinerDefaults, true);




  return (
    <React.Fragment>
          <h3>People</h3>
          <div className="people__list">
            <ul>
              {console.log('diners list',props.diners)}
              {props.diners.map((diner, key) => {
                //console.log(index);
                return (<li key={key} >
                  {diner.name} 
                </li>);
              })}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Diner Name:</label>
              <input id="dinerName" onChange={handleInputChange} type="text" value={inputs.dinerName} required={true}/>
            </div>
            
            <button type="submit">Add Item</button>
          </form>

    </React.Fragment>
  );
};
 
export default Diners;