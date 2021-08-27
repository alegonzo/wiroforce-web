import React, { useEffect, useState } from 'react'
import { Grid, Paper, Switch } from '@material-ui/core'
import LoaderBar from '../../../components/common/LoaderBar'
import { getSession } from 'next-auth/client'
import Layout from '../../../components/layouts/Layout.jsx'
import api from '../../../utils/api'
import SearchField from '../../../components/common/SearchField'
import { useQueryClient } from 'react-query'
import { APPLICATIONS_URL } from '../../../utils/constants'
import useAppContext from '../../../components/AppContext'
import useApps from '../../../hooks/app/useApps'
import CustomTable from '../../../components/common/CustomTable'
import CustomSelect from '../../../components/common/CustomSelect'
import { format } from 'date-fns'
import useCompanies from '../../../hooks/company/useCompanies'
import ApplicationReceipt from '../../../components/application/ApplicationReceipt'

const Applications = ({ session }) => {
  const queryClient = useQueryClient()
  const { setMessage, setShowBackdrop } = useAppContext()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(5)
  const [search, setSearch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')

  const { data: companies } = useCompanies({ token: session.user.token })

  const {
    data: applications,
    isFetching,
    error,
  } = useApps(
    {
      token: session.user.token,
      params: {
        page,
        size,
        search,
        companyId: selectedCompany,
      },
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

  const updateActiveApplication = async (id, active) => {
    const r = confirm('Esta acción enviará un email al usuario. Está seguro?')
    if (r === true) {
      try {
        setShowBackdrop(true)
        await api().put(
          `/applications/${id}/updateStatus`,
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
          type: 'success',
        })
        await queryClient.invalidateQueries(APPLICATIONS_URL)
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

  const columns = [
    {
      id: 'name',
      name: 'Nombre',
      maxWidth: 250,
    },
    {
      id: 'company.name',
      name: 'Estudio',
      maxWidth: 200,
    },
    {
      id: 'active',
      name: 'Activo',
      custom: function CustomCell(row, idx) {
        return (
          <Switch
            checked={row.active}
            onChange={() => {
              updateActiveApplication(row.id, idx, row.active)
            }}
            name="check-active-product"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        )
      },
      maxWidth: 250,
    },
    {
      id: 'createdAt',
      name: 'Fecha de registro',
      custom: function CustomCell(row) {
        return format(new Date(row.createdAt), 'dd-MM-yyyy')
      },
      maxWidth: 250,
    },
    {
      id: 'receipt',
      name: 'Recibo',
      custom: function CustomCell(row) {
        return <ApplicationReceipt application={row} />
      },
      maxWidth: 250,
    },
  ]

  return (
    <Layout
      title={`Aplicaciones`}
      breadcrumbs={[
        {
          text: 'Dashboard',
          page: '/dashboard',
        },
        {
          text: 'Aplicaciones',
        },
      ]}
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container justifyContent="space-between">
            <SearchField placeholder="Buscar Aplicación" setValue={setSearch} />

            <Paper style={{ paddingLeft: 10, paddingRight: 10 }}>
              <CustomSelect
                id="companies-select"
                name="companies-select"
                label="Estudio"
                value={selectedCompany}
                items={
                  companies?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                }
                callback={(e) => setSelectedCompany(e.target.value)}
              />
            </Paper>
          </Grid>
          <div style={{ marginBottom: 20 }}></div>
          <br />

          {applications?.result?.length > 0 && !isFetching ? (
            <CustomTable
              data={applications.result}
              columns={columns}
              pagination={{
                count: applications.count,
                page,
                size,
                setSize,
                setPage,
              }}
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

export default Applications
