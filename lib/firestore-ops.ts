// Temporary compatibility layer: delegate Firestore-named functions to Supabase ops
export { 
  addProduct,
  getProducts,
  updateBooking,
  deleteReview,
  getProductsByCategory,
  addMultipleReviews,
  archiveProducts
} from './supabase-ops'

// Optional: export a paged list API for new code paths
export { listProductsPaged } from './supabase-ops'
