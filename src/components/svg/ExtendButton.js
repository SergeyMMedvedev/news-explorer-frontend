import React from 'react';

function ExtendButton({ isExtend, darkTheme, classNames }) {
  const fillTheme = darkTheme ? 'black' : 'white';
  return (
    <svg className={`svg ${classNames.closedClass} ${isExtend ? classNames.openedClass : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect className="svg__rect" x="4" y="8" width="16" height="2" fill={fillTheme} />
      <rect className="svg__rect" x="4" y="14" width="16" height="2" fill={fillTheme} />
    </svg>
  );
}

export default ExtendButton;
