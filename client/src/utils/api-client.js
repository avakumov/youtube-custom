import axios from "axios"

import { queryCache } from "react-query"

export const client = axios.create({
  baseURL: "http://localhost:5555/api/v1",
  withCredentials: true,
})

export function authenticate(response) {
  client({
    method: "POST",
    url: "/auth/google-login",
    data: { idToken: response.tokenId },
  })
    .then((res) => {
      console.log("Sign in Success: ", res)
      window.location.assign(window.location.href)
    })
    .catch((err) => {
      console.log("Sign in error: ", err.response)
    })
}

export async function signoutUser() {
  await client.get("/auth/signout")
  window.location.pathname = "/"
}

export async function addVideo(video) {
  await client.post("/videos", video)
}

export async function addVideoView(videoId) {
  await client.get(`/videos/${videoId}/view`)
}

export async function likeVideo(videoId) {
  await client.get(`/videos/${videoId}/like`)
  await queryCache.invalidateQueries(["WatchVideo", videoId])
}

export async function dislikeVideo(videoId) {
  await client.get(`/videos/${videoId}/dislike`)
  await queryCache.invalidateQueries(["WatchVideo", videoId])
}
