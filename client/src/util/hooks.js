import { reject } from 'assert';
import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);
    console.log("values",values);
    
    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const selectedFile = async(event) => {
        //console.log('files',event.target.files[0]);
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        console.log('base64',base64);
        console.log('name',event.target.name);
        setValues({ ...values, [event.target.name]: base64 })
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = ((err) => {
                reject(err);
            });
        });
    }


    const OnlyForUpdateForm = (data) => {
        console.log("hooks data", data)
        setValues({ ...values, title: data?.title, message: data?.message, tags: data?.tags, selectedFile: data?.selectedFile});
    }

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    const clear = () => {
        setValues({ title: '', message: '', tags: '', selectedFile: '' })
    }

    return {
        OnlyForUpdateForm,
        onChange,
        selectedFile,
        onSubmit,
        clear,
        values
    };
};