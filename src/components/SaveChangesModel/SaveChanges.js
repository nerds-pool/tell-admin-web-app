import React from 'react'

function SaveChanges({showModel, setShowModel}) {
    return (
        <>
            {showModel? <div><h5>Model</h5></div> : null}
        </>
    )
}

export default SaveChanges
