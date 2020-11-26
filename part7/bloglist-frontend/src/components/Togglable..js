import React, { useState, useImperativeHandle } from 'react'
import { Button, Grid } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Grid container style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Grid xs={false} sm={4} md={4} />
          <Grid xs={12} sm={4} md={4}>
            <Button
              onClick={toggleVisibility}
              variant="contained"
              color="primary"
              fullWidth
            >
              {props.buttonLabel}
            </Button>
          </Grid>
          <Grid xs={false} sm={4} md={4} />
        </Grid>
      </div>
      
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Grid container style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Grid xs={false} sm={4} md={4} />
          <Grid xs={12} sm={4} md={4}>
            <Button
              onClick={toggleVisibility}
              variant="contained"
              color="primary"
              fullWidth
            >
              cancel
            </Button>
          </Grid>
          <Grid xs={false} sm={4} md={4} />
        </Grid>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
