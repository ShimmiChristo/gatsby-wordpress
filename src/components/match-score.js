import React from "react"
import { ScoreInfo } from "../hooks/get-team-score"
import styled from "styled-components"
// import Image from "gatsby-image"
import "../styles/match.css"

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
  display: flex;
  justify-content: center;


  > * {
    padding: 0 1rem;
    margin: 0;
  }
`

function MatchScore({}) {
  const { teams } = ScoreInfo()

  return (
    <Section>
      <div className="h1 team-color-one">{teams.team1.score}</div>
      <div className="h1 team-color-two">{teams.team2.score}</div>
    </Section>
  )
}

export default MatchScore
