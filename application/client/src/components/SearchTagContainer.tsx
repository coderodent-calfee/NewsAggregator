import '../App.css'
import React, {useState} from 'react';
import {makeGetRequest} from "../utils/getter";
import * as News from "../common/newsInterface";

export interface SearchTagSelectorProperties {
    search: string[];
    setSearch : (value: (((prevState: string[]) => string[]) | string[])) => void;
    path: string;
}

const SearchTagSelector: React.FC<SearchTagSelectorProperties> = (props:SearchTagSelectorProperties) => {
    const [inputValue, setInputValue] = useState('');

    const handleBlur = () => {
        if (inputValue !== '' && !props.search?.includes(inputValue)) {
            props.setSearch((prevData) => [...prevData, inputValue]);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="search-selector">
            <span><small> Add Search Tag: </small>
                <input
                    type="text"
                    name='SearchTagList'
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
            </span>
        </div>
    );
};

export default SearchTagSelector;