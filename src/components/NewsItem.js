import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
           let {title,description,imageUrl,url,author,date,source}= this.props;

    return (
      <div>
        <div className="card">
  <img src={!imageUrl?"https://i.insider.com/6842266e9b2a601d01b26f99?width=1200&format=jpeg":imageUrl}
 className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}<span className="position-absolute top-0 translate-middle badge wavy-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span></h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small class="text-muted">By {!author?"Unknown author":author} on {new Date(date).toGMTString()}</small></p>

    <a  rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-danger">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem
