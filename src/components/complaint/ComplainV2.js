import React from 'react'
import Complaint from './Complaint'
import {Card,Grid, Button,} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {COLOR} from "../../theme/Color"
const useStyles = makeStyles((theme)=>({
    card:{
      height:'150px', display:'flex', flexDirection:'column', marginTop: '10px',
      backgroundColor: '#F5EBEB'
    },
      check:{
      
      marginLeft: '90px',
      
  
    },
    btn:{
      backgroundColor: COLOR.redColour,
      color : 'white',
      '&:hover':{
          backgroundColor: COLOR.redColour
      }
    }
   
  }));
function ComplainV2(props) {
    const classes = useStyles();
    return (
        <>
            <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Card className={classes.card} style={{}}>
                    <Complaint date={props.date} status={props.status} /> 
                </Card>
            </Grid>
        </>
    )
}

export default ComplainV2
