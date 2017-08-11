---
layout: posts
serial: 11
title: Making Decisions
meta: Decision Control Statements in C
description: Discover everything about making decisions in your C program -- the <strong>if</strong> statement, the <strong>if-else</strong> statement, the <strong>conditional operator</strong> and much more
comments: true
category: c-tutorial-series
---

Till now, we have created programs in which every line is **sequentially executed** one after the other. But that will not always be the case with all our programs that we'll need to create. There will be times when we will require that one set of statements be executed only if a certain condition is fulfilled and an entirely different set of statements be executed otherwise or if the condition is not fulfilled we may not want to do anything. This is the premise of this tutorial. There must be something by which we can achieve this. And not so surprisingly, there is. This is where **Decision Control Instructions** come into play. Decision control instructions are those set of instructions that allow us to make some sort of decisions in our program and do things accordingly.

A decision control instruction in C can be implemented using any of the following:

1. The **if** statement
2. The **if-else** statement
3. The **conditional operator**

### The *If* statement

In C, we use the if keyword to let the compiler know that we wish to execute a set of statements only if a certain condition is fulfilled. The general form of if statement would look this:

<pre class="output">
if (<code class="highlighter-rouge">this condition is true</code>) {
    execute whatever is
    written within these
    pair of braces
}
</pre>

A few things need to be noted here.

+ How would you define a condition to the computer? Well, let's try to think about it from the very basic level. A condition is something that evaluates to either true or false. In computer's world, we have 0 representing falsity and any non-zero number representing truth. Usually we would use the **relational operators** to express any condition. The relational operators let us check equality or inequality of two items and also if one is greater or lesser than the other.

+ The condition gets evaluated to 0 if false and 1 if true. If the evaluation results in 1, the statements within the pair of braces that follow get executed. But if the result is 0, the program skips past it.

+ We generally use relational operators in the condition part of the if statement but we can use any valid expression that can get evaluated, including mathematical operations. Following are the examples of some valid if statements --

    ```c
    if (5+5 == 10)            /* True */
    if (5*5 != 10)            /* True */
    if (5 < 3)                /* False */
    if (5 > 3)                /* True */
    if (5+5*2)                /* True */
    if (5-5)                  /* False */
    int a=0; if (a = 10)      /* True */
    int a=10; if (a = 0)      /* False */
    if (-5)                   /* True */
    if ("0")                  /* True */
    if ("")                   /* True */
    if ("\0")                 /* True */
    if ('\0')                 /* False */
    ```
+ A common error which most people commit very frequently is using the assignment **=** operator instead of the equality **==** operator in the condition. if **(a=3)** means **if(3)** to the compiler which is true (because 3 is non-zero) even if the value of a previously was not 3. This can lead to logical error as it almost always evaluates to true. So, you  must keep it in mind to avoid this silly mistake.

+ Always use the parenthesis to enclose the condition statement and do not enclose the condition within quotes because that always gets evaluated to true, no matter what the condition is.

+ Enough about the condition part, let's now talk about what happens when the condition gets fulfilled. What happens is that whatever is written within the pair of braces following it gets executed. This can be any valid C instruction, but not type declaration instruction.

+ What happens when you miss the braces? Well, being the obedient language C is, it does not throw any errors on you. But in that case, only the first line is considered as part of the if statement. The other instructions that follow, get executed whether or not the condition gets fulfilled. For example, check out the difference between the outputs of the following code snippets.

    ```c
    if (5 < 3) {
       printf ("Line 1");
       printf ("Line 2");
    }

    /* No output */
    ```

    ```c
    if (5 < 3)
       printf ("Line 1");
       printf ("Line 2");

    /* Output: Line 2 */
    ```

    You can make use of the above property of if when you have only one statement to be executed if any condition is met. You can skip the pair of braces in that case.

+ Never use a semi-colon ; after the condition part, because ; acts as statement terminator and the if statement gets terminated right there and the block of statement that follows, is executed even if the condition is not fulfilled. For example --

    ```c
    /* What you write */

    if (condition is true);
        do this;
    ```

    ```c
    /* What the compiler interprets */

    if (condition is true)
        ;
    do this; //See that this line is executed regardless the result of the if statement
    ```

Let's see a silly program that checks if a non-zero number is positive or negative.

