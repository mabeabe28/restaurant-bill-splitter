import React , { useState }  from 'react';

const Summary = (props) => {


    const getSummary = () => {
        //console.log('Summary props', props);

        const groupedByDiner = _(props.items)
            .groupBy(x => {
                if(x.diner.id !== undefined){
                    return x.diner.id;
                }else{
                    return -1;
                }
            })
            .map((value, key) => {
                console.log('value',value);
                console.log('key',key);
                

                if(props.diners[key]){
                    const dinerId = props.diners[key].id;
                    const dinerName = props.diners[key].name;

                    return {dinerId: dinerId, dinerName, items: value};

                }else{
                    return {dinerId: -1 , dinerName: 'Unnassigned', items: value};

                }
            })
            .value();


            console.log('groupedByDiner',groupedByDiner)
        
        let extraChargesPerPerson = 0;
        props.extraCharges.map((charge) => {
            extraChargesPerPerson = props.diners.length ? ( parseFloat(extraChargesPerPerson) + (parseFloat(charge.amount) / parseFloat(props.diners.length)) ): 0;
        });

        const dinnerSummaryFinal = groupedByDiner.map(din => {
            //console.log('din',din);

            const newDinItems = Object.assign({},din);
            let totalItemPrice = 0;
            newDinItems.items.map(item => {
                totalItemPrice =  parseFloat(totalItemPrice) + parseFloat(item.price);
            });
            newDinItems.totalItemPrice = totalItemPrice.toFixed(2);
            newDinItems.extraCharges = extraChargesPerPerson.toFixed(2);
            newDinItems.totalPrice = (parseFloat(newDinItems.totalItemPrice) + parseFloat(newDinItems.extraCharges)).toFixed(2);

            return newDinItems;
        })
        console.log('dinnerSummaryFinal',dinnerSummaryFinal);




        return dinnerSummaryFinal;
    }

    const getTotalItemPrice = () => {

        let totalItemPrice = 0;
        props.items.map(item => {
            totalItemPrice = parseFloat(totalItemPrice) + parseFloat(item.price);
        })

        return totalItemPrice.toFixed(2);
    }

    const getTotalExtraPrices = () => {

        let totalExtraPrices = 0;
        props.extraCharges.map(charge => {
            totalExtraPrices = parseFloat(totalExtraPrices) + parseFloat(charge.amount);
        })

        return totalExtraPrices.toFixed(2);
    }

    const getTotalPrice = () => (parseFloat(getTotalItemPrice()) +  parseFloat(getTotalExtraPrices())).toFixed(2);


    const [selectedPerson, setSelectedPerson] = useState('');

    


    const onDinerClick = dinerId => e => {
        console.log('#dinerId',dinerId)
        if(selectedPerson === dinerId){
            setSelectedPerson('');
        }else{
            setSelectedPerson(dinerId);
        }
    };

    return (
        <React.Fragment>
            <div className="summary">
                <div className="summary-price">
                    <div className="summary-price__total">
                        <span className="price">£{getTotalPrice()}</span>
                        <span className="label">Total Price</span>
                    </div>

                    <div className="summary-price__sub">

                        <div className="summary-price__sub__item">
                            <span className="price">£{getTotalItemPrice()}</span>
                            <span className="label">Total Item Price</span>
                        </div>
                        <div className="summary-price__sub__extra">
                            <span className="price">£{getTotalExtraPrices()}</span>
                            <span className="label">Total Extra Price</span>
                        </div>

                    </div>
               
                </div>
                <ul className="summary-person-list">
                {getSummary().map((curDiner, index) =>{
                    return (<li id={curDiner.dinerId} key={index}  className={`summary-person-list__person ${(selectedPerson === curDiner.dinerId)?'active':''}`} onClick={onDinerClick(curDiner.dinerId)} >
                            <span className="price">£{curDiner.totalPrice}</span>
                            <span className="label">{curDiner.dinerName}</span>

                            {(selectedPerson === curDiner.dinerId) && (
                                    <ul className="items">
                                        
                                    {
                                        curDiner['items'].map((curItem, itemIndex) =>{
                                            return (
                                            <li  key={itemIndex}> 
                                                {curItem.name} @ £{curItem.price}
                                            </li>
                                            );
                                        })
                                    }
                                    </ul>

                            )}
                    </li>);
                })}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Summary