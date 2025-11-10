class BloomFilter {
  constructor(size = 20) {
    this.size = size;
    this.bitArray = new Array(size).fill(0);
  }

  hash1(str) {
    let sum = 0;
    for (let char of str) sum += char.charCodeAt(0);
    return sum % this.size;
  }

  hash2(str) {
    let sum = 0;
    for (let char of str) sum += char.charCodeAt(0) * 3;
    return sum % this.size;
  }

  add(value) {
    const i1 = this.hash1(value);
    const i2 = this.hash2(value);
    this.bitArray[i1] = 1;
    this.bitArray[i2] = 1;
  }

  check(value) {
    const i1 = this.hash1(value);
    const i2 = this.hash2(value);
    return this.bitArray[i1] === 1 && this.bitArray[i2] === 1;
  }
}

const bf = new BloomFilter(20);

const existingUsers = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "At0m", "Atom", "Rijan"];
existingUsers.forEach(user => bf.add(user));
