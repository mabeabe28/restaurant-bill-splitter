import React , { useState }  from 'react';
import _ from 'lodash';
import useForm from '../../hooks/form';
import Diners from '../Diners';
import Summary from '../Summary';
import ExtraCharges from '../ExtraCharges';

const Receipt = () => {

  /**Items */
  const [items, setItems] = useState([]);

  const itemDefaults = {id:'',name:'',quantity:'',price:'',diner:{}};

  const submitItems = () => {
    
    //depending on quantity add however much
    const quantity = inputs.quantity;
    let item = [];
    _.times( quantity, (index) => {
      //console.log('index',index);
      item.push({id:(items.length + index),name:inputs.name,price:inputs.price,diner:{}});
    });

    const newItems = _.concat([...items], item);
    
    //set new list
    setItems(newItems);

  
  }
  const {inputs, handleInputChange, handleSubmit} = useForm(submitItems, itemDefaults, true);



  const onChooseItem = (chosen) => {
    const chosenItemId = chosen.target.id;

    const newItemsArr = [...items]//Object.assign({}, items);
    //const newChosenItemObj = Object.assign({}, items[chosenItemId]);//items[chosenItemId];
    //newChosenItemObj.diner = selectedDiner
    if(newItemsArr[chosenItemId].diner !== undefined && newItemsArr[chosenItemId].diner.id === selectedDiner.id){
      //delete  newItemsArr[chosenItemId].diner;
      newItemsArr[chosenItemId].diner = {};
    }else{
      newItemsArr[chosenItemId].diner = selectedDiner;
    }


    //const newDinersArr = [...diners]//Object.assign({}, items);
    //newDinersArr[selectedDiner.id].items.push(newItemsArr[chosenItemId]);
    //setDiners(newDinersArr);

   // items[chosenItemId].diner = selectedDiner;
    console.log('items',items);
    //console.log('selectedDiner',selectedDiner);
    setItems(newItemsArr);
  }
  /**Items */

  /**Diners */
  const [diners, setDiners] = useState([]);
  const [selectedDiner, setSelectedDiner] = useState({});


  const onDinerClick = (selected) => {
    const selectedPersonId = selected.target.id;
    console.log('selectedPersonId',selectedPersonId);

    console.log('sel',diners[selectedPersonId]);
    let newSelectedDiner = diners[selectedPersonId];
    if(newSelectedDiner === selectedDiner){
      newSelectedDiner = '';
    }
    setSelectedDiner(newSelectedDiner);
  }
  /**Diners */


  /**Extra */
    const [extraCharges, setExtraCharges] = useState([]);
  /**Extra */


  return (
    <div className="receipt">
        <div>
            <h1>Receipt</h1>
        </div>
        { selectedDiner.name && (
            <div>
              Choosing {selectedDiner.name}'s Items
            </div>
          )
        }
        
        <div className="receipt_list">
          <ul>
            {console.log('items list',items)}
            {items.map((item, key) => {
              //console.log(index);
              return (<li key={key} 
                id={item.id}
                onClick={onChooseItem}
              >
                {item.name} @ £{item.price}  

                {(item.diner) && (
                  item.diner.name
                )}
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
          <ExtraCharges
            extraCharges={extraCharges}
            setExtraCharges={setExtraCharges}
          />
        </div>

        <div>
          <Diners
            diners={diners}
            setDiners={setDiners}
            onDinerClick={onDinerClick}
          />
        </div>

        <div>
          <Summary
            diners={diners}
            items={items}
            extraCharges={extraCharges}
          />
        </div>
        
    </div>
  );
};
 
export default Receipt;