import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const LinkButton = ({ label, url, icon }) => {
  return (
    <Button
      target="_blank"
      href={url}
      sx={{
        boxShadow:
          '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        padding: '8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: '4px',
        alignItems: 'center',
        textTransform: 'capitalize',
      }}
    >
      <Typography color="primary">
        <strong>{label}</strong>
      </Typography>
      {icon}
    </Button>
  )
}

export default LinkButton
