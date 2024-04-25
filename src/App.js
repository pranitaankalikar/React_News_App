
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      'progress':0
    }
  }
  setProgress = (val)=>{
    this.setState({
      'progress':val
    })
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar></Navbar>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress}></News>} />
            <Route path="/about" element={<About />} />
            <Route path="/business" element={<News setProgress={this.setProgress} key='business' category='business'></News>} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key='entertainment' category='entertainment'></News>} />
            <Route path="/health" element={<News setProgress={this.setProgress} key='health' category='health'></News>} />
            <Route path="/science" element={<News setProgress={this.setProgress} key='science' category='science'></News>} />
            <Route path="/sports" element={<News setProgress={this.setProgress} key='mysports' category='sports'></News>} />
            <Route path="/technology" element={<News setProgress={this.setProgress} key='technology' category='technology'></News>} />
          </Routes>
        </div>
      </Router>
    )
  }
}


