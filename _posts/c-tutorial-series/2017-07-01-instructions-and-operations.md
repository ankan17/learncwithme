---
layout: posts
serial: 8
title: Instructions and Operations
meta: Learning the grammar of C
description: From data type, we move on to discuss about the types of instructions in C, operands and operators and different types of operators available in C
comments: true
category: c-tutorial-series
---

A paragraph is nothing but a set of meaningful lines written sequentially, analogous to that, a program is a mere sequential collection of instructions written one after the other. There are different types of instructions which help us achieve different tasks in a program. To write a program we need to fully know about instructions. So let’s explore instructions in some detail.


### Instructions and their types

It is difficult to describe an instruction, but I’ll try my best. An instruction at high-level can be defined as a coherent and syntactically and semantically correct collection of tokens used to achieve a particular task in a program. Too much to digest? Well, that was the formal definition. Let me break it down. We already know tokens. They are equivalent to words in English grammar. Just like a sentence is a meaningful collection of words which is grammatically correct and makes some sense, so is an instruction. It is a meaningful collection of tokens which does not violate the grammar of the language (yes, even programming languages too have grammar!) and makes some sense to the compiler.

There are basically three types of instructions in C:

+ **Type declaration instructions:** This type of instruction is used to declare the type of variables to be used in the program.

+ **Arithmetic (operational) instructions:** This type of instruction is used to perform arithmetic operations on constants and variables.

+ **Control instructions:** This type of instruction is used to control the flow of execution of various statements of various statements in a C program.

We’ll focus on the first two types of instructions in this tutorial since they are pretty elementary and we’ll need to use them in pretty much all of our programs. All the programs that we’ll write will certainly contain type declaration instructions and arithmetic (can be broadly called operational) instructions. We’ll take up the third type of instruction i.e., control instructions, from the next tutorial. They form an integral part of programs that we’ll create in future.


### Type Declaration Instructions

While writing a program, we’ll often need to use variables. Any variable used in the program  must be declared before using it in any statement. This can be achieved using type declaration instructions. All such type declaration instructions are to be written at the beginning of the main().

Some essential properties of type declaration instruction is being illustrated below.

+ Different types of variables are to be certainly declared in different lines, but we can define multiple variables of same type in one single line if we want.

    ```c
    int i, j;
    float a, b;
    ```

+ Giving a initial value to the variable is called initializing the variable. We can choose to initialize a variable if need be, otherwise it is initialized with some random value by the compiler (which is called as garbage value). We can also use an expression in the initializations.

    ```c
    int i=8, j=15;
    float a=1.5, b=2*3.14;
    ```

+ We can use a previously declared variable to initialize other variables. In this case, the order of declaration becomes important.

    ```c
    /* This is fine */
    int i=10, j=i;
    float a=3.14, b=2*a;

    /* However this will not work */
    float b=2*a, a=1.5;
    ```

+ One special case of the previous point can be illustrated using the code snippet given below.

    ```c
    /* This will work */
    int i,j;
    i=j=10;

    /*However the following won’t work */
    int i=j=10;
    ```

    The second type of declaration will not work because we are trying to assign the value of j to i but the compiler does not yet know about j since it has not been previously declared.


### Arithmetic or Operational Instructions

Though we are calling this category of instructions as arithmetic instructions, though in a broad sense, we can call this as operational instructions because we’ll be performing operations in this category of instructions, which are not only arithmetic in nature. **An operation consists of operands and operators. An operand is that entity on which the operation is performed.** These are variables or constants. We have already learnt about them. On the other hand, **operators are those entities using which the operation is performed.** Let’s try to learn about them.


### Types of operators

C programming language supports various types of operators to perform various operations. For better understanding of these operators, these can be categorized as under.

+ **Arithmetic Operators**
+ **Relational Operators**
+ **Logical Operators**
+ **Bitwise Operators**
+ **Assignment Operators**
+ **Miscellaneous Operators**


#### 1. Arithmetic Operators

An arithmetic operator performs mathematical operations such as addition, subtraction and multiplication on numerical values (constants and variables). They may be unary (operating on one operand) or binary (operating on two operands). Following are the arithmetic operators that are available to us in C programming language.

<table>
    <tr>
        <th> Type </th>
        <th> Operators </th>
        <th> Description </th>
    </tr>
    <tr>
        <td rowspan="4"> Unary </td>
        <td> + or unary plus </td>
        <td>Gives positive sign to a number </td>
    </tr>
    <tr>
        <td> - or unary minus </td>
        <td> Gives negative sign to a number </td>
    </tr>
    <tr>
        <td> ++ or increment operator </td>
        <td> Increases the value of its operand by 1 </td>
    </tr>
    <tr>
        <td> -- or decrement operator </td>
        <td> Decreases the value of its operand by 1</td>
    </tr>
    <tr>
        <td rowspan="5"> Binary </td>
        <td> + or addition </td>
        <td> Adds the operands </td>
    </tr>
    <tr>
        <td> - or subtraction </td>
        <td> Subtracts the operands </td>
    </tr>
    <tr>
        <td> * or multiplication </td>
        <td> Multiplication of operands </td>
    </tr>
    <tr>
        <td> / or division </td>
        <td> Division of operands </td>
    </tr>
    <tr>
        <td> % or modulo division </td>
        <td> Gives the remainder after division </td>
    </tr>
