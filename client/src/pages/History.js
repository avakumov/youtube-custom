// @ts-nocheck
import ErrorMessage from "../components/ErrorMessage"
import TrendingCard from "../components/TrendingCard"
import { useAuth } from "../context/auth-context"
import React from "react"
import { useQuery } from "react-query"
import TrendingSkeleton from "../skeletons/TrendingSkeleton"
import { client } from "../utils/api-client"
import { HistoryIcon } from "../components/Icons"
import SignUpCard from "../components/SignUpCard"
import Wrapper from "../styles/Trending"

function History() {
  const user = useAuth()
  const { data: videos, isLoading, isError, error, isSuccess } = useQuery(
    "History",
    () => client.get("/users/history").then((res) => res.data.videos),
    {
      enabled: true,
    }
  )

  if (!user) {
    return (
      <SignUpCard
        icon={<HistoryIcon />}
        title="Keep track of what you watch"
        description="Watch history isn't viewable when signed out"
      />
    )
  }

  if (isLoading) return <TrendingSkeleton />
  if (isError) return <ErrorMessage error={error} />

  return (
    <Wrapper noPad>
      <h2>History</h2>
      {isSuccess && !videos.length && (
        <p className="secondary">videos that you have watched will show up here</p>
      )}
      {isSuccess && videos.map((video) => <TrendingCard key={video.id} video={video} />)}
    </Wrapper>
  )
}

export default History
