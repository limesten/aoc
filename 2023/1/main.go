package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

func readFile(path string) string {
	content, err := os.ReadFile("./input.txt")
	if err != nil {
		fmt.Println(err)
	}
	text := string(content)
	return text
}

func getNumberFromString(line string) int {
	stringToDigits := map[string]int{
		"one":   1,
		"two":   2,
		"three": 3,
		"four":  4,
		"five":  5,
		"six":   6,
		"seven": 7,
		"eight": 8,
		"nine":  9,
	}

	if line == "" {
		return 0
	}

	digits := []int{}
	stringDigits := []int{}
	stringDigitIndexToDigit := map[int]int{}

	chars := strings.Split(line, "")
	for idx, c := range chars {
		number, err := strconv.Atoi(c)
		if err == nil && number > 0 {
			digits = append(digits, idx)
		}
	}

	for k, v := range stringToDigits {
		firstIdx := strings.Index(line, k)
		if firstIdx != -1 {
			stringDigits = append(stringDigits, firstIdx)
			stringDigitIndexToDigit[firstIdx] = v
		}

		lastIdx := strings.LastIndex(line, k)
		if lastIdx != -1 {
			stringDigits = append(stringDigits, lastIdx)
			stringDigitIndexToDigit[lastIdx] = v
		}
	}

	slices.Sort(stringDigits)

	var first, last int
	
	// take care of first number
	// we assume there is a digit on every line so no need to check length of digit indexes
	// first we check if there even are are string digits on this line, and if there is then we compare the indexes
	if len(stringDigits) != 0 && stringDigits[0] < digits[0] {
		first = stringDigitIndexToDigit[stringDigits[0]]
	} else {
		digit := string(line[digits[0]])
		first, _ = strconv.Atoi(digit)
	}

	// take care of last number
	if len(stringDigits) != 0 && stringDigits[len(stringDigits)-1] > digits[len(digits)-1] {
		lastIdx := stringDigits[len(stringDigits)-1]
		last = stringDigitIndexToDigit[lastIdx]
	} else {
		digit := string(line[digits[len(digits)-1]])
		last, _ = strconv.Atoi(digit)
	}

	value := first * 10 + last
	return value
}

func main() {
	filePath := "./input.txt"
	text := readFile(filePath)
	lines := strings.Split(text, "\n")
	total := 0
	for _, line := range lines {
		sum := getNumberFromString(line)
		total += sum
	}
	fmt.Println(total)
}
