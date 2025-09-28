import { supabase } from './supabase'
import seamlessOps from './seamless-integration'

type Updatable = Record<string, any>

// Enhanced product operations with seamless fallback
export async function addProduct(product: Updatable): Promise<string> {
  return await seamlessOps.addProduct(product)
}

export async function getProducts(): Promise<any[]> {
  return await seamlessOps.getProducts()
}

export async function updateBooking(bookingId: string, updates: Updatable): Promise<void> {
  return await seamlessOps.updateBooking(bookingId, updates)
}

export async function deleteReview(reviewId: string): Promise<void> {
  return await seamlessOps.deleteReview(reviewId)
}

export async function getProductsByCategory(categoryId: string): Promise<any[]> {
  return await seamlessOps.getProductsByCategory(categoryId)
}

export async function addMultipleReviews(reviews: Updatable[]): Promise<void> {
  return await seamlessOps.addMultipleReviews(reviews)
}

export async function archiveProducts(productIds: string[]): Promise<void> {
  return await seamlessOps.archiveProducts(productIds)
}

// Enhanced pagination with seamless fallback
export async function listProductsPaged({ page = 1, pageSize = 24, category, search }: { page?: number; pageSize?: number; category?: string; search?: string }) {
  return await seamlessOps.listProductsPaged({ page, pageSize, category, search })
}
