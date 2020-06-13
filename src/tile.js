import React from 'react'

const Tile = ({src}) => {
  return (
    <div style={{margin:'4px'}}>
			<img style={{
        	boxShadow: '0 1px 1px 2px rgba(0,0,0, .15)',
          borderRadius: '8px',
          width: '100%'
      }} src={src} />
		</div>
  )
}
module.exports = Tile
