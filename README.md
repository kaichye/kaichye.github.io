# PasswordCEO
The boss of password managers!

## TL;DR
Next generation password manager that doesn't store anything! There is no data to be breached, nothing to be cracked!

## What is this and why is it "next generation?"
A normal password manager stores an encrypted version of all your passwords in a database that can only be unlocked with a master password. However, if that database was ever stolen, then all your passwords may be in danger! With PasswordCEO, we generate your password on the spot, meaning we don't need to store anything! All you need is one Super Secret Password (SSP) which is basically the master password to a password manager, a "Phrase" for each password you want to have, and a length. With that, you will get a unique password with all character types for every combination of SSP, Phrase, and length.

#### So basically, it just doesn't store anything. Is there anything else good about it?
With a standard password manager, if you wanted to update all your passwords, you would have to go through each stored account and update it. However, with PasswordCEO, you can update all your passwords at once just by changing your SSP! If you only want to change parts of your password or you don't want to change your SSP, then you would have to change your Phrases, but it's still just as easy as a password manager.

## Instructions, Tips, & Recommendations.

#### Instructions
1. Think up an easy to remember phrase for each of your passwords. It could be your username or something like that.
2. Create a Super Secret Password, whatever your would use for your password manager's master password.
3. Enter those in to the website and you will get your generated password! (Yes, it's supposed to be hard to see. That way, we can prevent shoulder surfing as much as possible).

#### Tips
1. On a computer, you can drag and drop the generated password (the box with dots in it) to wherever accepts text. That way, you don't have to copy or type it by hand.
2. If you click on the (COPY) next to "Generated Password," the password will be copied to your clipboard. The script will try to clear your clipboard after 10 seconds, but it will not work if your computer's focus is not on the PasswordCEO window. So DON'T forget to CLEAR your clipboard after using!
3. If you choose to show your generated password, it will hide itself after 60 seconds.

#### Recommendations
1. Remember that no matter how strong your password is, MFA (Multi Factor Authentication) is always a good idea.
2. A password with a length of 16 characters is recommended. It's not too long to type out, and it's long enough that it can't be brute forced with its hash is stolen. Note: The program does not allow your length to drop below 12 characters.
3. Writing down your Phrases is not the end of the word. In fact, it's more secure than a hashed password because it can't be cracked. But NEVER write down your SSP just like how you wouldn't write down your master password for a manager.
4. This might be a little annoying to use, compared to a password manager, so by all means use a manager if you like it better. This is just a more secure (I think) way to manage passwords.

## How does it work? (Kind of technical)
The script takes your Phrase and SSP, combines them with the length value, and hashes them. Then using those as a seed for random numbers, the script finds guaranteed spots for each character type (lowercase, uppercase, number, symbol). Finally, using random numbers again, the script pulls characters from the two hashes into the password and inserts the guaranteed character types into their positions.

---

## Liscense
BSD 2-Clause License

Copyright (c) 2023, Kaicheng Ye

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
