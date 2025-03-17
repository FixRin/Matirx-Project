// Map of Supabase error messages to user-friendly messages
export const supabaseErrors = {
    // Auth errors
    "Invalid login credentials": "The email or password you entered is incorrect",
    "Invalid email or password": "The email or password you entered is incorrect",
    "Email rate limit exceeded": "Too many attempts. Please try again in a few minutes",
    "Email link is invalid or has expired": "This reset link has expired. Please request a new one",
    "Email not confirmed": "Please check your email to confirm your account first",
    "User already registered": "An account with this email already exists",
    "User not found": "No account found with this email address",
    "Password is too weak": "Please choose a stronger password",
    "Password should be at least 6 characters": "Password must be at least 6 characters long",
    "New password should be different from the old password": "New password must be different from your current password",
  
    // Rate limiting
    "Too many requests": "Please wait a moment before trying again",
    "Too many failed attempts": "Account temporarily locked. Try again later",
  
    // Token errors
    "JWT expired": "Your session has expired. Please sign in again",
    "JWT invalid": "Your session is invalid. Please sign in again",
    "Token expired": "Your session has expired. Please sign in again",
    "Token not found": "Please sign in to continue",
  
    // General errors
    "Request failed": "Unable to connect to the server. Please check your internet connection",
    "Internal error": "Something went wrong on our end. Please try again",
    "Service not available": "This service is temporarily unavailable. Please try again later",
    "Database error": "Unable to complete your request. Please try again",
  
    // Custom error codes
    "auth/invalid-action-code": "This reset link is no longer valid. Please request a new one",
    "auth/user-disabled": "This account has been disabled. Please contact support",
    "auth/user-not-found": "No account found with this email address",
    "auth/weak-password": "Please choose a stronger password",
    "auth/email-already-in-use": "An account with this email already exists",
    "auth/invalid-email": "Please enter a valid email address",
    "auth/operation-not-allowed": "This operation is not allowed",
    "auth/popup-closed-by-user": "The authentication popup was closed before completing",
  }
  
  export function getSupabaseErrorMessage(error) {
    if (!error) return "An unknown error occurred"
  
    // If we have a custom message for this error message
    if (error.message && supabaseErrors[error.message]) {
      return supabaseErrors[error.message]
    }
  
    // If we have a custom message for this error code
    if (error.code && supabaseErrors[error.code]) {
      return supabaseErrors[error.code]
    }
  
    // Handle specific error status codes
    if (error.status) {
      switch (error.status) {
        case 400:
          return "Invalid request. Please check your input"
        case 401:
          return "Please sign in to continue"
        case 403:
          return "You don't have permission to perform this action"
        case 404:
          return "The requested resource was not found"
        case 422:
          return "Invalid input. Please check your data"
        case 429:
          return "Too many requests. Please try again later"
        case 500:
          return "Something went wrong on our end. Please try again"
        case 503:
          return "Service temporarily unavailable. Please try again later"
        default:
          return "An unexpected error occurred. Please try again"
      }
    }
  
    // If no specific error mapping found, return the original message or a default
    return error.message || error.error_description || "An unexpected error occurred"
  }
  