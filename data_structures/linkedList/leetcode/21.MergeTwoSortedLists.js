//https://leetcode.com/problems/merge-two-sorted-lists/description/?envType=problem-list-v2&envId=linked-list

var mergeTwoLists = function (head1, head2) {
  const res = new ListNode();
  let node = res;

  while (head1 && head2) {
    if (head1.val < head2.val) {
      node.next = head1;
      head1 = head1.next;
    } else {
      node.next = head2;
      head2 = head2.next;
    }

    node = node.next;
  }

  node.next = head1 || head2;

  return res.next;
};