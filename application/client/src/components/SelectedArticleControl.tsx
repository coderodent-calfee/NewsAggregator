import * as News from "../common/newsInterface";
import React, {useState} from "react";
import {NewsCard} from "./NewsCard";
import GetButton from "./GetButton";
import SearchTagSelector from "./SearchTagContainer";

export interface SelectedArticleControlProperties {
    path: string;
    params?: News.params;
    children?: React.ReactNode;
    data: string[];
    articles: News.ArticleDictionary;
    loading: boolean;
    selectedArticle: string;
    setSelectedArticle: React.Dispatch<React.SetStateAction<string>>;
    search: string[],
    setSearch : (value: (((prevState: string[]) => string[]) | string[])) => void
}

const SelectedArticleControl: React.FC<SelectedArticleControlProperties> = (props) => {
    if(props === undefined){
        return <div></div>;
    }
    if("" === props.selectedArticle){
        return <div></div>;
    }
    if(Object.keys(props.articles).length === 0){
        return <div></div>;
    }

    if(props.articles[props.selectedArticle] === undefined){
        return <div>no article</div>;
    }
    const article = props.articles[props.selectedArticle];
    const [search, setSearch] = useState<string[]>(article.search);
   
    return (
        <div className="selectedArticleControlContainer button-holder">
            <SearchTagSelector path=" selectedArticleControl" search={search} setSearch={setSearch}/>
            <p>
                {search?.length > 0 &&
                    search.map((searchTag) => {
                        return (
                            <label className="checkbox-container">
                                <input type="checkbox" name={searchTag} value={searchTag} checked/>
                                <span>{searchTag}</span>
                            </label>
                        );
                    })
                }
            </p>
            <GetButton path={'selectedArticleControlContainer'}>
                Remove Article
            </GetButton>
        </div>);
}

export default SelectedArticleControl;