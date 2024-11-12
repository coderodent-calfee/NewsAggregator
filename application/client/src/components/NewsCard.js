
import React from "react";
import missingImage from '../no-image.png'
import {ImageWithFallback} from './ImageWithFallback'

export const NewsCard = ({id, title, summary, image, date, link, search, selectedArticle, setSelectedArticle}) => {
    const imageUrl = (image)?image:missingImage;
    
    const handleClick = () => {
        setSelectedArticle(id);
    };
    
    const NewsCard = () => {
        return (
            <div className={`newsInfo ${(id === selectedArticle)?'selected':''}`} onClick={handleClick} >
                <a className="App-link" href={link} target="_blank" rel="noopener noreferrer">{title}</a>
                <p><small> {date}</small></p>
                <p>{summary}</p>
                <p><small>
                    Tags:
                    {search?.length > 1 &&
                        search.map((tag) => {
                            return (<span> {tag},</span>);
                        })
                    }
                </small></p>
                <p><small>{id}</small></p>
            </div>
        )
    }
    const ErrorCard = () => {
        return (
            <div className="newsInfo">
            <p>{title}</p>
            </div>
        )
    }
    const isError = link === 'Error';
    return (
        <div className="newsCard">
            <ImageWithFallback src={imageUrl} alt={title} fallback={missingImage}/>
            {isError && <ErrorCard/>}
            {!isError && <NewsCard/>}
        </div>
    );
};