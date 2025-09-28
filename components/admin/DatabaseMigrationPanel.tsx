"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface MigrationStatus {
  status: string
  compatibility_mode: 'enhanced' | 'legacy' | 'hybrid'
  has_enhanced_schema: boolean
  missing_tables: string[]
}

interface MigrationResult {
  success: boolean
  action: string
  result: any
  timestamp: string
}

export default function DatabaseMigrationPanel() {
  const [status, setStatus] = useState<MigrationStatus | null>(null)
  const [loading, setLoading] = useState(false)
  const [migrationResult, setMigrationResult] = useState<MigrationResult | null>(null)
  const [error, setError] = useState('')

  // Check migration status on load
  useEffect(() => {
    checkStatus()
  }, [])

  async function checkStatus() {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/migrate')
      const data = await response.json()
      
      if (response.ok) {
        setStatus(data)
        setError('')
      } else {
        setError(data.error || 'Failed to check status')
      }
    } catch (err: any) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  async function runMigration(action: string = 'full') {
    try {
      setLoading(true)
      setError('')
      setMigrationResult(null)

      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData?.session?.access_token

      const response = await fetch('/api/admin/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || ''}`
        },
        body: JSON.stringify({ action })
      })

      const result = await response.json()

      if (response.ok) {
        setMigrationResult(result)
        // Refresh status after migration
        await checkStatus()
      } else {
        setError(result.error || 'Migration failed')
      }
    } catch (err: any) {
      setError(err.message || 'Migration error')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (mode: string) => {
    switch (mode) {
      case 'enhanced': return 'bg-green-100 text-green-800'
      case 'hybrid': return 'bg-yellow-100 text-yellow-800'
      case 'legacy': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (mode: string) => {
    switch (mode) {
      case 'enhanced': return '✅'
      case 'hybrid': return '⚡'
      case 'legacy': return '📋'
      default: return '❓'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Database Integration Status
        </h2>
        <button
          onClick={checkStatus}
          disabled={loading}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {status && (
        <div className="space-y-4">
          {/* Current Status */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getStatusIcon(status.compatibility_mode)}</span>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">Integration Mode:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status.compatibility_mode)}`}>
                  {status.compatibility_mode.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {status.compatibility_mode === 'enhanced' && 'Enhanced backend is fully integrated ✨'}
                {status.compatibility_mode === 'hybrid' && 'Partial integration - some features enhanced'}
                {status.compatibility_mode === 'legacy' && 'Using legacy schema - migration recommended'}
              </p>
            </div>
          </div>

          {/* Missing Tables */}
          {status.missing_tables.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Missing Enhanced Tables:</h4>
              <div className="flex flex-wrap gap-2">
                {status.missing_tables.map((table) => (
                  <span key={table} className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                    {table}
                  </span>
                ))}
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                These tables are required for full enhanced functionality.
              </p>
            </div>
          )}

          {/* Migration Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Migration Actions:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => runMigration('check')}
                disabled={loading}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors disabled:opacity-50"
              >
                Check Schema
              </button>
              
              <button
                onClick={() => runMigration('products')}
                disabled={loading}
                className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors disabled:opacity-50"
              >
                Migrate Products
              </button>
              
              <button
                onClick={() => runMigration('users')}
                disabled={loading}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-md transition-colors disabled:opacity-50"
              >
                Migrate Users
              </button>
              
              <button
                onClick={() => runMigration('settings')}
                disabled={loading}
                className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-md transition-colors disabled:opacity-50"
              >
                Init Settings
              </button>
            </div>

            <button
              onClick={() => runMigration('full')}
              disabled={loading}
              className="w-full px-4 py-3 bg-gray-900 hover:bg-black text-white rounded-md transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? 'Running Migration...' : 'Run Full Migration'}
            </button>
          </div>

          {/* Migration Result */}
          {migrationResult && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h4 className="font-medium text-gray-900 mb-2">
                Migration Result ({migrationResult.action}):
              </h4>
              
              <div className={`p-3 rounded ${migrationResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-start space-x-2">
                  <span className="text-lg">
                    {migrationResult.success ? '✅' : '❌'}
                  </span>
                  <div className="flex-1">
                    <p className={`font-medium ${migrationResult.success ? 'text-green-800' : 'text-red-800'}`}>
                      {migrationResult.success ? 'Migration Successful' : 'Migration Failed'}
                    </p>
                    
                    {migrationResult.result && (
                      <div className="mt-2 text-sm space-y-1">
                        {migrationResult.result.results && (
                          <div className="space-y-1">
                            {migrationResult.result.results.products && (
                              <p className="text-gray-700">
                                Products: {migrationResult.result.results.products.migrated} migrated
                              </p>
                            )}
                            {migrationResult.result.results.users && (
                              <p className="text-gray-700">
                                Users: {migrationResult.result.results.users.migrated} migrated
                              </p>
                            )}
                            {migrationResult.result.results.settings && (
                              <p className="text-gray-700">
                                Settings: {migrationResult.result.results.settings.initialized} initialized
                              </p>
                            )}
                          </div>
                        )}
                        
                        {migrationResult.result.errors && migrationResult.result.errors.length > 0 && (
                          <div className="mt-2">
                            <p className="font-medium text-red-700">Errors:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {migrationResult.result.errors.map((error: string, index: number) => (
                                <li key={index} className="text-red-600 text-xs">{error}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(migrationResult.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Integration Benefits */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="font-medium text-blue-900 mb-2">🚀 Enhanced Backend Features:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✨ Apple-quality user experience with advanced order management</li>
              <li>💰 Integrated payment processing with security deposits</li>
              <li>📊 Real-time inventory tracking and availability checking</li>
              <li>🎯 Sales pipeline management with lead conversion</li>
              <li>⚙️ Configurable business settings and pricing rules</li>
              <li>📈 Advanced analytics and reporting dashboard</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}