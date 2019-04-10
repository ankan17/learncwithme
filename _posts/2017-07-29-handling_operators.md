---
layout: posts
serial: 9
title: Handling Operators
meta: Understanding the rules of operators
description: This tutorial discusses how operators are applied i.e., how expressions get evaluated incorporating type conversion, hierarchy and associativity of operators. And this one, people, is VERY IMPORTANT!!!
comments: true
category: c_tutorial_series
---

In any complex expression that we encounter, we need to know two things to handle the evaluation of the expression.

1. The type of the different variables involved in the expression
2. The order in which the operands get executed

Agree? These are the two factors that will influence the result of the expression. These two factors are determined by three things.

+ **Type conversion:** Handles the variation in the type of variables involved in the expression.
+ **Hierarchy of operators:** Decides the precedence of different operators in an expression
+ **Associativity of operators:** Handles the ties between two operators which have same precedence

These three topics are the subjects of discussion in this tutorial. Let’s check them out one-by-one in detail.


### Type Conversion in C

What happens when variables of different types are combined in an expression? Well, this is the situation where we encounter type conversions. The variables are promoted or demoted according to the expression and the type of the variable into which the result is being tried to be stored. Let’s see what I mean by this.

Consider the following assignment statements.

```c
int i;
float b;
i = 22.0/7;
b = 5*6;
```

In the first assignment, what happens is this: we get 3.142857 on the right hand side of the assignment operator, sine division of float and int will return float. But on the left hand side we have an int variable. We cannot store a float in an int variable. So the float gets demoted to an int, 3 in our case, which gets stored into i. The exact opposite thing happens in case of the second assignment. 5*6 evaluates to 30 which is int, but we have float on the left hand side of the assignment. Hence, 30 gets promoted to 30.000000 which gets stored in b.

There are two types of type conversions in C. Let’s discuss both of them.


#### Implicit type conversion

When the type conversion is done by the compiler on its own, it is called implicit type conversion. The compiler converts all operands into the data type of the largest operand among the ones involved in the evaluation. The sequence of rules that are applied while evaluating expressions are given below:

1. All short and char are automatically converted to int.
2. If either operand is of type long double, then others will be converted to long double and result will be long double.
3. If either of the operand is double, then others are converted to double and the result will be double.
4. If either of the operand is float, then others are converted to float and the result will be float.
5. If either of the operand is unsigned long int, then others will be converted to unsigned long int.
6. If one of the operand is long int, and the other is unsigned int, then if a long int can represent all values of an unsigned int, the unsigned int is converted to long int, otherwise, both operands are converted to unsigned long int.
7. If either operand is long int then other will be converted to long int and the result will be long int.
8. If either operand is unsigned int then others will be converted to unsigned int and the result will be, and you can probably guess it, unsigned int.

It should be noted that the final result of expression is converted to type of variable on left side of assignment operator before assigning value to it. What we saw in the above example was an example of this type of type conversion. Let’s take one more illustration to get a better idea.

```c
int i,c=10; float a=2.2,b=23.12;
i = a*b*c*(100+32)/4-3*1.1;
```

Here, in the above operation, some operands are integers whereas some are real numbers. During evaluation, all of them are promoted to real numbers and thus the result comes out to be a float. But since it is being assigned to an integer variable, its value is demoted to an int and then stored. This is a good example of an implicit type conversion.

It is important to remember that conversion of float to int causes truncation of fractional part, conversion of double to float causes rounding of digits and the conversion of long int to int causes dropping of excess higher order bits.


#### Explicit type conversion or typecasting

When the programmer explicitly does the type conversion, it is said to be explicit type conversion or typecasting. We’ll discuss typecasting with reference to a sample problem.

We’ll try to write a program which accepts two integers and prints the result of the actual division.

```c
#include <stdio.h>

int main () {
	/* Remember according to the question, we are consrained to take the input in two integers */
	int i, j;
	scanf ("%d %d", &i, &j);

	/* We know dividing the two integers is not gonna give us the
	result of the actual division; so we have to think of something else */

	/* Approach 1: Store at least one of the inputs as float so that the result is a float */
	float a = i;
	float res = a/j;
	printf("The result of division is %f", res);

	return 0;
}
```

