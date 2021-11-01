import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import LoaderBar from '../../../components/common/LoaderBar'
import Layout from '../../../components/layouts/Layout.jsx'
import UsersTable from '../../../components/user/UsersTable'
import useUsers from '../../../hooks/user/useUsers'
import SearchField from '../../../components/common/SearchField'
import { useQueryClient } from 'react-query'
import { USERS_URL } from '../../../utils/constants'
import useAppContext from '../../../components/AppContext'
import { api } from '../../../utils/api'

const Users = () => {
  const queryClient = useQueryClient()
  const { setMessage, setShowBackdrop } = useAppContext()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [search, setSearch] = useState('')
  const {
    data: users,
    error,
    isFetching,
  } = useUsers(
    {
      page,
      size,
      search,
    },
    {
      keepPreviousData: true,
    }
  )

  useEffect(() => {
    if (error?.message)
      setMessage({
        show: true,
        text: 'Ha ocurrido un error',
        type: 'error',
      })
  }, [error])

  const updateActiveUser = async (id, active) => {
    const r = confirm('Esta acción enviará un email al usuario. Está seguro?')
    if (r === true) {
      try {
        setShowBackdrop(true)
        await api(`/users/${id}/updateStatus`, {
          method: 'put',
          data: { active: !active },
        })
        setMessage({
          show: true,
          text: 'Acción realizada con éxito',
          type: 'success',
        })
        await queryClient.invalidateQueries(USERS_URL)
      } catch (e) {
        setMessage({
          show: true,
          text: 'Ha ocurrido un error',
          type: 'error',
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

          <br style={{ marginBottom: 20 }} />

          {users?.result?.length > 0 && !isFetching ? (
            <UsersTable
              users={users}
              updateActiveUser={updateActiveUser}
              page={page}
              setPage={setPage}
              size={size}
              setSize={setSize}
            />
          ) : (
            <Grid justifyContent="center" container>
              <Typography style={{ marginTop: 150, textAlign: 'center' }}>
                No hay usuarios
              </Typography>
            </Grid>
          )}
          {isFetching && <LoaderBar />}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Users
