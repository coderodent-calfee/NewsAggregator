import React, { useState } from 'react';

export interface ImageWithFallbackProperties {
    src : string;
    alt : string;
    fallback : string;
    children? : any;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProperties> = (props) => {
    const [imageSrc, setImageSrc] = useState<string>(props.src);
    const fallbackImage = props.fallback;
    var errorOccurred = false;
    const handleError = () => {
        if(errorOccurred){
            return;
        }
        errorOccurred = true;
        setImageSrc(fallbackImage);
    };

    return (
        <img className={`resizable-image imageWithFallback ${errorOccurred?'errorOccurred':''}`}
            src={imageSrc}
            alt={props.alt}
            onError={handleError}
        />
    );
};

