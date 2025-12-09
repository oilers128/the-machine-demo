import { Alert, AlertProps } from '@mui/material'

export interface ErrorAlertProps extends Omit<AlertProps, 'severity'> {
  message: string | Error | unknown
  onClose?: () => void
}

export const ErrorAlert = ({ message, onClose, ...props }: ErrorAlertProps) => {
  if (!message) return null

  // Convert Error objects or other non-string values to strings
  const messageText = message instanceof Error 
    ? message.message || String(message)
    : typeof message === 'string'
    ? message
    : String(message)

  // Extract children from props to prevent Error objects from being passed through
  const { children, ...alertProps } = props as any

  return (
    <Alert severity="error" onClose={onClose} {...alertProps}>
      {messageText}
    </Alert>
  )
}


