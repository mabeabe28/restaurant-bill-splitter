import React , { useState }  from 'react';
import _ from 'lodash';
import useForm from '../../hooks/form';
import Diners from '../Diners';

const Receipt = () => {

  /**Items */
  const [items, setItems] = useState([]);

  const itemDefaults = {name:'',quantity:'',price:''};

  const submitItems = () => {
    
    //depending on quantity add however much
    const quantity = inputs.quantity;
    let item = [];
    _.times( quantity, () => item.push({name:inputs.name,price:inputs.price}) );

    const newItems = _.concat([...items], item);
    
    //set new list
    setItems(newItems);

  
  }
  const {inputs, handleInputChange, handleSubmit} = useForm(submitItems, itemDefaults, true);
  /**Items */

  /**Diners */
  const [diners, setDiners] = useState([]);
  const [selected, setSelected] = useState({});


  const onDinerClick = (selected) => {
    const selectedPersonId = selected.target.id;
    console.log('selectedPersonId',selectedPersonId);

    console.log('sel',diners[selectedPersonId]);

    setSelected(diners[selectedPersonId]);
  }
  /**Diners */

  return (
    <div className="receipt">
        <div>
            <h1>Receipt</h1>
        </div>
        { selected.name && (
            <div>
              Choosing {selected.name}'s Items
            </div>
          )
        }
        
        <div className="receipt_list">
          <ul>
            {console.log('items list',items)}
            {items.map((item, key) => {
              //console.log(index);
              return (<li key={key} >
                {item.name} @ £{item.price}
              </li>);
            })}
          </ul>
          
          <form onSubmit={handleSubmit}>
            <div>
              <label>Item Name:</label>
              <input id="name" onChange={handleInputChange} type="text" value={inputs.name} required={true}/>
            </div>

            <div>
              <label>Individual Price:</label>
              <input id="price" onChange={handleInputChange} type="number" value={inputs.price} required={true}/>
            </div>

            <div>
              <label>Quantity:</label>
              <input id="quantity" onChange={handleInputChange} type="number" value={inputs.quantity} required={true}/>
            </div>
            <button type="submit">Add Item</button>
          </form>
        </div>

        <div>
          <Diners
            diners={diners}
            setDiners={setDiners}
            onDinerClick={onDinerClick}
          />
        </div>
    </div>
  );
};
 
export default Receipt;