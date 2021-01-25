# https://www.gnu.org/software/make/manual/make.html#General-Search
VPATH = src
FLAGS = --pedantic-errors -Wall -g -std=c++17

# Recipes
main: main.o
	g++ -o main $(addprefix bin/,$^)

%.o: %.cpp
	g++ $(FLAGS) -c $< -o bin/$(notdir $(basename $<)).o

clean:
	/bin/rm -f main bin/*.o src/*~ *~

cleantemp:
	/bin/rm -f src/*~ *~

# Dependencies
main.o: main.cpp
