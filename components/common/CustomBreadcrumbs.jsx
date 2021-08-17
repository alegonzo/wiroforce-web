import { Breadcrumbs, Button, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'

const CustomBreadcrumbs = ({ path = [] }) => {
  const router = useRouter()

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      style={{ marginBottom: 20, marginTop: 20 }}
    >
      {path.map((item) =>
        item.page ? (
          <Button
            variant="text"
            onClick={() => router.push(item.page)}
            key={item.text}
          >
            {item.text}
          </Button>
        ) : (
          <Typography color="textPrimary" key={item.text}>
            {item.text}
          </Typography>
        )
      )}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
