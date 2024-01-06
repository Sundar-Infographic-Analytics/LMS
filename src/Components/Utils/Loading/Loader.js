import React from 'react';
// import LoaderGif from '../../../assets/images/education.gif';
// import LoaderGif2 from '../../../assets/images/graduate.gif';
import LoaderGif2 from '../../../assets/images/books.gif';
import { useLoader } from './LoaderContext';

const Loader = () => {
  const { loading } = useLoader();
  return (
    <div style={{display: loading ? 'flex' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:"hidden",
    zIndex: 9999,}}>
    <img style={{width:"70px", height:"auto"}} src={LoaderGif2} alt="loader"/>
    </div>
  )
}

export default Loader;
