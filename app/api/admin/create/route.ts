import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email, password, full_name } = await request.json()

    if (!email || !password || !full_name) {
      return Response.json({ 
        error: 'Email, password, and full name are required' 
      }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Create new auth user with service role
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name
      }
    })

    if (authError) {
      return Response.json({ 
        error: 'Failed to create auth user: ' + authError.message 
      }, { status: 500 })
    }

    // Create public.users record with admin privileges using service role
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id,
        email,
        full_name,
  role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()

    if (insertError) {
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(authUser.user.id)
      return Response.json({ 
        error: 'Failed to create user profile: ' + insertError.message 
      }, { status: 500 })
    }

    // Verify the user was created with admin status
    const { data: verifyUser, error: verifyError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.user.id)
      .single()

    return Response.json({ 
      success: true, 
      message: 'Admin user created successfully! You can now login.',
      user: {
        id: authUser.user.id,
        email: authUser.user.email,
  role: verifyUser?. role || 'staff'
      },
      verification: verifyUser
    })
    
  } catch (error) {
    return Response.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 })
  }
}