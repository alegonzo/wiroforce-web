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
import ProductForm from '../../../components/product/ProductForm'
import Layout from '../../../components/layouts/Layout'
import { useRouter } from 'next/router'
import useProducts from '../../../hooks/product/useProducts'
import { useQueryClient } from 'react-query'
import { PRODUCTS_URL, PRODUCT_URL } from '../../../utils/constants'
import useAppContext from '../../../components/AppContext'
import SearchField from '../../../components/common/SearchField'
import CustomTable from '../../../components/common/CustomTable'
import { api } from '../../../utils/api'

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    minWidth: 900,
  },
}))

const Products = () => {
  const classes = useStyles()
  const { setMessage, setShowBackdrop } = useAppContext()
  const router = useRouter()
  const { appId } = router.query
  const queryClient = useQueryClient()

  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [search, setSearch] = useState('')
  const {
    data: products,
    isFetching,
    error,
  } = useProducts(
    {
      appId,
      page,
      size,
      search,
    },
    {
      enabled: appId !== '',
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

  const updateActiveProduct = async (id, listIndex, active) => {
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
  }

  const handleCloseForm = () => {
    setShowForm(!showForm)
    setSelectedProduct(null)
    setEditMode(false)
  }

  const handleEdit = (value) => {
    setSelectedProduct(value)
    setShowForm(true)
    setEditMode(true)
  }

  const columns = [
    {
      id: 'name',
      name: 'Nombre',
      maxWidth: 250,
    },
    {
      id: 'itemId',
      name: 'Id',
      maxWidth: 250,
    },
    {
      id: 'price',
      name: 'Precio (CUP)',
      maxWidth: 250,
    },
    {
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
    },
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
      maxWidth: 100,
    },
  ]

  return (
    <Layout
      title={`Productos - ${appId}`}
      breadcrumbs={[
        {
          text: 'Dashboard',
          page: '/dashboard',
        },
        {
          text: appId,
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
              Registrar Producto
            </Button>

            <SearchField placeholder="Buscar Producto" setValue={setSearch} />
          </Grid>

          <Dialog
            className={classes.form}
            open={showForm}
            onClose={handleCloseForm}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              {!editMode ? 'Registrar Producto' : 'Editar Producto'}
            </DialogTitle>

            <ProductForm
              handleCloseForm={handleCloseForm}
              edit={editMode}
              product={selectedProduct}
            />
          </Dialog>

          {isFetching && <LoaderBar />}

          {products?.result?.length > 0 && !isFetching ? (
            <CustomTable
              data={products.result}
              columns={columns}
              pagination={{
                count: products.count,
                page,
                size,
                setSize,
                setPage,
              }}
            />
          ) : products?.result?.length === 0 && !isFetching ? (
            <Grid justifyContent="center" container>
              <Typography style={{ marginTop: 150, textAlign: 'center' }}>
                No hay productos
              </Typography>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Products
