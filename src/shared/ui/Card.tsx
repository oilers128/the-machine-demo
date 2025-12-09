import { Paper, PaperProps } from '@mui/material'

export interface CardProps extends PaperProps {
  elevation?: number
}

export const Card = ({ elevation = 3, children, ...props }: CardProps) => {
  return (
    <Paper elevation={elevation} {...props}>
      {children}
    </Paper>
  )
}


