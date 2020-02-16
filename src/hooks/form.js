import React, {useState} from 'react';

const useForm = (callback, formDefaults, clearOnSubmit) => {
    const [inputs, setInputs] = useState(formDefaults);
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        console.log('inputs',inputs);
        callback();

        //clear items
        if(clearOnSubmit){
          setInputs(formDefaults);
        }

    }
    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.id]: event.target.value}));
    }
    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
}

export default useForm;
