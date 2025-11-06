// API Best Practices in React - Fundamental Primitives
// Deliberate practice exercises

/*
=== CORE PRINCIPLES ===

1. ALWAYS USE VALIDATED DATA FROM API RESPONSE
   - API returns cleaned/standardized data
   - Never store raw user input when API provides validated output
   - Trust the source of truth (the API)

2. HANDLE ALL RESPONSE STATES
   - Loading state (before response)
   - Success state (data received)
   - Error state (network/server error)
   - Empty state (no data)

3. CLEANUP LOADING STATE IN ALL PATHS
   - Success → turn off loading
   - Error → turn off loading
   - Even if redirecting → still turn off loading first

4. ERROR BOUNDARIES AND GRACEFUL DEGRADATION
   - Try/catch around fetch calls
   - Show user-friendly error messages
   - Don't leave UI in broken state

5. SEPARATE CONCERNS
   - API calls in separate functions/hooks
   - Business logic separate from UI
   - Validation logic separate from API logic

6. OPTIMIZE NETWORK REQUESTS
   - Don't refetch data you already have
   - Cancel in-flight requests on unmount
   - Debounce user-triggered requests

7. TYPE SAFETY
   - Define response types
   - Validate API response structure
   - Handle unexpected response shapes

8. LOADING STATES PREVENT DOUBLE SUBMISSIONS
   - Disable submit button while loading
   - Prevent multiple simultaneous API calls
   - Clear feedback to user about progress
*/

"use client";
import { useState } from "react";

// ============================================
// PRINCIPLE 1: Use Validated Data from API
// ============================================

// ❌ BAD: Using raw user input
const BadExample1 = () => {
  const [address, setAddress] = useState(null);

  const validateAddress = async (formData: any) => {
    const res = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    // BUG: Storing user input instead of validated data
    setAddress(formData); // ❌ Wrong!
  };

  return <div>Bad: Storing unvalidated input</div>;
};

// ✅ GOOD: Using API's validated response
const GoodExample1 = () => {
  const [address, setAddress] = useState(null);

  const validateAddress = async (formData: any) => {
    const res = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    // ✅ Correct: Use validated data from API
    if (data.validatedAddress) {
      setAddress(data.validatedAddress);
    }
  };

  return <div>Good: Storing validated API response</div>;
};

// DRILL 1: Fix the broken code
const Drill1_Fix = () => {
  const [user, setUser] = useState(null);

  const registerUser = async (email: string) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    // data = { normalizedEmail: "john@example.com", userId: "123" }

    // TODO: Fix this line - should use normalized email from API
    setUser({ email }); // ❌ Bug here!
  };

  return <div>Drill 1: Which data should we store?</div>;
};

// ============================================
// PRINCIPLE 2: Handle All Response States
// ============================================

// ❌ BAD: Only handling success
const BadExample2 = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch("/api/data");
    const json = await res.json();
    setData(json); // What if this fails? No error handling!
  };

  return <div>{data?.name}</div>;
};

// ✅ GOOD: Handling loading, success, error
const GoodExample2 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false); // ✅ Always cleanup
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return <div>{data.name}</div>;
};

// DRILL 2: Add missing states
const Drill2_AddStates = () => {
  const [products, setProducts] = useState([]);
  // TODO: Add loading and error states

  const fetchProducts = async () => {
    // TODO: Add loading state management
    const res = await fetch("/api/products");
    const json = await res.json();
    setProducts(json);
    // TODO: Add error handling
  };

  // TODO: Render based on state
  return <div>{products.map((p: any) => p.name)}</div>;
};

// ============================================
// PRINCIPLE 3: Cleanup Loading in All Paths
// ============================================

// ❌ BAD: Loading state not cleared in all paths
const BadExample3 = () => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (data: any) => {
    setLoading(true);

    try {
      await fetch("/api/submit", { method: "POST", body: JSON.stringify(data) });
      // Redirect without cleaning up
      window.location.href = "/success"; // ❌ Loading still true!
    } catch (err) {
      alert("Error");
      // ❌ Forgot to setLoading(false) here!
    }
  };

  return <button disabled={loading}>Submit</button>;
};

// ✅ GOOD: Loading cleanup in all paths
const GoodExample3 = () => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (data: any) => {
    setLoading(true);

    try {
      await fetch("/api/submit", { method: "POST", body: JSON.stringify(data) });
      setLoading(false); // ✅ Cleanup before redirect
      window.location.href = "/success";
    } catch (err) {
      setLoading(false); // ✅ Cleanup on error
      alert("Error");
    }
  };

  return <button disabled={loading}>Submit</button>;
};

// DRILL 3: Fix loading state cleanup
const Drill3_FixLoading = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const saveData = async (formData: any) => {
    setLoading(true);

    try {
      const res = await fetch("/api/save", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        // TODO: Fix - loading never gets cleared!
        return;
      }
      // TODO: Fix - what if success is false?
    } catch (err) {
      console.error(err);
      // TODO: Fix - loading never gets cleared on error!
    }
  };

  return (
    <div>
      <button onClick={() => saveData({})} disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
      {success && <p>Saved!</p>}
    </div>
  );
};

// ============================================
// PRINCIPLE 4: Type Safety for API Responses
// ============================================

// ❌ BAD: No type checking
const BadExample4 = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUser = async () => {
    const res = await fetch("/api/user");
    const data = await res.json();
    setUser(data); // Could be anything!

    // Later: data.email might not exist → runtime error
  };

  return <div>{user?.email}</div>;
};

