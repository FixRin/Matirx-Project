
import { useState } from "react"
import supabase from "../Utils/Supabase"
import { getSupabaseErrorMessage } from "../Utils/supabase-errors"
import { useSelector } from "react-redux"


export default function RequestReset() {
  const theme = useSelector((s)=>s.theme.mode)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  async function handleReset(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!email.trim()) {
      setError("Please enter your email address")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
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
    <div className={`${
      theme === "dark" ? "bg-texture bg-gray-900 text-white" : "bg-texture"
     } min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8 `}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow  sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          {success ? (
            <div className="rounded-md bg-green-50 p-4">
              <div className="text-sm text-green-700">Check your email for a link to reset your password.</div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
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
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
