// Comprehensive TypeScript Operations Layer
// Apple-Quality Type Safety | Complete CRUD Operations | Business Logic Integration

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ===== TYPE DEFINITIONS =====

export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    lat?: number
    lng?: number
    formatted: string
  }
  role: 'customer' | 'admin'
  preferences: Record<string, any>
  avatar_url?: string
  is_active: boolean
  last_login?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  daily_rate: number
  security_deposit: number
  images: string[]
  specifications: Record<string, any>
  quantity_available: number
  category: 'tents' | 'tables' | 'chairs' | 'linens' | 'lighting' | 'audio'
  tags: string[]
  is_active: boolean
  requires_delivery: boolean
  setup_time_minutes: number
  weight_lbs?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: string
  }
  care_instructions?: string
  replacement_cost?: number
  popularity_score: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_id?: string
  guest_info?: {
    name: string
    email: string
    phone: string
  }
  rental_start_date: string
  rental_end_date: string
  rental_days: number
  fulfillment_type: 'pickup' | 'delivery'
  time_slot?: string
  delivery_address?: {
    street: string
    city: string
    state: string
    zip: string
    lat?: number
    lng?: number
    distance_miles?: number
  }
  subtotal: number
  delivery_fee: number
  tax_amount: number
  discount_amount: number
  security_deposit: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'active' | 'overdue' | 'returned' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'deposit_paid' | 'paid' | 'failed' | 'refunded' | 'partial_refund'
  customer_notes?: string
  admin_notes?: string
  special_instructions?: string
  tracking_events: Array<{
    status: string
    timestamp: string
    notes?: string
    user_id?: string
  }>
  estimated_pickup_date?: string
  actual_pickup_date?: string
  estimated_return_date?: string
  actual_return_date?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  total_price: number
  notes?: string
  created_at: string
  // Populated via joins
  product?: Product
}

export interface Payment {
  id: string
  order_id: string
  stripe_payment_intent_id?: string
  stripe_charge_id?: string
  stripe_refund_id?: string
  amount: number
  currency: string
  payment_type: 'rental' | 'deposit' | 'late_fee' | 'damage_fee' | 'delivery' | 'refund'
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled' | 'refunded'
  payment_method?: {
    type: string
    last4?: string
    brand?: string
    exp_month?: number
    exp_year?: number
  }
  metadata: Record<string, any>
  failure_reason?: string
  refund_reason?: string
  processed_at?: string
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  email: string
  full_name?: string
  phone?: string
  company?: string
  source?: 'website' | 'referral' | 'social' | 'ads' | 'phone' | 'email' | 'other'
  source_details?: string
  utm_data?: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
  }
  event_type?: string
  event_date?: string
  event_location?: string
  guest_count?: number
  estimated_budget?: number
  message?: string
  interested_products: string[]
  status: 'new' | 'contacted' | 'quoted' | 'follow_up' | 'negotiating' | 'converted' | 'lost' | 'spam'
  converted_to_customer_id?: string
  converted_to_order_id?: string
  conversion_date?: string
  next_followup_date?: string
  followup_notes?: string
  priority: number
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface Setting {
  id: string
  category: string
  key: string
  value: any
  description?: string
  data_type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  is_public: boolean
  updated_by?: string
  created_at: string
  updated_at: string
}

export interface Quote {
  subtotal: number
  security_deposit: number
  delivery_fee: number
  tax_amount: number
  total_amount: number
  rental_days: number
  breakdown: {
    daily_rates: number
    tax_rate: number
    delivery_miles: number
  }
}

// ===== USER OPERATIONS =====

export const userOps = {
  // Get current user profile
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) throw error
    return data
  },

  // Update user profile
  async updateProfile(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get all users (admin only)
  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Promote user to admin
  async promoteToAdmin(email: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('promote_user_to_admin', { user_email: email })

    if (error) throw error
    return data
  },

  // Check if user is admin
  async isAdmin(userId?: string): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('is_admin', userId ? { user_id: userId } : {})

    if (error) return false
    return data
  }
}

// ===== PRODUCT OPERATIONS =====

