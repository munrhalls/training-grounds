// Data Transformation & API Integration - Core Principles
// Deliberate Practice Exercises

/*
=== CORE PRINCIPLES EXTRACTED ===

1. DESTRUCTURE EARLY, USE CONSISTENTLY
   ❌ const address = body; then address.regionCode, address.city
   ✅ const { regionCode, postalCode, street, streetNumber, city } = body;
   - Destructure at the top
   - Use destructured names consistently
   - Don't mix `address.x` and `x` in same scope

2. AVOID INTERMEDIATE VARIABLES FOR SIMPLE LOOKUPS
   ❌ const regionCodePrased = regionCodeMap[regionCode]; then address.regionCodePrased
   ✅ regionCode: regionCodeMap[regionCode] || regionCode
   - Inline simple transformations
   - Use fallback operators (||, ??)
   - Don't create variables you use once

3. ACCESS PROPERTIES DIRECTLY FROM DESTRUCTURED OBJECT
   ❌ address.city when you have { city } available
   ✅ Just use `city` directly
   - If destructured, use the name
   - Don't prefix with original object name

4. TEMPLATE LITERALS FOR STRING CONCATENATION
   ❌ [postalCode, street, streetNumber].join(" ")
   ✅ `${postalCode} ${street} ${streetNumber}`
   - More readable
   - Easier to add spacing/formatting
   - No array allocation

5. HANDLE API RESPONSE PARSING DEFENSIVELY
   - Use optional chaining (?.)
   - Provide defaults for missing data
   - Parse nested structures safely
   - Split complex parsing with intermediate variables

6. MAP STATUS/ENUMS EXPLICITLY
   - Use if/else or switch for enum mapping
   - Type the output
   - Handle all cases including unexpected

7. SINGLE RESPONSIBILITY EXTRACTION
   - Separate data transformation from API calls
   - Extract mapping logic to functions
   - Keep API route handlers thin

RELATED SKILLS NEEDED IN:
- Payment processing (Stripe/PayPal response → DB format)
- User registration (form data → normalized user object)
- Search results (API results → UI display format)
- E-commerce (product data → cart item format)
- Analytics (tracking events → formatted payload)
- File uploads (multipart data → structured metadata)
- Webhook handling (external payload → internal format)
*/

"use client";

// ============================================
// PRINCIPLE 1: Destructure Early, Use Consistently
// ============================================

// ❌ BAD: Inconsistent access pattern
const badUserTransform = (data: any) => {
  const user = data;
  return {
    id: user.id,
    email: data.email, // Mixed: user vs data
    name: user.profile.firstName + " " + data.profile.lastName, // Inconsistent
  };
};

// ✅ GOOD: Destructure at top, use consistently
const goodUserTransform = (data: any) => {
  const { id, email, profile } = data;
  const { firstName, lastName } = profile;

  return {
    id,
    email,
    name: `${firstName} ${lastName}`,
  };
};

// DRILL 1: Fix the inconsistent destructuring
const Drill1_FixDestructuring = () => {
  const transformOrder = (orderData: any) => {
    const order = orderData;
    const total = order.items.reduce((sum: number, item: any) => sum + item.price, 0);

    return {
      orderId: orderData.id, // ❌ Bug: mixing order and orderData
      customer: order.customer.name,
      total: total,
      status: orderData.status, // ❌ Bug: mixing again
    };
  };

  // TODO: Refactor to use consistent destructuring
  return <div>Drill 1: Fix destructuring pattern</div>;
};

// ============================================
// PRINCIPLE 2: Avoid Intermediate Variables
// ============================================

// ❌ BAD: Unnecessary intermediate variables
const badPriceCalculation = (product: any, quantity: number) => {
  const basePrice = product.price;
  const discount = product.discount;
  const finalPrice = basePrice - discount;
  const total = finalPrice * quantity;

  return total; // 4 variables for simple calculation
};