Though this approach looks good enough, there is one problem with this approach. This is not the most memory efficient solution. We are wasting memory by using an extra float to store the same number that we have already stored in an integer variable.

Let’s see the second approach which is type-casting.

```c
#include <stdio.h>

int main () {
	/* According to the constraint, we are
	taking the input in two integers */
	int i, j;
	scanf ("%d %d", &i, &j);

	/* Integer division is not the solution */

	/*Approach 2: The magic of type-casting */
	printf ("The result of division is %f\n", (float)i/j);

	return 0;
}
```

No memory wastage. Very simple. This is typecasting. What we have to do is just write the data-type we want to convert that int into, within parenthesis. And what happens is the int is temporarily promoted to float while doing the operation and hence there is no memory wastage. And this is the most memory-efficient solution.


### Hierarchy of operations in C

What happens when there are more than one operators in an expression? Which one gets executed first? For example, does the expression 2*3+6 correspond to (2*3)+6 or 2*(3+6)? To answer this one, we need to understand the concept of ‘hierarchy of operations’. **The priority or precedence in which the operations in an arithmetic expression are performed is called the hierarchy of operations.**

+ The operators having the highest order of precedence are evaluated first in an expression. The general hierarchy of most common types of operators is: **Arithmetic > Relational > Logical > Assignment > Comma.** Among the arithmetic operators, the **%, / and *** operators enjoy higher priority over + and -.

+ The parenthesized portion of the expression gets evaluated first. Within the parenthesis, the same hierarchy of operators mentioned above is applicable. Also, if there are more than one set of parenthesis, the operations within the innermost parenthesis would be performed first, followed by the operations within the second innermost and so on.

+ Instead of relying on the hierarchy of operators, it is better to use parenthesis carefully such that we can have the exact order of evaluation that we want. But make sure to balance the left and right parenthesis correctly.

Perhaps an example will clear things up a lot. Let’s look at the following expression and see how it gets evaluated.

<pre class="output"> i = 2*3/4+4/4+8-2+5/8 </pre>

Stepwise evaluation of the above expression can be visualized as follows.

<pre class="output"> i = 2*3/4+4/4+8-2+5/8
 i = 6/4+4/4+8-2+5/8	  operation: *
 i = 1+4/4+8-2+5/8        operation: /
 i = 1+1+8-2+5/8          operation: /
 i = 1+1+8-2+0	          operation: /
 i = 2+8-2+0              operation: +
 i = 10-2+0               operation: +
 i = 8+0                  operation: -
 i = 8                    operation: + </pre>

All operators in C are ranked according to their precedence. But there are as many as some 45 operators in C. It is not possible to remember the precedence of all these operators (unless you are some crazy geek!). But there is a pattern which can help us remember the precedence of the most important of the operators which will be enough for our programming needs. A list of all operators arranged according to their precedence will be given towards the end of this tutorial which will help you understand the pattern and you guys are the best judge of how to remember the important portions of the table.


### Associativity of operators

We have already seen that %, / and * enjoy higher precedence over + and – but this also means %, / and * have the same precedence. So what happens when operators having same precedence are encountered in an expression? How does the tie get broken? Associativity of operators acts as the tie-breaker in this case.

Associativity indicates in what order do the operators of equal precedence in an expression get evaluated. Associativity can be of two types – Left to Right or Right to Left. Left to Right associativity means that the left operand should not be, let’s say, confusing or unevaluated. Similar is the case for Right to Left associativity where the right operand must be unambiguous or non-confusing.

As always let’s take an example to help us understand about associativity in a better way. Consider the expression a = 3/2*4. Here, * and / have same precedence. Both enjoy Left to Right associativity.  The ambiguity of operators is shown below.

