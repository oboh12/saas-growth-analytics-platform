import { calculateScore } from "./utils/deliverabilityScore.js";

console.log("========================================");
console.log("DELIVERABILITY SCORE TEST");
console.log("========================================");

// Test 1: SPF + DMARC reject
const test1 = calculateScore({
  spf: "v=spf1 include:example.com -all",
  dmarc: "v=DMARC1; p=reject",
});

console.log("\nTest 1: SPF + DMARC p=reject");
console.log(test1);

// Test 2: SPF + DMARC quarantine
const test2 = calculateScore({
  spf: "v=spf1 include:example.com -all",
  dmarc: "v=DMARC1; p=quarantine",
});

console.log("\nTest 2: SPF + DMARC p=quarantine");
console.log(test2);

// Test 3: SPF + DMARC none
const test3 = calculateScore({
  spf: "v=spf1 include:example.com -all",
  dmarc: "v=DMARC1; p=none",
});

console.log("\nTest 3: SPF + DMARC p=none");
console.log(test3);

// Test 4: SPF missing + DMARC reject
const test4 = calculateScore({
  spf: null,
  dmarc: "v=DMARC1; p=reject",
});

console.log("\nTest 4: SPF missing + DMARC p=reject");
console.log(test4);

// Test 5: SPF missing + DMARC quarantine
const test5 = calculateScore({
  spf: null,
  dmarc: "v=DMARC1; p=quarantine",
});

console.log("\nTest 5: SPF missing + DMARC p=quarantine");
console.log(test5);

// Test 6: SPF missing + DMARC missing
const test6 = calculateScore({
  spf: null,
  dmarc: null,
});

console.log("\nTest 6: SPF missing + DMARC missing");
console.log(test6);

console.log("\n========================================");
console.log("ALL SCORE TESTS COMPLETED");
console.log("========================================");