// ✅ GOOD: Inline simple calculations
const goodPriceCalculation = (product: any, quantity: number) => {
  return (product.price - product.discount) * quantity;
};

// When intermediate variable DOES help readability:
const goodComplexCalculation = (product: any, quantity: number, taxRate: number) => {
  const subtotal = (product.price - product.discount) * quantity;
  const tax = subtotal * taxRate;
  const shipping = subtotal > 50 ? 0 : 5.99;

  return subtotal + tax + shipping; // ✅ Intermediate vars make this clearer
};

// DRILL 2: Remove unnecessary intermediate variables
const Drill2_RemoveIntermediates = () => {
  const formatUserName = (user: any) => {
    const first = user.firstName; // ❌ Used once
    const last = user.lastName; // ❌ Used once
    const fullName = `${first} ${last}`; // ❌ Used once

    return fullName;
  };

  // TODO: Refactor to remove unnecessary variables
  return <div>Drill 2: {formatUserName({ firstName: "John", lastName: "Doe" })}</div>;
};

// ============================================
// PRINCIPLE 3: Template Literals vs Join/Concat
// ============================================

// ❌ BAD: Using join for simple concatenation
const badAddressFormat = (street: string, city: string, zip: string) => {
  return [street, city, zip].join(", ");
};

// ✅ GOOD: Template literal
const goodAddressFormat = (street: string, city: string, zip: string) => {
  return `${street}, ${city}, ${zip}`;
};

// When join IS appropriate:
const goodListFormat = (items: string[]) => {
  return items.join(", "); // ✅ Array of unknown length
};

// DRILL 3: Replace join with template literal
const Drill3_UseTemplates = () => {
  const formatPhoneNumber = (countryCode: string, areaCode: string, number: string) => {
    // ❌ BAD: Using array.join
    return [countryCode, areaCode, number].join("-");
  };

  // TODO: Refactor to use template literal with proper formatting
  return <div>Drill 3: {formatPhoneNumber("+1", "555", "0123")}</div>;
};

// ============================================
// PRINCIPLE 4: Defensive API Response Parsing
// ============================================

// ❌ BAD: Fragile parsing
const badParseUser = (apiResponse: any) => {
  return {
    id: apiResponse.data.user.id, // Will crash if data or user is undefined
    email: apiResponse.data.user.email,
    avatarUrl: apiResponse.data.user.profile.avatar.url, // Deeply nested, no safety
  };
};

// ✅ GOOD: Defensive parsing
const goodParseUser = (apiResponse: any) => {
  const user = apiResponse?.data?.user;

  return {
    id: user?.id || "",
    email: user?.email || "",
    avatarUrl: user?.profile?.avatar?.url || "/default-avatar.png",
  };
};

// DRILL 4: Add defensive parsing
const Drill4_DefensiveParsing = () => {
  const parseProduct = (apiResponse: any) => {
    // ❌ Fragile - no optional chaining
    return {
      name: apiResponse.result.product.name,
      price: apiResponse.result.product.pricing.amount,
      image: apiResponse.result.product.images.primary.url,
    };
  };

  // TODO: Add optional chaining and defaults
  return <div>Drill 4: Parse API safely</div>;
};

// ============================================
// PRINCIPLE 5: Map Enums/Status Explicitly
// ============================================

// ❌ BAD: Implicit mapping
const badStatusMap = (apiStatus: string) => {
  return apiStatus === "pending" ? "PROCESSING" : "COMPLETE"; // What about other statuses?
};

// ✅ GOOD: Explicit mapping with all cases
type OrderStatus = "PENDING" | "PROCESSING" | "COMPLETE" | "FAILED";

const goodStatusMap = (apiStatus: string): OrderStatus => {
  switch (apiStatus) {
    case "pending":
      return "PENDING";
    case "in_progress":
      return "PROCESSING";
    case "completed":
      return "COMPLETE";
    case "error":
      return "FAILED";
    default:
      return "PENDING"; // Explicit fallback
  }
};

