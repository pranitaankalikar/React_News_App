import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
const apiKey = process.env.REACT_APP_KEY;
console.log(process.env.REACT_APP_KEY);

export default class News extends Component {
    static defaultProps = {
        country : 'in',
        pageSize : 20,
        category : 'general'
    }
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false
        };
    }
    async updateNews() {
        this.props.setProgress(10);
        this.setState({
            loading: true
        });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&pageSize=20&page=${this.state.page}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        // this.setState({
        //     loading: true
        // });
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=075edc97cf2448c6b2ec7738126824db&pageSize=20&page=1`;
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     articles: parseData.articles,
        //     totalResults: parseData.totalResults,
        //     loading: false
        // });
        this.updateNews();
    }
    OnPrevClick = async () => {
        this.setState({
            page: this.state.page - 1
        }, ()=>{
            this.updateNews();
        });
    };
    OnNextClick = async () => {
        this.setState({
            page: this.state.page + 1
        }, ()=>{
            this.updateNews();
        });
        
    }
    render() {
        return (
            <div className='container'>
                <h1>KabarDar - Top Headlines</h1>
                {this.state.loading && <Loading disabled={true}></Loading>}
                {!this.state.loading && <div className='row'>
                    {this.state.articles.map((element) => {
                        return <div key={element.url} className='col-md-3'>
                            <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} ></NewsItem>
                        </div>
                    })}
                </div>
                }
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.OnPrevClick} type="button">&laquo; Previous</button>
                    <button disabled={(Math.ceil(this.state.totalResults / 20) < this.state.page+1)} className="btn btn-primary" onClick={this.OnNextClick} type="button">Next &raquo;</button>
                </div>
            </div>
        )
    }
}
