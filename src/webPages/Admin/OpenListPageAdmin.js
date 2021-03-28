import React from 'react'
import Complaint from '../../components/complaint/ComplainV2'
import ReportBar from '../../components/ReportBar/ReportBar'

function OpenListPageAdmin() {
    return (
        <div>
            <ReportBar/>
            <Complaint date={'31/03/2021'} status={'accept'}/>
            
        </div>
    )
}

export default OpenListPageAdmin
