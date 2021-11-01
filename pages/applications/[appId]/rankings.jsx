import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  makeStyles,
  Switch,
  Typography,
} from '@material-ui/core'
import LoaderBar from '../../../components/common/LoaderBar'
import Layout from '../../../components/layouts/Layout'
import { useRouter } from 'next/router'
import { useQueryClient } from 'react-query'
import useAppContext from '../../../components/AppContext'
import CustomTable from '../../../components/common/CustomTable'
import useRankings from '../../../hooks/ranking/useRankings'
import RankingForm from '../../../components/ranking/RankingForm'
import RankingListModal from '../../../components/ranking/RankingListModal'

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    minWidth: 900,
  },
}))

const Rankings = () => {
  const classes = useStyles()
  const { setMessage } = useAppContext()
  const router = useRouter()
  const { appId: applicationId } = router.query

  const [showRankModal, setShowRankModal] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedRanking, setSelectedRanking] = useState(null)

  const {
    data: rankings,
    isFetching,
    error,
  } = useRankings(
    {
      applicationId,
    },
    {
      enabled: applicationId !== '',
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

  /*const updateActiveProduct = async (id, listIndex, active) => {
    try {
      setShowBackdrop(true)
      await api(PRODUCT_URL(id), { method: 'put', data: { active: !active } })
      setMessage({
        show: true,
        text: !active ? 'Producto Habilitado' : 'Producto Deshabilitado',
        type: 'success',
      })
      await queryClient.invalidateQueries(PRODUCTS_URL)
    } catch (e) {
      setMessage({
        show: true,
        text: 'Ha ocurrido un error',
        type: 'error',
      })
    } finally {
      setShowBackdrop(false)
    }
  }*/

  const handleCloseForm = () => {
    setShowForm(!showForm)
    setSelectedRanking(null)
    setEditMode(false)
  }

  const handleEdit = (value) => {
    setSelectedRanking(value)
    setShowForm(true)
    setEditMode(true)
  }

  const handleView = (value) => {
    setSelectedRanking(value)
    setShowRankModal(true)
    setEditMode(false)
  }

  const columns = [
    {
      id: 'name',
      name: 'Nombre',
      maxWidth: 600,
    },
    /*{
      id: 'active',
      name: 'Activo',
      custom: function CustomCell(row, idx) {
        return (
          <Switch
            checked={row.active}
            onChange={() => {
              updateActiveProduct(row.id, idx, row.active)
            }}
            name="check-active-product"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        )
      },
      maxWidth: 200,
    },*/
    {
      id: '',
      name: '',
      custom: function CustomCell(row) {
        return (
          <Button color="primary" onClick={() => handleEdit(row)}>
            Editar
          </Button>
        )
      },
      maxWidth: 80,
    },
    {
      id: '',
      name: '',
      custom: function CustomCell(row) {
        return (
          <Button color="primary" onClick={() => handleView(row)}>
            Ver
          </Button>
        )
      },
      maxWidth: 80,
    },
  ]

  return (
    <Layout
      title={`Productos - ${applicationId}`}
      breadcrumbs={[
        {
          text: 'Dashboard',
          page: '/dashboard',
        },
        {
          text: applicationId,
        },
        { text: 'Productos' },
      ]}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseForm}
            >
              Registrar Ranking
            </Button>
          </Grid>

          <Dialog
            className={classes.form}
            open={showForm}
            onClose={handleCloseForm}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">
              {!editMode ? 'Registrar Ranking' : 'Editar Ranking'}
              {editMode && selectedRanking && (
                <Typography>id: {selectedRanking.id}</Typography>
              )}
            </DialogTitle>

            <RankingForm
              handleCloseForm={handleCloseForm}
              edit={editMode}
              ranking={selectedRanking}
            />
          </Dialog>

          {isFetching && <LoaderBar />}

          {rankings?.length > 0 && !isFetching ? (
            <CustomTable
              data={rankings}
              columns={columns}
              paginated={false}
              pagination={{}}
            />
          ) : rankings?.length === 0 && !isFetching ? (
            <Grid justifyContent="center" container>
              <Typography style={{ marginTop: 150, textAlign: 'center' }}>
                No hay rankings
              </Typography>
            </Grid>
          ) : (
            ''
          )}
          {selectedRanking && (
            <RankingListModal
              handleCloseForm={() => setShowRankModal(!showRankModal)}
              showForm={showRankModal}
              ranking={selectedRanking}
            />
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Rankings