<div class="table-container">

    <table class="associativity">
        <tr>
            <th> Operator </th>
            <th> Left operand </th>
            <th> Right operand </th>
            <th> Remark </th>
        </tr>
        <tr>
            <td> / </td>
            <td> 3 </td>
            <td> 2 or 2*4 </td>
            <td> Left operand is unambiguous, Right is not </td>
        </tr>
        <tr>
            <td> * </td>
            <td> 3/2 or 2 </td>
            <td> 4 </td>
            <td> Right operand is unambiguous, Left is not </td>
        </tr>
    </table>

</div>

Since only / has the left operand unambiguous (which is the necessary condition for L to R associativity), it gets evaluated first. There is another way of understanding the concept of associativity. There are two possibilities in this case of how the expression gets evaluated.

<div class="table-container">

    <table class="associativity">
        <tr>
            <th> Expression </th>
            <th> Evaluated As</th>
            <th> Intermediate step </th>
            <th> Result </th>
        </tr>
        <tr>
            <td> a = 3/2*4 </td>
            <td> a = (3/2) * 4 </td>
            <td> a = 1*4 </td>
            <td> a = 4 </td>
        </tr>
        <tr>
            <td> a = 3/2*4 </td>
            <td> a = 3/(2*4) </td>
            <td> a = 3/8 </td>
            <td> a = 0 </td>
        </tr>
    </table>

</div>

We get two different results from the two different possibilities, so which one of them is correct? If we try to print this result in a compiler, we’ll see that the first possibility is the correct one. This shows that / and * have L to R associativity or in simple words, they get evaluated from left to right in an expression.

Let us consider one more expression a=b=3. Here there are two equality operators and both have same precedence and both have R to L associativity. Hence, the expression gets evaluated from right to left.

<div class="table-container">

    <table class="associativity">
        <tr>
            <th> Expression </th>
            <th> Evaluated As </th>
            <th> Intermediate step </th>
            <th> Result </th>
        </tr>
        <tr>
            <td> a = b = 3 </td>
            <td> a = (b=3) </td>
            <td> a = 3 </td>
            <td> a = 3 <br> b =3 </td>
        </tr>
    </table>

</div>

### Precedence table of all operators in C

**Operators in bold indicate important operators used frequently**

<div class="table-container">

    <table class="operators-associativity">
        <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Operator</th>
            <th>Associativity</th>
        </tr>
        <tr>
            <td rowspan="5">Unary Postfix</td>
            <td>Function Expression</td>
            <td>()</td>
            <td rowspan="5">Left to Right</td>
        </tr>
        <tr>
            <td>Array Expression</td>
            <td>[]</td>
        </tr>
        <tr>
            <td>Structure Operator</td>
            <td>-></td>
        </tr>
        <tr>
            <td>Structure Operator</td>
            <td>.</td>
        </tr>
        <tr>
            <td><strong>Postfix increment/decrement</strong></td>
            <td><strong>++ --</strong></td>
        </tr>
        <tr>
            <td rowspan="8">Unary Prefix</td>
            <td>Unary plus/unary minus</td>
            <td>+ -</td>
            <td rowspan="8">Right to Left</td>
        </tr>
        <tr>
            <td><strong>Prefix increment/decrement</strong></td>
            <td><strong>++ --</strong></td>
        </tr>
        <tr>
            <td>One’s complement</td>
            <td>~</td>
        </tr>
        <tr>
            <td><strong>Negation</strong></td>
            <td><strong>!</strong></td>
        </tr>
        <tr>
            <td>Address of</td>
            <td>&</td>
        </tr>
        <tr>
            <td>Value at address</td>
            <td> * </td>
        </tr>
        <tr>
            <td>Typecast</td>
            <td>(type)</td>
        </tr>
        <tr>
            <td>Sizeof</td>
            <td>sizeof</td>
        </tr>
        <tr>
            <td rowspan="2">Arithmetic</td>
            <td><strong>Multiplicative</strong></td>
            <td><strong> % / * </strong></td>
            <td rowspan="2">Left to Right</td>
        </tr>
        <tr>
            <td><strong>Additive</strong></td>
            <td><strong>+ -</strong></td>
        </tr>
        <tr>
            <td>Shift</td>
            <td>Left shift/Right shift</td>
            <td><< >></td>
            <td>Left to Right</td>
        </tr>
        <tr>
            <td rowspan="2">Relational</td>
            <td><strong>Inequality</strong></td>
            <td><strong> < <= > >= </strong></td>
            <td rowspan="2">Left to Right</td>
        </tr>
        <tr>
            <td><strong>Equality</strong></td>
            <td><strong> == != </strong></td>
        </tr>
        <tr>
            <td rowspan="3">Bitwise</td>
            <td>Bitwise AND</td>
            <td>&</td>
            <td rowspan="3">Left to Right</td>
        </tr>
        <tr>
            <td>Bitwise XOR</td>
            <td>^</td>
        </tr>
        <tr>
            <td>Bitwise OR</td>
            <td>|</td>
        </tr>
        <tr>
            <td rowspan="2">Logical</td>
            <td><strong>Logical AND</strong></td>
            <td><strong>&&</strong></td>
            <td rowspan="2">Left to Right</td>
        </tr>
        <tr>
            <td><strong>Logical OR</strong></td>
            <td><strong>||</strong></td>
        </tr>
        <tr>
            <td>Conditional</td>
            <td>Conditional</td>
            <td>?:</td>
            <td>Right to left</td>
        </tr>
        <tr>
            <td rowspan="4">Assignment</td>
            <td><strong>Assignment</strong></td>
            <td><strong>=</strong></td>
            <td rowspan="4">Right to Left</td>
        </tr>
        <tr>
            <td>Multiplicative Assignment</td>
            <td>%= /= *=</td>
        </tr>
        <tr>
            <td>Additive Assignment</td>
            <td>+= -=</td>
        </tr>
        <tr>
            <td>Bitwise Assignment</td>
            <td>&= ^= |= <br> <<= >>=</td>
        </tr>
        <tr>
            <td>Comma</td>
            <td>Comma</td>
            <td>,</td>
            <td>Right to Left</td>
        </tr>
    </table>

