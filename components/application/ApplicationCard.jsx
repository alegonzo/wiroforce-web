import { Button, Chip, makeStyles, colors, Tooltip, Box } from '@material-ui/core';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { ArrowBack, Help } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 10,
    },
    icon: {
        fontSize: 15,
        color: 'gray',
        marginRight: 5
    },
    content: {
        display: 'flex',
        flexDirection: 'row'
    }

});

const ApplicationCard = ({ application }) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Box p={2}>
                    <img src={application.imageUrl} height={100} width={100} alt="Imagen de producto" />
                </Box>
                <Box p={2}>
                    <Typography variant="body1" className={classes.pos}>
                        {`${application.name}`}
                    </Typography>
                    <Typography variant="body1" className={classes.pos}>
                        <Tooltip title="Key de la aplicación que es usado para registrar el SDK de WiroForce">
                            <Help className={classes.icon} />
                        </Tooltip>
                        {`${application.appId}-${application.token}`}
                    </Typography>
                    <Typography variant="caption" className={classes.pos}>
                        Fecha de registro {bull} {moment(application.createdAt).format("MMM Do YY")}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ApplicationCard;