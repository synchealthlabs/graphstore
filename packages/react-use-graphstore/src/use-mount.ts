import { useMemo } from 'react'

export function useOnce<T>(create: () => T): T {
  return useMemo(create, [])
}