</table>

A C arithmetic statement can be of three types. These are as follows:

1. Integer mode arithmetic statement – This is an arithmetic statement in which all operands are integers.

    ```c
    int i=1,j=2,k=30,num;
    i = i+1;
    num = i*j+k-20;
    ```

2. Real mode arithmetic statement – This is an arithmetic statement in which all operands are real numbers.

    ```c
    float a,b=2.2,c=3.14,xyz;
    a = b+13.345/4.5*0.3432;
    xyz = a*b+c/20.0;
    ```

3. Mixed mode arithmetic statement – This is an arithmetic 	statement in which some of the operands are integers whereas some are real numbers.

    ```c
    float a,b=2.2,c=3.14,xyz;
    int i=1,j=2;
    a = i+13.345/4.5*0.3432;
    xyz = j*i+c/b;
    ```

Though an arithmetic instruction looks harmless enough, yet one can commit very simple mistakes. Keeping the following subtle points in mind will help avoid those mistakes.

+ There can be only one variable to the left of =. That is, z = k*i is legal but k*i = z is not.

+ The % (modular division) operator returns the remainder on dividing one integer with another and as such, it cannot be applied on floats. Also, it is interesting to note that the sign of remainder is always same as the sign of the numerator while using %. For example, -5 % 2 is -1 whereas 5 % -2 is 1.

+ No arithmetic operator is assumed to be present. It must be mentioned explicitly. For example, in our usual arithmetic statement, we may write a = xy, but its equivalent C statement would be a = x*y.

+ In normal arithmetic, we can form expressions using [] and {}, but these are not allowed in arithmetic expressions in C. Arithmetic expressions in C must only consist of () in place of the [] and {} we use in normal arithmetic expressions. Let us consider the following expression.


    ![image-8-1]({{site.baseurl}}/images/posts/{{page.serial}}/1_mathematical_expression.png)

    Its equivalent C expression would look like **((2*B*Y)/(d+1)-x/(3*(z+y)))**.

+ An arithmetic operation in integer mode will always yield an integer while performing an arithmetic operation on real or mixed mode arithmetic statement yields a real number. Though you can get away with addition, subtraction and multiplication, but division can give you the real pain in the rear. For example, 4/10 = 0 but 4.0/10 = 4/10.0 = 4.0/10.0 = 0.4. Division in integer mode arithmetic statement yields the quotient while in real or mixed mode arithmetic statements, it yields the result of true division.

+ Unlike other high-level languages, C does not have any operator for performing exponentiation operation. But this can be achieved using a library function pow (base, exponent) which is defined in the header file math.h. Hence, we have to write #include<math.h> at the beginning of our program when we wish to use the pow function. Subsequently, we can use the pow function as pow(3,2) which means 3 raised to the power 2. Let’s look at the following code snippet to see how pow can be used in our programs.


    ```c
    #include <stdio.h>
    #include <math.h>

    int main () {
      int a;
      a = pow (8,3);
      printf (“%d\n”, a);
      return 0;
    }
    ```

**Increment/Decrement operators:** Except the increment or decrement operators, all other operators can work on variables as well as constants while the increment/decrement operators work only on variables. The increment/decrement operators can be of two types:

+ **Prefix increment/decrement operator:** Here, the operator precedes the 	operand. For example, ++i, --j, etc. When this operator is used, the 	value of operand is increased first and then it’s value is used 	subsequently. For example, the following code will output 6.

    ```c
    int i=5;
    printf (“%d”, ++i);
    ```

    This is because here the value of i is incremented to 6 first and then used in the printf() statement.

+ **Postfix increment/decrement operator:** Here, the operator succeeds 	the 	operand. For example, i++, j--, etc. When this operator is 	used, the value of operand is used first and then it’s value is 	incremented. For example, the following code will output 5.

    ```c
    int i=5;
    printf (“%d”, i++);
    ```

    This is because here the value of i is first used in the printf() statement and then incremented. If we again try to print the value of i, we’ll get 6 because it has been incremented by 1 thereafter.


#### 2. Relational Operators

Relational operators are used to relate two values (variables or constants). If the relationship is true, it returns 1 and if it is false, it returns 0. They are mainly used in decision making. The relational operators that are available to us in C programming language are being mentioned in the following table.

| Operator | Meaning                   | Example          |
| -------- | ------------------------- | ---------------- |
| ==       | Equality                  | 5 == 3 returns 0 |
| !=       | Not equals to             | 5 != 3 returns 1 |
| <        | Less than                 | 5 < 3 returns 0  |
| >        | Greater than              | 5 > 3 returns 1  |
| <=       | Less than or equals to    | 5 <= 3 returns 0 |
| >=       | Greater than or equals to | 5 >= 3 returns 1 |


