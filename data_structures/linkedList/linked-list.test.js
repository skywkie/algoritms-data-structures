import { describe, it, expect } from "@jest/globals";

import LinkedList from "./linked-list.js";
import { LinkedListNode } from "./linked-list-node.js";

describe("Linked List Node", () => {
  it("должен создать узел с указанным значением", () => {
    const node = new LinkedListNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });

  it("должен создать узел с объектом в качестве значения", () => {
    const obj = { model: "bmw", age: 2017 };

    const node = new LinkedListNode(obj);

    expect(node.value).toStrictEqual(obj);
    expect(node.next).toBeNull();
  });

  it("должен соединить узлы вместе", () => {
    const nextNode = new LinkedListNode("second");
    const node = new LinkedListNode("first", nextNode);

    expect(node.value).toBe("first");
    expect(node.next).toStrictEqual(nextNode);
    expect(node.next.value).toBe("second");
    expect(node.next.next).toBeNull();
  });
});

describe("Linked List", () => {
  it("должен создать пустой связный список", () => {
    const linkedList = new LinkedList();

    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("должен добавить узлы в конец списка", () => {
    const linkedList = new LinkedList();

    linkedList.append(1);

    expect(linkedList.toString()).toBe("1");

    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);
    linkedList.append(5);

    expect(linkedList.toString()).toBe("1, 2, 3, 4, 5");
  });

  it("должен добавить узлы в начало списка", () => {
    const linkedList = new LinkedList();

    linkedList.prepend(1);

    expect(linkedList.toString()).toBe("1");

    linkedList.prepend(2);
    linkedList.prepend(3);
    linkedList.prepend(4);
    linkedList.prepend(5);

    expect(linkedList.toString()).toBe("5, 4, 3, 2, 1");
  });

  it("должен добавлять узлы по индексам", () => {
    const linkedList = new LinkedList();

    linkedList.insert(1, 13);

    expect(linkedList.toString()).toBe("1");
    expect(linkedList.toString()).toBe("1");

    linkedList.insert(-41, 10).insert(12, -100).insert(505, 0).insert(50, 2).insert(10, 1);

    expect(linkedList.toString()).toBe("505, 12, 10, 1, 50, -41");
  });

  it("должен удялять первый узел", () => {
    const linkedList = new LinkedList();

    linkedList.append(1).append(2).append(3);

    const head = linkedList.removeHead();

    expect(head.toString()).toBe("1");
    expect(linkedList.toString()).toBe("2, 3");

    linkedList.removeHead();

    expect(linkedList.toString()).toBe("3");

    linkedList.removeHead();

    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("должен удялять последний узел", () => {
    const linkedList = new LinkedList();

    linkedList.append(1).append(2).append(3);

    const head = linkedList.removeTail();

    expect(head.toString()).toBe("3");
    expect(linkedList.toString()).toBe("1, 2");

    linkedList.removeTail();

    expect(linkedList.toString()).toBe("1");

    linkedList.removeTail();

    expect(linkedList.toString()).toBe("");
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  it("должен удалить узлы по значениям", () => {
    const linkedList = new LinkedList();

    linkedList.appendValues([1, 5, 2, 2, 3, 5, 3, 3, 2, 4, 4]);

    let removed = linkedList.remove(5);

    expect(removed.toString()).toBe("5");
    expect(linkedList.toString()).toBe("1, 2, 2, 3, 3, 3, 2, 4, 4");

    removed = linkedList.remove(2);

    expect(removed.toString()).toBe("2");
    expect(linkedList.toString()).toBe("1, 3, 3, 3, 4, 4");
  });

  it("должен найти первый узел по значению и функции", () => {
    const linkedList = new LinkedList();

    linkedList.appendValues([1, 5, 2, 2, 3, 5, 3, 2, { number: 6, key: 15 }, 4, 4, 6]);

    expect(linkedList.find({ value: 500 })).toBeNull();
    expect(linkedList.find({ value: -2 })).toBeNull();

    expect(linkedList.find({ value: 3 }).value).toBe(3);
    expect(linkedList.find({ value: 5 }).value).toBe(5);
    expect(linkedList.find({ value: 2 }).value).toBe(2);

    expect(linkedList.find({ callback: (value) => Number(value) != 1 }).value).toBeDefined();
    expect(linkedList.find({ callback: (value) => Number(value) > 5 }).value).toBeDefined();
    expect(linkedList.find({ callback: (value) => value?.key === 15 }).value).toStrictEqual({
      number: 6,
      key: 15,
    });
  });

  it("должен добавить сразу несколько значений в конец", () => {
    const linkedList = new LinkedList();

    linkedList.appendValues([1, 23, 15, 12, 521, 4, 1243, 124, 124, 124, 12]);

    expect(linkedList.toString()).toBe("1, 23, 15, 12, 521, 4, 1243, 124, 124, 124, 12");
  });

  it("должен найти узлы с помощью кастомной функции сравнения", () => {
    const comparatorFunction = (a, b) => {
      if (a.customValue === b.customValue) {
        return 0;
      }

      return a.customValue < b.customValue ? -1 : 1;
    };

    const linkedList = new LinkedList(comparatorFunction);

    linkedList
      .append({ value: 1, customValue: "test1" })
      .append({ value: 2, customValue: "test2" })
      .append({ value: 3, customValue: "test3" });

    const node = linkedList.find({
      value: { value: 2, customValue: "test2" },
    });

    expect(node).toBeDefined();
    expect(node.value.value).toBe(2);
    expect(node.value.customValue).toBe("test2");
    expect(linkedList.find({ value: { value: 2, customValue: "test5" } })).toBeNull();
  });

  it("должен применять функции для поиска узлов в правильном порядке (сначала применяется функция, переданная в объекте, при вызове метода `find`)", () => {
    const greaterThan = (value, compareTo) => (value > compareTo ? 0 : 1);

    const linkedList = new LinkedList(greaterThan);
    linkedList.appendValues([1, 2, 3, 4, 5]);

    let node = linkedList.find({ value: 3 });
    expect(node.value).toBe(4);

    node = linkedList.find({ callback: (value) => value < 3 });
    expect(node.value).toBe(1);
  });

  it("должен преобразовать список в массив", () => {
    const linkedList = new LinkedList();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);

    expect(linkedList.toArray()).toStrictEqual([1, 2, 3]);
  });

  it("должен инвертировать список", () => {
    const linkedList = new LinkedList();

    linkedList.append(1);
    linkedList.append(2);
    linkedList.append(3);
    linkedList.append(4);

    expect(linkedList.toString()).toBe("1, 2, 3, 4");

    linkedList.reverse();

    expect(linkedList.toString()).toBe("4, 3, 2, 1");

    linkedList.reverse();

    expect(linkedList.toString()).toBe("1, 2, 3, 4");
  });
});
