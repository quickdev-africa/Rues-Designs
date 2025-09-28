"use client";
import { useState } from "react";
import { Button } from "@/components/Button";

export default function Phase1SetupPage() {
  const [status, setStatus] = useState<'idle' | 'checking' | 'ready' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState<any>(null);

  async function checkPhase1() {
    setStatus('checking');
    setMessage('Verifying Phase 1 database setup...');
    
    try {
      const response = await fetch('/api/admin/phase1-verify', { method: 'POST' });
      const result = await response.json();
      
      if (response.ok) {
        setStatus('ready');
        setMessage('✅ Phase 1 setup is complete and ready!');
        setDetails(result);
      } else {
        setStatus('error');
        setMessage(result.error || 'Phase 1 setup verification failed');
        setDetails(result);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to check Phase 1 setup: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  async function bootstrapAdmin() {
    try {
      const response = await fetch('/api/admin/bootstrap-dev', { method: 'POST' });
      const result = await response.json();
      
      if (response.ok) {
        setMessage('✅ Admin access bootstrapped! ' + result.message);
        setDetails(result);
      } else {
        setMessage('❌ Bootstrap failed: ' + result.error);
      }
    } catch (error) {
      setMessage('❌ Bootstrap error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Phase 1 Setup & Verification</h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="font-semibold text-blue-900 mb-2">📋 Phase 1 Checklist</h2>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Database schema (6 tables: users, categories, products, orders, order_items, availability)</li>
                <li>• RLS policies for owner/admin access patterns</li>
                <li>• Sample data for testing</li>
                <li>• Admin access properly configured</li>
              </ul>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={checkPhase1}
                disabled={status === 'checking'}
                className="w-full"
              >
                {status === 'checking' ? 'Checking...' : '🔍 Verify Phase 1 Setup'}
              </Button>

              {status === 'error' && details?.missing_tables && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">❌ Missing Database Tables</h3>
                  <p className="text-sm text-red-800 mb-3">
                    Please run these SQL scripts in your Supabase SQL Editor:
                  </p>
                  <ol className="text-sm text-red-800 space-y-1 mb-4">
                    <li>1. Copy and run: <code className="bg-red-100 px-1 rounded">database/phase1-schema.sql</code></li>
                    <li>2. Copy and run: <code className="bg-red-100 px-1 rounded">database/phase1-rls.sql</code></li>
                    <li>3. Copy and run: <code className="bg-red-100 px-1 rounded">database/phase1-seed.sql</code></li>
                  </ol>
                  <p className="text-xs text-red-600">
                    Missing: {details.missing_tables.join(', ')}
                  </p>
                </div>
              )}

              {status === 'ready' && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">✅ Phase 1 Ready!</h3>
                    <div className="text-sm text-green-800">
                      <p>Tables: {details?.tables?.join(', ')}</p>
                      <p>Data: {details?.data_counts?.categories} categories, {details?.data_counts?.products} products</p>
                    </div>
                  </div>

                  <Button 
                    onClick={bootstrapAdmin}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    🚀 Bootstrap Admin Access
                  </Button>
                </div>
              )}
            </div>

            {message && (
              <div className="bg-gray-50 border rounded-lg p-4">
                <p className="text-sm font-medium">{message}</p>
                {details && (
                  <details className="mt-2">
                    <summary className="text-xs text-gray-600 cursor-pointer">View Details</summary>
                    <pre className="text-xs text-gray-600 mt-2 overflow-auto">
                      {JSON.stringify(details, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Next Steps After Phase 1</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Phase 2:</strong> Cart functionality & pricing engine</li>
                <li>• <strong>Phase 3:</strong> Stripe checkout & payment processing</li>
                <li>• <strong>Phase 4:</strong> Email notifications & documents</li>
                <li>• <strong>Phase 5:</strong> Advanced admin operations & automation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}