export const productOps = {
  // Get all active products
  async getActiveProducts(category?: string): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('popularity_score', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  // Get product by slug
  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) return null
    return data
  },

  // Search products
  async searchProducts(query: string, category?: string): Promise<Product[]> {
    let searchQuery = supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)

    if (category) {
      searchQuery = searchQuery.eq('category', category)
    }

    const { data, error } = await searchQuery.order('popularity_score', { ascending: false })
    if (error) throw error
    return data || []
  },

  // Get all products (admin only)
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Create product (admin only)
  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update product (admin only)
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Delete product (admin only)
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Check product availability
  async checkAvailability(
    productId: string,
    startDate: string,
    endDate: string,
    quantity: number = 1
  ): Promise<boolean> {
    const { data, error } = await supabase
      .rpc('check_product_availability', {
        product_id: productId,
        start_date: startDate,
        end_date: endDate,
        quantity_needed: quantity
      })

    if (error) throw error
    return data
  }
}

// ===== ORDER OPERATIONS =====

export const orderOps = {
  // Create new order
  async createOrder(order: Omit<Order, 'id' | 'order_number' | 'created_at' | 'updated_at'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get order by ID
  async getOrderById(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data
  },

  // Get order with items
  async getOrderWithItems(id: string): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | null> {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (orderError || !order) return null

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('order_id', id)

    if (itemsError) throw itemsError

    return {
      ...order,
      items: items || []
    }
  },

  // Get customer orders
  async getCustomerOrders(customerId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Get all orders (admin only)
  async getAllOrders(status?: string): Promise<Order[]> {
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  // Update order status
  async updateOrderStatus(
    id: string,
    status: Order['status'],
    notes?: string
  ): Promise<Order> {
    const order = await this.getOrderById(id)
    if (!order) throw new Error('Order not found')

    const updatedTrackingEvents = [
      ...order.tracking_events,
      {
        status,
        timestamp: new Date().toISOString(),
        notes,
        user_id: (await supabase.auth.getUser()).data.user?.id
      }
    ]

    const { data, error } = await supabase
      .from('orders')
      .update({
        status,
        tracking_events: updatedTrackingEvents,
        admin_notes: notes ? `${order.admin_notes || ''}\n${new Date().toISOString()}: ${notes}`.trim() : order.admin_notes
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update order
  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Cancel order
  async cancelOrder(id: string, reason?: string): Promise<Order> {
    return this.updateOrderStatus(id, 'cancelled', reason)
  },

  // Generate quote for items
  async generateQuote(
    items: Array<{ product_id: string; quantity: number }>,
    startDate: string,
    endDate: string,
    deliveryMiles: number = 0
  ): Promise<Quote> {
    const { data, error } = await supabase
      .rpc('generate_quote', {
        items,
        start_date: startDate,
        end_date: endDate,
        delivery_miles: deliveryMiles
      })

    if (error) throw error
    return data
  }
}

// ===== ORDER ITEM OPERATIONS =====

export const orderItemOps = {
  // Add item to order
  async addItemToOrder(orderItem: Omit<OrderItem, 'id' | 'created_at'>): Promise<OrderItem> {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItem)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Update order item
  async updateOrderItem(id: string, updates: Partial<OrderItem>): Promise<OrderItem> {
    const { data, error } = await supabase
      .from('order_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Remove item from order
  async removeItemFromOrder(id: string): Promise<void> {
    const { error } = await supabase
      .from('order_items')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Get order items
  async getOrderItems(orderId: string): Promise<(OrderItem & { product: Product })[]> {
    const { data, error } = await supabase
      .from('order_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('order_id', orderId)

    if (error) throw error
    return data || []
  }
}

// ===== PAYMENT OPERATIONS =====

export const paymentOps = {
  // Create payment record
  async createPayment(payment: Omit<Payment, 'id' | 'created_at' | 'updated_at'>): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert(payment)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get payments for order
  async getOrderPayments(orderId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  // Update payment status
  async updatePaymentStatus(id: string, status: Payment['status'], metadata?: Record<string, any>): Promise<Payment> {
    const updates: Partial<Payment> = { status }
    
    if (status === 'succeeded') {
      updates.processed_at = new Date().toISOString()
    }
    
    if (metadata) {
      updates.metadata = metadata
    }

    const { data, error } = await supabase
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get all payments (admin only)
  async getAllPayments(): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  }
}

// ===== LEAD OPERATIONS =====

export const leadOps = {
  // Create new lead
  async createLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get all leads (admin only)
  async getAllLeads(status?: string): Promise<Lead[]> {
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  },

  // Update lead
  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Convert lead to customer
  async convertLead(
    leadId: string,
    customerId: string,
    orderId?: string
  ): Promise<Lead> {
    const updates: Partial<Lead> = {
      status: 'converted',
      converted_to_customer_id: customerId,
      conversion_date: new Date().toISOString()
    }

    if (orderId) {
      updates.converted_to_order_id = orderId
    }

    return this.updateLead(leadId, updates)
  },

  // Get leads requiring follow-up
  async getLeadsForFollowup(date?: string): Promise<Lead[]> {
    const targetDate = date || new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .lte('next_followup_date', targetDate)
      .in('status', ['contacted', 'quoted', 'follow_up', 'negotiating'])
      .order('priority', { ascending: false })

    if (error) throw error
    return data || []
  }
}

// ===== SETTINGS OPERATIONS =====

export const settingsOps = {
  // Get public settings
  async getPublicSettings(): Promise<Setting[]> {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('is_public', true)

    if (error) throw error
    return data || []
  },

  // Get setting by category and key
  async getSetting(category: string, key: string): Promise<Setting | null> {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('category', category)
      .eq('key', key)
      .single()

    if (error) return null
    return data
  },

  // Get settings by category
  async getSettingsByCategory(category: string): Promise<Setting[]> {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('category', category)

    if (error) throw error
    return data || []
  },

  // Update setting (admin only)
  async updateSetting(
    category: string,
    key: string,
    value: any,
    updatedBy?: string
  ): Promise<Setting> {
    const { data, error } = await supabase
      .from('settings')
      .upsert({
        category,
        key,
        value,
        updated_by: updatedBy
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get all settings (admin only)
  async getAllSettings(): Promise<Setting[]> {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .order('category', { ascending: true })

    if (error) throw error
    return data || []
  }
}

// ===== ANALYTICS OPERATIONS =====

export const analyticsOps = {
  // Get order statistics (admin only)
  async getOrderStats(daysBack: number = 30): Promise<any> {
    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() - daysBack)

    const { data, error } = await supabase
      .rpc('get_order_stats', {
        date_from: dateFrom.toISOString().split('T')[0]
      })

    if (error) throw error
    return data
  },

  // Get popular products
  async getPopularProducts(limit: number = 10): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('popularity_score', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Get revenue by time period
  async getRevenueData(
    period: 'daily' | 'weekly' | 'monthly' = 'daily',
    daysBack: number = 30
  ): Promise<Array<{ date: string; revenue: number; orders: number }>> {
    const dateFrom = new Date()
    dateFrom.setDate(dateFrom.getDate() - daysBack)

    let truncate = 'day'
    if (period === 'weekly') truncate = 'week'
    if (period === 'monthly') truncate = 'month'

    const { data, error } = await supabase
      .from('orders')
      .select('total_amount, created_at')
      .gte('created_at', dateFrom.toISOString())
      .eq('payment_status', 'paid')

    if (error) throw error

    // Group data by period
    const grouped = (data || []).reduce((acc: any, order: any) => {
      const date = new Date(order.created_at)
      let key = date.toISOString().split('T')[0]

      if (period === 'weekly') {
        const startOfWeek = new Date(date)
        startOfWeek.setDate(date.getDate() - date.getDay())
        key = startOfWeek.toISOString().split('T')[0]
      } else if (period === 'monthly') {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`
      }

      if (!acc[key]) {
        acc[key] = { date: key, revenue: 0, orders: 0 }
      }

      acc[key].revenue += parseFloat(order.total_amount)
      acc[key].orders += 1

      return acc
    }, {})

    return Object.values(grouped).sort((a: any, b: any) => a.date.localeCompare(b.date)) as Array<{ date: string; revenue: number; orders: number }>
  }
}

// ===== UTILITY FUNCTIONS =====

export const utils = {
  // Format currency
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)
  },

  // Format date
  formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
  },

  // Calculate rental days
  calculateRentalDays(startDate: string, endDate: string): number {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  },

  // Generate slug from name
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  },

  // Validate email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Validate phone
  isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone)
  }
}

// Export all operations
export default {
  userOps,
  productOps,
  orderOps,
  orderItemOps,
  paymentOps,
  leadOps,
  settingsOps,
  analyticsOps,
  utils
}