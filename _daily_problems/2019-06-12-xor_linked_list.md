---
layout: daily_problems
serial: 1
title: The XOR Linked List Problem
comments: true
category: daily_problems
label: hard
---

## Problem statement
{:#problem_statement}

An XOR Linked List is a memory efficient Doubly Linked List. Instead of each
node holding `next` and `prev` fields, it holds a field named `both`, which is
an XOR of the next node and the previous node. Implement an XOR Linked List,
which has an `add(element)` method which adds the element to the end, and a
`get(index)` method which returns the node at index.

<br />

## The solution 🎉

Now, this might seem pretty daunting as well as intriguing at the first glance.
If you wish to try your hand at the solution, I'd encourage you to go ahead and then
come back and look at the solution.

Let's start by exploring a property of the bitwise XOR operator. Refer to the
following code to figure out what's I am talking about.

```c
#include <stdio.h>

int main()
{
    int a = 4, b = 5;
    int res = a ^ b;

    printf("a = %d, b = %d, a ^ b = %d\n", a, b, res);

    // We can recover a or b from a ^ b, if we have either of b or a
    printf("a = %d\n", res ^ b);
    printf("b = %d\n", res ^ a);

    return 0;
}
```

It produces the following output:

<pre class="output">
a = 4, b = 5, a ^ b = 1
a = 4
b = 5
</pre>

Thus, we can infer from it that if we are storing the XOR of the previous and
next memory addresses, we can easily get one of the previous or next memory
locations if we have the other one. With this in mind, let's dive into the implementation.

We are going to use C++ for this question. Let's start with the class definition
of `XORNode` we are going to be using. It'll only contain the `value` and
`both` attributes, along with the getter and setter methods.

```c++
#include <stdint.h>

class XORNode {
  int value;
  uintptr_t both;  // uintptr_t is an unsigned integer capable of storing a pointer

public:
  XORNode(int val, uintptr_t addr = 0) {  // Constructor
    value = val;
    both = addr;
  }

  int getValue() {
    return value;
  }

  uintptr_t getAddr() {
    return both;
  }

  void setValue(int val) {
    value = val;
  }

  void setAddr(uintptr_t addr) {
    both = addr;
  }
};
```

We are using the `uintptr_t` type so that we can perform pointer arithmetic on
the field (Remember we need to perform the bitwise XOR operation!). Having done
this we need to create the class definition for the `XORLinkedList` class.

```c++
class XORLinkedList {
  XORNode* head;
  XORNode* tail;

public:
  // Creates an empty XOR Linked List
  XORLinkedList() {
    head = NULL;
    tail = NULL;
  }

  // Declaration of other methods
  void add(int val);
  XORNode* get(int val);
};
```

Now the fun starts! Let's get to coding the `add(element)` method;

```c++
void XORLinkedList::add(int val) {

  XORNode *prev = NULL, *curr = head, *temp;

  /* Since we are adding element to the end, let's traverse to the last element */
  if (head != NULL) {
    while ((XORNode*)(curr->getAddr() ^ (uintptr_t)prev) != NULL) {
      temp = prev;
      prev = curr;
      curr = (XORNode*)(curr->getAddr() ^ (uintptr_t)temp);
    }
  }

  /* Allocate memory and set the value of the element. The memory address field will
  be the XOR of the previous and next pointers of the newNode. The previous pointer
  of the newNode is the current last node (curr) and the next pointer is NULL */
  XORNode *newNode = (XORNode*)malloc(sizeof(XORNode));
  newNode->setValue(val);
  newNode->setAddr((uintptr_t)curr ^ (uintptr_t)NULL);

  // If the list is empty, make the newNode as the head of the linked list
  if (head == NULL && tail == NULL) {
    head = newNode;
  }

  /* The memory address field of the current last node (curr) will be the XOR of
  its previous node (prev) and the newNode */
  curr->setAddr((uintptr_t)prev ^ (uintptr_t)newNode);
  tail = newNode;

  elements++;  // We'll understand its use a little later

  cout << "Inserted node with value " << val << "\n";  // Helpful message
}
```

The comments are pretty much verbose. Now let's look at the implementation of the
`get(index)` method.

```c++
XORNode* XORLinkedList::get(int index) {

  /* Check if index is less than the number of elements */
  if (index >= elements) {
    cout << "Not as many values!" << endl;
    exit(1);
  }

  /* Element is located in the first half of the linked list,
  so start searching from the beginning of the list (Now you know
  why we were storing the number of elements in the list) */
  if (index < elements/2) {
    XORNode *prev = NULL, *curr = head, *temp;
    int curr_index = 0;
    while (curr != NULL) {
      if (curr_index == index) {
        return curr;
      }
      temp = prev;
      prev = curr;
      curr = (XORNode*)(curr->getAddr() ^ (uintptr_t)temp);
      curr_index++;
    }
  }

  /* Element is located in the last half of the linked list,
  so start searching from the end of the list */
  else {
    XORNode *prev = NULL, *curr = tail, *temp;
    int curr_index = elements-1;
    while (curr != NULL) {
      if (curr_index == index) {
        return curr;
      }
      temp = prev;
      prev = curr;
      curr = (XORNode*)(curr->getAddr() ^ (uintptr_t)temp);
      curr_index--;
    }
  }
}
```

Feel free to test out this program. You can find the source code to the solution here.
+ [XOR of numbers](https://onlinegdb.com/BJwItMA0V){:target="_blank"}
+ [XOR Linked List](https://onlinegdb.com/rJGCnfRC4){:target="_blank"}

### Bonus

Write methods to add element after any particular node, to traverse
the list in forward direction and to traverse the list in reverse direction. If
you want the solutions to this bonus problem, leave a comment below.

**PS:** Subscribe to [Daily Coding Problems](https://dailycodingproblems.com) for
more fun problems.
