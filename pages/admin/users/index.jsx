import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import LoaderBar from '../../../components/common/LoaderBar'
import { getSession } from 'next-auth/client'
import Layout from '../../../components/layouts/Layout.jsx'
import UsersTable from '../../../components/user/UsersTable'
import api from '../../../utils/api'
import useUsers from '../../../hooks/user/useUsers'
import SearchField from '../../../components/common/SearchField'
import { useQueryClient } from 'react-query'
import { USERS_URL } from '../../../utils/constants'
import useAppContext from '../../../components/AppContext'

const Users = ({ session }) => {
  const queryClient = useQueryClient()
  const { setMessage, setShowBackdrop } = useAppContext()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [search, setSearch] = useState('')
  const { data: users } = useUsers({
    token: session.user.token,
    page,
    size,
    search,
  })

  const updateActiveUser = async (id, active) => {
    const r = confirm('Esta acción enviará un email al usuario. Está seguro?')
    if (r === true) {
      try {
        setShowBackdrop(true)
        await api().put(
          `/users/${id}/updateStatus`,
          { active: !active },
          {
            headers: {
              Authorization: 'Bearer ' + session.user.token,
            },
          }
        )
        setMessage({
          show: true,
          text: 'Acción realizada con éxito',
        })
        queryClient.invalidateQueries(USERS_URL)
      } catch (e) {
        setMessage({
          show: true,
          text: 'Ha ocurrido un error',
        })
      } finally {
        setShowBackdrop(false)
      }
    }
  }

  return (
    <Layout
      title={`Usuarios`}
      breadcrumbs={[
        {
          text: 'Dashboard',
          page: '/dashboard',
        },
        {
          text: 'Usuarios',
        },
      ]}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <SearchField placeholder="Buscar Usuario" setValue={setSearch} />

          <div style={{ marginBottom: 20 }}></div>
          <br />

          {users ? (
            <UsersTable
              users={users}
              updateActiveUser={updateActiveUser}
              page={page}
              setPage={setPage}
              size={size}
              setSize={setSize}
            />
          ) : (
            <LoaderBar />
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session?.user?.roles === 'admin') {
    return { props: { session } }
  }
  return {
    redirect: { destination: '/login', permanent: false },
  }
}

export default Users
