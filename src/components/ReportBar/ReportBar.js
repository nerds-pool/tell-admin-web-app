import React from 'react'
import {
    Grid,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {COLOR} from "../../theme/Color"
const useStyles = makeStyles((theme)=>({
    reportBar:{
        display: 'flex',
        width: '600px',
        height: '100px',
        // border: `2px solid ${COLOR.redColour}`,
        justifyContent: 'center',
        boxShadow: '2.5px 2.5px 2.5px 2.5px   rgba(0, 0, 0, .2)'
    },
    dataContain:{
        textAlign: 'center'
    },
    typeCase:{
        fontWeight: 'bold'
    }
}));

function ReportBar() {
    const classes = useStyles();
    return (
        <div>
            <Grid
                 container
                 direction="row"
                 justify="center"
                 alignItems="center"
            >
            <Card className={classes.reportBar}>
                <CardContent className={classes.dataContain}>
                    <Typography className={classes.typeCase}>Total Cases</Typography>
                    <Typography>13</Typography>
                </CardContent>
                <CardContent className={classes.dataContain}>
                    <Typography className={classes.typeCase}>Total Pending Cases</Typography>
                    <Typography>13</Typography>
                </CardContent>
                <CardContent className={classes.dataContain}>
                    <Typography className={classes.typeCase}>Total Solved Cases</Typography>
                    <Typography>13</Typography>
                    
                </CardContent>
            </Card>
            </Grid>
        </div>
    )
}

export default ReportBar
