import React, { useEffect } from "react"
import Torus from "../components/torus"
import { Global, css } from "@emotion/core"
import { useClippy } from "use-clippy-now"

const fixed = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}

const IndexPage = () => {
  const withClippy = useClippy("Clippy")
  useEffect(() => {
    setTimeout(() => {
      withClippy(clippy => {
        const { innerWidth, innerHeight } = window
        clippy.moveTo(innerWidth / 2, innerHeight / 2)
        clippy.speak("USE CLIPPY")
      })
    }, 1000)
  }, [])
  return (
    <div>
      <div
        css={{
          ...fixed,
          zIndex: 10,
          color: "hotpink",
          padding: 20,
          textAlign: "center",
        }}
      >
        <a
          css={{ color: "inherit" }}
          href="https://github.com/SaraVieira/useClippy"
        >
          <h1>npm i use-clippy-now</h1>
        </a>
      </div>
      <Torus css={{ ...fixed, zIndex: 9 }} />
    </div>
  )
}

export default IndexPage
