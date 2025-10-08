import { NextRequest, NextResponse } from 'next/server';
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
    // Step 1: Delete the old auth user completely
  const { data: authUsers } = await supabase.auth.admin.listUsers()
  type SupabaseUser = { id: string; email?: string };
  const oldUser = (authUsers?.users as SupabaseUser[] ?? []).find(u => u.email?.includes('gmial') || u.email?.includes('gmail'))
    
    if (oldUser) {
      const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(oldUser.id)
      if (deleteAuthError) {
        return Response.json({ 
          error: 'Failed to delete old auth user: ' + deleteAuthError.message 
        }, { status: 500 })
      }
    }

    // Step 2: Delete from public.users table
    const { error: deletePublicError } = await supabase
      .from('users')
      .delete()
      .or('email.eq.ruesdesigns07@gmial.com,email.eq.ruesdesigns07@gmail.com')

    if (deletePublicError) {
      return Response.json({ 
        error: 'Failed to delete from public.users: ' + deletePublicError.message 
      }, { status: 500 })
    }

    // Step 3: Create a brand new auth user with correct email
    const { data: newAuthUser, error: createError } = await supabase.auth.admin.createUser({
      email: 'ruesdesigns07@gmail.com',
      password: 'TempPassword123!',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User'
      }
    })

    if (createError) {
      return Response.json({ 
        error: 'Failed to create new auth user: ' + createError.message 
      }, { status: 500 })
    }

    // Step 4: Create the public.users record with admin privileges
    const { data: newPublicUser, error: insertError } = await supabase
      .from('users')
      .insert({
        id: newAuthUser.user.id,
        email: 'ruesdesigns07@gmail.com',
        full_name: 'Admin User',
  role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (insertError) {
      return Response.json({ 
        error: 'Failed to create public.users record: ' + insertError.message 
      }, { status: 500 })
    }

    return Response.json({ 
      success: true, 
      message: 'Fresh user created with admin privileges',
      newUser: {
        id: newAuthUser.user.id,
        email: newAuthUser.user.email,
        temporaryPassword: 'TempPassword123!'
      },
      instructions: 'Login with email: ruesdesigns07@gmail.com and password: TempPassword123!'
    })
    
  } catch (error) {
    console.error('Server error:', error)
    return Response.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}