import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import {
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Slide,
  DialogContent,
  Button,
} from '@material-ui/core'
import { useRouter } from 'next/router'
import LoginLayout from '../../components/layouts/LoginLayout'
import ProfileForm from '../../components/user/ProfileForm'
//import { authService } from '../services/AuthService';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://conwiro.com/">
        Conwiro
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}))

// eslint-disable-next-line react/display-name
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const SignupPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const [showDialog, setShowDialog] = React.useState(false)

  return (
    <LoginLayout title="WiroForce - Crear cuenta">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {showDialog ? null : (
          <div>
            <Card className={classes.paper}>
              <CardContent>
                <Typography component="h1" variant="h5">
                  Crear cuenta
                </Typography>
                {/*@ts-ignore*/}
                <ProfileForm setShowDialog={setShowDialog} />
              </CardContent>
            </Card>

            <Box mt={8}>
              <Copyright />
            </Box>
          </div>
        )}
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={showDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setShowDialog(!showDialog)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Usuario Creado
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Su cuenta ha sido creada se le notificará por email cuando esté
              activa y pueda acceder a la plataforma
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => router.push('/')} color="primary">
              Ir al Inicio
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LoginLayout>
  )
}

export default SignupPage
