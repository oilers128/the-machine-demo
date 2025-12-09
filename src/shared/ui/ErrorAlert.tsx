import { Alert, AlertProps } from '@mui/material'

export interface ErrorAlertProps extends Omit<AlertProps, 'severity'> {
  message: string
  onClose?: () => void
}

export const ErrorAlert = ({ message, onClose, ...props }: ErrorAlertProps) => {
  if (!message) return null

  return (
    <Alert severity="error" onClose={onClose} {...props}>
      {message}
    </Alert>
  )
}


