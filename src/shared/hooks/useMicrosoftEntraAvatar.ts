import { useMemo, useState } from 'react'

interface DemoAccount {
  homeAccountId: string
  environment: string
  tenantId: string
  username: string
  name: string
  localAccountId: string
}

interface AvatarState {
  account: DemoAccount | null
  avatarUrl: string | null
  initials: string
  isLoading: boolean
}

export const useMicrosoftEntraAvatar = (): AvatarState => {
  const [avatarUrl] = useState<string | null>(null)
  const [initials] = useState('JW') // Joe Weiss initials
  const [isLoading] = useState(false)
  
  const account = useMemo(() => {
    return {
      homeAccountId: 'demo',
      environment: 'demo',
      tenantId: 'demo',
      username: 'demo@themachine.com',
      name: 'Joe Weiss',
      localAccountId: 'demo',
    }
  }, [])

  return {
    account,
    avatarUrl,
    initials,
    isLoading,
  }
}


