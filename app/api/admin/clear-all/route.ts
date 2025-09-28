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
    // Step 1: Get all auth users and delete them
    const { data: authUsers } = await supabase.auth.admin.listUsers()
    
    for (const user of authUsers.users) {
      await supabase.auth.admin.deleteUser(user.id)
    }

    // Step 2: Clear public.users table
    const { error: deleteError } = await supabase
      .from('users')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records

    if (deleteError) {
      console.warn('Error clearing users table:', deleteError.message)
    }

    return Response.json({ 
      success: true, 
      message: 'All users cleared successfully',
      deletedAuthUsers: authUsers.users.length
    })
    
  } catch (error) {
    return Response.json({ 
      error: 'Failed to clear users: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 })
  }
}