    import React, { Component } from 'react';
    import NewsItem from './NewsItem';
    import Loader from './Loader';
    export class News extends Component {
        constructor(){
            super();
            // console.log("I am constructor from news component.");
            this.state = {
                articles: null,
                page:1,
                total_results:0,
                total_pages:0,
                prev:0,
                next:0,
                current:0,
                loading:true
            }
        }

        async componentDidMount(){ 
            this.loadNews()
        }

        // vishnudev40 : pub_155921c0e96c46bdbbe5ab1ceef0be908463e
        // vishnudev4094 : pub_15626fc409708191c501862ce3ce31c1d769d
        // expertinfo.in : pub_1562794be403bba9321d6b15afdc4835d0e54

        loadNews = async ()=>{
            console.log(this.state.page);
            let news_data = await fetch('https://newsdata.io/api/1/news?apikey=pub_155921c0e96c46bdbbe5ab1ceef0be908463e&country=in&category=top&language=en,hi&page='+this.state.page);
            let parsedData = await news_data.json();
            console.log(parsedData);
            this.setState({
                total_results:parsedData.totalResults,
                articles:parsedData.results,
                total_pages:Math.ceil(parsedData.totalResults/10),
                loading:false
            })

            if(this.state.page < 4)
            {
                this.setState({
                    prev:2,
                    next:4,
                    current:3
                })
            }

            if(Math.ceil(parsedData.totalResults/10) < this.state.page + 3 )
            {
                console.log("total_pages : " + this.state.page + 3);
                this.setState({
                    prev:this.state.total_pages - 3,
                    next:this.state.total_pages - 1,
                    current:this.state.total_pages - 2
                })
            }

            if(this.state.page > 4 && Math.ceil(parsedData.totalResults/10) > this.state.page + 3)
            {
                this.setState({
                    prev:this.state.page - 1,
                    next:this.state.page + 1,
                    current:this.state.page
                })
            }


            // console.log("Prev : " + this.state.prev);
            // console.log("Current : " + this.state.current);
            // console.log("Next : " + this.state.next);
        }

        handleNextClick = async (event)=>{
            event.preventDefault();
            this.setState({loading:true})
            // console.log(    this.state.page + 1);
            await this.setState({page: this.state.page + 1})
            await this.loadNews()
        }

        handlePrevClick = async (event)=>{
            event.preventDefault();
            this.setState({loading:true})
            await this.setState({page: this.state.page-1})
            await this.loadNews()
        }

        handleUpdatePage = async (currrent_page)=>{
            this.setState({loading:true})
            await this.setState({page: currrent_page})
            await this.loadNews()
        }

            render(){
                return <div className="container my-5">
                    <h2 className="text-center">NewSearchKro - Top Headlines</h2>
                     <div className="row">
                { this.state.loading === true ? (<Loader />) : this.state.articles.map((ele)=>{
                    
                    if(ele.title && ele.link)
                    {
                        return <div className="col-md-4" key={ele.link}>
                            <NewsItem title={ele.title} description={((ele.description != null && ele.description.length) > 185) ? ele.description.substring(0,185) + ' ...' : ele.description} imageUrl={ (ele.image_url != null) ? ele.image_url : 'news-placeholder-img.png' } newsUrl={ ele.link } />
                        </div>
                    }
                }) }
                </div>
                    <nav aria-label="Page navigation example">  
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${(this.state.page == 1) ? 'disabled' : ''}`}><a className="page-link" href="/" onClick={this.handlePrevClick}>&larr; Previous</a></li>

                            <li className={`page-item ${(this.state.page == 1) ? 'active' : ''}`}><a onClick={(event)=>{event.preventDefault(); this.handleUpdatePage(1)}} className="page-link" href="/">1</a></li>

                            {(this.state.page > 3 ) && <li className="page-item"><a onClick={(event)=>{event.preventDefault(); this.handleUpdatePage(this.state.page - 2)}} className="page-link" href="/">...</a></li>}

                            <li className={`page-item ${(this.state.prev == this.state.page) ? 'active' : ''}`}><a onClick={(event)=>{event.preventDefault(); this.handleUpdatePage(this.state.prev)}} className="page-link" href="/">{ this.state.prev }</a></li>

                            <li className={`page-item ${(this.state.current == this.state.page) ? 'active' : ''}`}><a onClick={(event)=>{event.preventDefault(); this.handleUpdatePage(this.state.current)}} className="page-link" href="/">{this.state.current }</a></li>

                            <li className={`page-item ${(this.state.next == this.state.page) ? 'active' : ''}`}><a onClick={(event)=>{event.preventDefault(); this.handleUpdatePage(this.state.next)}} className="page-link" href="/">{ this.state.next }</a></li>

                            {((this.state.page + 3) < this.state.total_pages) && <li className="page-item"><a onClick={(event)=>{event.preventDefault(); this.handleUpdatePage(this.state.page + 2)}} className="page-link" href="/">...</a></li>}

                            <li className="page-item"><a onClick={(event)=>{event.preventDefault(); this.handleUpdatePage(this.state.total_pages)}} className="page-link" href="/">{ this.state.total_pages }</a></li>
                            
                            <li className={`page-item ${((this.state.total_results/10) < this.state.page + 1) ? 'disabled' : ''}`}><a className="page-link" href="/" onClick={this.handleNextClick}>Next &rarr;</a></li>
                        </ul>
                    </nav>
                </div>
        }
    }

    export default News;