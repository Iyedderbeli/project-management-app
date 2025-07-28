import React from 'react'
//02:50:40
const CustomToolTip = ({active,payload}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-md border border-gray-300">
        <p className="text-xs font-semibold text-purple-800 mb-1">{payload[0].name}</p>
        <p className="text-xs text-gray-600">
          Count: <span className='text-sm font-medium text-gray-900'>{payload[0].value}</span>
        </p>
      </div>
    );
    
  }
  return null;
}

export default CustomToolTip