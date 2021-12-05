import { useStaticQuery, graphql } from "gatsby"

export const ScoreInfo = () => {
  const { scoreJson } = useStaticQuery(graphql`
    query ScoreInfo {
      scoreJson {
        teams {
          team1 {
            name
            players
            score
          }
          team2 {
            name
            players
            score
          }
        }
      }
    }
  `)
  return scoreJson
}
