import { useState } from 'react'
import { Send, Hash, CreditCard } from 'lucide-react'
import { api } from '../services/api'
import { toast } from 'react-hot-toast'

export default function TransferForm({ fromAccountId, onSuccess }) {
  const [formData, setFormData] = useState({
    toAccount: '',
    amount: '',
    idempotencyKey: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.toAccount || !formData.amount || !formData.idempotencyKey) {
      toast.error('Please fill all fields')
      return
    }
    const amountNum = parseFloat(formData.amount)
    if (amountNum <= 0) {
      toast.error('Amount must be positive')
      return
    }

    setLoading(true)
    try {
      await api.post('/transaction/', {
        fromAccount: fromAccountId,
        toAccount: formData.toAccount,
        amount: amountNum,
        idempotencyKey: formData.idempotencyKey
      })
      toast.success('Transfer successful!')
      setFormData({ toAccount: '', amount: '', idempotencyKey: '' })
      onSuccess()
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* From Account (display only) */}
      <div className="p-6 bg-blue-50/50 rounded-2xl border-2 border-dashed border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">From</p>
            <p className="text-sm text-gray-600 font-mono">****{fromAccountId?.slice(-4)}</p>
          </div>
        </div>
      </div>

      {/* To Account */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          To Account ID
        </label>
        <input
          type="text"
          placeholder="Enter recipient account ID (e.g., 64f...)"
          className="input-field"
          value={formData.toAccount}
          onChange={(e) => setFormData({ ...formData, toAccount: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          Amount (USD)
        </label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          className="input-field text-right font-mono"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          disabled={loading}
          required
        />
      </div>

      {/* Idempotency Key */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-400" />
          Idempotency Key (prevents duplicates)
        </label>
        <input
          type="text"
          placeholder="Unique key (e.g., txn-12345)"
          className="input-field"
          value={formData.idempotencyKey}
          onChange={(e) => setFormData({ ...formData, idempotencyKey: e.target.value })}
          disabled={loading}
          required
        />
        <p className="text-xs text-gray-500 mt-1">Use unique key for each transfer attempt</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 text-white py-5 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-2xl animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Send className="w-6 h-6" />
            Send Money
          </>
        )}
      </button>
    </form>
  )
}

