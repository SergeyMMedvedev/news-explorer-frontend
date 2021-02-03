import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <>
      <div className="circle-preloader spinner-box">
        <div className="circle-preloader__border">
          <div className="circle-preloader__core" />
        </div>
      </div>
      <p className="circle-preloader__text">Идет поиск новостей...</p>
    </>
  );
}

export default Preloader;