</div>

Now let us combine all the three things that we have seen till now and try to evaluate a complex expression.

##### Problem statement:

Evaluate **res = x*x+2*x+1/2*x*x+x+1;** (x = 3.5, assume res to be an int)

##### Solution:

Since one of the operands on the right hand side of the assignment operator is float, all other operands will be promoted to float. Also, remember that * and / have higher precedence over + and finally the assignment operator takes precedence. Also remember that /, * and + have Left to Right associativity. Now a step by step sequence of the evaluation can be visualized as follows.

<pre class="output" style="width: 600px;"> res = x*x+2*x+1/2*x*x+x+1
 res = 3.5*3.5+2.0*3.5+1/2*3.5*3.5+3.5+1.0
 res = 12.25+2.0*3.5+1/2*3.5*3.5+3.5+1.0    operation: *
 res = 12.25+7.0+1/2*3.5*3.5+3.5+1.0        operation: *
 res = 12.25+7.0+0*3.5*3.5+3.5+1.0          operation: /
 res = 12.25+7.0+0.0*3.5*3.5+3.5+1.0        operation: (float)
 res = 12.25+7.0+0.0*3.5+3.5+1.0            operation: *
 res = 12.25+7.0+0.0+3.5+1.0                operation: *
 res = 19.25+0.0+3.5+1.0                    operation: +
 res = 19.25+3.5+1.0                        operation: +
 res = 22.75+1.0                            operation: +
 res = 23.75                                operation: +
 res = 23                                   operation: (int) </pre>

Notice how every operand except the 1 and 2 involved in the division were converted to float. The 1 and 2 were however not promoted to float since the operation between them (division) only consists of those two integers. Hence integer division took place. Their result however was promoted to float since it is in multiplication with a float. Thus, the result of the above arithmetic expression, which was somewhat complex in nature, is 23.

This concludes the ninth tutorial. Hope you have learnt something out of it and had fun while doing so. We’ll move to control instructions next, beginning with decision control instruction, but before that we are left with one more thing to learn. How to perform input and output. Well, we have seen some of it. But great details lie underneath. That’s what we’ll learn in the upcoming tutorial. So, stay tuned!
