import React from "react"
import { getLatestPosts } from "../hooks/get-latest-posts"
// import styled from "styled-components"


function LatestPosts() {
  const { title, date } = getLatestPosts()

  return (
    <section>
      <div>
        <h2>{title}</h2>
        <p>{date}</p>
      </div>
    </section>
  )
}

export default LatestPosts