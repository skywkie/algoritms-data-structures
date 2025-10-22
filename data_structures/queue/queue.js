import LinkedList from "../linkedList/linked-list.js";

export default class Queue {
  constructor() {
    this.list = new LinkedList();
  }

  isEmpty() {
    return !this.list.head;
  }

  // чтение головного узла без удаления
  peek() {
    if (this.isEmpty()) return null;

    return this.list.head.value;
  }

  // добавление в конец очереди
  enqueue(value) {
    this.list.append(value);
  }

  // удаление первого узла
  dequeue() {
    const removedHead = this.list.removeHead();

    return removedHead ? removedHead.value : null;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.list.head;
		while (currentNode) {
			
      currentNode = currentNode.next;
    }

    return nodes;
  }
}
