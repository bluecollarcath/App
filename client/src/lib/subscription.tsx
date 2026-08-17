import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { Purchases, type Offering, type Package } from '@revenuecat/purchases-js'
import { useAuth } from './auth'

const RC_API_KEY = import.meta.env.VITE_REVENUECAT_API_KEY as string | undefined
const ENTITLEMENT_ID = 'premium'

type SubscriptionContextValue = {
  premium: boolean
  loading: boolean
  configured: boolean
  offering: Offering | null
  purchasePackage: (pkg: Package) => Promise<void>
  refresh: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [premium, setPremium] = useState(false)
  const [offering, setOffering] = useState<Offering | null>(null)
  const [loading, setLoading] = useState(false)
  const configured = Boolean(RC_API_KEY)

  const refresh = useCallback(async () => {
    if (!configured || !user || !Purchases.isConfigured()) return
    try {
      const info = await Purchases.getSharedInstance().getCustomerInfo()
      setPremium(Boolean(info.entitlements.active[ENTITLEMENT_ID]))
    } catch {
      // network hiccup — keep the last known status rather than locking the user out
    }
  }, [configured, user])

  useEffect(() => {
    let cancelled = false
    if (!configured || !user) {
      setPremium(false)
      setOffering(null)
      return
    }
    setLoading(true)
    ;(async () => {
      try {
        if (!Purchases.isConfigured()) {
          Purchases.configure({ apiKey: RC_API_KEY!, appUserId: user.id })
        } else {
          await Purchases.getSharedInstance().changeUser(user.id)
        }
        const purchases = Purchases.getSharedInstance()
        const [offerings, info] = await Promise.all([purchases.getOfferings(), purchases.getCustomerInfo()])
        if (cancelled) return
        setOffering(offerings.current)
        setPremium(Boolean(info.entitlements.active[ENTITLEMENT_ID]))
      } catch {
        // RevenueCat unreachable/misconfigured — free tier still works
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [configured, user])

  const purchasePackage = useCallback(async (pkg: Package) => {
    const result = await Purchases.getSharedInstance().purchase({ rcPackage: pkg })
    setPremium(Boolean(result.customerInfo.entitlements.active[ENTITLEMENT_ID]))
  }, [])

  return (
    <SubscriptionContext.Provider value={{ premium, loading, configured, offering, purchasePackage, refresh }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext)
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider')
  return ctx
}
