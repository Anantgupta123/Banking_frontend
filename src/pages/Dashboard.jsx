import { useState, useEffect } from 'react'
import { Plus, Send, DollarSign } from 'lucide-react'
import { api } from '../services/api'
import AccountCard from '../components/AccountCard'
import TransferForm from '../components/TransferForm'
import { toast } from 'react-hot-toast'

export default function Dashboard({ user }) {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTransfer, setShowTransfer] = useState(false)
  const [selectedAccountId, setSelectedAccountId] = useState('')

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const response = await api.get('/accounts/')
      setAccounts(response.data.accounts)
    } catch (error) {
      toast.error('Failed to load accounts')
    } finally {
      setLoading(false)
    }
  }

  const createAccount = async () => {
    try {
      await api.post('/accounts/')
      toast.success('Account created successfully!')
      fetchAccounts()
    } catch (error) {
      toast.error('Failed to create account')
    }
  }

  const refreshBalance = async (accountId) => {
    try {
      const response = await api.get(`/accounts/balance/${accountId}`)
      toast.success(`Balance updated: $${response.data.balance.toFixed(2)}`)
      fetchAccounts()
    } catch (error) {
      toast.error('Failed to refresh balance')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card p-12 text-center">
          <div className="w-12 h-12 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-6" />
          <p className="text-gray-600 text-lg">Loading your accounts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 pb-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
          Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Welcome back, <span className="font-semibold text-primary-600">{user.name}</span>! Manage your banking here.
        </p>
      </div>

      {/* Accounts Section */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Your Accounts</h2>
          <button
            onClick={createAccount}
            className="btn-primary px-8 py-3 flex items-center gap-2 text-lg font-semibold shadow-xl hover:shadow-2xl"
          >
            <Plus className="w-5 h-5" />
            New Account
          </button>
        </div>

        {accounts.length === 0 ? (
          <div className="text-center py-20">
            <DollarSign className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-500 mb-4">No accounts yet</h3>
            <button
              onClick={createAccount}
              className="btn-primary py-4 px-8 text-lg font-semibold"
            >
              Create your first account
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((account) => (
              <AccountCard
                key={account._id}
                account={{
                  ...account,
                  balance: account.balance || 0  // Backend may not populate balance
                }}
                onRefresh={() => refreshBalance(account._id)}
                onSelect={() => setSelectedAccountId(account._id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Transfer Section */}
      <div>
        <button
          onClick={() => setShowTransfer(!showTransfer)}
          className="w-full sm:w-auto btn-primary py-4 px-8 text-lg font-semibold flex items-center justify-center gap-2 mx-auto shadow-xl hover:shadow-2xl group"
        >
          <Send className="w-6 h-6 group-hover:-rotate-12 transition-transform duration-200" />
          {showTransfer ? 'Cancel Transfer' : 'Make a Transfer'}
        </button>

        {showTransfer && accounts.length > 0 && (
          <div className="mt-8 card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send Money</h3>
            <p className="text-sm text-gray-500 mb-6 text-center">
              From: ****{selectedAccountId.slice(-4) || accounts[0]._id.slice(-4)}
            </p>
            <TransferForm 
              fromAccountId={selectedAccountId || accounts[0]._id} 
              onSuccess={fetchAccounts}
            />
          </div>
        )}
      </div>
    </div>
  )
}

