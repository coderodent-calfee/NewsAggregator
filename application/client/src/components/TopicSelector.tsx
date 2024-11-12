import '../App.css'
import React, {useState} from 'react';

export interface TopicSelectorProperties {
    topic: string, 
    setTopic : (value: (((prevState: string) => string) | string)) => void
}

const TopicSelector: React.FC<TopicSelectorProperties> = (props:TopicSelectorProperties) => {
    const [inputValue, setInputValue] = useState(props.topic);

    const handleBlur = () => {
        props.setTopic(inputValue);
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <span className="topic-selector">
            <span><small> Topic: </small>
                <input
                    type="text"
                    name='TopicList'
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                />
            </span>
        </span>
    );
};

export default TopicSelector;