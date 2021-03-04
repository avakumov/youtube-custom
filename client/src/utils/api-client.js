import axios from "axios"
import { queryClient } from "../components/AppProviders"

export const client = axios.create({
  baseURL: "/api/v1",
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
export async function updateUser(user) {
  await client.put("/users", user)
  await queryClient.invalidateQueries("Channel")
}

export async function toggleSubscribeUser(channelId) {
  await client.get(`/users/${channelId}/toggle-subscribe`)

  await queryClient.invalidateQueries("Channel")
  await queryClient.invalidateQueries("Channels")
  await queryClient.invalidateQueries("Subscriptions")
  await queryClient.invalidateQueries("AuthProvider")
  await queryClient.invalidateQueries("WatchVideo")
  await queryClient.invalidateQueries("SearchResults")
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
  await queryClient.invalidateQueries(["WatchVideo", videoId])
}

export async function dislikeVideo(videoId) {
  await client.get(`/videos/${videoId}/dislike`)
  await queryClient.invalidateQueries(["WatchVideo", videoId])
}

export async function addComment({ video, comment }) {
  await client.post(`/videos/${video.id}/comments`, {
    text: comment,
  })
  await queryClient.invalidateQueries("WatchVideo", video.id)
}

export async function deleteComment(comment) {
  await client.delete(`/videos/${comment.videoId}/comments/${comment.id}`)
  await queryClient.invalidateQueries("WatchVideo")
}

export async function deleteVideo(videoId) {
  await client.delete(`/videos/${videoId}`)
  await queryClient.invalidateQueries("WatchVideo", videoId)
}
