import React, { Component } from 'react'
import Loader from './Loader.js'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class AddNews extends Component {
  articles= [];
  api=process.env.REACT_APP_API_KEY;
constructor(props){
    super(props);
    //Set state values
    this.state={
        articles:this.articles,
        page:0,
        loading:true
      }
      document.title=`${this.props.title} - NezBoy`;
}

async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.api}&page=1&pageSize=10`;
    console.log(url);
    this.setState({loading:false});
    let data=await fetch(url);
    this.props.setProgress(30);
    let jsonData= await data.json();
    this.props.setProgress(70);
    //Update state value
    this.setState({
        articles:jsonData.articles,
        totalResults:jsonData.totalResults,
        loading:true
    })
    this.props.setProgress(100);
  }

updateNews=async()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.api}&page=${this.state.page}&pageSize=10`;
    let data=await fetch(url);
    let jsonData= await data.json();
    this.setState({
        articles:jsonData.articles,
        totalResults:jsonData.totalResults,
        loading:true
    })
}
nextPage=async()=>{
    this.setState({
        page:this.state.page+1,
        loading:false
    })
   this.updateNews();
}

lastPage=async()=>{
    this.setState({
        page:this.state.page-1,
        loading:false
    })
   this.updateNews();
}
    fetchData=async()=>{
      this.setState({
        page:this.state.page+1,
      })
      let url=`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.api}&page=${this.state.page}&pageSize=10`;
      let data=await fetch(url);   
      let jsonData= await data.json();
      this.setState({
          articles:this.state.articles.concat(jsonData.articles),
          totalResults:jsonData.totalResults,
          loading:true
      })
    }
  render() {
    return (
      <>  
      <br></br>
      {this.state.loading?'':<Loader/>}
      
      
        <h1><b>{this.props.title} - NewzBoy</b></h1>
        <InfiniteScroll
  dataLength={this.state.articles.length}
  next={this.fetchData}
  hasMore={this.state.articles.length !== this.state.totalResults}
  loader={this.state.loading?<Loader/>:''}>
    <div className='container'>
        <div className='row'>
       {!this.state.articles?<div className='text-center my-3'>&emsp;&emsp;Nothing to View</div>:this.state.articles.map((Element)=>{
          return  <div className='col-md-4 my-4'><div key={Element.url}><div className="card" >
          <img src={Element.urlToImage?Element.urlToImage:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8ODg4AAAAICAjh4eF9fX0zMzNOTk7X19cqKiphYWGsrKwKCgr7+/vm5uZ0dHS8vLzu7u5DQ0OdnZ3Nzc1TU1OTk5O/v7+GhoZJSUl5eXlYWFi2trZmZmbx8fEmJiZubm45OTkeHh4YGBjIyMijo6Ourq6YmJiDg4OqYIa4AAAEDUlEQVR4nO3cWWOiMBQFYLmIomLdWxds1S76/3/hAC4VSpxOPc690vM985AjCTcJkVqNiIiIiIiIiIiIiIiIiIiIiIiIiIiIiOiXCTtBoN2GGxr3JPGi3Yyb6bdEIs/zX7UbciNhQ8RLSUO7KbexO+RLEja123ILz41jviThXLs1N1CXz4CevGs3B68uvneWMNRuD9xzLmAk2u3Ba5110UoOwyAXsIKdNCwEbGk3CK5RSNjXbhBavxCwehOaVtVH4bgQsHorp16+UlTvMVNLl0snvgy02wOXKxW+1LXbg9c5n3FXMWCyKjwbg9Xroon2adlbwadoZnHYuJBh5ergwUL8dHdtMdZuyM2s5HUYxM/azaDvCePRNAge4wsDrt4Jmpuk067b0/jOKsfgvSmf2nG35JqnbL9b/CiK9pfN3/57O3/qLY33WdnTAMtC68OdSG4Ct79sVPZTmDNuSH79sC8P0fZU4LudRjHeKaT9ncVuuyTffhIqs04y2Ab9pTguyTK2jA/Isbvx6Y3cc1+RXfShHeKSUWnn+0cy1Y7hFly+Pd+OaHbKCgqYRHzUjlJuiwqYRDRZGp9wAZPHjcHC+Ix4yBwDvlgsGU1gH11qhynTBwa0WS1yrwSvC2jzQfoOu4Wy085SDnYLZaIdpRysUvgWy0RqApvNmCz1aS1EBWxrR3H4gCW0ug2+BCWUlXYSF9SEzewL4QfQLfQ32klcULXC6GymhlsYitm3GT1UQqPVHrZwijztIE4bzKRUZtpBnEDFwubCN4NK2NMO4lT5GQ0soeFeCko41A7iBBqHhg98+6iJt9mKv678rG1R+Zk36p2T3dOmI9gmhsXXFSnYXqLV3eBaHbfhbfVpikto9f02qlzYHYk7XEKjj1Pky0Ob/2QbIF/h2zz3BdrH2EfsaKcpMwXeRE9G2nFKvCET2tzOAB41SSMaPKC4gt5ET2RqbXaD7aZZRmtLKWw39QzuD0OfplnCWDtSAW59cUxobSDWZuBnjb2KgTx86dl84f0KnLl5staOU6IDnbk9accpgzueaPXMAvAmmisVB7CRaPb7ZrhdRaPn92A10fDHv0CHo+RBO4jbIyKiuVVFTuv6iFY3FA8A/dTqpvDR1Yf2Zasd4W+uPPJt+LjCUfeqyVskd/A1gvCam2i31p+7Yn5q9C9PX/z4vb4stJv+Xc6z+5GffUXBFdD+U+akXRIx+zbEZjZptuTL9xTuLmDJwegk1Co+zjcH/d7Xv+Wb/b+MQ6fwZYxh8fOI8TqXUUy+cbroYSL7ypgOvXnZTCxcHbpr2n/bhtcTTmGQfSdi03N+3bLbn6/TS5rbe8yX6Q6s/lWLiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIfq8/tzAurNL1lJsAAAAASUVORK5CYII='}  className="card-img-top" alt="..." />
          <div className="card-body">
              <h5 className="card-title"><b>{Element.title}</b></h5>
              <p className="card-text">{Element.description===null?'':Element.description.slice(0,105)}...</p>
              <a href={Element.url} rel="noreferrer" target="_blank"  className="btn btn-primary btn-sm">Read More</a>
              </div>
    </div>
  </div>
  </div>
        })
        }
        </div>
        </div>
        </InfiniteScroll>

        <div className='container d-flex justify-content-around'>
            <button disabled={this.state.page<=1} onClick={this.lastPage} className='btn btn-primary'>&larr;Previous</button>
            <p>Page {this.state.page} of {this.state.totalResults>0?Math.ceil(this.state.totalResults/10):0}</p>
            <button className='btn btn-primary' onClick={this.nextPage}>Next&rarr;</button>
        </div>
        <br/><br/>
      </>
    )
  }
}