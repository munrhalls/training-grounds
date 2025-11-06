// TypeScript Fundamentals - Core Primitives & Deliberate Practice
// Exercises based on real checkout feature bugs

/*
=== CORE TYPESCRIPT PRIMITIVES ===

1. TYPE vs VALUE
   - Types exist only at compile time
   - Values exist at runtime
   - Can't import a type as a default export
   - Can't use a type in runtime code

2. NULL vs UNDEFINED
   - null = explicitly set to nothing
   - undefined = not set at all
   - null == undefined (loose equality is true)
   - null !== undefined (strict equality is false)

3. UNION TYPES (|)
   - Type can be A OR B
   - string | null means "string or null"
   - Must handle BOTH cases before use
   - TypeScript forces you to check

4. TYPE NARROWING
   - Proving to TypeScript which type it is
   - if (x !== null) → TypeScript knows x is not null inside block
   - Guards: typeof, instanceof, null checks
   - After check, TypeScript "narrows" the type

5. DESTRUCTURING + NULLABLE TYPES
   - Can't destructure from null/undefined
   - Must check first, THEN destructure
   - OR use non-null assertion (!)
   - OR make context non-nullable

6. TYPE CONSISTENCY
   - Same data = same type everywhere
   - number in FormData → number in Context
   - string in API → string in State
   - Mismatches cause runtime bugs

7. OPTIONAL CHAINING (?.)
   - obj?.prop → returns undefined if obj is null/undefined
   - Doesn't throw error
   - Use for deeply nested properties
   - Returns undefined, not null

8. NON-NULL ASSERTION (!)
   - value! tells TypeScript "trust me, not null"
   - Removes null/undefined from type
   - DANGEROUS: You take responsibility
   - Only use when you're 100% sure

9. TYPE INFERENCE
   - TypeScript guesses types from values
   - const x = 5 → TypeScript knows x is number
   - Return types inferred from function body
   - Better to be explicit for clarity

10. NAMED vs DEFAULT EXPORTS
    - Named: export type Foo = ...
    - Import: import { Foo } from './file'
    - Default: export default Foo
    - Import: import Foo from './file'
    - Can't mix: export type as default doesn't work
*/

"use client";
import { createContext, useContext, useState } from "react";

// ============================================
// PRIMITIVE 1: Type vs Value
// ============================================

// ❌ BAD: Trying to import type as default
// import CheckoutContextType from './layout'  // Error: Type is not a value!

// ✅ GOOD: Named type import
type MyContextType = {
  value: string;
};

// Type (compile-time only)
type User = {
  id: number;
  name: string;
};

// Value (runtime)
const user: User = {
  id: 1,
  name: "Alice",
};

// DRILL 1: Fix the import
const Drill1_TypeVsValue = () => {
  // Given this type definition:
  // export type ShippingAddress = { street: string }

  // ❌ This import is wrong:
  // import ShippingAddress from './types'

  // TODO: Write the correct import statement
  // Answer: import { ShippingAddress } from './types'

  return <div>Drill 1: Type imports must be named imports</div>;
};

// ============================================
// PRIMITIVE 2: null vs undefined
// ============================================

const Drill2_NullVsUndefined = () => {
  const value1 = null;
  const value2 = undefined;
  let value3: string;

  console.log(value1 == value2); // true (loose equality)
  console.log(value1 === value2); // false (strict equality)
  console.log(value3); // undefined (declared but not assigned)

  // QUESTION: What's the difference?
  // null = "I explicitly set this to empty"
  // undefined = "This was never set"

  return (
    <div>
      <p>null == undefined: {String(null == undefined)}</p>
      <p>null === undefined: {String(null === undefined)}</p>
    </div>
  );
};

// ============================================
// PRIMITIVE 3: Union Types (|)
// ============================================

// ❌ BAD: Not handling null case
const badGetUser = (id: number | null) => {
  return `User ${id.toString()}`; // ❌ Error: id might be null
};

// ✅ GOOD: Handle both cases
const goodGetUser = (id: number | null) => {
  if (id === null) {
    return "No user";
  }
  return `User ${id.toString()}`; // ✅ TypeScript knows id is number here
};

