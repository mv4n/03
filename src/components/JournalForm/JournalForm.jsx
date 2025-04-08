import styles from './JournalForm.module.css'
import Button from "../Button/Button.jsx";
import {useState} from "react";

import cn from 'classnames';

function JournalForm( { addItem }) {

    const [formValidState, setFormValidState] = useState({
        title: true,
        date: true,
        tags: true,
        post: true,
        result: true
    })

    function isFormValid(props) {
        const regExpTitle = /^[A-ZА-ЩЬЮЯҐЄІЇ][a-zа-щьюяґєіїA-ZА-ЩЬЮЯҐЄІЇ]{2,}$/;
        const newFormValidState = {
            title: true,
            date: true,
            tags: true,
            post: true,
            result: true
        };

        if (!regExpTitle.test(props.title)) {
            newFormValidState.title = false;
            setFormValidState(() => ({...newFormValidState}));
        }
        if (!props.date) {
            newFormValidState.date = false;
            setFormValidState(() => ({...newFormValidState}))
        }
        newFormValidState.result = Object.values(newFormValidState).every(value => value);
        return newFormValidState.result
    }

    function handleBlur(e) {
        console.log(e.target)
        console.log(e.target.value)
    }

    // тут
    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        if (isFormValid(formProps)) {
            addItem(formProps)
        }

    }


    return (
        <form
            // className={`${styles['journal-form']} ${formValidState.result ? '' : styles['invalid']}`}
            className={cn(
                styles['journal-form'],
                {[styles['invalid']]: !formValidState.result},
            )}

            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Title"
                name="title"
                onBlur={handleBlur}
                // className={`form-input ${formValidState.title ? '' : 'invalid'}`}
                className={cn(
                    styles["form-input"],
                    {
                        [styles['invalid']]: !formValidState.title,
                        // [styles['valid']]: formValidState.title
                    },

                )}
            />

            <input type="date" placeholder="Date" name="date" />
            <input type="text" placeholder="Tags" name="tags" />
            <textarea name="post" cols="30" rows="10" placeholder="Post text" />

            <Button text="Save" addClass="accent"/>
        </form>
    )
}

export default JournalForm;