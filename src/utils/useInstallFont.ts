export async function useInstallFont(fontName: string, url: string) {
  const fontFace = new FontFace(fontName, `url(${url})`)
  const promise = new Promise((resolve, reject) => {
    fontFace
      .load()
      .then((loaded_face) => {
        // @ts-ignore
        document.fonts.add(loaded_face)
        document.body.style.fontFamily = fontName
        resolve(true)
      })
      .catch((reason) => {
        reject(reason)
      })
  })
  await promise
}
