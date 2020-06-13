var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useRef, useState, useEffect } from 'react';
import Tile from './tile';
import PropTypes from 'prop-types';

var Masonry = function Masonry(props) {
  var ref = useRef();

  var _useState = useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      columns = _useState2[0],
      setColumns = _useState2[1];

  useEffect(function () {
    var getColumns = function getColumns(width) {
      return props.breakPoints.reduceRight(function (memo, current, i) {
        return current < width ? memo : i;
      }, props.breakPoints.length) + 1;
    };
    var onResize = function onResize() {
      var cols = getColumns(ref.current.offsetWidth);
      if (cols !== columns) {
        setColumns(cols);
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    return function () {
      return window.removeEventListener('resize', onResize);
    };
  }, [columns, props.breakPoints]);

  var partitionTiles = function partitionTiles() {
    var cols = [];
    for (var i = 0; i < columns; i++) {
      cols.push([]);
    }
    return props.images.reduce(function (memo, current, i) {
      memo[i % columns].push(current);
      return memo;
    }, cols);
  };

  var mapColumns = function mapColumns() {
    var cols = partitionTiles();
    return cols.map(function (col, i) {
      return React.createElement(
        'div',
        { style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'stretch',
            flexGrow: 1
          }, key: 'col-' + i },
        col.map(function (child, ci) {
          return React.createElement(
            'div',
            { key: 'i-' + ci },
            React.createElement(Tile, { src: child })
          );
        })
      );
    });
  };

  return React.createElement(
    'div',
    { ref: ref, style: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'stretch',
        width: '100%',
        margin: 'auto'
      } },
    mapColumns()
  );
};

Masonry.propTypes = {
  breakPoints: PropTypes.array,
  images: PropTypes.array
};

Masonry.defaultProps = {
  breakPoints: [350, 500, 750]
};

export default Masonry;