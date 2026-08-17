import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/auth'
import { SubscriptionProvider } from './lib/subscription'
import { TabBar } from './components/TabBar'
import Home from './pages/Home'
import Prayers from './pages/Prayers'
import PrayerDetail from './pages/PrayerDetail'
import Rosary from './pages/Rosary'
import Readings from './pages/Readings'
import Saints from './pages/Saints'
import Examination from './pages/Examination'
import Account from './pages/Account'

export default function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <BrowserRouter>
          <div className="flex min-h-svh flex-1 flex-col overflow-y-auto">
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prayers" element={<Prayers />} />
                <Route path="/prayers/:id" element={<PrayerDetail />} />
                <Route path="/rosary" element={<Rosary />} />
                <Route path="/readings" element={<Readings />} />
                <Route path="/saints" element={<Saints />} />
                <Route path="/examination" element={<Examination />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </div>
            <TabBar />
          </div>
        </BrowserRouter>
      </SubscriptionProvider>
    </AuthProvider>
  )
}
