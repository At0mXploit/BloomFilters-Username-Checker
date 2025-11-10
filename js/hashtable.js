class HashTable {
  // Initialize hash table with a fixed size
  constructor(size = 5) {
    this.table = new Array(size); // Array of buckets
  }

  // Convert numeric key into an index
  hashKey(key) {
    return key % this.table.length; // Simple modulo for numeric keys
  }

  // Add or update a key-value pair
  set(key, value) {
    const index = this.hashKey(key);

    if (!this.table[index]) {
      this.table[index] = []; // Bucket (handles collisions)
    }

    // Update value if key exists
    for (let pair of this.table[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // Key not found → add new pair
    this.table[index].push([key, value]);
  }

  // Retrieve value by key
  get(key) {
    const index = this.hashKey(key);
    const bucket = this.table[index];
    if (!bucket) return undefined;

    for (let pair of bucket) {
      if (pair[0] === key) return pair[1];
    }

    return undefined;
  }

  // Remove a key-value pair
  remove(key) {
    const index = this.hashKey(key);
    const bucket = this.table[index];
    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1); // Remove the key-value pair
        return true;
      }
    }

    return false;
  }

  // Show the current state of the table
  display() {
    this.table.forEach((bucket, index) => {
      console.log(index, bucket);
    });
  }
}

// ---------------- Example Usage ----------------
// Create hash table of size 5
const ht = new HashTable(5);

// Add keys with intentional collisions
ht.set(101, "Alice");   
// 101 % 5 = 1 → goes to index 1
// Bucket 1 → [[101, "Alice"]]

ht.set(106, "Bob");     
// 106 % 5 = 1 → goes to index 1 (collision with 101)
// Bucket 1 → [[101, "Alice"], [106, "Bob"]] Becomes like linked list

ht.set(111, "Charlie"); 
// 111 % 5 = 1 → goes to index 1 (collision with 101 & 106)
// Bucket 1 → [[101, "Alice"], [106, "Bob"], [111, "Charlie"]]

ht.set(202, "David");   
// 202 % 5 = 2 → goes to index 2
// Bucket 2 → [[202, "David"]]

ht.set(505, "Eve");     
// 505 % 5 = 0 → goes to index 0
// Bucket 0 → [[505, "Eve"]]

// ---------------- Retrieve values ----------------
console.log("Get 101:", ht.get(101));    // Alice
console.log("Get 106:", ht.get(106));    // Bob
console.log("Get 111:", ht.get(111));    // Charlie

// ---------------- Display table ----------------
console.log("Table with collisions:");
ht.display();
// Expected output:
// 0 [ [ 505, 'Eve' ] ]
// 1 [ [ 101, 'Alice' ], [ 106, 'Bob' ], [ 111, 'Charlie' ] ]  <-- collision bucket
// 2 [ [ 202, 'David' ] ]
// 3 undefined
// 4 undefined

// ---------------- Remove a key in collision bucket ----------------
ht.remove(106); // Remove Bob

console.log("After removing 106:");
ht.display();
// Bucket 1 now: [[101, 'Alice'], [111, 'Charlie']]
