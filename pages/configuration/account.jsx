import React, { useState } from 'react'
import { Button, Card, CardContent, makeStyles } from '@material-ui/core'
import Layout from '../../components/layouts/Layout'
import { getSession } from 'next-auth/client'
import useUser from '../../hooks/user/useUser'
import DetailTable from '../../components/common/DetailTable'
import { Edit } from '@material-ui/icons'
import ChangePasswordForm from '../../components/user/ChangePasswordForm'
import ProfileForm from '../../components/user/ProfileForm'
import LoaderBar from '../../components/common/LoaderBar'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
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
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 15,
  },
  icon: {
    fontSize: 15,
    color: 'gray',
    marginRight: 5,
  },
  content: {
    maxWidth: 500,
  },
})

const AccountConfig = ({ session }) => {
  const classes = useStyles()
  const [edit, setEdit] = useState(false)
  const { data: user } = useUser(session.user.token)

  return (
    <Layout
      title="Cuenta"
      breadcrumbs={[
        {
          text: 'Dashboard',
          page: '/dashboard',
        },
        {
          text: 'Cuenta',
        },
      ]}
    >
      {user ? (
        <>
          {!edit && (
            <div style={{ width: '100%' }}>
              <DetailTable
                data={[
                  {
                    id: 'email',
                    label: 'Email',
                    text: user.email,
                  },
                  {
                    id: 'fullName',
                    label: 'Nombre',
                    text: user.fullName,
                  },
                  {
                    id: 'company',
                    label: 'Estudio',
                    text: user.company.name,
                  },
                  {
                    id: 'address',
                    label: 'Dirección',
                    text: user.profile.address,
                  },
                  {
                    id: 'province',
                    label: 'Provincia',
                    text: user.profile.province,
                  },
                  {
                    id: 'phone',
                    label: 'Teléfono',
                    text: user.profile.phone,
                  },
                  {
                    id: 'onat',
                    label: 'NIT ONAT',
                    text: user.profile.nitOnat,
                  },
                  {
                    id: 'bankCard',
                    label: 'Tarjeta de Banco (Cuenta corriente CUP)',
                    text: user.profile?.bankCard || '-',
                  },
                ]}
              />

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
                <ProfileForm edit user={user} setEdit={setEdit} />
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <LoaderBar />
      )}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) return { props: { session } }
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}

export default AccountConfig
