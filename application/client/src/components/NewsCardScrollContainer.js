import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NewsCard } from "./NewsCard";
import {cleanQueryParams, makeGetRequest} from "../utils/getter";
import * as News from "../common/newsInterface";
import {GetButtonProperties} from "./getButton";
import {Article} from "../common/newsInterface";

export interface NewsCardScrollContainerProperties {
    path: string;
    params?: News.params;
    children?: React.ReactNode;
    data: string[];
    articles: News.ArticleDictionary;
    loading: boolean;
    selectedArticle: string;
    setSelectedArticle: React.Dispatch<React.SetStateAction<string>>;
}

const NewsCardScrollContainer: React.FC<NewsCardScrollContainerProperties> = (props) => {

    const data = props.data;
    const loading = props.loading;
   
    return (
        <div className="newsCardContainer">
            {data?.length > 0 &&
                data.map((id) => {
                    const item = props.articles[id];
                    return (
                        <NewsCard
                            id={id}
                            title={item.title}
                            summary={item.summary}
                            image={item.image}
                            date={item.date}
                            link={item.link}
                            search={item.search}
                            selectedArticle={props.selectedArticle}
                            setSelectedArticle={props.setSelectedArticle}
                        />
                    );
                })}
            {loading && <h1>Loading....</h1>}
        </div>
    );
}

export default NewsCardScrollContainer;