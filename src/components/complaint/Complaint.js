import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardMedia,
    Button,
    ButtonGroup
    

} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {
    ArrowDropUp
} from "@material-ui/icons"
const useStyles = makeStyles((theme)=>({
    container:{
        display: 'flex',
        width: '100%',
        height: '100px'
    },
    userPref:{
        display: 'flex',
        flexDirection: 'column',
        width: '10%'
    },
    upvotes:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5px' , 
  },
  details:{
      width:'60%'
  },
  heading:{
    fontWeight: 'bold'
  },
  caption:{
    fontSize: '15px'
  },
  dept:{
    color: 'red'
  },
  medDet:{
      width:'30%'
  }
}));
function Complaint(props) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
           
                    <CardContent className={classes.userPref}>
                        <Button>User</Button>
                        <CardContent className={classes.upvotes}>
                        <ArrowDropUp fontSize="large" />
                        <Typography>11</Typography>
                        </CardContent>
                    </CardContent>
                    <CardContent className={classes.details}>
                        <Typography  className={classes.heading}>Tree fallen on the main road</Typography>
                        <Typography className={classes.caption}>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography>
                        <Typography className={`${classes.caption} ${classes.dept}`}>Department</Typography>
                    </CardContent>
                    <CardContent className={classes.medDet}>
                        <Typography>{props.date}</Typography>
                        <Typography>{props.status}</Typography>
                        <CardMedia/>
                    </CardContent>
                
        </div>
    )
}

export default Complaint
