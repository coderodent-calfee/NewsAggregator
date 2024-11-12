import initSqlJs, { Database } from "sql.js";
import * as fsPromise from 'fs/promises';
import * as News from "../../common/newsInterface";
import {ArticleQueryParams} from "../services/NewsService";

export class DatabaseConnection{
    public db: Database|undefined;
    public error: string|undefined;
    // todo: add a db 'ready' promise field so we don't need 'awaits'
    
    constructor() {}

    async initializeSQL() {
        return initSqlJs({
            locateFile: (file: string) => {
                return `./src/components/database/assets/${file}`;
            }
        });
    }    
    async initializeDatabase() {
        return this.initializeSQL()
            .then((sql) => {
                this.db = new sql.Database();
            }).catch((error) => {
                console.error(`Error ${error} initSqlJs`);
            });
    }
    
    isDatabaseReady(){
        if(this.error !== undefined){
            console.error(this.error);
            return false;
        }
        if(this.db === undefined){
            console.log("db not ready yet");
            return false;
        }
        return true;
    };

    printDatabaseTables(){
        if (this.isDatabaseReady() !== true){
            return;
        }
        var res = this.db.exec(`SELECT name FROM sqlite_master WHERE type=\'table\';`);
        const tablesJson = JSON.stringify(res, null, 2);
        console.log("current DB tables", tablesJson);
    };

    printDatabase(table : string){
        if (this.isDatabaseReady() !== true){
            return;
        }
        var res = this.db.exec(`SELECT * FROM ${table};`);
        const tablesJson = JSON.stringify(res, null, 2);
        console.log(`${table} table`, tablesJson);
    };
    
    resetDatabaseTables(){
        if (this.isDatabaseReady() !== true){
            return;
        }
        var res = this.db.exec(
            `DROP TABLE IF EXISTS articles;
            CREATE TABLE articles (id TEXT, title TEXT, date NUMERIC, summary TEXT, link TEXT,
            PRIMARY KEY (id));`
        );
        res = this.db.exec(
            `DROP TABLE IF EXISTS search;
            CREATE TABLE search (id TEXT, tag TEXT,
            PRIMARY KEY (id, tag));`
        );
    };

    async saveDatabase(name : string = 'filename.sqlite'){
        if (this.isDatabaseReady() !== true){
            return;
        }
        const data = this.db.export();
        const buffer = Buffer.from(data);
        return fsPromise.writeFile(`./src/components/database/assets/${name}`, buffer);
    };

    async loadDatabase(name : string = 'filename.sqlite'){
        if (this.isDatabaseReady() !== true){
            return;
        }
        return fsPromise.readFile(`./src/components/database/assets/${name}`)
            .then(async (contents : Buffer) => {
                const data = new Uint8Array(contents);
                const sql = await this.initializeSQL();
                this.db = new sql.Database(data);
            }).catch((error) => {
                console.error(`Error ${error} loading database file ./src/components/database/assets/${name}`);
                this.resetDatabaseTables();
                this.printDatabaseTables();
                this.saveDatabase("current.db").then(() => {
                    console.log("saved");
                });                
            });
    };

    addArticleSearchTag(id:string, tag: string)
    {
        const statement =`INSERT OR IGNORE INTO search (id, tag) VALUES ("${id}", "${tag}");`;
        console.log (statement);
        const res = this.db.exec(statement);
    }

    addArticle(id:string, article: News.Article)
    {
        const statement = `INSERT OR IGNORE INTO articles (id, title, date, summary, link)` +
            `VALUES (?, ?, ?, ?, ?);`
        console.log (statement);
        const params = [`${id}`, `${article.title}`, article.date, `${article.summary}`, `${article.link}`];
        const res = this.db.run(statement, params);
    }

    process(newsResponse: News.response, queries: ArticleQueryParams) {
        if(newsResponse.status === "ok" ){
            newsResponse.articles.forEach((article)=>{
                const id = article.id;
                article.search.forEach((searchTag)=>{
                    this.addArticleSearchTag(id, searchTag);
                });
                this.addArticle(id, article);
            });

            this.printDatabase('articles');
            this.printDatabase('search');
            this.saveDatabase("current.db").then(()=>{
                console.log("saved");
            });
        }
        else {
            console.log (`newsResponse.status === "ok" !== "ok" it is: ${newsResponse.status}`)
        }
    }
}

// https://www.sqlitetutorial.net/sqlite-sample-database/
// https://www.sqlite.org/lang.html