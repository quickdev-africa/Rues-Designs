import { supabase } from './supabase'

export type Product = {
  id: string
  category_id?: string
  name: string
  slug: string
  description?: string
  images?: string[]
  pricing: {
    daily_rate: number
    deposit: number
    tax_rate: number
    delivery_fee?: number
  }
  specifications?: Record<string, any>
  quantity_available: number
  is_active: boolean
  requires_delivery: boolean
  delivery_radius_miles: number
  created_at: string
  updated_at: string
  category?: Category
}

export type Category = {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  user_id: string
  order_number: string
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'active' | 'returned' | 'completed' | 'cancelled'
  event_date: string
  event_end_date?: string
  rental_days: number
  delivery_address?: {
    street: string
    city: string
    state: string
    zip: string
    distance_miles?: number
  }
  subtotal: number
  tax_amount: number
  delivery_fee: number
  total_amount: number
  deposit_amount: number
  stripe_payment_intent_id?: string
  stripe_deposit_intent_id?: string
  payment_status: 'pending' | 'authorized' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
  customer_notes?: string
  admin_notes?: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
  user?: any
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  product?: Product
}

export type Availability = {
  id: string
  product_id: string
  date: string
  quantity_reserved: number
  quantity_available: number
  is_blocked: boolean
  notes?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  is_admin?: boolean
  created_at?: string
  updated_at?: string
}

// Product operations
export const productOps = {
  async getAll(includeInactive = false) {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .order('name')

    if (!includeInactive) {
      query = query.eq('is_active', true)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Product[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Product
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) throw error
    return data as Product
  },

  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) throw error
    return data as Product
  },

  async update(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Product
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Category operations
export const categoryOps = {
  async getAll(includeInactive = false) {
    let query = supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (!includeInactive) {
      query = query.eq('is_active', true)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Category[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Category
  },

  async create(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()

    if (error) throw error
    return data as Category
  },

  async update(id: string, updates: Partial<Category>) {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Category
  }
}

// Order operations
export const orderOps = {
  async getAll(userId?: string) {
    let query = supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*,
          product:products(*)
        ),
        user:users(email, full_name)
      `)
      .order('created_at', { ascending: false })

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Order[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*,
          product:products(*)
        ),
        user:users(email, full_name)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Order
  },

  async create(order: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (error) throw error
    return data as Order
  },

  async update(id: string, updates: Partial<Order>) {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Order
  },

  async addItem(orderItem: Omit<OrderItem, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItem)
      .select()
      .single()

    if (error) throw error
    return data as OrderItem
  }
}

// User operations
export const userOps = {
  async getAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as User[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as User
  },

  async create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  async update(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Availability operations
export const availabilityOps = {
  async checkAvailability(productId: string, startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('product_id', productId)
      .gte('date', startDate)
      .lte('date', endDate)
      .eq('is_blocked', false)

    if (error) throw error
    return data as Availability[]
  },

  async reserveInventory(productId: string, startDate: string, endDate: string, quantity: number) {
    // This would typically be handled server-side with proper locking
    const { data, error } = await supabase.rpc('reserve_inventory', {
      p_product_id: productId,
      p_start_date: startDate,
      p_end_date: endDate,
      p_quantity: quantity
    })

    if (error) throw error
    return data
  }
}