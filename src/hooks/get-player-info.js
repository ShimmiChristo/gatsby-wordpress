import { useStaticQuery, graphql } from "gatsby"

export const PlayerInfo = () => {
  const { playersJson } = useStaticQuery(graphql`
    query PlayerInfo {
      playersJson {
        player {
          matt {
            name
            handicap
            team
            course {
              tribute1
              tribute2
              classic1
              classic2
            }
          }
          dylan {
            name
            handicap
            team
            course {
              tribute1
              tribute2
              classic1
              classic2
            }
          }
          chris {
            name
            handicap
            team
            course {
              tribute1
              tribute2
              classic1
              classic2
            }
          }
          rj {
            name
            handicap
            team
            course {
              tribute1
              tribute2
              classic1
              classic2
            }
          }
          derek {
            name
            handicap
            team
            course {
              tribute1
              tribute2
              classic1
              classic2
            }
          }
          dan {
            name
            handicap
            team
            course {
              tribute1
              tribute2
              classic1
              classic2
            }
          }
          travis {
            name
            handicap
            team
            course {
              tribute1
              tribute2
              classic1
              classic2
            }
          }
          craig {
            name
            handicap
            team
            course {
              tribute1
              tribute2
              classic1
              classic2
            }
          }
        }
      }
    }
  `)
  return playersJson
}
