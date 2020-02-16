import React , { useState }  from 'react';
import _ from 'lodash';
import useForm from '../../hooks/form';

const Items = (props) => {
  const itemDefaults = {id:'',name:'',quantity:'',price:'',diner:{}};

  const submitItems = () => {
    
    //depending on quantity add however much
    const quantity = inputs.quantity;
    let item = [];
    _.times( quantity, (index) => {
      //console.log('index',index);
      item.push({id:(props.items.length + index),name:inputs.name,price:inputs.price,diner:{}});
    });

    const newItems = _.concat([...props.items], item);
    
    //set new list
    props.setItems(newItems);

  
  }
  const {inputs, handleInputChange, handleSubmit} = useForm(submitItems, itemDefaults, true);


  return(
    <React.Fragment>
       <ul>
            {/*console.log('items list',items)*/}
            {props.items.map((item, key) => {
              //console.log(index);
              return (<li key={key} 
                id={item.id}
                onClick={props.onChooseItem}
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

    </React.Fragment>
  )

};
 
export default Items;