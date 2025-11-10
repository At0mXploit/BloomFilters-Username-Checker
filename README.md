# Hash Tables & Bloom Filters
## Hash Tables

- A hash table is a data structure used to store key-value pairs.
- Keys are mapped to indices in an array using a hash function.
- A hash function is a function that takes an input (called a key) and converts it into a fixed-size number, usually an index that can be used to store or find a key in data structure like Hash Table or Bloom Filter.
- Collisions (when multiple keys map to the same index) are handled using buckets (arrays or linked lists).
- Operations (set, get, remove) are efficient, ideally O(1).
- It has two parts Key(K) and Value(V).
- For more good explaination watch this [video](https://www.youtube.com/watch?v=FsfRsGFHuv4).
## Key Points of Hash Function

- The same input always produces the same output.
- Example: `hash("Alice") → 42` every time.

- For a table of size n, the hash function outputs a number between 0 and n-1.
- Example: `hash("Alice") % 5 = 2` → store in index 2 of an array.
## What is a Bloom Filters?
- Suppose you are creating an account on At0m, you want to enter a cool username, you entered it and got a message, "Username is already taken". You added your birth date along username, still no luck. Now you have added your university roll number also, still got "Username is already taken". It’s really frustrating, isn't it? But have you ever thought about how quickly Geekbook checks availability of username by searching millions of username registered with it. It's done using **Bloomfilters** Algorithm. 
But have you ever thought about how quickly Geekbook checks availability of username by searching millions of username registered with it. There are many ways to do this job -  
- A Bloom Filter is a probabilistic data structure to test whether an element is possibly in a set or definitely not in a set.
- It is space-efficient and fast.
- False positives are possible (it may say "yes" even if the element isn’t in the set).
- False negatives are not possible (if it says "no", the element is definitely not in the set).
### Working

Assume `bitArray` starts as:

```bash
Index: 0 1 2 3 4 5 6 7 8 9
Bits : 0 0 0 0 0 0 0 0 0 0
```

Add "Alice":

- `hash1("Alice") = 2`
- `hash2("Alice") = 5`

```bash
Index: 0 1 2 3 4 5 6 7 8 9
Bits : 0 0 1 0 0 1 0 0 0 0
```

Add "Bob":

- `hash1("Bob") = 3`
- `hash2("Bob") = 6`

```bash
Index: 0 1 2 3 4 5 6 7 8 9
Bits : 0 0 1 1 0 1 1 0 0 0
```

Now Check "Alice":

- `hash1("Alice") = 2 → bit=1`
- `hash2("Alice") = 5 → bit=1`
- All bits 1 → maybe exists

Also Check "Charlie":

- `hash1("Charlie") = 1 → bit=0`
- `hash2("Charlie") = 7 → bit=0`
- Any bit 0 → definitely does not exist

In our code:

```js
const existingUsers = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "At0m", "Atom", "Rijan"];
```

We have:

- Bit array size m = 20 bits
- Number of hash functions k = 2
- Number of elements added n = 9 (Alice, Bob, Charlie…)

The False positive probability formula is:

$$
P(\text{false positive}) \approx (1 - e^{-kn/m})^k
$$

Put values and we get `35%` which means with only 20 bits and 2 hashes, after adding 9 usernames, any new username has ~35% chance of reporting “might exist” even if it wasn’t added.

---