// DRILL 3: Handle union type
const Drill3_UnionTypes = () => {
  type Status = "loading" | "success" | "error";

  const renderStatus = (status: Status) => {
    // TODO: Return different messages for each status
    // Don't use any if/else yet - just see TypeScript autocomplete the options
    return "Loading...";
  };

  return <div>Drill 3: {renderStatus("loading")}</div>;
};

// ============================================
// PRIMITIVE 4: Type Narrowing
// ============================================

type ApiResponse =
  | {
      data: string;
    }
  | {
      error: string;
    };

const processResponse = (response: ApiResponse) => {
  // ❌ BAD: Can't access without checking
  // return response.data  // Error: property 'data' might not exist

  // ✅ GOOD: Narrow the type first
  if ("data" in response) {
    return response.data; // TypeScript knows it's the data variant
  } else {
    return response.error; // TypeScript knows it's the error variant
  }
};

// DRILL 4: Practice type narrowing
const Drill4_TypeNarrowing = () => {
  const getValue = (input: string | number) => {
    // TODO: If input is a number, return input * 2
    // TODO: If input is a string, return input.toUpperCase()
    // Use typeof to narrow the type

    return input; // ❌ Fix this
  };

  return (
    <div>
      <p>{getValue(5)}</p>
      <p>{getValue("hello")}</p>
    </div>
  );
};

// ============================================
// PRIMITIVE 5: Destructuring + Nullable
// ============================================

type Context = {
  user: string;
  isLoggedIn: boolean;
};

// ❌ BAD: Destructure from nullable
const BadComponent = () => {
  const getContext = (): Context | null => null;

  // ❌ Error: Cannot destructure from null
  // const { user, isLoggedIn } = getContext()

  return <div>Can't destructure!</div>;
};

// ✅ GOOD: Check first, then destructure
const GoodComponent = () => {
  const getContext = (): Context | null => null;

  const context = getContext();

  if (context === null) {
    return <div>No context</div>;
  }

  // ✅ Now safe to destructure
  const { user, isLoggedIn } = context;

  return <div>{user}</div>;
};

// DRILL 5: Fix destructuring from nullable
const Drill5_DestructuringNullable = () => {
  type CheckoutData = {
    total: number;
    items: string[];
  };

  const getCheckoutData = (): CheckoutData | null => {
    return { total: 100, items: ["item1"] };
  };

  // ❌ This will error:
  // const { total, items } = getCheckoutData()

  // TODO: Fix by checking null first, then destructuring

  return <div>Drill 5: Fix destructuring</div>;
};

// ============================================
// PRIMITIVE 6: Type Consistency
// ============================================

// ❌ BAD: Same field, different types
type FormData_Bad = {
  streetNumber: number; // ❌ number in form
};

type ContextData_Bad = {
  streetNumber: string; // ❌ string in context
};

// When you try to use them together:
const badConversion = (form: FormData_Bad): ContextData_Bad => {
  return {
    // streetNumber: form.streetNumber  // ❌ Error: number is not string
    streetNumber: String(form.streetNumber), // Have to convert
  };
};

// ✅ GOOD: Consistent types
type FormData_Good = {
  streetNumber: string; // ✅ string everywhere
};

type ContextData_Good = {
  streetNumber: string; // ✅ string everywhere
};

const goodConversion = (form: FormData_Good): ContextData_Good => {
  return {
    streetNumber: form.streetNumber, // ✅ No conversion needed
  };
};

// DRILL 6: Fix type mismatch
const Drill6_TypeConsistency = () => {
  type UserForm = {
    age: string; // Form returns string from input
  };

  type UserProfile = {
    age: number; // Database expects number
  };

  const saveUser = (form: UserForm) => {
    // TODO: Convert form.age to number before saving
    const profile: UserProfile = {
      age: 0, // ❌ Fix this conversion
    };

    return profile;
  };

  return <div>Drill 6: Type consistency</div>;
};

// ============================================
// PRIMITIVE 7: Optional Chaining (?.)
// ============================================

