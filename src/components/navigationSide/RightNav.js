import { Typography, CardContent } from '@material-ui/core'
import React from 'react'
import {Link} from 'react-router-dom'
import {makeStyles} from "@material-ui/core/styles"

const useStyle = makeStyles((theme)=>({
    container:{
        padding: '30px',  
    },
    tabName:{
        // backgroundColor: '#ffe5d9',
        padding: '8px',
        width: '100%',
        borderBottom: '1px solid black'
    },
    links:{
        display:'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center', 
    },
    link:{
        textDecoration: 'none',
        width:'100%',
        color: 'black',
        margin:'8px',
        padding: '5px',
        fontWeight:'bold',
        // width:'100%',
        '&:hover':{
            textDecoration: 'underline 2px solid #8E0D37',
            borderRadius: '5px',
            // backgroundColor: '#dedbd2'
        },
        '&:active':{
            color: 'black',
            outline: 0,
            border: 'none',
        },
        '&:focus':{
            outline: 0,
            border: 'none',
        }
    },
    list:{
        marginLeft: '25px',
        fontWeight:'normal',

    }
}));

function RightNav() {
    const classes = useStyle();
    return (
        <div className={classes.container}>
            {/* <Typography className={classes.tabName} variant="h4"> </Typography> */}
            <CardContent className={classes.links}>
                
                <Typography className={classes.link} component={Link} to="/" >Dashboard</Typography>
                <Typography className={classes.link} style={{textDecoration: 'none'}} >Complaints</Typography>
                <Typography className={`${classes.link} ${classes.list}`} component={Link} to="/openList" >Open List</Typography>
                <Typography className={`${classes.link} ${classes.list}`} component={Link} to="/progressList" >Progress List</Typography>
                <Typography className={`${classes.link} ${classes.list}`} component={Link} to="/closedList" >Closed List</Typography>
                <Typography className={classes.link} component={Link} to="/settings" >User Settings</Typography>
                
   </CardContent>
        </div>
    )
}

export default RightNav
