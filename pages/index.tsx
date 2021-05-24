import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/Link';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Index() {
  const [session, loading] = useSession();
  const router = useRouter();
  return (
    <Container maxWidth="md" style={{ marginTop: 200 }}>
      <Grid container>
        <Grid item sm={12} md={12} style={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            WiroForce
          </Typography>
          <Typography variant="h4" component="h1" gutterBottom>
            Plataforma de monetizacion
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push('/dashboard')}>
            Ir al Dashboard
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}