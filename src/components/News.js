import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types';
//import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
capitalizeFirstLetter=(string)=>{
  return string.charAt(0).toUpperCase()+string.slice(1);
}
  constructor(props) {
    super(props);
    console.log("Hello!!! news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-DailyNews`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&token=eb5ae29f43d500ef64bb190e11509682&lang=en&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
        this.props.setProgress(100);

  }

  handleprevious = async () => {
    console.log("previous");
        this.props.setProgress(10);

    let url = `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&token=eb5ae29f43d500ef64bb190e11509682&lang=en&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
            this.props.setProgress(100);

  }

  handlenext = async () => {
    console.log('next');
        this.props.setProgress(10);
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
      // Do nothing if next page exceeds total pages
    } else {
      let url = `https://gnews.io/api/v4/top-headlines?country=${this.props.country}&category=${this.props.category}&token=eb5ae29f43d500ef64bb190e11509682&lang=en&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
              this.props.setProgress(30);

      let parsedData = await data.json();
              this.props.setProgress(50);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
        totalResults:0
      })
    }
            this.props.setProgress(100);

  }
 
  render() {
    console.log('render');
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{ margin: "35px 0px" }}>
          DailyNews - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
      
        <div className='row'>
          {this.state.articles.map((element) => {
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem
              title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.image}
                  url={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            )
          })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-danger"
            onClick={this.handleprevious}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-danger"
            onClick={this.handlenext}
          >
            Next &rarr;
          </button>
        </div>
    </div>
    )
  }
}

export default News;

