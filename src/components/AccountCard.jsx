import React, { useState } from 'react'
import { RefreshCw, ChevronRight, DollarSign } from 'lucide-react'

export default function AccountCard({ account, onRefresh, onSelect }) {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async (e) => {
    e.stopPropagation()
    setRefreshing(true)
    try {
      await onRefresh(account._id)
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <div 
      className="card p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
      onClick={onSelect}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-600/10 transform group-hover:scale-105 transition-transform duration-300" />
      
      <div className="relative z-10">
        {/* Account header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-gray-800">Account</h3>
              <p className="text-sm text-gray-500">****{account._id.slice(-4)}</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 text-gray-400 hover:text-primary-500 hover:bg-white/50 rounded-xl transition-all duration-200 group-hover:scale-110"
            title="Refresh balance"
          >
            {refreshing ? (
              <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Balance */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Available Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-bold text-gray-800">
              ${account.balance ? account.balance.toFixed(2) : '0.00'}
            </span>
            <span className="text-sm text-green-600 font-semibold">USD</span>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            account.status === 'ACTIVE' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {account.status || 'ACTIVE'}
          </span>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  )
}

