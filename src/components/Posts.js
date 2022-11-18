import React from 'react'

const Posts = ({items,loading}) => {
    if(loading){
        return <h2>Loading...</h2>
    }
  return (
    <ul className='list-group mb-4'>
        {items.map(post =>(
            <li key={items.id} className='list-group-item'>
                {items.title}
            </li>
        ))}
    </ul>
  );
};

export default Posts