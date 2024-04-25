import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, urlToImage, url, author, publishedAt, source } = this.props;
        const date = new Date(publishedAt);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return (
            <div>
                <div className="card">
                    <div style={{ position: 'relative' }}>
                        <img src={urlToImage} className="card-img-top" alt="..." />
                        <div className='position-absolute d-flex justify-content-end' style={{ top: '0', right: '0' }}>
                            <span className="badge rounded-pill bg-danger" style={{ fontSize: '0.7rem', zIndex: '1' }}>
                                {source}
                            </span>
                        </div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={url} className="btn btn-sm btn-primary">Read More</a>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>by {author}, On {formattedDate}</div>
                    </div>
                </div>
            </div>
        )
    }
}



