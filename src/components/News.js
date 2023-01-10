    import React, { Component } from 'react';
    import NewsItem from './NewsItem';
    export class News extends Component {
        constructor(){
            super();
            // console.log("I am constructor from news component.");
            this.state = {
                articles: null,
                loading:false
            }
        }

        async componentDidMount(){
            // let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e4659f8f20fe483f8e15e7b98a1b6bb4";
            // let data = await fetch(url);
            // let parsedData = await data.json();
            // console.log(parsedData);
            // this.setState({articles:parsedData.articles})
            const options = {
                method: 'GET',
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': '3b7996ba32msh0c69fe78b796d61p164138jsna4fd0eeedc7c',
                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                }
            };
            
            await fetch('https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw', options)
                .then(response => response.json())
                .then(response => this.setState({articles:response}))
                .catch(err => console.error(err));  
        }

            render(){
                return <div className="container my-3">
                    <h2>NewSearchKro - Top Headlines</h2>
                     <div className="row">
                { this.state.articles === null ? (<span>Loading news...</span>) : this.state.articles.value.map((ele)=>{
                    
                    if(ele.name && ele.url && ele.description)
                    {
                        let image_url = '';
                        if(ele.image != undefined)
                        {
                            image_url = ele.image.thumbnail.contentUrl;
                        }
                        else
                        {
                            image_url = '';
                        }
                        
                        return <div className="col-md-4" key={ele.url}>
                            <NewsItem title={ele.name} description={ele.description} imageUrl={ image_url } newsUrl={ ele.url } />
                        </div>
                    }
                }) }
                </div>
                </div>
            // return this.state.articles.length ? (
            //     
            //         <h2>NewSearchKro - Top Headlines</h2>
            //         <div className="row">
            //         {  console.log(this.state.articles) 
                    // this.state.articles.value.map((ele)=>{
                    //     console.log(ele);
                        
                        // })
            //         }
            //         </div>
            //     </div>
            // ) : (
            //     
            // )
        }
    }

    export default News;