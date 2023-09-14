import { server } from "./server.js"

const form = document.getElementById("form")
const input = document.getElementById("url")
const content = document.getElementById("content")
const button = document.getElementById("button")

form.onsubmit = async (e) => {
  e.preventDefault()
  content.classList.add("placeholder")


  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um Short")
  }
  content.textContent = "Baixando vídeo..."


  let [_, params] = videoURL.split("/shorts/")
  const [videoID] = params.split("?si")
  console.log(videoID)

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."


  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })
  content.textContent = "Realizando o resumo..."
  
  content.textContent = summary.data.result
  content.classList.remove("placeholder")
}