// ✅ GOOD: Typed responses
type User = {
  id: string;
  email: string;
  name: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const GoodExample4 = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/user");
      const json: ApiResponse<User> = await res.json();

      if (json.success && json.data) {
        setUser(json.data); // ✅ TypeScript knows this is User
      } else {
        setError(json.error || "Unknown error");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return <div>{user?.email}</div>; // ✅ Safe access
};

// DRILL 4: Add types
type Product = {
  id: number;
  name: string;
  price: number;
};

const Drill4_AddTypes = () => {
  // TODO: Add proper type instead of 'any'
  const [products, setProducts] = useState<any>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    // TODO: Type the response
    const data = await res.json();
    setProducts(data);
  };

  // TODO: Fix type errors in rendering
  return (
    <div>
      {products?.map((p: any) => (
        <div key={p.id}>
          {p.name} - ${p.price}
        </div>
      ))}
    </div>
  );
};

// ============================================
// PRINCIPLE 5: Prevent Double Submissions
// ============================================

// ❌ BAD: Can click multiple times
const BadExample5 = () => {
  const submitOrder = async () => {
    await fetch("/api/order", { method: "POST" });
    // User can click button again during fetch!
  };

  return <button onClick={submitOrder}>Place Order</button>;
};

// ✅ GOOD: Disable during submission
const GoodExample5 = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitOrder = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/order", { method: "POST" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button onClick={submitOrder} disabled={isSubmitting}>
      {isSubmitting ? "Placing Order..." : "Place Order"}
    </button>
  );
};

// DRILL 5: Prevent double submission
const Drill5_PreventDouble = () => {
  // TODO: Add loading state

  const deleteAccount = async () => {
    // TODO: Prevent multiple clicks
    await fetch("/api/account", { method: "DELETE" });
    alert("Account deleted");
  };

  // TODO: Disable button while deleting
  return <button onClick={deleteAccount}>Delete Account</button>;
};

// ============================================
// PRINCIPLE 6: Optimistic Updates vs Pessimistic
// ============================================

// Pessimistic: Wait for API before updating UI
const PessimisticUpdate = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const increment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/increment", { method: "POST" });
      const data = await res.json();
      setCount(data.newCount); // Wait for API
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={increment} disabled={loading}>
      {count}
    </button>
  );
};

// Optimistic: Update UI immediately, rollback on error
const OptimisticUpdate = () => {
  const [count, setCount] = useState(0);

  const increment = async () => {
    const previousCount = count;
    setCount(count + 1); // ✅ Update immediately

    try {
      await fetch("/api/increment", { method: "POST" });
      // Success - keep the optimistic update
    } catch (err) {
      setCount(previousCount); // ✅ Rollback on error
      alert("Failed to increment");
    }
  };

  return <button onClick={increment}>{count}</button>;
};

// DRILL 6: Implement optimistic update
const Drill6_Optimistic = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    // TODO: Update UI immediately (optimistic)
    // TODO: Call API
    // TODO: Rollback if API fails

    try {
      await fetch("/api/like", { method: "POST" });
    } catch (err) {
      // TODO: Revert the optimistic update
      alert("Failed to like");
    }
  };

  return <button onClick={toggleLike}>{liked ? "❤️" : "🤍"}</button>;
};

// ============================================
// MASTER DRILL: Fix All Issues
// ============================================

const MasterDrill_FixEverything = () => {
  const [address, setAddress] = useState(null);
  const [validation, setValidation] = useState(null);

  const validateAddress = async (formData: any) => {
    // BUG 1: No loading state
    // BUG 2: No error handling
    // BUG 3: Storing formData instead of validated response
    // BUG 4: No type safety
    // BUG 5: Loading not cleared in all paths

    const res = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    setValidation(data);

    if (data.status === "CONFIRMED") {
      setAddress(formData); // ❌ Bug!
      window.location.href = "/confirmation";
    }
  };

  return (
    <div>
      <button onClick={() => validateAddress({})}>Validate</button>
    </div>
  );
};

// ============================================
// EXERCISES - Test Your Understanding
// ============================================

export default function BestPracticesAPI() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">API Best Practices - Drills</h1>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Exercise 1: Use Validated Data</h2>
        <p className="mb-4 text-sm text-gray-600">Question: What's wrong with storing formData instead of data.validatedAddress?</p>
        <Drill1_Fix />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Exercise 2: Handle All States</h2>
        <p className="mb-4 text-sm text-gray-600">Add loading, error, and empty states to the component</p>
        <Drill2_AddStates />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Exercise 3: Cleanup Loading</h2>
        <p className="mb-4 text-sm text-gray-600">Fix all paths where loading state isn't cleaned up</p>
        <Drill3_FixLoading />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Exercise 4: Add Type Safety</h2>
        <p className="mb-4 text-sm text-gray-600">Replace 'any' with proper types</p>
        <Drill4_AddTypes />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Exercise 5: Prevent Double Submit</h2>
        <p className="mb-4 text-sm text-gray-600">Make the button disabled while API call is in flight</p>
        <Drill5_PreventDouble />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Exercise 6: Optimistic Update</h2>
        <p className="mb-4 text-sm text-gray-600">Update UI immediately, rollback on failure</p>
        <Drill6_Optimistic />
      </section>

      <section className="border p-4 rounded bg-red-50">
        <h2 className="text-xl font-bold mb-2">🔥 Master Challenge</h2>
        <p className="mb-4 text-sm text-gray-600">Fix all 5 bugs in this component</p>
        <MasterDrill_FixEverything />
      </section>
    </div>
  );
}
