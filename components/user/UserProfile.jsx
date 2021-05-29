import { Button, Chip, Grid, makeStyles, colors, Tooltip, Box, CardHeader } from '@material-ui/core';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { ArrowBack, Edit, Help } from '@material-ui/icons';
import ProfileForm from './ProfileForm';

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
    label: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    text: {
        marginBottom: 15,
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

const UserProfile = ({ user, getProfile }) => {
    const classes = useStyles();
    const [edit, setEdit] = useState(false);

    const updateProfile = async () => {
        await getProfile();
        setEdit(false);
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                {
                    !edit &&
                    <Box p={2}>
                        <Grid container>
                            <Grid item md={6} xl={6} xs={12}>
                                <Typography variant="body1" className={classes.label}>
                                    Nombre Completo
                            </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {user.fullName}
                                </Typography>
                                <Typography variant="body1" className={classes.label}>
                                    Email
                            </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {user.email}
                                </Typography>
                                <Typography variant="body1" className={classes.label}>
                                    Estudio
                            </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {user.company.name}
                                </Typography>
                                <Typography variant="body1" className={classes.label}>
                                    Fecha de registro
                            </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {moment(user.createdAt).format("MMM Do YY")}
                                </Typography>
                            </Grid>
                            <Grid item md={6} xl={6} xs={12}>
                                <Typography variant="body1" className={classes.label}>
                                    Direccion
                            </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {user.address}
                                </Typography>
                                <Typography variant="body1" className={classes.label}>
                                    Provincia
                            </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {user.province}
                                </Typography>
                                <Typography variant="body1" className={classes.label}>
                                    Telefono
                            </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {user.phone}
                                </Typography>
                                <Typography variant="body1" className={classes.label}>
                                    Nit ONAT
                            </Typography>
                                <Typography variant="body1" className={classes.text}>
                                    {user.nitOnat}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br />
                        <Button variant="contained" color="primary" onClick={() => setEdit(true)}>
                            <Edit /> Editar
                    </Button>
                    </Box>
                }
                {
                    edit &&
                    <Box p={2}>
                        <Grid container>
                            <Grid item md={6} xl={6} xs={6}>
                                <ProfileForm edit user={user} setEdit={setEdit} getProfile={getProfile} updateProfile={updateProfile} />
                            </Grid>
                        </Grid>
                    </Box>
                }
            </CardContent>
        </Card>
    );
}

export default UserProfile;