```c
#include <stdio.h>

int main() {

   int num;
   printf("Enter a non-zero number: ");
   scanf("%d", &num);

   if (num > 0)
      printf("Positive");
   if (num < 0)
      printf("Negative");

   return 0;
}
```

I am telling you that this code can be better-written. When a non-zero number is not greater than 0, we know that it is less than 0 but in this program we are checking that once again to see if the number is less than 0 even when we know that it is not greater than 0. Even when a number is greater than 0, we are also needlessly checking if it is less than 0. This problem can be overcome if we use the **if-else** construct in place of only if statement.

### The *If-Else* statement

Till now, we have seen that we can only get some statements executed only if a certain condition is met. Using the if-else construct, we can get another set of statements executed when the condition is not met i.e., when the condition is evaluated to 0. The general form of the if-else construct looks something like this.

<pre class="output">
if (<code class="highlighter-rouge">condition</code>) {
    execute this set
    of statements
} else {
    execute this other
    set of statements
}
</pre>

The block of code after the **if** gets executed if the condition is met and the block of code after the **else** gets executed otherwise.
Again we need to keep a few things in mind about the if-else statement.

+ The use of braces is similar for both the if and the else block and is similar to what we have seen for if statement earlier. We can skip the braces if we need to get only one statement executed.

+ No semi-colon ; shall follow the else keyword, otherwise all the statements of the else block get executed even if the condition in the if part evaluates to true.

+ There can be an if block without a corresponding else but not vice-versa. This will throw a syntax error.

Let's re-write the above program using if-else this time.

```c
#include <stdio.h>

int main() {

    int num;
    printf("Enter a non-zero number: ");
    scanf("%d", &num);

    if (num > 0)
        printf ("Positive");
    else
        printf ("Negative");

    return 0;
}
```

This is more efficient and better-written than the previous version.

### Nested if-else's

We can write an entire if-else construct within the if block or the else block. This is called '**nesting of if's**'. This can be seen in the following piece of code, in which we do a brief variation of the program we have created before.

```c
#include <stdio.h>

int main() {
    int num;
    printf("Enter a non-zero number: ");
    scanf("%d", &num);

    if (num > 0) {
        if (num > 10)
            printf("Positive and greater than 10");
        else
            printf("Positive but less than 10");
    }
    else
        printf("Negative");

    return 0;
}
```

A similar nesting can be done in the else block also. We can also nest another if-else construct within the nested if-else. There is no limit on how deeply the if's and else's can be nested.

Let's look at a program which asks the user for an input of marks of some subject and prints his division according to some predefined conditions. We'll use nested if-else approach.

```c
#include <stdio.h>

int main() {
    int marks;
    printf("Enter marks of Mathematics: ");
    scanf("%d", &marks);

    if (marks >= 80)
        printf("First division");
    else {
        if (marks >= 60)
            printf("Second division");
        else {
            if (marks >= 40)
                printf("Third division");
            else
                printf("You failed!");
        }
    }

    return 0;
}
```

You can easily see that we have a few problems in this program.

+ As the number of conditions increases, so does the level of nesting and as such the program keeps on getting indented to the right.
+ It may happen that you forget to match a corresponding if-else.
+ All the corresponding braces need to be matched correctly, an error may occur otherwise.

These problems can be resolved if we use the logical operators.

### Logical Operators in *If-Else*

As we have seen previously, there are three logical operators in C, viz., **AND**, **OR** and **NOT**, among which **AND** and **OR** are used to join two conditions, whereas NOT is used only on one single condition.

+ When **AND** is used, both the conditions that are used with **AND** need to be true, only then the whole expression evaluates to true, false otherwise. For example: ((5>3) && (4==2+2)) is true but ((5>3) && (4==3)) is false.

+ When **OR** is used, even if either of the conditions used with **OR** is true, the whole expression evaluates to true, false only if both conditions are false. For example: ((5>3) \|\| (4==3)) is true but ((5<3) \|\| (4==3)) is false.

+ **NOT** is used to negate any condition. For example: (!(5<3)) is true but (!(4==2+2)) is false.

Let's re-write the above program using logical operators.

