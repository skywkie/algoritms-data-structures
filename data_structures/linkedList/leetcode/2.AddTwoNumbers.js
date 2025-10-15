// https://leetcode.com/problems/add-two-numbers/description/?envType=problem-list-v2&envId=linked-list

var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(0);
  const result = dummy;

  let currentTotal = 0;
  let carry = 0;

  while (l1 || l2 || carry) {
    currentTotal = carry;

    if (l1) {
      currentTotal += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      currentTotal += l2.val;
      l2 = l2.next;
    }

    let number = currentTotal % 10;
    dummy.next = new ListNode(number);
    dummy = dummy.next;

    carry = Math.floor(currentTotal / 10);
  }

  return result.next;
};
