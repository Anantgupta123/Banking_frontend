import { Link } from 'react-router-dom'
import { ArrowRight, Shield, DollarSign, CreditCard } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center p-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Welcome to Secure Banking
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Manage your accounts, make secure transactions, and track your balance with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="btn-primary text-lg py-4 px-8 flex items-center gap-2 justify-center max-w-md mx-auto sm:w-auto"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/register"
              className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm font-medium py-4 px-8 rounded-xl transition-all duration-200 flex items-center gap-2 justify-center max-w-md mx-auto sm:w-auto"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8 bg-white/10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <Shield className="w-16 h-16 text-primary-500 mx-auto mb-6 group-hover:rotate-6 transition-transform" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Secure</h3>
              <p className="text-gray-600 leading-relaxed">Bank-grade security with JWT authentication and idempotency protection.</p>
            </div>
            <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <DollarSign className="w-16 h-16 text-banking-gold mx-auto mb-6 group-hover:rotate-6 transition-transform" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Fast Transfers</h3>
              <p className="text-gray-600 leading-relaxed">Instant transactions between accounts with real-time balance updates.</p>
            </div>
            <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
              <CreditCard className="w-16 h-16 text-green-500 mx-auto mb-6 group-hover:rotate-6 transition-transform" />
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Easy Management</h3>
              <p className="text-gray-600 leading-relaxed">Create accounts, check balances, and manage everything in one place.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
