import React , { useState }  from 'react';
import _ from 'lodash';
import useForm from '../../hooks/form';
import Items from '../Items';
import Diners from '../Diners';
import Summary from '../Summary';
import ExtraCharges from '../ExtraCharges';

const Receipt = () => {

  /**Items */
  const [items, setItems] = useState([]);


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

    setItems(newItemsArr);
  }
  /**Items */

  /**Diners */
  const [diners, setDiners] = useState([]);
  const [selectedDiner, setSelectedDiner] = useState({});


  const onDinerClick = (selected) => {
    const selectedPersonId = selected.target.id;
    //console.log('selectedPersonId',selectedPersonId);

    //console.log('sel',diners[selectedPersonId]);
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
          <Items
            items={items}
            setItems={setItems}
            onChooseItem={onChooseItem}
          />
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