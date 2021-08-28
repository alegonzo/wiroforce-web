import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { Check, Close } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    color: '#F76500',
  },
  pos: {
    marginBottom: 12,
  },
})

export default function PricingCard({ pricing: { title, data } }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid item style={{ textAlign: 'center' }}>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        {data.map((item, _idx) => (
          <Typography variant="body1" key={_idx} style={{ display: 'block' }}>
            {item}
          </Typography>
        ))}
      </CardContent>
    </Card>
  )
}
