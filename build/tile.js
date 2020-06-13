import React from 'react';

var Tile = function Tile(_ref) {
  var src = _ref.src;

  return React.createElement(
    'div',
    { style: { margin: '4px' } },
    React.createElement('img', { style: {
        boxShadow: '0 1px 1px 2px rgba(0,0,0, .15)',
        borderRadius: '8px',
        width: '100%'
      }, src: src })
  );
};
export default Tile;