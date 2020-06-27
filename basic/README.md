# CBM BASIC CGI Test Information

## WTF is this???
A [friend of mine](https://github.com/halocupcake) showed me a [repository for a portable CBM BASIC interpreter](https://github.com/mist64/cbmbasic). I never had an opportunity to mess around with Commodore BASIC beforehand, and seeing that I could use this as a script interpreter on Unix, I decided to try to make a CGI page with it.

## loader.cgi
`loader.cgi` is a short BASIC script to load in and run the full program that will output the page contents. Line-by-line:
- Shebang for the portable CBM BASIC interpreter I installed on my webserver
- Print content header (as with any CGI script)
- Print null string so Apache knows that's the end of the header
- Print a span tag with "display: none" inline style to hide the message from running LOAD on the next line
- Load the program, which is a tokenized version of `content.bas`, tokenized using `cbmbasic`.
- Run the loaded program.

## Why split the code into two files?
`cbmbasic` will throw a `?STRING TOO LONG` error if you try to use it to run any script longer than 255 characters. This applies both to executable scripts that put `cbmbasic` in the shebang and on the command line (i.e. `$ cbmbasic script.bas`).

Obviously, if you want to make a meaningful CGI script, you're gonna need more than 255 characters of code to get anything done. Fortunately, this restriction doesn't apply if you use `LOAD` to load in a PRG file into memory and then run it that way.

For this reason, `loader.cgi` has the minimum amount of instructions to get the whole script running, and the remaining code is tokenized in `content.prg`, which is loaded and executed by `loader.cgi`.

`cbmbasic` can save and load Commodore BASIC programs with `SAVE` and `LOAD` as you would on an actual C64. I can't try this out for myself, but *apparently* saving programs using `cbmbasic` will output program files that will execute on real C64 hardware, so that's pretty cool.

## Would you recommend using Commodore BASIC for CGI?
No.

~~but if you're like me and you're really bored then sure go knock yourself out~~