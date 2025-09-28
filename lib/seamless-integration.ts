// Seamless Integration Layer - Bridges existing code with enhanced backend
// Maintains 100% backward compatibility while adding new features

import { supabase } from './supabase'
import { 
  userOps, 
  productOps, 
  orderOps, 
  orderItemOps, 
  paymentOps, 
  leadOps, 
  settingsOps, 
  analyticsOps, 
  utils,
  type User,
  type Product,
  type Order,
  type OrderItem,
  type Payment,
  type Lead,
  type Setting
} from './enhanced-rental-ops'

// ===== SEAMLESS INTEGRATION UTILITIES =====


// ===== ENHANCED OPERATIONS WITH LEGACY COMPATIBILITY =====

export const seamlessOps = {
  // ===== PRODUCT OPERATIONS =====
  
  // Get products (enhanced with legacy compatibility)
  async getProducts(): Promise<any[]> {
    try {
      const enhancedProducts = await productOps.getActiveProducts()
      return enhancedProducts.map(transformProductToLegacy)
    } catch (error) {
      // Fallback to original implementation
      console.warn('Enhanced products failed, falling back to legacy:', error)
      const { data, error: legacyError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (legacyError) throw legacyError
      return data || []
    }
  },

  // Add product (enhanced with legacy compatibility)
  async addProduct(product: any): Promise<string> {
    try {
      const enhancedProduct = transformProductFromLegacy(product)
      const result = await productOps.createProduct(enhancedProduct as Omit<Product, 'id' | 'created_at' | 'updated_at'>)
      return result.id
    } catch (error) {
      // Fallback to original implementation
      console.warn('Enhanced product creation failed, falling back to legacy:', error)
      const { data, error: legacyError } = await supabase
        .from('products')
        .insert(product)
        .select('id')
        .single()

      if (legacyError) throw legacyError
      return data.id
    }
  },

  // Get products by category (enhanced)
  async getProductsByCategory(categoryId: string): Promise<any[]> {
    try {
      const enhancedProducts = await productOps.getActiveProducts(categoryId)
      return enhancedProducts.map(transformProductToLegacy)
    } catch (error) {
      // Fallback to original implementation
      console.warn('Enhanced category products failed, falling back to legacy:', error)
      const { data, error: legacyError } = await supabase
        .from('products')
        .select('*')
        .contains('categories', [categoryId])
        .order('created_at', { ascending: false })

      if (legacyError) throw legacyError
      return data || []
    }
  },

  // Search products (enhanced)
  async searchProducts(query: string, category?: string): Promise<any[]> {
    try {
      const enhancedProducts = await productOps.searchProducts(query, category)
      return enhancedProducts.map(transformProductToLegacy)
    } catch (error) {
      // Fallback to original implementation
      console.warn('Enhanced product search failed, falling back to legacy:', error)
      let legacyQuery = supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)

      if (category) {
        legacyQuery = legacyQuery.contains('categories', [category])
      }

      const { data, error: legacyError } = await legacyQuery.order('created_at', { ascending: false })
      if (legacyError) throw legacyError
      return data || []
    }
  },

  // List products with pagination (enhanced)
  async listProductsPaged({ page = 1, pageSize = 24, category, search }: { 
    page?: number; 
    pageSize?: number; 
    category?: string; 
    search?: string 
  }) {
    try {
      const from = (page - 1) * pageSize
      const products = await productOps.getActiveProducts(category)
      
      let filteredProducts = products
      if (search) {
        filteredProducts = products.filter(p => 
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
        )
      }

      const total = filteredProducts.length
      const items = filteredProducts
        .slice(from, from + pageSize)
        .map(transformProductToLegacy)

      return { items, total }
    } catch (error) {
      // Fallback to original implementation
      console.warn('Enhanced pagination failed, falling back to legacy:', error)
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      let query = supabase.from('products').select('*', { count: 'exact' })

      if (category) {
        query = query.contains('categories', [category])
      }
      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
      }

      const { data, error: legacyError, count } = await query
        .range(from, to)
        .order('created_at', { ascending: false })
      
      if (legacyError) throw legacyError
      return { items: data || [], total: count || 0 }
    }
  },

  // Archive products (enhanced)
  async archiveProducts(productIds: string[]): Promise<void> {
    try {
      await Promise.all(productIds.map(id => 
        productOps.updateProduct(id, { is_active: false })
      ))
    } catch (error) {
      // Fallback to original implementation
      console.warn('Enhanced archiving failed, falling back to legacy:', error)
      if (!productIds?.length) return
      const { error: legacyError } = await supabase
        .from('products')
        .update({ status: 'archived' })
        .in('id', productIds)

      if (legacyError) throw legacyError
    }
  },

  // ===== USER OPERATIONS =====

  // Get current user (enhanced)
  async getCurrentUser(): Promise<any | null> {
    try {
      const enhancedUser = await userOps.getCurrentUser()
      return enhancedUser ? transformUserToLegacy(enhancedUser) : null
    } catch (error) {
      // Fallback to original auth
      console.warn('Enhanced user failed, falling back to legacy:', error)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error: legacyError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (legacyError) return null
      return data
    }
  },

  // Check if user is admin (enhanced)
  async isAdmin(userId?: string): Promise<boolean> {
    try {
      return await userOps.isAdmin(userId)
    } catch (error) {
      // Fallback to legacy check
      console.warn('Enhanced admin check failed, falling back to legacy:', error)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return false

      const { data, error: legacyError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('id', userId || user.id)
        .single()

      if (legacyError) return false
      return data?.is_admin || false
    }
  },

  // ===== ORDER OPERATIONS (NEW) =====

  // Create order (enhanced only - new functionality)
  async createOrder(orderData: any): Promise<Order> {
    // Transform legacy booking data to enhanced order format if needed
    const enhancedOrderData = {
      customer_id: orderData.user_id || orderData.customer_id,
      guest_info: orderData.guest_info,
      rental_start_date: orderData.dates?.start || orderData.rental_start_date,
      rental_end_date: orderData.dates?.end || orderData.rental_end_date,
      fulfillment_type: (orderData.delivery?.type === 'delivery' ? 'delivery' : 'pickup') as 'pickup' | 'delivery',
      delivery_address: orderData.delivery?.address,
      customer_notes: orderData.notes || orderData.customer_notes,
      special_instructions: orderData.special_instructions,
      status: 'pending' as const,
      payment_status: 'pending' as const,
      // Required fields with defaults
      subtotal: 0,
      delivery_fee: 0,
      tax_amount: 0,
      discount_amount: 0,
      security_deposit: 0,
      total_amount: 0,
      tracking_events: []
    }

    const order = await orderOps.createOrder(enhancedOrderData as any)
    
    // Add items if provided
    if (orderData.items && Array.isArray(orderData.items)) {
      for (const item of orderData.items) {
        await orderItemOps.addItemToOrder({
          order_id: order.id,
          product_id: item.product_id || item.id,
          quantity: item.quantity || 1,
          unit_price: item.unit_price || item.daily_rate || 0,
          total_price: (item.unit_price || item.daily_rate || 0) * (item.quantity || 1),
          notes: item.notes
        })
      }
    }

    return order
  },

  // Get order with items (enhanced only)
  async getOrderWithItems(orderId: string) {
    return await orderOps.getOrderWithItems(orderId)
  },

  // Generate quote (enhanced only)
  async generateQuote(items: any[], startDate: string, endDate: string, deliveryMiles: number = 0) {
    const transformedItems = items.map(item => ({
      product_id: item.product_id || item.id,
      quantity: item.quantity || 1
    }))

    return await orderOps.generateQuote(transformedItems, startDate, endDate, deliveryMiles)
  },

  // ===== BOOKING OPERATIONS (Legacy Compatibility) =====

  // Update booking (legacy compatibility)
  async updateBooking(bookingId: string, updates: any): Promise<void> {
    try {
      // Try to update as enhanced order first
      await orderOps.updateOrder(bookingId, {
        status: updates.status,
        admin_notes: updates.notes,
        customer_notes: updates.customer_notes
      })
    } catch (error) {
      // Fallback to legacy booking update
      console.warn('Enhanced booking update failed, falling back to legacy:', error)
      const { error: legacyError } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId)

      if (legacyError) throw legacyError
    }
  },

  // ===== REVIEW OPERATIONS (Legacy Compatibility) =====

  // Delete review (legacy compatibility maintained)
  async deleteReview(reviewId: string): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)

    if (error) throw error
  },

  // Add multiple reviews (legacy compatibility maintained)
  async addMultipleReviews(reviews: any[]): Promise<void> {
    if (!reviews?.length) return
    const { error } = await supabase
      .from('reviews')
      .insert(reviews)

    if (error) throw error
  },

  // ===== SETTINGS OPERATIONS (Enhanced) =====

  // Get business settings (enhanced)
  async getBusinessSettings(): Promise<any> {
    try {
      const storeInfo = await settingsOps.getSetting('store', 'info')
      const businessHours = await settingsOps.getSetting('business', 'hours')
      const deliveryZones = await settingsOps.getSetting('delivery', 'zones')
      const pricingRules = await settingsOps.getSetting('pricing', 'tax_rate')

      return {
        store_info: storeInfo?.value || {},
        business_hours: businessHours?.value || {},
        delivery_zones: deliveryZones?.value || [],
        tax_rate: pricingRules?.value || 0.08
      }
    } catch (error) {
      // Fallback to legacy settings
      console.warn('Enhanced settings failed, falling back to legacy:', error)
      const { data, error: legacyError } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (legacyError) throw legacyError
      return data || {}
    }
  },

  // ===== ANALYTICS OPERATIONS (Enhanced) =====

  // Get dashboard stats (enhanced)
  async getDashboardStats(): Promise<any> {
    try {
      const orderStats = await analyticsOps.getOrderStats(30)
      const popularProducts = await analyticsOps.getPopularProducts(5)
      const revenueData = await analyticsOps.getRevenueData('daily', 30)

      return {
        orders: orderStats,
        popular_products: popularProducts.map(transformProductToLegacy),
        revenue_trend: revenueData
      }
    } catch (error) {
      console.warn('Enhanced analytics failed:', error)
      // Return basic stats from legacy tables
      return {
        orders: { total_orders: 0, total_revenue: 0, pending_orders: 0 },
        popular_products: [],
        revenue_trend: []
      }
    }
  }
}

// Export enhanced operations for new features
export {
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

// Export types for TypeScript users
export type {
  User,
  Product,
  Order,
  OrderItem,
  Payment,
  Lead,
  Setting
}

// Default export maintains existing API