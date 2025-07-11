import { useEffect, useState } from "react"

const useLoadGoogleScript = (apiKey) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setLoaded(true)
      script.onerror = () => setLoaded(false)
      document.body.appendChild(script)
    } else if (window.google) {
      setLoaded(true)
    }
  }, [apiKey])

  return loaded
}

export default useLoadGoogleScript
