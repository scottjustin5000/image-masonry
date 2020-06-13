import React, { useRef, useState, useEffect } from 'react'
import Tile from './tile'
import PropTypes from 'prop-types'

const Masonry = (props) => {
  const ref = useRef()
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const getColumns = (width) => {
      return props.breakPoints.reduceRight((memo, current, i) => {
        return current < width ? memo : i;
      }, props.breakPoints.length) + 1;
    }
    const onResize = () => {
      const cols = getColumns(ref.current.offsetWidth);
      if(cols !== columns){
        setColumns(cols)
      }
    }
    window.addEventListener('resize', onResize)
    onResize()
    return ()=> window.removeEventListener('resize', onResize)
  },[columns, props.breakPoints])
  
  const partitionTiles = () => {
    let cols = []
		for(let i = 0; i < columns; i++){
			cols.push([])
		}
		return props.images.reduce((memo,current,i) => {
			memo[i%columns].push(current)
			return memo
		}, cols)
  }

  const mapColumns = ()=> {
    const cols = partitionTiles()
    return cols.map((col, i)=> {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignContent: 'stretch',
          flexGrow: 1
        }} key={`col-${i}`} >
          {col.map((child, ci) => {
            return <div key={`i-${ci}`} >{<Tile src={child} />}</div>
          })}
        </div>
      )
    })
  }


  return (
  <div ref={ref} style={{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'stretch',
    width:'100%',
    margin:'auto'
  }}>
  {mapColumns()}
  </div>)
}

Masonry.propTypes = {
  breakPoints: PropTypes.array,
  images: PropTypes.array
}

Masonry.defaultProps = {
  breakPoints: [350, 500, 750]
}

export default Masonry