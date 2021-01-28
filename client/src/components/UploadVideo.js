import path from "path"
import React from "react"
import { useSnackbar } from "react-simple-snackbar"
import { uploadMedia } from "../utils/upload-media"
import { UploadIcon } from "./Icons"
import UploadVideoModal from "./UploadVideoModal"

function UploadVideo() {
  const [showModal, setShowModal] = React.useState(false)
  const [previewVideo, setPreviewVideo] = React.useState("")
  const [thumbnail, setThumbnail] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [defaultTitle, setDefaultTitle] = React.useState("")
  const [openSnackbar, closeSnackbar] = useSnackbar()

  const closeModal = () => setShowModal(false)

  async function handleUploadVideo(event) {
    event.persist()
    const file = event.target.files[0]
    const defaultTitle = path.basename(file.name, path.extname(file.name))
    setDefaultTitle(defaultTitle)

    if (file) {
      const fileSize = file.size / 1000000 // in MB

      if (fileSize > 50) {
        return openSnackbar("Video file should be less than 50MB")
      }

      const previewVideo = URL.createObjectURL(file)
      setPreviewVideo(previewVideo)
      setShowModal(true)

      const url = await uploadMedia({
        type: "video",
        file,
        preset: "oikhrtmr",
      })

      const extension = path.extname(url)
      setThumbnail(url.replace(extension, ".jpg"))
      setUrl(url)
      event.target.value = ""
    }
  }

  return (
    <div>
      <label htmlFor="video-upload">
        <UploadIcon />
      </label>
      <input
        style={{ display: "none" }}
        id="video-upload"
        type="file"
        accept="video/*"
        onChange={handleUploadVideo}
      />
      {showModal && (
        <UploadVideoModal
          previewVideo={previewVideo}
          thumbnail={thumbnail}
          url={url}
          defaultTitle={defaultTitle}
          closeModal={closeModal}
        />
      )}
    </div>
  )
}

export default UploadVideo
