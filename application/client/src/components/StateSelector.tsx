import '../App.css'
import React, {ChangeEvent, MouseEvent} from 'react';
import {makeGetRequest} from "../utils/getter";
import {NewsCard} from "./NewsCard";

export const states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',    
];

const GetStateSelector: React.FC<{state:string, setState : (value: (((prevState: string) => string) | string)) => void }> = (props) => {
    const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        props.setState(newValue);
    };

    return (
        <select value={props.state} onChange={handleInputChange}>
            {
                states.map((state) => (<option key={state} value={state}>{state}</option>))
            }
        </select>
    );
}

export default GetStateSelector;