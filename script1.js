// Theme toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
});

// Slider functionality
document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  if (!sliderTrack || !prevBtn || !nextBtn || serviceCards.length === 0) {
    console.error("Slider elements not found");
    return;
  }

  let currentIndex = 0;
  const cardWidth = serviceCards[0].offsetWidth;
  const gap = 32; // 2rem gap in pixels

  // Create dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";
  document.querySelector(".services-slider").appendChild(dotsContainer);

  serviceCards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    if (index < 0) index = serviceCards.length - 1;
    if (index >= serviceCards.length) index = 0;

    currentIndex = index;
    const offset = -(cardWidth + gap) * currentIndex;
    sliderTrack.style.transform = `translateX(${offset}px)`;
    updateDots();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto slide every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000);

  // Pause auto-slide on hover
  const sliderContainer = document.querySelector(".services-slider");
  sliderContainer.addEventListener("mouseenter", () =>
    clearInterval(slideInterval)
  );
  sliderContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 5000);
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      goToSlide(currentIndex);
    }, 250);
  });
});

// Registration Form Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Default login credentials
  const defaultEmail = "malikshaik7989@gmail.com";
  const defaultPassword = "12345678";

  // Registration Form Handling
  const registrationForm = document.querySelector(".registration-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // Validate password match
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Validate password strength
      if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return;
      }

      // Store user data in localStorage
      const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: password,
        address: document.getElementById("address").value,
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      // Redirect to main page
      window.location.href = "index1.html";
    });
  }

  // Login Form Handling
  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Check if using default credentials
      if (email === defaultEmail && password === defaultPassword) {
        // Store login status
        localStorage.setItem("isLoggedIn", "true");
        // Redirect to main page
        window.location.href = "index1.html";
        return;
      }

      // Check if user exists in localStorage
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        if (email === userData.email && password === userData.password) {
          // Store login status
          localStorage.setItem("isLoggedIn", "true");
          // Redirect to main page
          window.location.href = "index1.html";
          return;
        }
      }

      // If credentials don't match
      alert("Invalid email or password!");
    });
  }

  // Password visibility toggle
  const passwordToggles = document.querySelectorAll(".password-toggle");
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const type =
        input.getAttribute("type") === "password" ? "text" : "password";
      input.setAttribute("type", type);
      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
    });
  });
});
