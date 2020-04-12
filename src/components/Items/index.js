import React , { useState }  from 'react';
import FadeIn from 'react-fade-in';

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
        <h4 className="title">Items</h4>

       	<FadeIn className="item-list" key={props.items.length}>
			{props.items
			.map((item, key) => {
				//console.log(index);
				return (<li key={key} 
					id={item.id}
					onClick={props.onChooseItem}
				> 
					{(item.diner.id !== undefined) ? (
						<div className={`item-person person-color-${parseFloat(item.diner.id)+1}`}>
							{item.diner.name.slice(0,1)}
						</div>
						)
						:
						(
						<div className={`item-person person-color-none`}>
							U
						</div>
					)}
					<div className="item-info">
					{item.name} @ £{item.price}  
					</div>
              	</li>);
            })}
        </FadeIn>
          
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<input id="name" onChange={handleInputChange} type="text" value={inputs.name} placeholder="Item Name" required={true}/>
			</div>
			<div className="form-group">
				<input id="price" onChange={handleInputChange} type="number" value={inputs.price} placeholder="Individual Price" required={true}/>
			</div>
			<div className="form-group">
				<input id="quantity" onChange={handleInputChange} type="number" value={inputs.quantity} placeholder="Quantity" required={true}/>
			</div>
			<button type="submit">Add Item</button>
		</form>

    </React.Fragment>
  )
};
 
export default Items;