```c
#include <stdio.h>

int main() {
    int marks;
    printf("Enter marks of Mathematics: ");
    scanf("%d", &marks);

    if (marks >= 80)
        printf("First division");
    if ((marks < 80) && (marks >= 60))
        printf("Second division");
    if ((marks < 60) && (marks >= 40))
        printf("Third division");
    if (marks < 40)
        printf("You failed!");

    return 0;
}
```

See that our problems have been solved. No unnecessary indentation, no need to carefully match the if-else ladder and no need to match corresponding opening and closing braces. But we have run into a new problem. The execution time of the program has increased because even if the first condition turns out to be true, all the conditions are checked. We'll resolve this problem using the else if clause.

### The *else if* clause

The above program can be re-written using the else if clause as follows.

```c
#include <stdio.h>

int main () {
    int marks;
    printf ("Enter marks of Mathematics: ");
    scanf ("%d", &marks);

    if (marks >= 80)
        printf ("First division");
    else if (marks >= 60)
        printf ("Second division");
    else if (marks >= 40)
        printf ("Third division");
    else
        printf ("You failed!");

    return 0;
}
```

Using the else if clause, not only have we got rid of the indentation problem, but also we have reduced the execution time of the program since each subsequent else if checking is done only if the previous *if* or *else if* fails. The last else goes on to work only when all the above conditions fail. Also we do not need any logical operators in this program anymore.

### The Conditional Operator

We can do pretty much every program that requires conditional instructions to be used using the concepts we have learnt already. But C provides us with a nice shorthand way of writing conditional statements, which is the conditional operator.

The conditional operator is a ternary operator, meaning, it requires three operands. The general form of the conditional operator is as follows.

<pre class="output">expression 1 ? expression 2 : expression 3</pre>

which means: "**if expression 1 is true (meaning if it evaluates to non-zero), then we get the value returned from evaluating expression 2, otherwise we get the value from expression 3**". An example will clear things up. Doesn't it always!

```c
int x, y;
x = 3;
y = (x > 5 ? 3*5+4 : 5*4+3);
```

The above code can be re-written using if-else as follows.

```c
int x, y;
x = 3;
if (x > 5)
    y = 3*5+4
else
    y = 5*4+3
```

Both the codes mean the same thing. Now you can easily understand what the above code, using conditional operator, meant. The following points may be noted about the conditional operator.

+ It is not necessary to use only arithmetic expressions in conditional operators. We can even print using conditional operator, or we can use conditional operator in `printf()`. For example,

    ```c
    int i;
    scanf("%d", &i);
    i == 3 ? printf("True") : printf("False");
    ```

    ```c
    char c;
    c = 'c';
    printf("%c", (c == 'c' ? 'A' : 'a'));
    ```

+ Conditional operators can also be nested. For example, look at the following code snippet which is designed to find the maximum of three numbers.

    ```c
    int max, a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    max = (a > b ? (a > c ? a : c) : (b > c ? b : c);
    ```

+ It so happens that you don't wanna get into the hierarchy problem of different operators. To avoid getting into troubles, it is better to use parenthesis with each expression of the conditional operator. For example, look at the following piece of code.

    ```c
    int x, a=3, b=2;
    a > b ? x=a : x=b;
    ```

    Well, this can cause troubles for you. You'll get an error if you run this code. The error says 'Lvalue required'. This means an expression is being assigned the value of a variable. Didn't understand? Let me try once more. The above statement would be interpreted by the compiler as **(a>b?x=a:x)=b**. See that on the left-hand side we have an expression whereas on the right-hand side we have a variable. This happens because the conditional operator has higher precedence than the assignment operator and hence the compiler tries to evaluate the conditional statement first and in doing so, creates are error out of an innocent-looking instruction. Hence, we might wanna correct it as

    ```c
    (a>b) ? (x=a) : (x=b);
    ```

    Even **a>b?x=a:(x=b)** works just fine, but the above one looks more clean and precise. So, why not use parenthesis if it helps to increase the code readability!

+ One limitation that the conditional operator offers is that we can use only one instruction as the **if-block** and **else-block** of the equivalent if-else expression. In real life programming situations, we'll encounter only few situations where we'll need only one instruction for the if or the else part. Nevertheless, if we do encounter such situations, conditional operator provides a quite nice shorthand way of writing things.

I think we have covered everything we'd like to learn about decision control instructions. We'd need to strengthen our concepts about decision control by doing some programming exercises and we'll surely do that before moving on to loop control instructions.
