import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { useRouter } from 'next/router'
import {
  Grid,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import Head from 'next/head'
import Fade from 'react-reveal/Fade'
import {
  Check,
  Close,
  Facebook,
  Instagram,
  Telegram,
  Twitter,
} from '@material-ui/icons'
import { format } from 'date-fns'
import PricingCard from '../components/common/PricingCard'
import { PLATFORM_FUNCTIONALITIES, PRICES } from '../utils/constants'

export default function Index() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const goSignup = () => {
    router.push('/signup')
  }

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 960) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  useEffect(() => {
    if (window.innerWidth < 960) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    window.addEventListener('resize', handleResize)
  })

  return (
    <React.Fragment>
      <Head>
        <title>Wiroforce</title>
      </Head>
      {/*Header*/}
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Box>
            <img
              style={{
                marginLeft: 15,
                maxWidth: 200,
                flexGrow: 1,
              }}
              src="/wiroforce/images/wiroforceLogo.png"
              alt="Image"
            />
          </Box>
          <Typography variant="h6" style={{ flexGrow: 1 }}></Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {isMobile ? null : (
        <>
          <img
            style={{
              width: '25%',
              height: '40%',
              position: 'absolute',
              transform: 'rotate(-78deg)',
              top: '660px',
            }}
            src="/wiroforce/images/arrowWhite.png"
            alt="Image"
          />
          <img
            style={{
              width: '25%',
              height: '40%',
              position: 'absolute',
              top: '1340px',
              right: '0px',
            }}
            src="/wiroforce/images/arrowWhite.png"
            alt="Image"
          />
          <img
            style={{
              width: '25%',
              height: '40%',
              position: 'absolute',
              top: '3340',
            }}
            src="/wiroforce/images/arrowOrange.png"
            alt="Image"
          />
          <img
            style={{
              width: '60%',
              height: '100%',
              position: 'absolute',
              top: '3620px',
              right: '0px',
            }}
            src="/wiroforce/images/arrowDarkBlue.png"
            alt="Image"
          />
        </>
      )}
      {/*Seccion 1*/}
      <Container maxWidth="lg" style={{ paddingTop: 80, height: 750 }}>
        <Fade bottom>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={5} xs={12} sm={12} lg={5} style={{ padding: 20 }}>
              <Typography variant="h4">Fuerza de Crecimiento</Typography>
              <Box
                style={{
                  marginTop: '20px',
                  marginBottom: '30px',
                }}
              >
                <Typography variant="body1" gutterBottom>
                  Trabajamos para impulsar el desarrollo de videojuegos y
                  aplicaciones en Cuba creando herramientas que lo guiarán al
                  éxito.
                </Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={goSignup}>
                Comienza ahora
              </Button>
            </Grid>
            <Grid item md={7} xs={12} sm={12} lg={7}>
              <img
                style={{ width: '100%', height: '100%' }}
                src="/wiroforce/images/mobilePicture.png"
                alt="Image"
              />
            </Grid>
          </Grid>
        </Fade>
      </Container>
      {/*Seccion 2*/}
      <Container
        style={{
          backgroundColor: '#21222D',
          height: 700,
          textAlign: 'center',
          paddingTop: 100,
        }}
        maxWidth={false}
      >
        <Fade bottom>
          <Grid
            container
            item
            md={12}
            xs={12}
            sm={12}
            lg={12}
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <img
              style={{
                width: '100%',
                maxWidth: 400,
                marginTop: 100,
                marginBottom: 100,
              }}
              src="/wiroforce/images/wiroforceLogo.png"
              alt="Image"
            />
            <Typography variant="body1" gutterBottom>
              Soñamos con que los desarrolladores de videojuegos y aplicaciones
              puedan hacer rentables y escalables sus creaciones.
            </Typography>
          </Grid>
        </Fade>
      </Container>
      {/*Seccion 3*/}
      <Container maxWidth="lg">
        <Fade bottom>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={6} xs={12} sm={12} lg={6}>
              <img
                style={{ width: '100%', height: '100%' }}
                src="/wiroforce/images/graph1Picture.png"
                alt="Image"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sm={12}
              lg={6}
              style={{ padding: 20, paddingBottom: 40 }}
            >
              <Typography variant="h4">
                Convierta sus videojuegos y aplicaciones en un negocio rentable
              </Typography>
              <Box
                style={{
                  marginTop: '20px',
                  marginBottom: '30px',
                }}
              >
                <Typography variant="body1" gutterBottom>
                  Integración de diferentes métodos de pagos que te permitirán
                  monetizar tus creaciones mediante micropagos de manera
                  sencilla, además podrás lanzar campañas de publicidad de
                  aplicaciones para generar instalaciones, aumentar las
                  conversiones y mejorar su rentabilidad.
                </Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={goSignup}>
                Comienza ahora
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Container>
      {/*Seccion 4*/}
      <Container
        style={{
          backgroundColor: '#21222D',
          paddingTop: 100,
          paddingBottom: 100,
        }}
        maxWidth={false}
      >
        <Container maxWidth="lg">
          <Fade bottom>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item md={6} xs={12} sm={12} lg={6} style={{ padding: 20 }}>
                <img
                  style={{ width: '100%', height: '100%' }}
                  src="/wiroforce/images/graph2Picture.png"
                  alt="Image"
                />
              </Grid>
              <Grid item md={6} xs={12} sm={12} lg={6} style={{ padding: 10 }}>
                <Typography variant="h4">
                  Toma decisiones rápidas y certeras para redireccionar su
                  trabajo
                </Typography>
                <Box
                  style={{
                    marginTop: '20px',
                    marginBottom: '30px',
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    Las decisiones deben ser tomadas rápidamente y de manera
                    certera para redireccionar el trabajo en la dirección
                    correcta.
                  </Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={goSignup}>
                  Comienza ahora
                </Button>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Container>
      {/*Seccion 5*/}
      <Container
        style={{ textAlign: 'center', paddingTop: 100 }}
        maxWidth={false}
      >
        <Fade bottom>
          <Grid
            container
            item
            md={12}
            xs={12}
            sm={12}
            lg={12}
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography variant="h4">
              Potencie sus ingresos con configuraciones remotas de IAP
            </Typography>
            <Typography variant="body1" gutterBottom style={{ marginTop: 40 }}>
              Actualiza los productos y crea ofertas especiales dentro de la
              tienda de manera remota sin tener que lanzar una nueva versión
              permitiendo aumentar tus ingresos
            </Typography>
            <img
              style={{
                width: '100%',
                maxWidth: 600,
                marginTop: 100,
                marginBottom: 100,
              }}
              src="/wiroforce/images/gameMobilePicture.png"
              alt="Image"
            />
          </Grid>
        </Fade>
      </Container>
      {/*Seccion 6*/}
      <Container
        style={{
          backgroundColor: '#21222D',
          paddingTop: 100,
          paddingBottom: 100,
        }}
        maxWidth={false}
      >
        <Fade bottom>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item md={6} xs={12} sm={12} lg={6} style={{ padding: 40 }}>
              <Typography variant="h4">
                Obtenga los mayores rendimientos de sus campañas de publicidad
              </Typography>
              <Box
                style={{
                  marginTop: '20px',
                  marginBottom: '30px',
                }}
              >
                <Typography variant="body1" gutterBottom>
                  Mire de manera efectiva las campañas de adquisición de
                  usuarios que le permitirán tomar las mejores decisiones para
                  optimizar las campañas de videojuegos y aplicaciones
                </Typography>
              </Box>
              <Button variant="contained" color="primary" onClick={goSignup}>
                Comienza ahora
              </Button>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sm={12}
              lg={6}
              style={{ padding: 40, zIndex: 10 }}
            >
              <Box
                style={{
                  marginTop: '20px',
                  marginBottom: '30px',
                }}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontSize: 'large' }}
                >
                  Conozca la cantidad de instalaciones por canal de publicidad
                </Typography>
              </Box>
              <Box
                style={{
                  marginTop: '20px',
                  marginBottom: '30px',
                  marginLeft: '30px',
                }}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontSize: 'large' }}
                >
                  Converciones e ingresos por cada canal
                </Typography>
              </Box>
              <Box
                style={{
                  marginTop: '20px',
                  marginBottom: '30px',
                  marginLeft: '75px',
                }}
              >
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ fontSize: 'large' }}
                >
                  Mida su rendimiento mediante KPI de marketing
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Fade>
      </Container>
      {/*Pricing*/}
      <Container
        maxWidth={false}
        style={{ textAlign: 'center', paddingTop: 70, marginBottom: 50 }}
      >
        <Fade bottom>
          <Typography variant="h4" style={{ marginBottom: 40 }}>
            Funcionalidades y costos del servicio por niveles
          </Typography>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginBottom: 50 }}
          >
            <List dense={true}>
              {PLATFORM_FUNCTIONALITIES.map((item, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    {item.available ? (
                      <Check style={{ color: '#20BB8C' }} />
                    ) : (
                      <Close />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={4} xs={12} md={4} xl={4}>
              <PricingCard pricing={PRICES[0]} />
            </Grid>
            <Grid item lg={4} xs={12} md={4} xl={4}>
              <PricingCard pricing={PRICES[1]} />
            </Grid>
            <Grid item lg={4} xs={12} md={4} xl={4}>
              <PricingCard pricing={PRICES[2]} />
            </Grid>
          </Grid>
        </Fade>
      </Container>
      {/*Footer*/}
      <AppBar position="static" color="transparent" style={{ padding: 50 }}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{
              marginTop: 10,
            }}
          >
            <Grid item md={3} xs={12} sm={12} lg={3}>
              <Box>
                <img
                  style={{
                    maxWidth: 200,
                    flexGrow: 1,
                  }}
                  src="/wiroforce/images/wiroforceLogo.png"
                  alt="Image"
                />
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Grid item md={6} xs={12} sm={12} lg={6}>
                    <Typography variant="h6">Contacto</Typography>
                  </Grid>
                  <Grid item md={6} xs={12} sm={12} lg={6}>
                    <Typography variant="body2" style={{ fontSize: 'small' }}>
                      wiroforce@gmail.com
                    </Typography>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12} lg={12}>
                    <Typography
                      variant="subtitle2"
                      style={{
                        fontSize: 'x-small',
                        marginTop: 10,
                      }}
                    >
                      @{format(new Date(), 'yyyy')} Conwiro. All Rights Reserved
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} sm={12} lg={6}></Grid>
            <Grid item md={3} xs={12} sm={12} lg={3}>
              <Box>
                <Typography
                  variant="body2"
                  style={{
                    fontSize: 'medium',
                    textAlign: 'center',
                    marginTop: 10,
                  }}
                >
                  Social Media
                </Typography>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Grid
                    item
                    md={4}
                    xs={4}
                    sm={4}
                    lg={4}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <a href="https://www.facebook.com/WiroForce/">
                      <IconButton>
                        <Facebook />
                      </IconButton>
                    </a>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={4}
                    sm={4}
                    lg={4}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <a href="https://t.me/wiroforce">
                      <IconButton>
                        <Telegram />
                      </IconButton>
                    </a>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
