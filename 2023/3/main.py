import string
d = open("example.txt").read().strip().split("\n")
def isSymbol(char):
    if char in string.punctuation and char != ".":
        return True

for i, row in enumerate(d):
    for j, char in enumerate(row):
        if not isSymbol(char):
            continue
        # check horizontal
        if row[j-1].isdigit():
            number = row[j-1]








        # if row[j+1].isdigit():
        #     print(row[j+1] + " is a digit to the right of a symbol")










    
