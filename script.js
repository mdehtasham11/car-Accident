// Timer functionality
document.addEventListener("DOMContentLoaded", function () {
  let minutes = 1;
  let seconds = 34;

  const timerElement = document.getElementById("timer");
  const currentQuestionElement = document.getElementById("current-question");
  const questionBlocks = document.querySelectorAll(".question-block");

  function updateTimer() {
    if (seconds === 0) {
      if (minutes === 0) {
        // Timer finished - reset or handle completion
        minutes = 1;
        seconds = 34;
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  // Update timer every second
  setInterval(updateTimer, 1000);

  // Progressive disclosure - show only one question at a time
  function revealNextQuestion(currentQuestionNum) {
    const currentBlock = document.querySelector(
      `.question-block[data-question="${currentQuestionNum}"]`
    );
    const nextQuestionNum = currentQuestionNum + 1;
    const nextBlock = document.querySelector(
      `.question-block[data-question="${nextQuestionNum}"]`
    );

    // Hide current question
    if (currentBlock) {
      currentBlock.classList.add("hidden");
      currentBlock.classList.remove("reveal");
    }

    // Show next question
    if (nextBlock) {
      nextBlock.classList.remove("hidden");
      nextBlock.classList.add("reveal");

      // Update progress indicator
      if (currentQuestionElement) {
        currentQuestionElement.textContent = nextQuestionNum;
      }

      // Scroll to top of question card
      setTimeout(() => {
        const questionCard = document.querySelector(".question-card");
        if (questionCard) {
          questionCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }

  // Option button click handlers
  questionBlocks.forEach((block) => {
    const buttons = block.querySelectorAll(".option-btn");
    const questionNum = parseInt(block.dataset.question);

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        // Check if this question block is already answered
        if (block.classList.contains("answered")) {
          return; // Prevent changing answer once submitted
        }

        // Remove selected class from sibling buttons only
        buttons.forEach((btn) => btn.classList.remove("selected"));

        // Add selected class to clicked button
        this.classList.add("selected");

        // Mark this question as answered
        block.classList.add("answered");

        console.log(
          `Question ${questionNum} selected:`,
          this.textContent.trim()
        );

        // Reveal next question after a brief delay
        setTimeout(() => {
          revealNextQuestion(questionNum);
        }, 400);
      });
    });
  });

  // Handle textarea for question 4
  const textareaBlock = document.querySelector(
    '.question-block[data-question="4"]'
  );
  if (textareaBlock) {
    const textarea = textareaBlock.querySelector(".question-textarea");
    const continueBtn = textareaBlock.querySelector(".continue-btn");
    const charCounter = document.getElementById("accident-char-count");
    const minChars = 40;
    const maxChars = 500;

    if (textarea) {
      // Initial validation state
      textarea.classList.add("error");

      textarea.addEventListener("input", function () {
        const currentLength = this.value.length;

        // Update character counter
        if (charCounter) {
          charCounter.textContent = currentLength;
        }

        // Validate minimum character requirement
        if (currentLength >= minChars) {
          textarea.classList.remove("error");
          continueBtn.disabled = false;
          textareaBlock.classList.add("has-content");
        } else {
          textarea.classList.add("error");
          continueBtn.disabled = true;
          textareaBlock.classList.remove("has-content");
        }
      });

      // Show error on blur if not enough characters
      textarea.addEventListener("blur", function () {
        if (this.value.length < minChars && this.value.length > 0) {
          textarea.classList.add("error");
        }
      });
    }

    // Continue button click handler
    if (continueBtn) {
      continueBtn.addEventListener("click", function () {
        if (textarea && textarea.value.length >= minChars) {
          // Mark question as answered and go to next
          textareaBlock.classList.add("answered");
          console.log("Question 4 submitted:", textarea.value.trim());
          revealNextQuestion(4);
        }
      });
    }
  }

  // Handle Question 6 - First Name
  const firstNameBlock = document.querySelector(
    '.question-block[data-question="6"]'
  );
  if (firstNameBlock) {
    const input = firstNameBlock.querySelector("#first-name");
    const counter = document.getElementById("first-name-count");
    const continueBtn = firstNameBlock.querySelector(".continue-btn");

    if (input && counter) {
      input.addEventListener("input", function () {
        counter.textContent = this.value.length;
      });
    }

    if (continueBtn) {
      continueBtn.addEventListener("click", function () {
        if (input && input.value.trim().length > 0) {
          firstNameBlock.classList.add("answered");
          console.log("First Name:", input.value.trim());
          revealNextQuestion(6);
        }
      });
    }
  }

  // Handle Question 7 - Last Name
  const lastNameBlock = document.querySelector(
    '.question-block[data-question="7"]'
  );
  if (lastNameBlock) {
    const input = lastNameBlock.querySelector("#last-name");
    const counter = document.getElementById("last-name-count");
    const continueBtn = lastNameBlock.querySelector(".continue-btn");

    if (input && counter) {
      input.addEventListener("input", function () {
        counter.textContent = this.value.length;
      });
    }

    if (continueBtn) {
      continueBtn.addEventListener("click", function () {
        if (input && input.value.trim().length > 0) {
          lastNameBlock.classList.add("answered");
          console.log("Last Name:", input.value.trim());
          revealNextQuestion(7);
        }
      });
    }
  }

  // Handle Question 8 - Email
  const emailBlock = document.querySelector(
    '.question-block[data-question="8"]'
  );
  if (emailBlock) {
    const input = emailBlock.querySelector("#email");
    const continueBtn = emailBlock.querySelector(".continue-btn");
    const errorMessage = document.getElementById("email-error");

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateEmail() {
      const email = input.value.trim();
      const isValid = emailRegex.test(email);

      if (email.length === 0) {
        input.classList.remove("error");
        continueBtn.disabled = true;
      } else if (isValid) {
        input.classList.remove("error");
        continueBtn.disabled = false;
      } else {
        input.classList.add("error");
        continueBtn.disabled = true;
      }
    }

    if (input) {
      // Initial state - show error if user has typed something invalid
      input.addEventListener("input", validateEmail);
      input.addEventListener("blur", function () {
        if (
          this.value.trim().length > 0 &&
          !emailRegex.test(this.value.trim())
        ) {
          input.classList.add("error");
        }
      });
    }

    if (continueBtn) {
      continueBtn.addEventListener("click", function () {
        if (input && emailRegex.test(input.value.trim())) {
          emailBlock.classList.add("answered");
          console.log("Email:", input.value.trim());
          revealNextQuestion(8);
        }
      });
    }
  }

  // Handle Question 9 - Phone Number & Submit
  const phoneBlock = document.querySelector(
    '.question-block[data-question="9"]'
  );
  if (phoneBlock) {
    const input = phoneBlock.querySelector("#phone");
    const submitBtn = phoneBlock.querySelector(".submit-btn");
    const phoneError = document.getElementById("phone-error");

    // US phone number validation - must be 10 digits
    const phoneRegex = /^\d{10}$/;

    function validatePhone() {
      // Remove non-digit characters for validation
      const phoneDigits = input.value.replace(/\D/g, "");
      const isValid = phoneRegex.test(phoneDigits);

      if (input.value.length === 0) {
        input.classList.remove("error");
        submitBtn.disabled = true;
      } else if (isValid) {
        input.classList.remove("error");
        submitBtn.disabled = false;
      } else {
        input.classList.add("error");
        submitBtn.disabled = true;
      }
    }

    if (input) {
      input.addEventListener("input", validatePhone);
      input.addEventListener("blur", function () {
        const phoneDigits = this.value.replace(/\D/g, "");
        if (this.value.length > 0 && !phoneRegex.test(phoneDigits)) {
          input.classList.add("error");
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", function () {
        const phoneDigits = input.value.replace(/\D/g, "");
        if (input && phoneRegex.test(phoneDigits)) {
          phoneBlock.classList.add("answered");
          console.log("Phone:", input.value.trim());

          // Collect all form data
          const formData = {
            firstName: document.getElementById("first-name")?.value || "",
            lastName: document.getElementById("last-name")?.value || "",
            email: document.getElementById("email")?.value || "",
            phone: input.value.trim(),
          };

          console.log("Form submitted:", formData);
          alert(
            "Thank you! Your consultation request has been submitted. We will contact you shortly."
          );
        }
      });
    }
  }
});

// Add selected state styling
const style = document.createElement("style");
style.textContent = `
    .option-btn.selected {
        border-color: #3b82f6;
        background: #eff6ff;
        color: #1e40af;
    }
`;
document.head.appendChild(style);
