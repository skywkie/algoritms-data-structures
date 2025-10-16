import { Comparator } from "./comparator.js";
import { LinkedListNode } from "./linked-list-node.js";

export default class LinkedList {
  constructor(comparatorFunction) {
    this.head = null; // первый узел

    this.tail = null; // последний узел

    // вспомогательная функция сравнения
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value) {
    this.head = new LinkedListNode(value, this.head);

    if (!this.tail) {
      // если хвостовой узел отсутствует, то головной также явлется хвостовым
      this.tail = this.head;
    }

    return this; // для возможности вызова по цепочке (врзращает сам объект списка)
  }

  append(value) {
    if (!this.head) return this.prepend(value);

    const newNode = new LinkedListNode(value);

    this.tail.next = newNode; // добавляем ссылку на новый узел в хвостовой (он станет предхвостовым)

    this.tail = newNode; // обновляем хвостовой узел

    return this;
  }

  insert(value, index) {
    if (!index) return this.prepend(value);

    let currentNode = this.head;
    let i = 0;

    while (currentNode) {
      if (i === index) break;

      currentNode = currentNode.next;
      i++;
    }

    if (currentNode) {
      const newNode = new LinkedListNode(value, currentNode.next);

      currentNode.next = newNode;
    } else return this.append(value);

    return this;
  }

  removeHead() {
    if (!this.head) return null;

    const removed = this.head;

    if (this.head.next) {
      this.head.next = removed;
    } else {
      this.head = null;
      this.tail = null;
    }

    return removed;
  }

  removeTail() {
    if (!this.tail) return null;

    const removed = this.tail;

    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;

      return removed;
    }

    let currentNode = this.head;

    while (currentNode.next) {
      if (currentNode.next === removed) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return removed;
  }

  // удаляет все узлы с value, возвращает последний удаленный
  remove(value) {
    if (!this.head) return null;

    // Последний удаленный узел
    let removed = null;

    // Пока есть и удаляется головной узел
    while (this.head && this.compare.equal(this.head.value, value)) {
      // Обновляем удаляемый узел
      removed = this.head;
      // Обновляем головной узел (заменяем на следующий)
      this.head = this.head.next;
    }

    let currentNode = this.head;

    // Головной узел больше не удаляется
    while (currentNode.next) {
      // Если значения совпадают
      if (this.compare.equal(currentNode.next.value, value)) {
        // Обновляем удаляемый узел
        removed = currentNode.next;
        // Обновляем ссылку текущего узла (заменяем на следующий,
        // чтобы закрыть образовавшуюся брешь)
        currentNode.next = currentNode.next.next;
      } else {
        // Иначе, переходим к следующему узлу
        currentNode = currentNode.next;
      }
    }

    // Крайний случай: если удаляется хвостовой узел,
    if (this.compare.equal(this.tail.value, value)) {
      // обновляем его (заменяем на текущий)
      this.tail = currentNode;
    }

    return removed;
  }

  // возвращает первый найденный узел
  find({ value = undefined, callback = undefined }) {
    if (!this.head) return null;

    let currentNode = this.head;

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  appendValues(values) {
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray() {
    const array = [];

    let currentNode = this.head;

    while (currentNode) {
      array.push(currentNode.value);

      currentNode = currentNode.next;
    }

    return array;
  }

  reverse() {
    let currentNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;

      currentNode.next = prevNode;

      prevNode = currentNode;

      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

const linkedList = new LinkedList();

const node0 = new LinkedListNode(0);
const node1 = new LinkedListNode(1);
const node2 = new LinkedListNode(2);
const node3 = new LinkedListNode(3);
const node4 = new LinkedListNode(4);

linkedList.append(node0).append(node1).append(node2).append(node3).append(node4);

console.log(linkedList);
