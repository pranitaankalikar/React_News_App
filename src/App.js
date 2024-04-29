
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import LoadingBar from 'react-top-loading-bar'


export default function App() {
  const [progress, setProgress] = useState(0);
  return (
    <Router>
        <Navbar></Navbar>
        <div className='container mt-5'>
          <LoadingBar
            color='#f11946'
            progress={progress}
          // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route path="/" element={<News setProgress={setProgress}></News>} />
            <Route path="/about" element={<About />} />
            <Route path="/business" element={<News setProgress={setProgress} key='business' category='business'></News>} />
            <Route path="/entertainment" element={<News setProgress={setProgress} key='entertainment' category='entertainment'></News>} />
            <Route path="/health" element={<News setProgress={setProgress} key='health' category='health'></News>} />
            <Route path="/science" element={<News setProgress={setProgress} key='science' category='science'></News>} />
            <Route path="/sports" element={<News setProgress={setProgress} key='mysports' category='sports'></News>} />
            <Route path="/technology" element={<News setProgress={setProgress} key='technology' category='technology'></News>} />
          </Routes>
        </div>
    </Router>
  )
}


