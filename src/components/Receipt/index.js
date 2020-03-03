import React , { useState }  from 'react';
import{ Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import _ from 'lodash';
import useForm from '../../hooks/form';
import Items from '../Items';
import Diners from '../Diners';
import DinerChooser from '../Diners/chooser';
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
    console.log('selectedPersonId',selected.target);

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




  /*const onImageText = () => {


        //let btn = this;

        // Disable button until the text recognition finishes
        //btn.disable = true;

        // Convert an image to text. This task works asynchronously, so you may show
        // your user a loading dialog or something like that, or show the progress with Tesseract
        Tesseract.recognize("../../../includes/receipt.jpg").then(function(result){
            // The result object of a text recognition contains detailed data about all the text
            // recognized in the image, words are grouped by arrays etc
            console.log(result);

            // Show recognized text in the browser !
            //alert(result.text);
        }).finally(function(){
            // Enable button once the text recognition finishes (either if fails or not)
            //btn.disable = false;
        });

  }*/

  return (
    <div id="receipt">
        


        <Tabs className="receipt-body">
          <TabList className="receipt-header">
            <li>
              <img className="logo" src="https://www.youhadme.at/wp-content/uploads/2020/02/YHMA-logo1-v2.png" alt="you-had-me-at"></img>
            </li>
            <Tab>Diners</Tab>
            <Tab>Items</Tab>
            <Tab>Extra</Tab>
            <Tab>Summary</Tab>
          </TabList>

          <TabPanel className="receipt__diners section">

            
        {/*<button id="img-to-txt" onClick={onImageText}>
            Convert image to text
        </button>*/}
              <Diners
                diners={diners}
                setDiners={setDiners}
                //onDinerClick={onDinerClick}
              />
          </TabPanel>
          <TabPanel className="receipt__items section">
            <div>
              <DinerChooser
                diners={diners}
                onDinerClick={onDinerClick}
                selectedDiner={selectedDiner}
              />
            </div>
            <div className="receipt_list">
              <Items
                items={items}
                setItems={setItems}
                onChooseItem={onChooseItem}
              />
            </div>
          </TabPanel>
          <TabPanel  className="receipt__extra section">
              <ExtraCharges
                extraCharges={extraCharges}
                setExtraCharges={setExtraCharges}
              />
          </TabPanel>
          <TabPanel  className="receipt__summary section">
              <Summary
                diners={diners}
                items={items}
                extraCharges={extraCharges}
              />
          </TabPanel>
        </Tabs>


        
        
        
      

        

       
        
    </div>
  );
};
 
export default Receipt;