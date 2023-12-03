package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Game struct {
	Number int
	Showings []Showing
}

type Showing struct {
	Red int
	Green int
	Blue int
}

func readFile(path string) string {
	data, err := os.ReadFile(path)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return string(data)
}

func extractGameNumber(game string) int {
	x := game[5:]
	gameNumber := strings.Split(x, ":")[0]
	nr, _ := strconv.Atoi(gameNumber)
	return nr
}

func formatData(game string) Game {
	gameFormatted := Game{}
	gameNumber := extractGameNumber(game)
	gameFormatted.Number = gameNumber
	i := strings.Index(game, ":")
	g := game[i+1:]
	showings := strings.Split(g, ";")
	for _, s := range showings {
		showing := Showing{}
		cubes := strings.Split(s, ",")
		for _, c := range cubes {
			c = strings.Trim(c, " ")
			parts := strings.Split(c, " ")
			amount := parts[0]			
			color := parts[1]
			if color == "red" {
				showing.Red, _ = strconv.Atoi(amount)
			} else if color == "green" {
				showing.Green, _ = strconv.Atoi(amount)
			} else {
				showing.Blue, _ = strconv.Atoi(amount)
			}
		}
		gameFormatted.Showings = append(gameFormatted.Showings, showing)
	}
	return gameFormatted
}

func partOne(games []Game) {
	maxRed := 12
	maxGreen := 13
	maxBlue := 14

	doableGameIdSum := 0

	for _, game := range games {
		doable := true
		for _, showing := range game.Showings {
			if showing.Red > maxRed {
				doable = false
			}
			if showing.Green > maxGreen {
				doable = false
			}
			if showing.Blue > maxBlue {
				doable = false
			}
		}
		if doable == true {
			doableGameIdSum += game.Number
		}
	}
	fmt.Println(doableGameIdSum)
}

func partTwo(games []Game) {
	total := 0
	for _, game := range games {
		highestRed := 0
		highestGreen := 0
		highestBlue := 0
		for _, showing := range game.Showings {
			if showing.Red > highestRed {
				highestRed = showing.Red
			}
			if showing.Green > highestGreen {
				highestGreen = showing.Green
			}
			if showing.Blue > highestBlue {
				highestBlue = showing.Blue
			}
		}
		gamePower := highestRed * highestGreen * highestBlue
		total += gamePower
	}
	fmt.Println(total)
}

func main() {
	filePath := "./input.txt"
	content := readFile(filePath)
	lines := strings.Split(content, "\n")
	lines = lines[:len(lines)-1]
	var games []Game

	for _, line := range lines {
		game := formatData(line)
		games = append(games, game)
	}

	partOne(games)
	partTwo(games)
}
