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
    // Check auth.users table for both email variants
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    
    // Check public.users table
    const { data: publicUsers, error: publicError } = await supabase
      .from('users')
      .select('*')
    
    if (authError) {
      return Response.json({ 
        error: 'Auth error: ' + authError.message 
      }, { status: 500 })
    }

    if (publicError) {
      return Response.json({ 
        error: 'Public users error: ' + publicError.message 
      }, { status: 500 })
    }

    return Response.json({
      authUsers: authUsers.users.map(u => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at
      })),
      publicUsers: publicUsers,
      message: 'Debug info retrieved'
    })
    
  } catch (error) {
    return Response.json({ 
      error: 'Server error: ' + (error instanceof Error ? error.message : 'Unknown')
    }, { status: 500 })
  }
}