import React from 'react'
import CardPrompt from '../Card/CardPrompt'
import { Stack } from '@mui/material'

const NewChat = () => {
  return (
    <div>
      <h1>New Chat</h1>
      <p>How can I help you today?</p>
      <Stack spacing={2} direction='row' useFlexGap flexWrap="wrap">
        <CardPrompt />
        <CardPrompt />
        <CardPrompt />
        <CardPrompt />
        <CardPrompt />
        <CardPrompt />
        <CardPrompt />
      </Stack>
    </div>
  )
}

export default NewChat