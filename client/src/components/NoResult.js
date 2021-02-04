import React from "react"
import noResultsImg from "../assets/no-result.png"
import Wrapper from "../styles/NoResult"

function NoResult({ title, text }) {
  return (
    <Wrapper>
      <img src={noResultsImg} alt="no results" />
      <h2>{title}</h2>
      <p className="secondary">{text}</p>
    </Wrapper>
  )
}

export default NoResult
