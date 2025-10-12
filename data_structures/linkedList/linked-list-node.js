export class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;

    this.next = next;
  }

  toString(customToString) {
    return customToString ? customToString(this.value) : `${this.value}`;
  }
}
