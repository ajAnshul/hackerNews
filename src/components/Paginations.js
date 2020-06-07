import React from 'react';


const pagination = ({setPage, page})=>{
    return(
        <>
            <button 
                onClick={()=>setPage(page-1)}
            >Prev</button>
            <button 
                onClick={()=>setPage(page+1)}
            >Next</button>
        </>
    )
}

export default pagination;