import axios from "axios"

export const client = axios.create({
  baseURL: "http://localhost:5555/api/v1",
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
