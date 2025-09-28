import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Promote ALL users to admin (since we're in development)
    const { data: allUsers, error: fetchError } = await supabase
      .from('users')
      .select('id, email, role')

    if (fetchError) {
      return Response.json({ 
        error: 'Failed to fetch users: ' + fetchError.message 
      }, { status: 500 })
    }

    // Update all users to admin (set only role)
    const { data, error } = await supabase
      .from('users')
      .update({ 
        role: 'admin',
        updated_at: new Date().toISOString()
      })
      .neq('id', '00000000-0000-0000-0000-000000000000') // Update all records
      .select()

    if (error) {
      return Response.json({ 
        error: 'Update failed: ' + error.message 
      }, { status: 500 })
    }

    return Response.json({ 
      success: true, 
      message: 'All users promoted to admin successfully!',
      before: allUsers,
      updated: data,
      count: data?.length || 0
    })
    
  } catch (error) {
    return Response.json({ 
      error: 'Server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 })
  }
}