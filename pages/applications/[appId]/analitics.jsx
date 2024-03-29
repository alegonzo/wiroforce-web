import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ApplicationCard from '../../../components/application/ApplicationCard'
import Layout from '../../../components/layouts/Layout'
import { getSession } from 'next-auth/client'
import generateDashboard from '../../../utils/metabase'
import axios from 'axios'
import IframeResizer from 'iframe-resizer-react'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}))

const Analitics = ({ application, iframeUrl }) => {
  const classes = useStyles()

  return (
    <Layout
      title={`Analitica - ${application.name}`}
      breadcrumbs={[
        {
          text: 'Dashboard',
          page: '/dashboard',
        },
        {
          text: application.name,
        },
      ]}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <ApplicationCard application={application} />
        </Grid>
      </Grid>

      <br />

      <div className={classes.root}>
        <Grid container>
          <Grid item md={12} xs={12} lg={12}>
            <IframeResizer
              src={iframeUrl}
              frameBorder={0}
              style={{ width: '1px', minWidth: '100%' }}
            />
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    const appId = context.params.appId
    let application = null
    try {
      const response = await axios.get(
        `${process.env.API_INTERNAL_URL}/applications/${appId}`,
        {
          headers: { Authorization: 'Bearer ' + session.user.token },
        }
      )
      application = response.data
    } catch (e) {
      console.log(e.message)
    }
    const iframeUrl = session
      ? generateDashboard(
          { dashboard: 2 },
          {
            id: session.user.company.id,
            id_1: application?.id,
          }
        )
      : null
    return {
      props: {
        session,
        iframeUrl,
        application: application,
      },
    }
  }
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}

export default Analitics