type NestedData = {
  user?: {
    profile?: {
      address?: {
        street: string;
      };
    };
  };
};

// ❌ BAD: Multiple checks
const badAccess = (data: NestedData) => {
  if (data.user && data.user.profile && data.user.profile.address) {
    return data.user.profile.address.street;
  }
  return "Unknown";
};

// ✅ GOOD: Optional chaining
const goodAccess = (data: NestedData) => {
  return data.user?.profile?.address?.street ?? "Unknown";
};

// DRILL 7: Use optional chaining
const Drill7_OptionalChaining = () => {
  type Order = {
    customer?: {
      shipping?: {
        city: string;
      };
    };
  };

  const getCity = (order: Order) => {
    // ❌ BAD: Nested if checks
    // TODO: Rewrite using ?. operator

    if (order.customer) {
      if (order.customer.shipping) {
        return order.customer.shipping.city;
      }
    }
    return "No city";
  };

  return <div>Drill 7: {getCity({})}</div>;
};

// ============================================
// PRIMITIVE 8: Non-Null Assertion (!)
// ============================================

// ❌ DANGEROUS: Overriding TypeScript
const dangerousCode = () => {
  const maybeValue: string | null = null;

  // ❌ Telling TypeScript "trust me"
  const length = maybeValue!.length; // Runtime error! null has no length

  return length;
};

// ✅ SAFE: Check before use
const safeCode = () => {
  const maybeValue: string | null = null;

  if (maybeValue === null) {
    return 0;
  }

  return maybeValue.length; // ✅ TypeScript knows it's not null
};

// When ! is appropriate:
const appropriateUse = () => {
  const element = document.getElementById("root");

  // If you're 100% sure the element exists:
  element!.style.color = "red";

  // Better: check first
  if (element) {
    element.style.color = "red";
  }
};

// DRILL 8: Remove dangerous assertions
const Drill8_NonNullAssertion = () => {
  type Config = {
    apiKey?: string;
  };

  const getApiKey = (config: Config) => {
    // ❌ Dangerous:
    return config.apiKey!.toUpperCase();

    // TODO: Rewrite to safely handle undefined case
  };

  return <div>Drill 8: Remove !</div>;
};

// ============================================
// MASTER DRILL: The Context Problem
// ============================================

// The Real Problem from Checkout:

// layout.tsx - Context definition
type CheckoutContextType = {
  validateShipping: (data: any) => void;
  isLoading: boolean;
  shippingAddress: string | null;
};

// ❌ BAD: Context can be null
const CheckoutContext_Bad = createContext<CheckoutContextType | null>(null);

const useCheckout_Bad = () => {
  return useContext(CheckoutContext_Bad); // Returns CheckoutContextType | null
};

// Consumer tries to use it:
const BadConsumer = () => {
  // ❌ Error: Can't destructure from potentially null
  // const { validateShipping, isLoading } = useCheckout_Bad()

  return <div>Can't use!</div>;
};

// ✅ SOLUTION 1: Check null first
const GoodConsumer1 = () => {
  const context = useCheckout_Bad();

  if (context === null) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }

  const { validateShipping, isLoading } = context; // ✅ Safe now

  return <div>Loading: {String(isLoading)}</div>;
};

// ✅ SOLUTION 2: Non-nullable context with assertion
const CheckoutContext_Good = createContext<CheckoutContextType>(
  null as any // Assert initial value (layout always provides real value)
);

const useCheckout_Good = () => {
  const context = useContext(CheckoutContext_Good);

  // Optional: Runtime check
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }

  return context; // Returns CheckoutContextType (not nullable)
};

const GoodConsumer2 = () => {
  // ✅ Can destructure directly - context not nullable
  const { validateShipping, isLoading } = useCheckout_Good();

  return <div>Loading: {String(isLoading)}</div>;
};

