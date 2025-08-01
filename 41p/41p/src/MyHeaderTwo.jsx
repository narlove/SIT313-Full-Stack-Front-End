import React from "react";

function MyHeaderTwo(props)
{
    return (
        <h2 style={{fontSize: "40px"}} className='text-center my-4'>{props.title}</h2>
    );
}

export default MyHeaderTwo;