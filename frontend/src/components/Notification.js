import React from "react"
import { Box, Alert, Collapse } from '@mui/material'

const Notification = ({ message, open }) => {
  return (
    <Box sx={{ width: "100%", marginTop: "5px", marginBottom: "10px" }}>
      <Collapse in={open}>
        <Alert severity="error">
          {message}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default Notification