// DRILL 5: Create explicit status mapper
const Drill5_ExplicitMapper = () => {
  // API returns: "new", "active", "archived", "deleted"
  // App needs: "DRAFT", "PUBLISHED", "ARCHIVED", "REMOVED"

  const mapPostStatus = (apiStatus: string) => {
    // ❌ Incomplete mapping
    if (apiStatus === "new") return "DRAFT";
    return "PUBLISHED"; // Wrong fallback!
  };

  // TODO: Create explicit switch/if-else for all 4 cases
  return <div>Drill 5: {mapPostStatus("active")}</div>;
};

// ============================================
// PRINCIPLE 6: Extract Data Transformation Logic
// ============================================

// ❌ BAD: Everything in one function
const badAPIRoute = async (req: Request) => {
  const body = await req.json();

  // Parsing
  const user = body.user;
  const email = user.email;
  const name = user.firstName + " " + user.lastName;

  // Transformation
  const normalized = {
    email: email.toLowerCase(),
    name: name.trim(),
  };

  // Validation
  if (!normalized.email.includes("@")) {
    return Response.json({ error: "Invalid email" });
  }

  // API call
  const result = await fetch("https://api.example.com/users", {
    method: "POST",
    body: JSON.stringify(normalized),
  });

  return Response.json(result);
};

// ✅ GOOD: Extracted concerns
const normalizeUser = (rawUser: any) => {
  const { firstName, lastName, email } = rawUser;
  return {
    email: email.toLowerCase(),
    name: `${firstName} ${lastName}`.trim(),
  };
};

const validateUser = (user: any) => {
  if (!user.email.includes("@")) {
    throw new Error("Invalid email");
  }
};

const goodAPIRoute = async (req: Request) => {
  const body = await req.json();

  const normalized = normalizeUser(body.user);
  validateUser(normalized);

  const result = await fetch("https://api.example.com/users", {
    method: "POST",
    body: JSON.stringify(normalized),
  });

  return Response.json(result);
};

// DRILL 6: Extract transformation logic
const Drill6_ExtractLogic = () => {
  const processOrder = (orderData: any) => {
    // ❌ Everything mixed together
    const items = orderData.items;
    let total = 0;
    for (const item of items) {
      const price = item.price;
      const quantity = item.quantity;
      total += price * quantity;
    }

    const tax = total * 0.1;
    const shipping = total > 50 ? 0 : 10;
    const finalTotal = total + tax + shipping;

    if (finalTotal > 1000) {
      throw new Error("Order too large");
    }

    return {
      subtotal: total,
      tax,
      shipping,
      total: finalTotal,
    };
  };

  // TODO: Extract into separate functions:
  // - calculateSubtotal(items)
  // - calculateTax(subtotal)
  // - calculateShipping(subtotal)
  // - validateOrderTotal(total)

  return <div>Drill 6: Extract to pure functions</div>;
};

// ============================================
// MASTER DRILL: The Original API Route Refactor
// ============================================

interface AddressInput {
  regionCode: string;
  postalCode: string;
  street: string;
  streetNumber: string;
  city: string;
}

interface GoogleValidationAPIRequest {
  address: {
    regionCode: string;
    locality: string;
    addressLines: [string];
  };
}

// ❌ ORIGINAL (With bugs marked)
const MasterDrill_Original = () => {
  const POST_BAD = async (req: Request) => {
    const body = await req.json();

    const address = body; // ❌ Unnecessary intermediate
    const { regionCode, locality } = address; // ❌ Inconsistent: destructures regionCode but not others

    const regionCodeMap = {
      EN: "GB",
      PL: "PL",
    };
    const regionCodePrased = regionCodeMap[regionCode]; // ❌ Typo + unnecessary intermediate

    const addressLines = [
      address.postalCode, // ❌ Uses address.x instead of destructured
      address.street,
      address.streetNumber,
    ].join(" "); // ❌ Array.join for simple concat

    const validationRequestBody: GoogleValidationAPIRequest = {
      address: {
        regionCode: address.regionCodePrased, // ❌ address.regionCodePrased doesn't exist!
        locality: address.city, // ❌ Uses address.city instead of destructured
        addressLines: [addressLines],
      },
    };

    // ... rest of fetch logic
    return Response.json({ status: "CONFIRMED" });
  };

  return <div>Original (broken) version</div>;
};

