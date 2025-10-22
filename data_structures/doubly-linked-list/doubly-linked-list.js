import { DoublyLinkedListNode } from "./doubly-linked-list-node.js";
import { Comparator } from "./comparator.js";

export default class DoublyLinkedList {
  constructor(compareFn) {
    this.head = null;
    this.tail = null;

    this.compare = compareFn ?? new Comparator();
  }

  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head);

    if (this.head) this.head.previous = newNode;

    this.head = newNode;

    if (!this.tail) this.tail = newNode;

    return this;
  }

  append(value) {
    if (!this.head) return this.prepend(value);

    const newNode = new DoublyLinkedListNode(value, null, this.tail);

    this.tail.next = newNode;

    this.tail = newNode;

    return this;
  }

  removeHead() {
    if (!this.head) return null;

    const removed = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.tail = null;
      this.head = null;
    }

    return removed;
  }

  removeTail() {
    if (!this.tail) return null;

    const removed = this.tail;

    if (this.head == this.tail) {
      this.head = null;
      this.tail = null;

      return removed;
    }

    this.tail = this.tail.previous;
    this.tail.next = null;

    return removed;
  }

  // удаляет все узлы с value, возвращает последний
  remove(value) {
    if (!this.head) return null;

    let removedNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (this.compare.equal(currentNode.value, value)) {
        removedNode = currentNode;

        if (removedNode === this.head) {
          this.head = removedNode.next;

          if (this.head) {
            this.head.previous = null;
          }

          if (removedNode === this.tail) {
            this.tail = null;
          }
        } else if (removedNode === this.tail) {
          this.tail = removedNode.previous;
          this.tail.next = null;
        } else {
          const previousNode = removedNode.previous;
          const nextNode = removedNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return removedNode;
  }

  // возвращает первый найденный узел
  find({ value, callback }) {
    if (!this.head) return null;

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode)) {
        return currentNode;
      } else if (value && this.compare.equal(value, currentNode.value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  reverse() {
    let currentNode = this.head;

    let previousNode = null;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;

      currentNode.previous = nextNode;
      currentNode.next = previousNode;

      previousNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = previousNode;
    // this.tail.previous = this.tail.next;
    // this.tail.next = null;

    return this;
  }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.append(1).append(2).append(3).append(4).append(1).append(5).append(1);

// console.log(doublyLinkedList.head);

doublyLinkedList.reverse();

console.log(doublyLinkedList.tail);