// MASTER DRILL: Fix all 5 bugs
const MasterDrill_FixContext = () => {
  // Given this broken code:

  // BUG 1: Context typed as nullable but always provided
  type MyContext = { value: string };
  const MyContext_Broken = createContext<MyContext | null>(null);

  // BUG 2: Consumer destructures without null check
  const useBrokenContext = () => {
    // const { value } = useContext(MyContext_Broken)  // ❌ Error
    return null;
  };

  // BUG 3: Checking wrong nulls
  const BrokenComponent = () => {
    const ctx = useContext(MyContext_Broken);
    const value = ctx?.value;

    // ❌ Checking value, should check ctx first
    if (value == null) {
      return <div>No value</div>;
    }

    return <div>{value}</div>;
  };

  // BUG 4: Type inconsistency
  type FormType = { count: number };
  type StateType = { count: string }; // ❌ Different type!

  // BUG 5: Unused type import
  // import MyContext from './context'  // ❌ Wrong: type as default

  // TODO: Fix all 5 bugs

  return <div>Master Drill: Fix the context mess</div>;
};

// ============================================
// EXERCISES COMPONENT
// ============================================

export default function TypeScriptBasics() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">TypeScript Fundamentals - Core Primitives</h1>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Primitive 1: Type vs Value</h2>
        <p className="text-sm text-gray-600 mb-4">Types are compile-time only. Can't import type as default export.</p>
        <Drill1_TypeVsValue />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Primitive 2: null vs undefined</h2>
        <p className="text-sm text-gray-600 mb-4">null = explicitly empty, undefined = not set</p>
        <Drill2_NullVsUndefined />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Primitive 3: Union Types (|)</h2>
        <p className="text-sm text-gray-600 mb-4">Type can be A OR B. Must handle both cases.</p>
        <Drill3_UnionTypes />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Primitive 4: Type Narrowing</h2>
        <p className="text-sm text-gray-600 mb-4">Use typeof, in, instanceof to prove which type it is</p>
        <Drill4_TypeNarrowing />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Primitive 5: Destructuring from Nullable</h2>
        <p className="text-sm text-gray-600 mb-4">Can't destructure from null/undefined. Check first!</p>
        <Drill5_DestructuringNullable />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Primitive 6: Type Consistency</h2>
        <p className="text-sm text-gray-600 mb-4">Same data = same type everywhere. number vs string causes bugs.</p>
        <Drill6_TypeConsistency />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Primitive 7: Optional Chaining (?.)</h2>
        <p className="text-sm text-gray-600 mb-4">Access nested properties safely without multiple checks</p>
        <Drill7_OptionalChaining />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Primitive 8: Non-Null Assertion (!)</h2>
        <p className="text-sm text-gray-600 mb-4">Dangerous! Only use when 100% sure value exists.</p>
        <Drill8_NonNullAssertion />
      </section>

      <section className="border p-4 rounded bg-red-50">
        <h2 className="text-xl font-bold mb-2">🔥 Master Challenge: Context Bugs</h2>
        <p className="text-sm text-gray-600 mb-4">Fix all 5 TypeScript bugs from the real checkout feature</p>
        <MasterDrill_FixContext />

        <div className="mt-4 text-sm">
          <p className="font-bold">Bugs to fix:</p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Context typed as nullable when always provided</li>
            <li>Destructuring without null check</li>
            <li>Checking value for null instead of context</li>
            <li>Type mismatch: number in form, string in context</li>
            <li>Importing type as default export</li>
          </ol>
        </div>
      </section>

      <section className="border p-4 rounded bg-green-50">
        <h3 className="font-bold mb-2">✅ Context Pattern Solutions:</h3>
        <div className="text-sm space-y-2">
          <p>
            <strong>Option 1:</strong> Keep nullable, check before destructuring
          </p>
          <pre className="bg-white p-2 rounded text-xs">
            {`const context = useContext(MyContext)
if (!context) throw new Error('...')
const { value } = context  // Safe`}
          </pre>

          <p>
            <strong>Option 2:</strong> Make non-nullable with assertion
          </p>
          <pre className="bg-white p-2 rounded text-xs">
            {`const MyContext = createContext<Type>(null as any)
// Layout always provides, so safe
const { value } = useContext(MyContext)  // Direct destructure`}
          </pre>
        </div>
      </section>
    </div>
  );
}
