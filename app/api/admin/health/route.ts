import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function GET() {
  try {
    const adminClient = createClient(supabaseUrl, serviceKey)
    
    const checks = {
      environment: {
        supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      database: {
        connection: false,
        tables: {} as Record<string, boolean>,
        functions: {} as Record<string, boolean>,
        policies: {} as Record<string, boolean>
      },
      integration: {
        seamless_ops: true,
        migration_helper: true,
        enhanced_types: true
      }
    }

    // Test database connection
    try {
      const { data, error } = await adminClient.from('users').select('count', { count: 'exact' }).limit(1)
      checks.database.connection = !error
    } catch {
      checks.database.connection = false
    }

    // Check required tables exist
    const requiredTables = ['users', 'products', 'orders', 'order_items', 'payments', 'leads', 'settings']
    
    for (const table of requiredTables) {
      try {
        const { error } = await adminClient.from(table).select('*').limit(1)
        checks.database.tables[table] = !error
      } catch {
        checks.database.tables[table] = false
      }
    }

    // Check required functions exist
    const requiredFunctions = [
      'generate_order_number',
      'calculate_order_totals', 
      'check_product_availability',
      'generate_quote',
      'promote_user_to_admin'
    ]

    for (const func of requiredFunctions) {
      try {
        const { data, error } = await adminClient.rpc('pg_get_functiondef', {
          funcoid: `public.${func}`
        })
        checks.database.functions[func] = !error && !!data
      } catch {
        checks.database.functions[func] = false
      }
    }

    // Check RLS policies
    try {
      const { data: policies, error } = await adminClient
        .from('pg_policies')
        .select('policyname, tablename')
        .eq('schemaname', 'public')

      if (!error && policies) {
        const policyNames = policies.map(p => `${p.tablename}.${p.policyname}`)
        checks.database.policies = {
          users_own_data: policyNames.includes('users.users_own_data'),
          admin_users_full_access: policyNames.includes('users.admin_users_full_access'),
          products_public_read: policyNames.includes('products.products_public_read'),
          admin_products_full_access: policyNames.includes('products.admin_products_full_access'),
          customers_own_orders: policyNames.includes('orders.customers_own_orders'),
          admin_orders_full_access: policyNames.includes('orders.admin_orders_full_access')
        }
      }
    } catch {
      checks.database.policies = {}
    }

    // Calculate overall health score
    const envScore = Object.values(checks.environment).filter(Boolean).length / Object.values(checks.environment).length
    const tableScore = Object.values(checks.database.tables).filter(Boolean).length / Object.values(checks.database.tables).length
    const functionScore = Object.values(checks.database.functions).filter(Boolean).length / Object.values(checks.database.functions).length
    const policyScore = Object.values(checks.database.policies).filter(Boolean).length / Math.max(Object.values(checks.database.policies).length, 1)
    
    const overallScore = Math.round(((envScore + tableScore + functionScore + policyScore) / 4) * 100)

    let status = 'error'
    let message = 'System not ready'
    
    if (overallScore >= 90) {
      status = 'ready'
      message = 'Enhanced backend fully integrated ✨'
    } else if (overallScore >= 70) {
      status = 'partial'
      message = 'Partial integration - some setup required'
    } else if (overallScore >= 30) {
      status = 'minimal'
      message = 'Basic setup detected - enhanced features limited'
    }

    return NextResponse.json({
      status,
      message,
      health_score: overallScore,
      checks,
      recommendations: generateRecommendations(checks),
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

function generateRecommendations(checks: any): string[] {
  const recommendations: string[] = []

  // Environment recommendations
  if (!checks.environment.supabase_url) {
    recommendations.push('Set NEXT_PUBLIC_SUPABASE_URL environment variable')
  }
  if (!checks.environment.supabase_anon_key) {
    recommendations.push('Set NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }
  if (!checks.environment.service_role_key) {
    recommendations.push('Set SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  // Database recommendations
  if (!checks.database.connection) {
    recommendations.push('Check database connection and credentials')
  }

  const missingTables = Object.entries(checks.database.tables)
    .filter(([_, exists]) => !exists)
    .map(([table]) => table)
  
  if (missingTables.length > 0) {
    recommendations.push(`Run enhanced-schema.sql in Supabase to create missing tables: ${missingTables.join(', ')}`)
  }

  const missingFunctions = Object.entries(checks.database.functions)
    .filter(([_, exists]) => !exists)
    .map(([func]) => func)
  
  if (missingFunctions.length > 0) {
    recommendations.push(`Database functions missing - ensure enhanced-schema.sql was executed completely`)
  }

  const missingPolicies = Object.entries(checks.database.policies)
    .filter(([_, exists]) => !exists)
    .map(([policy]) => policy)
  
  if (missingPolicies.length > 0) {
    recommendations.push(`Run enhanced-rls.sql in Supabase to create security policies`)
  }

  if (recommendations.length === 0) {
    recommendations.push('System is fully configured! 🎉')
  }

  return recommendations
}