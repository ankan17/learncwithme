---
layout: posts
serial: 7
title: The Last One!
meta: The character data type and much more!
description: With only the last data type remaining, we talk about the character data type in C, its implementation, the ASCII standard and escape sequences
comments: true
category: c-tutorial-series
---

Woah, wait! What? The last one? If you are wondering if this is my last tutorial, no it’s not. It’s just that we are only left with the last basic data type, the character data type and hence the title. Relieved? Let’s see what this character data type has to offer.


### The Character Data Type

+ Character data type is declared with the char keyword.
+ It can contain only a single alphabet, digit or a special symbol encased within single inverted quotes (and not double inverted quotes), both of them pointing left.
+ The size of a character data type on every compiler is 1 byte.

That is all okay, but how to store a character like ‘A’ on a machine which understands only 1’s and 0’s? Thanks to ASCII encoding, you can do it easily. Wait, what’s that? Let’s see.


### ASCII encoding

ASCII is the abbreviated form of American Standard Code for Information Interchange. It is a character encoding standard that is used to represent text in computers, telecommunication equipments, and other devices. It means the ASCII encoding provides an international standard to represent characters as integer values which can be stored in the form of binary. Most systems use ASCII encoding to represent characters though there are systems which use other character-encodings. Most modern character-encoding schemes are based on ASCII, although they support many additional characters. Let’s look at the ASCII values for some important characters.


| Character | ASCII value (decimal) |
| --------- | --------------------- |
| Null      | 0                     |
| New line  | 10                    |
| Space     | 32                    |
| 0 – 9     | 48 – 57               |
| A – Z     | 65 – 90               |
| a – z     | 97 – 122              |

Since characters are stored as integers, we can use characters and their ASCII values interchangeably. The following program illustrates the idea.

```c
#include <stdio.h>

int main() {
  char c = 65;
  char d = '4';
  printf("%c\n", c);
  printf("%d\n", d);
  return 0;
}
```

If you run the above program, the output you’ll see will be:

<pre class="output">A                                 
52</pre>

This shows that characters and their ASCII values can be used interchangeably. Let’s try to explore this data type a bit more.

### Characteristics of the character data type

+ **What happens when you try to store two or 3 characters into a char data type?** Do we get an error? Or do we get away with it? If we get away, what value does the variable store? Since it can store only 1 value, which value does it store?

    The answer is we can in fact try to assign say ‘65’ to a character variable without getting any error. We get two warnings though. The first one says we are trying to store multiple characters into a character type variable. The second one says that the compiler is encountering an overflow. It means we are trying to store some value in a variable, which is more than it can store. Indeed we are trying to store 16 bits of value into an 8-bit variable. So, it cuts off 8 bits from the right and stores the rightmost 8 bits as its value. Hence, only ‘5’ gets stored in this case.

+ **What if we try to do something like char c = 297?** Since the size of a character type variable is only 1 byte or 8 bits, its range is from -128 to 127. What happens in this case? Again we get an overflow warning. To see what happens exactly, let’s do a little binary conversion. Decimal 297 is 100101001. This has 9 bits. But we only have 8 bits at our disposal. So, cut off 8 bits from the right and store it into the variable. What do we get? 41. This gets stored instead. What do you think will be stored if you try something like **char c = 387?**

+ Try to print `sizeof(‘A’)` on your compiler. What do you think will be the output? 1, right? Wrong. Characters are stored in memory as integers, as I have already told and as such, it will be treated as one. C compilers tend to want every integer to be stored in an int unless told otherwise, so `sizeof(‘A’)` will probably be `sizeof(int)`.

+ We can only use the signed and unsigned modifiers with the character data type.

+ As I have mentioned, that characters are treated as integers by a C compiler and as such, **arithmetic operations are valid on a char data type**. We can add, subtract, multiply characters as we did with integers. For example, the following program will run perfectly fine.


```c
#include <stdio.h>

int main () {
  char c = 65;
  char d = 4;
  char e = c+d, f=c-d, g=c*d;
  printf ("%d %d %d\n", e, f, g);
  return 0;
}
```

What will be the output of this program? Give it a thought. Try to run the program to see what it outputs and see if you got it correct.


### Escape Sequences

**An escape sequence is a sequence of characters that does not represent itself when used inside a character or string literal, but is translated into another character or a sequence of characters that may be difficult or impossible to represent directly**. That definition was right from *Wikipedia*. Sounds confusing? Let’s try to understand that.

Suppose you want to print two words, say “Hello” and “World” on two different lines. Even if you try to write the code on two separate lines, the output won’t be on two different lines. So how to tell the compiler that you want the output to be on two separate lines? You need to somehow write a newline which is impossible to represent directly. Hence, we take help of an escape sequence ‘\n’. This represents a newline feed. With the help of this, you can have your output on two separate lines by writing something like **printf (“Hello\nWorld”)**. **\n** does not represent itself in the output, rather it is translated into something else which was impossible to represent directly viz., newline feed. This is what escape sequences do.

In C, all escape sequences consist of two or more characters, the first of which is the backslash \. The remaining character(s) determine the interpretation of the escape sequence. For example, \n means newline whereas \t means horizontal tab. Since it takes two or more characters to write an escape sequence it would seem that these will take more than 1 byte to store, but I can assure you this is not the case. Escape sequences take only 1 byte to be stored.

A comprehensive table consisting of all the escape sequences that are defined in standard C is given on the following page. This table also shows the values they map to in ASCII encoding. However, these escape sequences can be used on any system with a C compiler, and may map to different values if the system does not use an ASCII-based character-encoding.

| Escape Sequence | ASCII value (decimal) | Character represented                                                                      |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------ |
| \a              | 7                     | Alert (Beep, Bell)                                                                         |
| \b              | 8                     | Backspace                                                                                  |
| \f              | 12                    | Formfeed                                                                                   |
| \n              | 10                    | Newline (line feed)                                                                        |
| \r              | 13                    | Carriage return                                                                            |
| \t              | 9                     | Horizontal tab                                                                             |
| \v              | 11                    | Vertical tab                                                                               |
| \\              | 92                    | Backslash                                                                                  |
| \’              | 39                    | Single quotation mark                                                                      |
| \”              | 34                    | Double quotation mark                                                                      |
| \?              | 63                    | Question mark                                                                              |
| \nnn            | any                   | The byte whose numerical value is given by <br> nnn interpreted as an octal number         |
| \xhh...         | any                   | The byte whose numerical value is given by <br> hh... interpreted as a hexa-decimal number |

With this much, I would like to think that we have covered great many things about the character data type. Hope the whole thing is clear to all of you. I have written four or five programs in all the tutorials I have made so far and all of them have one thing in common that I have not explained till now. The printf function. Yes, you will need that in almost all of your programs so it is very important to know about it in detail. So the next one is going to be about that. Adios for now. Stay tuned for the next one.