// ✅ REFACTORED VERSION
const MasterDrill_Refactored = () => {
  // Extract transformation logic
  const transformToGoogleFormat = (input: AddressInput): GoogleValidationAPIRequest => {
    const { regionCode, postalCode, street, streetNumber, city } = input;

    const regionCodeMap: Record<string, string> = {
      EN: "GB",
      PL: "PL",
    };

    return {
      address: {
        regionCode: regionCodeMap[regionCode] || regionCode,
        locality: city,
        addressLines: [`${postalCode} ${street} ${streetNumber}`],
      },
    };
  };

  const POST_GOOD = async (req: Request) => {
    const body = await req.json();
    const validationRequestBody = transformToGoogleFormat(body);

    // Clean API route handler - just orchestrates
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const validationResponse = await fetch(`https://addressvalidation.googleapis.com/v1:validateAddress?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validationRequestBody),
    });

    const validationData = await validationResponse.json();
    return Response.json({ status: "CONFIRMED", data: validationData });
  };

  return <div>Refactored version</div>;
};

// ============================================
// EXERCISES COMPONENT
// ============================================

export default function WorkingWithAPIData() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">API Data Transformation - Drills</h1>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Drill 1: Consistent Destructuring</h2>
        <p className="text-sm text-gray-600 mb-4">Fix the mixing of `order` and `orderData` access patterns</p>
        <Drill1_FixDestructuring />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Drill 2: Remove Unnecessary Variables</h2>
        <p className="text-sm text-gray-600 mb-4">Inline variables that are only used once</p>
        <Drill2_RemoveIntermediates />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Drill 3: Template Literals</h2>
        <p className="text-sm text-gray-600 mb-4">Replace array.join() with template literals for simple concatenation</p>
        <Drill3_UseTemplates />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Drill 4: Defensive Parsing</h2>
        <p className="text-sm text-gray-600 mb-4">Add optional chaining and default values to prevent crashes</p>
        <Drill4_DefensiveParsing />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Drill 5: Explicit Status Mapping</h2>
        <p className="text-sm text-gray-600 mb-4">Create complete switch/if-else for all status cases</p>
        <Drill5_ExplicitMapper />
      </section>

      <section className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Drill 6: Extract Logic</h2>
        <p className="text-sm text-gray-600 mb-4">Separate calculation, validation, and formatting into pure functions</p>
        <Drill6_ExtractLogic />
      </section>

      <section className="border p-4 rounded bg-yellow-50">
        <h2 className="text-xl font-bold mb-2">🎯 Master Challenge</h2>
        <p className="text-sm text-gray-600 mb-4">Identify and fix all 7 bugs in the original API route handler</p>
        <MasterDrill_Original />
        <hr className="my-4" />
        <p className="text-sm font-bold mb-2">Compare with refactored version:</p>
        <MasterDrill_Refactored />
      </section>

      <section className="border p-4 rounded bg-blue-50">
        <h3 className="font-bold mb-2">📝 Bugs to Find in Master Challenge:</h3>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Unnecessary intermediate variable: `const address = body`</li>
          <li>Inconsistent destructuring: gets regionCode but not postalCode/street/city</li>
          <li>Typo + unnecessary variable: `regionCodePrased`</li>
          <li>Accessing non-existent property: `address.regionCodePrased`</li>
          <li>Using `address.x` when should use destructured `x`</li>
          <li>Array.join() for simple string concatenation</li>
          <li>Mixed access pattern: destructured + address.property in same scope</li>
        </ol>
      </section>
    </div>
  );
}
