---
layout: daily_problems
title: Count Unival Subtrees
comments: true
category: daily_problems
label: easy
---

## Problem statement
{:#problem_statement}

A unival tree (which stands for "universal value") is a tree where all nodes
under it have the same value. Given the root to a binary tree, count the
number of unival subtrees.

For example, the following tree has 5 unival subtrees:

<pre class="output">
     1
    / \
   1   0
      / \
     1   0
    / \
   1   1
</pre>

<br />

## The solution 🎉

Well, this is a fairly straight forward problem, once you begin to think about it.
But I wanted to do a tree or graph problem, so here it is. Let's mark the unival
subtrees for the above problem.
<pre class="output">
     1
    / \
  |1|  0
      / \
    |1| |0|
    / \
  |1| |1|
</pre>

Let's try more examples to gain a bit of intuition.
<pre class="output">
    |1|                1
    / \               / \
  |1| |1|           |0| |1|
      / \               / \
    |1| |1|           |1| |1|
    / \                   / \
  |1| |1|               |1| |1|
</pre>

Looking at these examples, one can easily figure out that all the leaf nodes are
unival subtrees, and this is quite basic if you think about it. But which internal
nodes can be the roots to unival subtrees? The internal nodes which have the same value as
their left and right children (if they exist) and its value is equal to the values
of the left and right children (again, if they exist) will be roots to unival subtrees.
This gives us a recursive solution to our problem. With this idea in mind, let's
get to the coding part. I am assuming we have a node class definition as follows.

```c++
class Node {
    int val;
    Node* left;
    Node* right;

public:
    Node(int value) {
        val = value;
        left = NULL, right = NULL;
    }
    void setChild(Node* leftnode, Node* rightnode) {
        left = leftnode, right = rightnode;
    }
    int getVal() {
        return val;
    }
    Node* getLeftChild() {
        return left;
    }
    Node* getRightChild() {
        return right;
    }
};
```

It'll be easier to check if a particular tree or subtree is unival than counting
the total number of unival subtrees, so let's do that first.

```c++
bool isUnivalTree(Node* node) {

    // Base case
    if (node->getLeftChild() == NULL && node->getRightChild() == NULL) {
        return true;
    }

    bool isUnival = true;
    if (node->getLeftChild() != NULL)
        isUnival = isUnivalTree(node->getLeftChild(), count) &&
                   node->getVal() == node->getLeftChild()->getVal() &&
                   isUnival;
    if (node->getRightChild() != NULL)
        isUnival = isUnivalTree(node->getRightChild(), count) &&
                   node -> getVal() == node->getRightChild()->getVal() &&
                   isUnival;

    return isUnival;
}
```

Now we can modify this method with a slight trick to let us in on the count.
Check this out.

```c++
bool isUnivalTree(Node* node, int *count) {

    // Base case
    if (node->getLeftChild() == NULL && node->getRightChild() == NULL) {
        *count += 1;
        return true;
    }

    bool isUnival = true;
    if (node->getLeftChild() != NULL)
        isUnival = isUnivalTree(node->getLeftChild(), count) &&
                   node->getVal() == node->getLeftChild()->getVal() &&
                   isUnival;
    if (node->getRightChild() != NULL)
        isUnival = isUnivalTree(node->getRightChild(), count) &&
                   node -> getVal() == node->getRightChild()->getVal() &&
                   isUnival;

    // Increase the count if it forms a unival subtree
    if (isUnival) {
        *count += 1;
    }

    return isUnival;
}
```

This method takes an extra argument -- an integer pointer, and returns to us
the count of unival subtrees in that pointer. Neat, isn't it?
This concludes our today's problem. There's no bonus question today, but do
checkout the source code for this program [here](https://onlinegdb.com/SyNk0ixJH){:target="_blank"}.
