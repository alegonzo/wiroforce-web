import React from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, CardActions, Grid, Typography, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        paddingTop: theme.spacing(4)
    },
}));

const ApplicationList = ({ applications }) => {
    const router = useRouter();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {applications.map((item) => {
                    const labelId = `checkbox-list-secondary-label-${item.id}`;
                    return (
                        <Grid item md={3} key={item.id}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={() => router.push(`/applications/${item.appId}`)}
                                    >
                                        Administrar
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default ApplicationList;