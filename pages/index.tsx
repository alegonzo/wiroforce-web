import React from "react";
import Container from "@material-ui/core/Container";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { Grid, Divider, Button, Typography, Box } from "@material-ui/core";
import Head from "next/head";

export default function Index(props) {
    const [session, loading] = useSession();
    const router = useRouter();
    return (
        <React.Fragment>
            <Head>
                <title>Wiroforce</title>
            </Head>
            <Container
                style={{
                    display: "flex",
                    marginLeft: "40px",
                    marginRight: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "auto",
                }}
            >
                <div
                    style={{
                        width: "25%",
                        height: "37px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img
                        style={{ width: "100%", height: "80%" }}
                        src="/wiroforce/images/wiroforceLogo.PNG"
                        alt="Image"
                    />
                </div>
                <div style={{ flexGrow: 1 }}></div>
                <Button variant="outlined" color="inherit" onClick={() => {}}>
                    Login
                </Button>
            </Container>
            <Container
                style={{
                    display: "flex",
                    marginLeft: "40px",
                    marginRight: "40px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "auto",
                }}
            >
                <div
                    style={{
                        marginLeft: "30px",
                        paddingRight: "20px",
                        alignSelf: "center",
                        width: "45%",
                    }}
                >
                    <Typography variant="h5">Fuerza de Crecimiento</Typography>
                    <Box
                        style={{
                            marginTop: "20px",
                            marginBottom: "30px",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Somos una de las fuerzas que impulsa el desarrollo
                            de videojuegos y aplicaciones en Cuba mediante
                            herramientas necesarias para impulsar el éxito
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {}}
                    >
                        Comienza ahora
                    </Button>
                </div>
                <div
                    style={{
                        alignSelf: "center",
                        width: "55%",
                    }}
                >
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src="/wiroforce/images/mobilePicture.png"
                        alt="Image"
                    />
                </div>
            </Container>
            <Container
                style={{
                    backgroundColor: "#17171f",
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "120px",
                    paddingBottom: "200px",
                    width: "auto",
                    justifyContent: "center",
                    maxWidth: "inherit",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "35%",
                        alignSelf: "center",
                    }}
                >
                    <img
                        style={{ width: "100%" }}
                        src="/wiroforce/images/wiroforceLogo.png"
                        alt="Image"
                    />
                </div>
                <Box
                    style={{
                        marginTop: "40px",
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        style={{ width: "50%" }}
                        variant="body1"
                        gutterBottom
                    >
                        Ayudar a los desarrolladores de videojuegos y
                        aplicaciones a que sus trabajos sean rentables y
                        exitosos.
                    </Typography>
                </Box>
            </Container>
            <Container
                style={{
                    display: "flex",
                    marginLeft: "40px",
                    marginRight: "40px",
                    width: "auto",
                }}
            >
                <div
                    style={{
                        alignSelf: "center",
                        width: "55%",
                    }}
                >
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src="/wiroforce/images/graph1Picture.png"
                        alt="Image"
                    />
                </div>
                <div
                    style={{
                        marginLeft: "10px",
                        alignSelf: "center",
                        width: "45%",
                    }}
                >
                    <Typography variant="h5">
                        Convierta sus videojuegos y aplicaciones en un negocio
                        rentable
                    </Typography>
                    <Box
                        style={{
                            marginTop: "20px",
                            marginBottom: "30px",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Integración de diferentes métodos de pagos que te
                            permitirán modificar tus creaciones mediante
                            micropagos de manera sencilla
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {}}
                    >
                        Comienza ahora
                    </Button>
                </div>
            </Container>
            <Container
                style={{
                    maxWidth: "inherit",
                    backgroundColor: "#17171f",
                    display: "flex",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    width: "auto",
                }}
            >
                <div
                    style={{
                        alignSelf: "center",
                        width: "55%",
                    }}
                >
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src="/wiroforce/images/graph2Picture.png"
                        alt="Image"
                    />
                </div>
                <div
                    style={{
                        marginLeft: "10px",
                        alignSelf: "center",
                        width: "45%",
                    }}
                >
                    <Typography variant="h5">
                        Temo decisiones rápidas y certeras para redireccionar su
                        trabajo
                    </Typography>
                    <Box
                        style={{
                            marginTop: "20px",
                            marginBottom: "30px",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Disponga de una serie de herramientas basadas en
                            datos analíticos que le dará información en tiempo
                            real para agilizar la toma
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {}}
                    >
                        Comienza ahora
                    </Button>
                </div>
            </Container>
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "80px",
                    paddingBottom: "30px",
                    width: "auto",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignSelf: "center",
                        width: "50%",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h5">
                        Potencie sus ingresos con configuraciones remotas de IAP
                    </Typography>
                </div>
                <Box
                    style={{
                        marginTop: "30px",
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Typography
                        style={{ width: "75%" }}
                        variant="body1"
                        gutterBottom
                    >
                        Actualiza los productos y crea ofertas especiales dentro
                        de la tienda de manera remota sin tener que lanzar una
                        nueva versión permitiendo aumentar tus ingresos
                    </Typography>
                </Box>
                <div
                    style={{
                        display: "flex",
                        alignSelf: "center",
                        width: "50%",
                    }}
                >
                    <img
                        style={{ width: "100%", height: "100%" }}
                        src="/wiroforce/images/gameMobilePicture.png"
                        alt="Image"
                    />
                </div>
            </Container>
            <Container
                style={{
                    maxWidth: "inherit",
                    backgroundColor: "#17171f",
                    display: "flex",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "80px",
                    paddingBottom: "100px",
                    width: "auto",
                }}
            >
                <div
                    style={{
                        marginLeft: "30px",
                        alignSelf: "center",
                        width: "40%",
                    }}
                >
                    <Typography variant="h5">
                        Obtenga los mayores rendimientos de su campaña de
                        publicidad
                    </Typography>
                    <Box
                        style={{
                            marginTop: "20px",
                            marginBottom: "30px",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Mida de manera efectiva las campañas de adquisición
                            de usuarios que le permitirán tomar las mejores
                            decisiones para optimizar las campañas de
                            videojuegos y aplicaciones
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {}}
                    >
                        Comienza ahora
                    </Button>
                </div>
                <div style={{ marginLeft: "190px" }}></div>
                <div
                    style={{
                        marginLeft: "10px",
                        paddingRight: "100px",
                        alignSelf: "center",
                        width: "40%",
                    }}
                >
                    <Box
                        style={{
                            marginTop: "10px",
                            marginBottom: "15px",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Conozca cantidad de instalaciones por canal de
                            publicidad
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            marginLeft: "20px",
                            marginTop: "10px",
                            marginBottom: "15px",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Convenciones e ingresos por cada canal
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            marginLeft: "40px",
                            marginTop: "10px",
                            marginBottom: "15px",
                        }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Mida sus rendimientos mediante KPI de marketing
                        </Typography>
                    </Box>
                </div>
            </Container>
        </React.Fragment>
    );
}
