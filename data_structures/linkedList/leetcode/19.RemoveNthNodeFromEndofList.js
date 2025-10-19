//https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/?envType=problem-list-v2&envId=linked-list

var removeNthFromEnd = function (head, n) {
  let res = new ListNode(0, head);
  let dummy = res;

  for (let i = 0; i < n; i++) {
    head = head.next;
  }

  while (head) {
    head = head.next;
    dummy = dummy.next;
  }

  dummy.next = dummy.next.next;

  return res.next;
};
