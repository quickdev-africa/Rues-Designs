import { createClient } from '@supabase/supabase-js'

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Execute Phase 1 schema if tables don't exist
    console.log('Checking if Phase 1 tables exist...')
    
    // Test if products table exists
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['products', 'categories', 'orders', 'order_items', 'availability'])

    if (tableError) {
      return Response.json({ 
        error: 'Failed to check existing tables: ' + tableError.message 
      }, { status: 500 })
    }

    const existingTables = tables?.map(t => t.table_name) || []
    const requiredTables = ['products', 'categories', 'orders', 'order_items', 'availability']
    const missingTables = requiredTables.filter(table => !existingTables.includes(table))

    if (missingTables.length > 0) {
      return Response.json({ 
        error: `Missing tables: ${missingTables.join(', ')}. Please run the Phase 1 SQL scripts in Supabase first.`,
        required_tables: requiredTables,
        existing_tables: existingTables,
        missing_tables: missingTables
      }, { status: 400 })
    }

    // Check if sample data exists
    const { data: categories } = await supabase.from('categories').select('count', { count: 'exact' })
    const { data: products } = await supabase.from('products').select('count', { count: 'exact' })

    return Response.json({ 
      success: true,
      message: 'Phase 1 schema verification complete',
      tables: existingTables,
      data_counts: {
        categories: categories?.[0]?.count || 0,
        products: products?.[0]?.count || 0
      },
      phase1_ready: true
    })
    
  } catch (error) {
    return Response.json({ 
      error: 'Server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 })
  }
}