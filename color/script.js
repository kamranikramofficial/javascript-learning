document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const colorBox = document.getElementById("colorBox")
    const colorValue = document.getElementById("colorValue")
    const colorPicker = document.getElementById("colorPicker")
    const applyColorBtn = document.getElementById("applyColor")
    const randomColorBtn = document.getElementById("randomColor")
    const colorBtns = document.querySelectorAll(".color-btn")
    const animationBtns = document.querySelectorAll(".animation-btn")
    const highlight = document.querySelector(".highlight")
  
    // Current state
    let currentColor = "#3498db"
    let currentAnimation = "pulse"
  
    // Initialize
    updateColor(currentColor)
    applyAnimation(currentAnimation)
  
    // Event listeners
    colorBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const color = this.getAttribute("data-color")
        updateColor(color)
        colorPicker.value = color
      })
    })
  
    applyColorBtn.addEventListener("click", () => {
      updateColor(colorPicker.value)
    })
  
    randomColorBtn.addEventListener("click", function () {
      const randomColor = getRandomColor()
      updateColor(randomColor)
      colorPicker.value = randomColor
  
      // Add button press animation
      this.classList.add("pressed")
      setTimeout(() => {
        this.classList.remove("pressed")
      }, 200)
    })
  
    animationBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const animation = this.getAttribute("data-animation")
  
        // Update active button
        animationBtns.forEach((b) => b.classList.remove("active"))
        this.classList.add("active")
  
        // Apply animation
        applyAnimation(animation)
        currentAnimation = animation
      })
    })
  
    // Functions
    function updateColor(color) {
      currentColor = color
      colorBox.style.backgroundColor = color
      colorValue.textContent = color
      highlight.style.color = color
      applyColorBtn.style.backgroundColor = color
  
      // Update animation color if needed
      const pulseAnimation = document.querySelector(".pulse-animation")
      if (pulseAnimation) {
        pulseAnimation.style.background = `radial-gradient(circle, ${color}40 0%, ${color}00 70%)`
      }
  
      // Add transition effect
      colorBox.classList.add("color-transition")
      setTimeout(() => {
        colorBox.classList.remove("color-transition")
      }, 500)
    }
  
    function applyAnimation(animation) {
      // Remove all animations
      colorBox.classList.remove("rotate-animation", "bounce-animation")
  
      // Remove existing pulse element if any
      const existingPulse = colorBox.querySelector(".pulse-animation")
      if (existingPulse) {
        existingPulse.remove()
      }
  
      // Apply selected animation
      switch (animation) {
        case "pulse":
          const pulseElement = document.createElement("div")
          pulseElement.classList.add("pulse-animation")
          pulseElement.style.background = `radial-gradient(circle, ${currentColor}40 0%, ${currentColor}00 70%)`
          colorBox.appendChild(pulseElement)
          break
        case "rotate":
          colorBox.classList.add("rotate-animation")
          break
        case "bounce":
          colorBox.classList.add("bounce-animation")
          break
        case "none":
        default:
          // No animation
          break
      }
    }
  
    function getRandomColor() {
      const letters = "0123456789ABCDEF"
      let color = "#"
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  
    // Add some interactivity
    colorBox.addEventListener("mousemove", function (e) {
      if (currentAnimation === "none") {
        const rect = this.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const gradientX = Math.round((x / rect.width) * 100)
        const gradientY = Math.round((y / rect.height) * 100)
  
        this.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, ${currentColor}, ${adjustBrightness(currentColor, -30)})`
      }
    })
  
    colorBox.addEventListener("mouseleave", function () {
      if (currentAnimation === "none") {
        this.style.backgroundColor = currentColor
        this.style.background = currentColor
      }
    })
  
    // Helper function to adjust color brightness
    function adjustBrightness(color, percent) {
      let R = Number.parseInt(color.substring(1, 3), 16)
      let G = Number.parseInt(color.substring(3, 5), 16)
      let B = Number.parseInt(color.substring(5, 7), 16)
  
      R = Number.parseInt((R * (100 + percent)) / 100)
      G = Number.parseInt((G * (100 + percent)) / 100)
      B = Number.parseInt((B * (100 + percent)) / 100)
  
      R = R < 255 ? R : 255
      G = G < 255 ? G : 255
      B = B < 255 ? B : 255
  
      R = Math.round(R)
      G = Math.round(G)
      B = Math.round(B)
  
      const RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16)
      const GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16)
      const BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16)
  
      return "#" + RR + GG + BB
    }
  
    // Add responsive behavior
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 480) {
        // Adjust for mobile
        if (currentAnimation === "bounce") {
          document.documentElement.style.setProperty("--bounce-height", "10px")
        }
      } else {
        // Reset for desktop
        if (currentAnimation === "bounce") {
          document.documentElement.style.setProperty("--bounce-height", "20px")
        }
      }
    })
  })
  