#### 3. Logical Operators

Logical operators are used by computers to make decisions. Any expression containing logical operator usually returns 0 or 1, depending upon whether the result evaluates to false or true respectively. Following are the logical operators in C programming language.

| Operator            | Meaning of operator                                                               | Example                                                           |
| ------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| && or Logical AND   | True when all operands are true, <br> false otherwise                             | If a = 5 and b = 2, then ((a==5) && <br> (d<5)) yields 1 (True)   |
| \|\| or Logical OR  | True when at least one of the operands <br> is true, false otherwise              | If a = 5 and b = 2, then ((a==5) \|\| <br> (d>5)) yields 1 (True) |
| ! or Logical NOT    | Negates the operand, meaning yields false <br> if operand is true, true otherwise | If a = 5, then !(a==5) yields 0 (False)                           |


#### 4. Bitwise Operators

These are used to perform bit-level operations which will be discussed in future. Learning about bitwise operators are not required as of now. The bitwise operators available in C programming language are being listed here.

| Operator | Meaning                     |
| -------- | --------------------------- |
| &        | Bitwise AND                 |
| \|       | Bitwise OR                  |
| ^        | Bitwise Exclusive OR or XOR |
| ~        | Bitwise COMPLEMENT          |
| <<       | LEFT SHIFT                  |
| >>       | RIGHT SHIFT                 |


#### 5. Assignment Operators

An assignment operator is used for assigning a value to a variable. The most common assignment operator is =. All other assignment operators apart from = are used as short-hands to achieve to two tasks simultaneously: perform an arithmetic or bitwise operation and assign the new value to one of the variables. Let's look at the assignment operators available to us in C programming language.

<div class="table-container">

<table class="assignment-operators">
    <tr>
        <th> Operator </th>
        <th> Example </th>
        <th> Same as </th>
        <th> Operator </th>
        <th> Example </th>
        <th> Same as </th>
    </tr>
    <tr>
        <td> = </td>
        <td> a = b </td>
        <td> a = b </td>
        <td> &= </td>
        <td> a &= b </td>
        <td> a = a & b </td>
    </tr>
    <tr>
        <td> %= </td>
        <td> a %= b </td>
        <td> a = a % b </td>
        <td> |= </td>
        <td> a |= b </td>
        <td> a = a | b </td>
    </tr>
    <tr>
        <td> /= </td>
        <td> a /= b </td>
        <td> a = a / b </td>
        <td> ^= </td>
        <td> a ^= b </td>
        <td> a = a ^ b </td>
    </tr>
    <tr>
        <td> *= </td>
        <td> a *= b </td>
        <td> a = a * b </td>
        <td> <<= </td>
        <td> a <<= b </td>
        <td> a = a << b </td>
    </tr>
    <tr>
        <td> += </td>
        <td> a += b </td>
        <td> a = a + b </td>
        <td> >>= </td>
        <td> a >>= b </td>
        <td> a = a >> b </td>
    </tr>
    <tr>
        <td> -= </td>
        <td> a -= b </td>
        <td> a = a - b </td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
</table>

</div>


#### 6. Miscellaneous Operators

There are several other operators barring the ones discussed above which can be collectively grouped under miscellaneous. We have already seen some of them. We’ll see others as we move forward with our programming. Let us see a few common miscellaneous operators we have seen till now.

1. **Comma operator:** It is used to link related expressions together. For example, int a,b = 5,2;
2. **Sizeof operator:** It is used to get the size of any data type.
3. **& operator:** It is called the ‘address of’ operator. It is used to get the memory location of any variable.

That should be all about operators that we need to know. We’ll be using some these operators (especially arithmetic, relational, logical and assignment) operators  extensively in the programs that we write. Hence, it is important for you people to wrap your heads around these before moving any further. Now let me give you a brief introduction about the third type of instructions viz. case control instructions and we’ll then wrap this tutorial up.


### Control Instructions

As can be understood from the name of this class of instructions in C programming language, the “control instructions” enable us to determine the order in which the various instructions in a program are to be executed by the compiler. It simply helps us determine the flow of control in a program. There are four type of control instructions in C which are:

1. **Sequence Control Instruction:** The sequence control instruction ensures that the instructions are executed in the same order in which they appear in the program.
2. **Selection or Decision Control Instruction:** Decision instructions allow the computer to take a decision as to which instruction is to be executed next.
3. **Repetition or Loop Control Instruction:** The Loop control instruction helps computer to execute a group of statements repeatedly.
4. **Case Control Instruction:** Like decision control, case control instruction is also used for decision making.

These control statements will be taken up very soon in the future tutorials. But before that we need to discuss some more concepts related to operators. Since this tutorial has already been long enough, instead of cramming them all up in this one, it will be better to separate them over two tutorials. So stay tuned for the next tutorial where we will discuss about the handling of operators in an expression.
