"use client"

import { useState } from "react"
import supabase from "../Utils/Supabase"
import { getSupabaseErrorMessage } from "../Utils/supabase-errors"

export default function UpdatePassword() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Password validation function
  const validatePassword = (password) => {
    if (!password) return "Please enter a password"
    if (password.length < 8) return "Password must be at least 8 characters long"
    if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter"
    if (!/[a-z]/.test(password)) return "Password must include at least one lowercase letter"
    if (!/[0-9]/.test(password)) return "Password must include at least one number"
    if (!/[!@#$%^&*]/.test(password)) return "Password must include at least one special character (!@#$%^&*)"
    return null
  }

  async function handleUpdatePassword(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate password before sending to Supabase
    const validationError = validatePassword(password)
    if (validationError) {
      setError(validationError)
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      setSuccess(true)
    } catch (err) {
      setError(getSupabaseErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-texture">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Update Password</h1>
            <p className="mt-2 text-sm text-gray-600">Enter your new password below</p>
          </div>

          {success ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">Your password has been updated successfully.</div>
            </div>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Password must be at least 8 characters long and contain uppercase, lowercase, numbers and a special
                    character
                  </p>
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
