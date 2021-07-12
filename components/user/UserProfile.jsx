import {
    Button,
    Grid,
    makeStyles,
    Box,
} from "@material-ui/core";
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Edit } from "@material-ui/icons";
import ProfileForm from "./ProfileForm";
import UserProfileTable from './UserProfileTable'
import ChangePasswordForm from './ChangePasswordForm'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    label: {
        marginBottom: 5,
        fontWeight: "bold",
    },
    text: {
        marginBottom: 15,
    },
    icon: {
        fontSize: 15,
        color: "gray",
        marginRight: 5,
    },
    content: {
        display: "flex",
        flexDirection: "row",
    },
});

const UserProfile = ({ user, getProfile }) => {
    const classes = useStyles();
    const [edit, setEdit] = useState(false);

    const updateProfile = async () => {
        await getProfile();
        setEdit(false);
    };

    return (
        <>
            {!edit && (
                <div style={{ width: "100%" }}>
                    <UserProfileTable user={user} />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setEdit(true)}
                        style={{ marginRight: 20 }}
                    >
                        <Edit /> Editar
                    </Button>
                    <ChangePasswordForm />
                </div>
            )}

            {edit && (
                <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <Box p={2} style={{ width: "100%" }}>
                            <Grid container>
                                <Grid item md={12} xl={12} xs={12}>
                                    <ProfileForm
                                        edit
                                        user={user}
                                        setEdit={setEdit}
                                        getProfile={getProfile}
                                        updateProfile={updateProfile}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default UserProfile;
