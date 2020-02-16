import React , { useState }  from 'react';

const Summary = (props) => {


    const getSummary = () => {
        console.log('Summary props', props);

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
            console.log('din',din);

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

        //setDinerSummary(dinnerSummaryFinal);



        return dinnerSummaryFinal;
    }

    return (
        <React.Fragment>
            <h3>Summary</h3>
            <div>
                <ul>
                {getSummary().map((curDiner, index) =>{
                    return (<li key={index}>
                    <div>
                       <h4>{curDiner.dinerName}</h4>
                    </div>
                    <div>
                        £{curDiner.totalPrice}
                    </div>
                    </li>);
                })}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default Summary