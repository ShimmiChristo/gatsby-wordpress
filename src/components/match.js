import React, { useState } from "react"
import { CourseInfo } from "../hooks/get-course-info"
import { PlayerInfo } from "../hooks/get-player-info"
import styled from "styled-components"
// import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"
import "../styles/match.css"

// const Container = styled.div`
//   padding: 0 2rem 2rem 2rem;
//   border-bottom: 2px solid;
//   border-color: var(--color-brand-med);
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   & h2 {
//     flex: 0 0 100%;
//   }
//   @media (max-width: 767px) {
//     padding: 0rem 1rem 1rem 1rem;
//     justify-content: center;
//   }
// `

const Section = styled.section`
  border: 1px solid gray;
  padding: 2rem;
  border-radius: 0.7rem;
  overflow: hidden;
  overflow-x: scroll;
  max-width: 1000px;
  margin: 2rem auto 2rem;
  transition: all 0.5s ease-in-out;
  max-height: 180px;
  &.open {
    max-height: 1000px;
  }
  @media (max-width: 768px) {
    max-height: 300px;
  }
`

function Match({ matchId, courseMatch, player1, player2, player3, player4 }) {
  const { course } = CourseInfo()
  const { player } = PlayerInfo()
  const courseHoles = course[`${courseMatch}`].holes
  const playerOne = player[`${player1}`]
  const playerTwo = player[`${player2}`]
  const playerThree = player[`${player3}`] || undefined
  const playerFour = player[`${player4}`] || undefined
  const matchNumber = matchId

  const [sectionHeight, setSectionHeight] = useState(null)
  // const parTotal = course[`${courseMatch}`].totals.par

  function calcTeamOneScore() {
    const teamOneScoreArr = []
    var playerOneScore = playerOne.course[`${courseMatch}`] // [scores]
    var pHandiPlayerOne = playerOne.handicap

    if (playerThree !== undefined) {
      var playerThreeScore = playerThree.course[`${courseMatch}`] || undefined // [scores]
      var pHandiPlayerThree = playerThree.handicap || ""

      for (var i = 0; i < playerOneScore.length; i++) {
        var sPlayerOne = playerOneScore[i]
        var sPlayerThree = playerThreeScore[i]
        var hHand = courseHoles[i].handicap
        var playerOneHandiScore = calcPlayerScore(
          sPlayerOne,
          pHandiPlayerOne,
          hHand
        )
        var playerThreeHandiScore = calcPlayerScore(
          sPlayerThree,
          pHandiPlayerThree,
          hHand
        )

        teamOneScoreArr.push(
          Math.min(playerOneHandiScore, playerThreeHandiScore)
        )
      }
    } else {
      for (var i = 0; i < playerOneScore.length; i++) {
        var sPlayerOne = playerOneScore[i]
        var hHand = courseHoles[i].handicap
        var playerOneHandiScore = calcPlayerScore(
          sPlayerOne,
          pHandiPlayerOne,
          hHand
        )

        teamOneScoreArr.push(playerOneHandiScore)
      }
    }
    return teamOneScoreArr
  }
  const teamOneScore = calcTeamOneScore()

  function calcTeamTwoScore() {
    const teamTwoScoreArr = []
    var playerTwoScore = playerTwo.course[`${courseMatch}`] // [scores]
    var pHandiPlayerTwo = playerTwo.handicap

    if (playerFour !== undefined) {
      var playerFourScore = playerFour.course[`${courseMatch}`] || undefined // [scores]
      var pHandiPlayerFour = playerFour.handicap || ""

      for (var i = 0; i < playerTwoScore.length; i++) {
        var sPlayerTwo = playerTwoScore[i]
        var sPlayerFour = playerFourScore[i]
        var hHand = courseHoles[i].handicap
        var playerTwoHandiScore = calcPlayerScore(
          sPlayerTwo,
          pHandiPlayerTwo,
          hHand
        )
        var playerFourHandiScore = calcPlayerScore(
          sPlayerFour,
          pHandiPlayerFour,
          hHand
        )

        teamTwoScoreArr.push(
          Math.min(playerTwoHandiScore, playerFourHandiScore)
        )
      }
    } else {
      for (var i = 0; i < playerTwoScore.length; i++) {
        var sPlayerTwo = playerTwoScore[i]
        var hHand = courseHoles[i].handicap
        var playerTwoHandiScore = calcPlayerScore(
          sPlayerTwo,
          pHandiPlayerTwo,
          hHand
        )

        teamTwoScoreArr.push(playerTwoHandiScore)
      }
    }
    return teamTwoScoreArr
  }
  const teamTwoScore = calcTeamTwoScore()

  function calcPlayerScore(s, pHand, hHand) {
    var score = s
    var playerHandicap = pHand
    var holeHandicap = hHand
    if (score === "-") {
      return score
    } else {
      if (holeHandicap <= playerHandicap) {
        playerHandicap = Math.min(playerHandicap - 18, 0)
        score--
        return calcPlayerScore(score, playerHandicap, holeHandicap)
      } else {
        return score
      }
    }
  }

  function calcHoleWinner(hole) {
    var teamOneScoreArray = calcTeamOneScore()
    var teamTwoScoreArray = calcTeamTwoScore()
    var holeIndex = hole - 1
    var teamWins = {
      team: "",
      teamOne: 0,
      teamTwo: 0,
    }

    if (teamOneScoreArray[holeIndex] > teamTwoScoreArray[holeIndex]) {
      teamWins.teamTwo++
      teamWins.team = "teamTwo"
      return teamWins
    } else if (teamOneScoreArray[holeIndex] < teamTwoScoreArray[holeIndex]) {
      teamWins.teamOne++
      teamWins.team = "teamOne"
      return teamWins
    } else {
      teamWins.teamOne = 0
      teamWins.team = "tie"
      return teamWins
    }
  }

  function calcTeamScores() {
    var teamOneScoreArray = calcTeamOneScore()
    var teamTwoScoreArray = calcTeamTwoScore()
    var holeIndex
    const teamWins = {
      teamOne: 0,
      teamTwo: 0,
    }
    courseHoles.map((hole, i) => {
      holeIndex = i
      if (teamOneScoreArray[holeIndex] > teamTwoScoreArray[holeIndex]) {
        teamWins.teamTwo++
      } else if (teamOneScoreArray[holeIndex] < teamTwoScoreArray[holeIndex]) {
        teamWins.teamOne++
      }
    })

    return teamWins
  }
  const teamFinalScores = calcTeamScores()

  return (
    <Section
      data-match={`${courseMatch}`}
      className={`"match__container " ${
        sectionHeight == "closed" ? "open" : "closed"
      }`}
      onClick={() => {
        sectionHeight === "closed"
          ? setSectionHeight("open")
          : setSectionHeight("closed")
      }}
    >
      <i class="match__number">match {matchNumber}</i>
      <div class="match__header">
        <div className="match__team color-green">
          <div className="match__team--playerOne">{player1}</div>
          {player3 ? (
            <div className="match__team--playerThree">{player3}</div>
          ) : (
            ""
          )}
        </div>

        <div class="team__scores">
          <div
            id="team__one"
            class={
              "bk-gray " +
              (teamFinalScores.teamOne > teamFinalScores.teamTwo
                ? `team-one-color text-white`
                : "")
            }
          >
            {teamFinalScores.teamOne || 0}
          </div>

          <div
            id="team__two"
            class={
              "bk-gray " +
              (teamFinalScores.teamOne < teamFinalScores.teamTwo
                ? `team-two-color text-white`
                : "")
            }
          >
            {teamFinalScores.teamTwo || 0}
          </div>
        </div>

        <div className="match__team color-green">
          <div className="match__team--playerTwo">{player2}</div>
          {player4 ? (
            <div className="match__team--playerFour">{player4}</div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="match__course">
        <div className="match__column--info align-right">
          <div className="match__hole row-cell">hole</div>
          <div className="match__yardage row-cell">yardage</div>
          <div className="match__handicap row-cell">handicap</div>
          <div className="match__par row-cell">par</div>
        </div>
        {courseHoles.map(hole => (
          <div className="match__column">
            <div
              className="match__hole row-cell"
              data-winner={`${calcHoleWinner(hole.number).team}`}
            >
              {hole.number}
            </div>
            <div className="match__yardage row-cell">{hole.tees.middle}</div>
            <div className="match__handicap row-cell">{hole.handicap}</div>
            <div className="match__par row-cell">{hole.par}</div>
          </div>
        ))}
      </div>

      <div className="match__teamScores">
        <div className="match__teamScores--team1">
          <div className={"match__playerScore match__player1"}>
            <div className="match__column--info align-left row-cell">
              {player1}
            </div>
            {playerOne
              ? playerOne.course[`${courseMatch}`].map((score, i) => (
                  <div className="match__column">
                    <div
                      className="match__score row-cell"
                      data-score={`${calcPlayerScore(
                        score,
                        playerOne.handicap,
                        courseHoles[i].handicap
                      )}`}
                    >
                      {calcPlayerScore(
                        score,
                        playerOne.handicap,
                        courseHoles[i].handicap
                      )}
                      <sup>{score}</sup>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          {playerThree ? (
            <div className={"match__playerScore match__player3"}>
              <div className="match__column--info align-left row-cell">
                {player3}
              </div>
              {playerThree
                ? playerThree.course[`${courseMatch}`].map((score, i) => (
                    <div className="match__column">
                      <div
                        className="match__score row-cell"
                        data-score={`${calcPlayerScore(
                          score,
                          playerThree.handicap,
                          courseHoles[i].handicap
                        )}`}
                      >
                        {calcPlayerScore(
                          score,
                          playerThree.handicap,
                          courseHoles[i].handicap
                        )}
                        <sup>{score}</sup>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          ) : (
            ""
          )}
          <div className="match__teamScore">
            <div className="match__column--info column-left">
              <div className="match__score row-cell">score</div>
            </div>
            {teamOneScore.map(hole => (
              <div className="match__column">
                <div className="match__score row-cell">{hole}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="match__teamScores--team2">
          <div className={"match__playerScore match__player2"}>
            <div className="match__column--info align-left row-cell">
              {player2}
            </div>
            {playerTwo
              ? playerTwo.course[`${courseMatch}`].map((score, i) => (
                  <div className="match__column">
                    <div
                      className="match__score row-cell"
                      data-score={`${calcPlayerScore(
                        score,
                        playerTwo.handicap,
                        courseHoles[i].handicap
                      )}`}
                    >
                      {calcPlayerScore(
                        score,
                        playerTwo.handicap,
                        courseHoles[i].handicap
                      )}
                      <sup>{score}</sup>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          {playerFour ? (
            <div className={"match__playerScore match__player4"}>
              <div className="match__column--info align-left row-cell">
                {player4}
              </div>
              {playerFour
                ? playerFour.course[`${courseMatch}`].map((score, i) => (
                    <div className="match__column">
                      <div
                        className="match__score row-cell"
                        data-score={`${calcPlayerScore(
                          score,
                          playerFour.handicap,
                          courseHoles[i].handicap
                        )}`}
                      >
                        {calcPlayerScore(
                          score,
                          playerFour.handicap,
                          courseHoles[i].handicap
                        )}
                        <sup>{score}</sup>
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          ) : (
            ""
          )}
          <div className="match__teamScore">
            <div className="match__column--info column-left">
              <div className="match__score row-cell">score</div>
            </div>
            {teamTwoScore.map(hole => (
              <div className="match__column">
                <div className="match__score row-cell">{hole}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Match
