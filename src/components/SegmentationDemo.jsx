import { useEffect, useRef, useState } from 'react'

// Google's officially-hosted DeepLabV3 model (Pascal VOC, 21 classes).
// Pinned to the exact same package version as package.json so the WASM
// runtime and JS bindings never drift apart and silently break.
const TASKS_VISION_VERSION = '1.0.1'
const WASM_BASE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${TASKS_VISION_VERSION}/wasm`
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-assets/deeplabv3.tflite?generation=1661875711618421'

// Pascal VOC 2012 class list — order matches the model's output indices.
const VOC_CLASSES = [
  'background', 'aeroplane', 'bicycle', 'bird', 'boat', 'bottle', 'bus', 'car',
  'cat', 'chair', 'cow', 'dining table', 'dog', 'horse', 'motorbike', 'person',
  'potted plant', 'sheep', 'sofa', 'train', 'tv/monitor',
]

// One fixed, distinct color per class (index 0 = background, stays transparent).
const CLASS_COLORS = [
  null,
  [230, 25, 75], [60, 180, 75], [255, 225, 25], [67, 99, 216], [245, 130, 49],
  [145, 30, 180], [70, 240, 240], [240, 50, 230], [188, 246, 12], [250, 190, 190],
  [0, 128, 128], [230, 190, 255], [154, 99, 36], [255, 250, 200], [128, 0, 0],
  [170, 255, 195], [128, 128, 0], [255, 216, 177], [0, 0, 117], [128, 128, 128],
]

const MAX_DIMENSION = 1280 // downscale large phone photos before processing

export default function SegmentationDemo() {
  const [status, setStatus] = useState('idle') // idle | loading-model | segmenting | done | error
  const [errorMsg, setErrorMsg] = useState('')
  const [detected, setDetected] = useState([])
  const [opacity, setOpacity] = useState(0.55)

  const segmenterRef = useRef(null)
  const canvasRef = useRef(null)
  const frameRef = useRef(null) // last processed { img, mask, maskW, maskH } so the opacity slider can re-composite without re-running inference

  useEffect(() => {
    return () => {
      segmenterRef.current?.close()
    }
  }, [])

  async function ensureSegmenter() {
    if (segmenterRef.current) return segmenterRef.current
    setStatus('loading-model')
    const { FilesetResolver, ImageSegmenter } = await import('@mediapipe/tasks-vision')
    const vision = await FilesetResolver.forVisionTasks(WASM_BASE)
    const segmenter = await ImageSegmenter.createFromOptions(vision, {
      baseOptions: { modelAssetPath: MODEL_URL },
      outputCategoryMask: true,
      outputConfidenceMasks: false,
      runningMode: 'IMAGE',
    })
    segmenterRef.current = segmenter
    return segmenter
  }

  function drawComposite(img, mask, maskW, maskH, alpha) {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    // The model's mask is lower-resolution than the input; paint it onto
    // a small offscreen canvas at mask resolution, then let drawImage
    // upscale it onto the main canvas.
    const maskCanvas = document.createElement('canvas')
    maskCanvas.width = maskW
    maskCanvas.height = maskH
    const maskCtx = maskCanvas.getContext('2d')
    const imageData = maskCtx.createImageData(maskW, maskH)

    for (let i = 0; i < mask.length; i++) {
      const color = CLASS_COLORS[mask[i]]
      const o = i * 4
      if (color) {
        imageData.data[o] = color[0]
        imageData.data[o + 1] = color[1]
        imageData.data[o + 2] = color[2]
        imageData.data[o + 3] = 255
      } else {
        imageData.data[o + 3] = 0 // background stays transparent
      }
    }
    maskCtx.putImageData(imageData, 0, 0)

    ctx.imageSmoothingEnabled = false // keep segment edges crisp, not blurred
    ctx.globalAlpha = alpha
    ctx.drawImage(maskCanvas, 0, 0, canvas.width, canvas.height)
    ctx.globalAlpha = 1
  }

  function handleOpacityChange(e) {
    const val = Number(e.target.value)
    setOpacity(val)
    if (frameRef.current) {
      const { img, mask, maskW, maskH } = frameRef.current
      drawComposite(img, mask, maskW, maskH, val)
    }
  }

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return

    setErrorMsg('')
    setDetected([])

    let objectUrl
    try {
      const segmenter = await ensureSegmenter()
      setStatus('segmenting')

      objectUrl = URL.createObjectURL(file)
      const rawImg = await loadImage(objectUrl)
      const img = downscale(rawImg, MAX_DIMENSION)

      const result = segmenter.segment(img)
      const maskObj = result.categoryMask
      const mask = maskObj.getAsUint8Array()
      const maskW = maskObj.width
      const maskH = maskObj.height
      maskObj.close()

      frameRef.current = { img, mask, maskW, maskH }
      drawComposite(img, mask, maskW, maskH, opacity)

      const seen = new Set(mask)
      setDetected(
        [...seen]
          .filter((c) => c !== 0)
          .sort((a, b) => a - b)
          .map((c) => ({ label: VOC_CLASSES[c], color: CLASS_COLORS[c] }))
      )
      setStatus('done')
    } catch (err) {
      console.error('Segmentation demo error:', err)
      setErrorMsg(
        status === 'loading-model'
          ? 'Could not load the segmentation model — your browser or network may be blocking it. Try a different browser, or check your connection.'
          : 'Could not process that image. Try a different photo.'
      )
      setStatus('error')
    } finally {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
      e.target.value = '' // allow re-selecting the same file
    }
  }

  return (
    <section id="ml-demo">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Live Demo</p>
          <h2>Segmentation, running in your browser.</h2>
          <p>
            A real semantic segmentation model — the same fundamental class of
            architecture behind my MRI project — running fully client-side.
            Upload any photo; nothing leaves your browser.
          </p>
        </div>

        <div className="ml-demo-box">
          <div className="ml-demo-controls">
            <label className="btn btn-primary ml-demo-upload">
              {status === 'loading-model'
                ? 'Loading model…'
                : status === 'segmenting'
                ? 'Segmenting…'
                : 'Choose a photo'}
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                disabled={status === 'loading-model' || status === 'segmenting'}
                hidden
              />
            </label>

            {(status === 'done' || status === 'segmenting') && (
              <div className="ml-demo-opacity">
                <label htmlFor="mask-opacity">Overlay opacity</label>
                <input
                  id="mask-opacity"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={opacity}
                  onChange={handleOpacityChange}
                />
              </div>
            )}
          </div>

          {status === 'loading-model' && (
            <p className="ml-demo-status">
              Downloading the model (~3MB, one time only)…
            </p>
          )}

          {errorMsg && <div className="chat-error">{errorMsg}</div>}

          <div className={`ml-demo-canvas-wrap ${status === 'done' ? 'has-image' : ''}`}>
            <canvas ref={canvasRef} />
            {status === 'idle' && (
              <p className="ml-demo-placeholder">Your segmented photo will appear here.</p>
            )}
          </div>

          {detected.length > 0 && (
            <div className="ml-demo-legend">
              {detected.map((d) => (
                <span className="ml-demo-legend-chip" key={d.label}>
                  <span
                    className="ml-demo-legend-swatch"
                    style={{ background: `rgb(${d.color.join(',')})` }}
                  />
                  {d.label}
                </span>
              ))}
            </div>
          )}

          <p className="ml-demo-disclaimer">
            This is a general-purpose demo (Pascal VOC classes: person, car,
            dog, and 17 others) — not the clinical model from my MRI project,
            which trains on brain scan data I obviously can't ship in a public
            portfolio. Same underlying idea — pixel-wise classification via a
            CNN — applied to something I'm legally allowed to show you.
          </p>
        </div>
      </div>
    </section>
  )
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image failed to load'))
    img.src = src
  })
}

// Draws large images down onto a canvas-backed <img>-like element so
// neither the model nor the browser has to handle a 12MP phone photo at
// full resolution. Returns something drawImage()-compatible.
function downscale(img, maxDim) {
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
  if (scale === 1) return img

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(img.width * scale)
  canvas.height = Math.round(img.height * scale)
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas
}
