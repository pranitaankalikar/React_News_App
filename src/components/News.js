import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
const apiKey = process.env.REACT_APP_KEY;

export default function News(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         articles: [],
    //         page: 1,
    //         loading: false
    //     };
    // }
    console.log("props ="+JSON.stringify(props));
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);
    const [headline, setHeadline] = useState("KabarDar");

    const setHeadingLine = async (cat) => {
        if(cat==='general'){
            setHeadline("KabarDar");
        }
        else setHeadline(cat.charAt(0).toUpperCase() + cat.slice(1));
      }
      

    const updateNews = async () => {
        props.setProgress(10);
        setLoading(true);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&pageSize=20&page=${page}`;

        let data = await fetch(url);
        props.setProgress(30);
        let parseData = await data.json();
        console.log("hiiii");
        //let parseData = newobjct;  ///hardcode 
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        // let cap= await capitalizeFirstLetter(props.category)
        setHeadingLine(props.category)
        // setHeadline(cap);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
    }, [page]);
    const OnPrevClick = async () => {
        // setPage(page - 1, () => {
        //     updateNews();
        // });
        setPage(page - 1);
    };
    const OnNextClick = async () => {
        // setPage(page + 1,() => {
        //     updateNews();
        // });
        setPage(page + 1);
    }
    return (
        <div className='container'>
            {loading && <Loading disabled={true}></Loading>}
            <div className='container' style={{"marginTop":"60px"}}>
                <h2>{headline} - Top Headlines</h2>
            </div>
            {!loading && <div className='row'>
                {articles.map((element) => {
                    return <div key={element.url} className='col-md-3'>
                        <NewsItem title={element.title} description={element.description} urlToImage={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} ></NewsItem>
                    </div>
                })}
            </div>
            }
            <div className="d-flex justify-content-between">
                <button disabled={page <= 1} className="btn btn-primary" onClick={OnPrevClick} type="button">&laquo; Previous</button>
                <button disabled={(Math.ceil(totalResults / 20) < page + 1)} className="btn btn-primary" onClick={OnNextClick} type="button">Next &raquo;</button>
            </div>
        </div>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}  
