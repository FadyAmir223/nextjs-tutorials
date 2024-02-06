'use client'

import { createContext, useContext, useState } from 'react'
import type { ReactNode, Dispatch, SetStateAction } from 'react'
import type { ActiveSection } from '@/lib/types'

type ValueActiveSectionContext = {
  activeSection: ActiveSection
  timeOfLastClick: number
}

type DispatchActiveSectionContext = {
  setActiveSection: Dispatch<SetStateAction<ActiveSection>>
  setTimeOfLastClick: Dispatch<SetStateAction<number>>
}

const ValueActiveSectionContext =
  createContext<ValueActiveSectionContext | null>(null)

const DispatchActiveSectionContext =
  createContext<DispatchActiveSectionContext | null>(null)

type ActiveSectionContextProviderProps = {
  children: ReactNode
}

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<ActiveSection>('Home')
  const [timeOfLastClick, setTimeOfLastClick] = useState(0)

  return (
    <DispatchActiveSectionContext.Provider
      value={{ setActiveSection, setTimeOfLastClick }}
    >
      <ValueActiveSectionContext.Provider
        value={{ activeSection, timeOfLastClick }}
      >
        {children}
      </ValueActiveSectionContext.Provider>
    </DispatchActiveSectionContext.Provider>
  )
}

export function useValueActiveSectionContext() {
  const value = useContext(ValueActiveSectionContext)

  if (value === null)
    throw new Error(
      'useActiveSectionContext must be used within ActiveSectionContextProvider',
    )

  return value
}

export function useDispatchActiveSectionContext() {
  const dispatch = useContext(DispatchActiveSectionContext)

  if (dispatch === null)
    throw new Error(
      'useActiveSectionContext must be used within ActiveSectionContextProvider',
    )

  return dispatch
}
