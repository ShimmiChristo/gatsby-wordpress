import { useStaticQuery, graphql } from "gatsby"

export const CourseInfo = () => {
  const { coursesJson } = useStaticQuery(graphql`
    query CourseInfo {
      coursesJson {
        course {
          tribute1 {
            holes {
              handicap
              number
              par
              tees {
                middle
              }
            }
            totals {
              yardage
              par
            }
          }
          tribute2 {
            holes {
              handicap
              number
              par
              tees {
                middle
              }
            }
            totals {
              yardage
              par
            }
          }

          classic1 {
            holes {
              handicap
              number
              par
              tees {
                middle
              }
            }
            totals {
              yardage
              par
            }
          }
          classic2 {
            holes {
              handicap
              number
              par
              tees {
                middle
              }
            }
            totals {
              yardage
              par
            }
          }
        }
      }
    }
  `)
  return coursesJson
}
