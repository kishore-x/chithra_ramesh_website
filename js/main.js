document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. MOBILE MENU TOGGLE
  // =========================================================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('active');
      const icon = mobileMenuToggle ? mobileMenuToggle.querySelector('i') : null;
      if (icon) icon.className = 'fas fa-bars';
    });
  });

  // =========================================================================
  // 2. HERO SLIDESHOW
  // =========================================================================
  const slides = [
    {
      image: 'images/hero_school.png',
      text: 'AT SRI MAHALAKSHMI MATRIC HR. SEC SCHOOL, WE CREATE A CLIMATE WHICH IS CONDUCIVE TO LEARNING'
    },
    {
      image: 'images/upload_sangamam_collage1.jpg',
      text: 'SANGAMAM 2024: A SPECTACULAR ANNUAL DAY DISPLAY OF MUSIC, DANCE, AND ACADEMIC MERIT'
    },
    {
      image: 'images/upload_sangamam_collage2.jpg',
      text: 'OUR TALENTED YOUNG MINDS LIGHTING UP THE STAGE WITH VIBRANT CULTURAL PERFORMANCES'
    }
  ];

  const sliderContainer = document.getElementById('slider-container');
  const sloganText = document.getElementById('slogan-text');
  const sliderDotsContainer = document.getElementById('slider-dots');

  let currentSlideIndex = 0;
  let slideInterval;

  if (sliderContainer && sloganText && sliderDotsContainer) {
    // Initialize Slider
    slides.forEach((slide, idx) => {
      // Create slide element
      const slideDiv = document.createElement('div');
      slideDiv.className = `slide ${idx === 0 ? 'active' : ''}`;
      slideDiv.style.backgroundImage = `url('${slide.image}')`;
      sliderContainer.appendChild(slideDiv);

      // Create dot indicator
      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetSlideInterval();
      });
      sliderDotsContainer.appendChild(dot);
    });

    sloganText.textContent = slides[0].text;

    function goToSlide(index) {
      const slideDivs = document.querySelectorAll('.slide');
      const dots = document.querySelectorAll('.slider-dot');
      
      slideDivs[currentSlideIndex].classList.remove('active');
      dots[currentSlideIndex].classList.remove('active');

      currentSlideIndex = index;

      slideDivs[currentSlideIndex].classList.add('active');
      dots[currentSlideIndex].classList.add('active');
      sloganText.textContent = slides[currentSlideIndex].text;
    }

    function nextSlide() {
      let nextIndex = (currentSlideIndex + 1) % slides.length;
      goToSlide(nextIndex);
    }

    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 6000);
    }

    function resetSlideInterval() {
      clearInterval(slideInterval);
      startSlideInterval();
    }

    startSlideInterval();
  }

  // =========================================================================
  // 3. ADMISSIONS ENQUIRY FORM VALIDATION & SIMULATED OTP FLOW
  // =========================================================================
  const form = document.getElementById('admissions-enquiry-form');
  const validateMobileBtn = document.getElementById('validate-mobile-btn');
  const otpGroup = document.getElementById('otp-group');
  const otpInput = document.getElementById('otp-input');
  const mobileInput = document.getElementById('parent-mobile');
  const otpMessage = document.getElementById('otp-message');
  
  let isMobileValidated = false;
  const mockOTP = "1234";

  if (validateMobileBtn && mobileInput && otpGroup && otpMessage) {
    validateMobileBtn.addEventListener('click', () => {
      const mobileVal = mobileInput.value.trim();
      const phoneRegex = /^[6-9]\d{9}$/; // Standard Indian 10-digit mobile check

      if (!phoneRegex.test(mobileVal)) {
        showFieldMessage(mobileInput, 'Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      // Valid number, show simulated OTP flow
      clearFieldMessage(mobileInput);
      validateMobileBtn.disabled = true;
      validateMobileBtn.textContent = 'Sending OTP...';
      
      setTimeout(() => {
        validateMobileBtn.textContent = 'OTP Sent';
        validateMobileBtn.style.backgroundColor = '#10b981'; // Green
        otpGroup.style.display = 'block';
        otpMessage.textContent = 'For demonstration, please enter verification code: 1234';
        otpMessage.style.color = '#e06b20';
        otpInput.focus();
        isMobileValidated = true;
      }, 1200);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('parent-name');
      const emailInput = document.getElementById('parent-email');
      const acadYear = document.getElementById('acad-year');
      const grade = document.getElementById('grade-select');

      let hasErrors = false;

      // Validate Name
      if (nameInput.value.trim() === '') {
        showFieldMessage(nameInput, 'Name is required.', 'error');
        hasErrors = true;
      } else {
        clearFieldMessage(nameInput);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showFieldMessage(emailInput, 'Please enter a valid email address.', 'error');
        hasErrors = true;
      } else {
        clearFieldMessage(emailInput);
      }

      // Validate Mobile Number Validation Step
      if (!isMobileValidated) {
        showFieldMessage(mobileInput, 'Please validate your mobile number first.', 'error');
        hasErrors = true;
      } else {
        clearFieldMessage(mobileInput);
      }

      // Validate OTP
      if (isMobileValidated) {
        if (otpInput.value.trim() !== mockOTP) {
          showFieldMessage(otpInput, 'Incorrect OTP. Use 1234.', 'error');
          hasErrors = true;
        } else {
          clearFieldMessage(otpInput);
        }
      }

      // Validate Dropdowns
      if (acadYear.value === '') {
        showFieldMessage(acadYear, 'Please select academic year.', 'error');
        hasErrors = true;
      } else {
        clearFieldMessage(acadYear);
      }

      if (grade.value === '') {
        showFieldMessage(grade, 'Please select Grade.', 'error');
        hasErrors = true;
      } else {
        clearFieldMessage(grade);
      }

      if (hasErrors) return;

      // Successful submit
      showCustomModal(
        'Admissions Enquiry Submitted!',
        `<p>Thank you, <strong>${nameInput.value.trim()}</strong>!</p>
         <p>Your enquiry for admission to <strong>${grade.value}</strong> for the academic year <strong>${acadYear.value}</strong> has been received.</p>
         <p>An admissions representative will contact you shortly at <strong>${mobileInput.value.trim()}</strong> or <strong>${emailInput.value.trim()}</strong>.</p>
         <p style="margin-top: 15px; font-weight: bold; color: var(--secondary-color);">Enquiry reference ID: SMHS-${Math.floor(100000 + Math.random() * 900000)}</p>`
      );

      form.reset();
      resetFormValidationState();
    });
  }

  function showFieldMessage(inputEl, msg, type) {
    clearFieldMessage(inputEl);
    const msgEl = document.createElement('div');
    msgEl.className = `field-msg ${type}`;
    msgEl.textContent = msg;
    msgEl.style.fontSize = '0.75rem';
    msgEl.style.marginTop = '4px';
    msgEl.style.color = type === 'error' ? '#ef4444' : '#10b981';
    inputEl.style.borderColor = type === 'error' ? '#ef4444' : '#10b981';
    inputEl.parentNode.appendChild(msgEl);
  }

  function clearFieldMessage(inputEl) {
    inputEl.style.borderColor = '';
    const existingMsg = inputEl.parentNode.querySelector('.field-msg');
    if (existingMsg) {
      existingMsg.remove();
    }
  }

  function resetFormValidationState() {
    isMobileValidated = false;
    otpGroup.style.display = 'none';
    otpMessage.textContent = '';
    validateMobileBtn.disabled = false;
    validateMobileBtn.textContent = 'Validate Mobile No';
    validateMobileBtn.style.backgroundColor = '';
  }

  // =========================================================================
  // 4. ANIMATED STATS COUNTER
  // =========================================================================
  const statsSection = document.getElementById('stats-section');
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimatedStats = false;

  if (statsSection && statNumbers.length > 0) {
    const animateStats = () => {
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const isRatio = stat.getAttribute('data-type') === 'ratio';
        const isPlus = stat.getAttribute('data-type') === 'plus';
        let count = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 30; // ms
        const steps = duration / stepTime;
        const increment = target / steps;

        const updateCount = () => {
          count += increment;
          if (count >= target) {
            if (isRatio) {
              stat.textContent = `${target}:1`;
            } else if (isPlus) {
              stat.textContent = `${target}+`;
            } else {
              stat.textContent = Math.floor(target);
            }
          } else {
            if (isRatio) {
              stat.textContent = `${Math.floor(count)}:1`;
            } else if (isPlus) {
              stat.textContent = `${Math.floor(count)}+`;
            } else {
              stat.textContent = Math.floor(count);
            }
            setTimeout(updateCount, stepTime);
          }
        };
        updateCount();
      });
    };

    // Intersection Observer for Scroll Trigger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          animateStats();
          hasAnimatedStats = true;
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // =========================================================================
  // 5. INTERACTIVE CHATBOT WIDGET
  // =========================================================================
  const chatBubble = document.getElementById('chat-bubble');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');

  const botResponses = {
    admissions: "Admissions for academic year 2026-27 are open for LKG to Grade XI. You can fill out the Enquiry Form on the homepage, and our Admissions officer will contact you within 24 hours.",
    fees: "Our fee structure is competitive and varies by grade level. Please contact our main office at mahalakshmischoolsankarankovil@gmail.com or call +91 99429 81423 for a detailed schedule.",
    location: "We are located at: Sri Mahalakshmi Matriculation Hr. Sec. School, Kalugumalai Road, Sankarankovil, Tenkasi District, Tamil Nadu - 627756.",
    contact: "You can reach us at:\nPhone: +91 99429 81423 / +91 99429 81346\nEmail: mahalakshmischoolsankarankovil@gmail.com\nOffice Hours: 9:00 AM - 4:00 PM (Mon-Sat)"
  };

  if (chatBubble && chatWindow && chatClose) {
    chatBubble.addEventListener('click', () => {
      chatWindow.classList.add('active');
    });

    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });

    // Handle Quick Options
    chatBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('chat-option-btn')) {
        const option = e.target.getAttribute('data-value');
        const questionText = e.target.textContent;
        
        addUserMessage(questionText);
        showTypingIndicator();

        setTimeout(() => {
          removeTypingIndicator();
          addBotMessage(botResponses[option]);
          addBotOptions();
        }, 800);
      }
    });

    // Handle Custom Inputs
    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (text === '') return;

        addUserMessage(text);
        chatInput.value = '';
        showTypingIndicator();

        setTimeout(() => {
          removeTypingIndicator();
          
          // Match simple keywords
          const textLower = text.toLowerCase();
          let matched = false;
          
          if (textLower.includes('admission') || textLower.includes('join') || textLower.includes('apply')) {
            addBotMessage(botResponses.admissions);
            matched = true;
          } else if (textLower.includes('fee') || textLower.includes('cost') || textLower.includes('pay')) {
            addBotMessage(botResponses.fees);
            matched = true;
          } else if (textLower.includes('address') || textLower.includes('location') || textLower.includes('where')) {
            addBotMessage(botResponses.location);
            matched = true;
          } else if (textLower.includes('contact') || textLower.includes('phone') || textLower.includes('call') || textLower.includes('email')) {
            addBotMessage(botResponses.contact);
            matched = true;
          }

          if (!matched) {
            addBotMessage("I am a school assistant chatbot. I can help you with admissions, fees, location, and contact info. Please click on one of the quick options below.");
          }
          addBotOptions();
        }, 800);
      });
    }

    function addUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'chat-message user';
      msg.textContent = text;
      chatBody.appendChild(msg);
      scrollToBottom();
    }

    function addBotMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'chat-message bot';
      // Format newlines
      msg.innerHTML = text.replace(/\n/g, '<br>');
      chatBody.appendChild(msg);
      scrollToBottom();
    }

    function addBotOptions() {
      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'chat-options';
      optionsContainer.innerHTML = `
        <button class="chat-option-btn" data-value="admissions">Admissions 2026-27</button>
        <button class="chat-option-btn" data-value="fees">Fee Structure Info</button>
        <button class="chat-option-btn" data-value="location">Campus Location</button>
        <button class="chat-option-btn" data-value="contact">Contact Information</button>
      `;
      chatBody.appendChild(optionsContainer);
      scrollToBottom();
    }

    function showTypingIndicator() {
      const typing = document.createElement('div');
      typing.className = 'chat-message bot typing-indicator';
      typing.id = 'chat-typing-indicator';
      typing.innerHTML = '<i>Typing...</i>';
      chatBody.appendChild(typing);
      scrollToBottom();
    }

    function removeTypingIndicator() {
      const indicator = document.getElementById('chat-typing-indicator');
      if (indicator) indicator.remove();
    }

    function scrollToBottom() {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  // =========================================================================
  // 6. PREMIUM MODAL LOGIC
  // =========================================================================
  const modalOverlay = document.getElementById('general-modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBodyText = document.getElementById('modal-body-text');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOkBtn = document.getElementById('modal-ok-btn');

  if (modalOverlay && modalCloseBtn && modalOkBtn) {
    const hideModal = () => {
      modalOverlay.classList.remove('active');
    };
    modalCloseBtn.addEventListener('click', hideModal);
    modalOkBtn.addEventListener('click', hideModal);
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) hideModal();
    });
  }

  function showCustomModal(title, htmlContent) {
    if (modalOverlay && modalTitle && modalBodyText) {
      modalTitle.textContent = title;
      modalBodyText.innerHTML = htmlContent;
      modalOverlay.classList.add('active');
    } else {
      // Fallback
      alert(title + "\n" + htmlContent.replace(/<[^>]*>/g, ''));
    }
  }

  // Wire up page buttons
  const readMoreButtons = document.querySelectorAll('.read-more-btn, .know-more-btn, .btn-primary:not([type="submit"]):not(#validate-mobile-btn)');
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentSection = btn.closest('section') || btn.closest('.footer');
      let title = "Sri Mahalakshmi School Information";
      let content = "<p>Welcome to Sri Mahalakshmi Matriculation Higher Secondary School. We provide quality education with state-of-the-art facilities, high academic standards, and premium extra-curricular training programs.</p>";

      if (btn.classList.contains('read-more-btn') && parentSection.id === 'intro') {
        title = "Highest Academic Standards";
        content = `<p><strong>Sri Mahalakshmi Matric Hr. Sec School</strong> was founded in 1995 with the goal of creating a climate of learning that is holistic, creative, and highly rewarding.</p>
                   <p>We emphasize positive values such as respect, integrity, hard work, self-discipline, and compassion. Our school ranks among the top schools in Sankarankovil & Tenkasi District and is known for producing 100% pass results in Matriculation Board Exams consecutively.</p>
                   <p>Our curriculum integrates regular textbooks with digital classrooms, active science experiments, computer laboratory projects, and sports mentorship programs.</p>`;
      } else if (parentSection && parentSection.classList.contains('achievements-section')) {
        title = "School Achievements & Awards";
        content = `<p>Sri Mahalakshmi School has been recognized locally and nationally for educational innovation, school administration, and community engagement projects.</p>
                   <p><strong>Awards list:</strong></p>
                   <ul>
                     <li><strong>National School Excellence Award:</strong> Awarded for outstanding sports and science project curriculum.</li>
                     <li><strong>District Sports Championship Banner:</strong> Consecutively won for basketball and athletic track tournaments in Tenkasi District.</li>
                     <li><strong>100% Pass Merit Shield:</strong> Awarded by the Education Department of Tamil Nadu.</li>
                   </ul>`;
      } else if (parentSection && parentSection.id === 'events') {
        title = "Recent Events Detail";
        content = `<p><strong>Montessori Graduation Day:</strong> An annual celebration where our youngest learners graduate from Kindergarten with colorful performances and degrees presented by esteemed educationists.</p>
                   <p><strong>Annual Cultural Festival:</strong> An expression of art, music, and dance where all students participate to display their talents on our state-of-the-art stage auditorium.</p>
                   <p><strong>National Science & Art Exhibition:</strong> Students construct models and research papers to present to judges from technical universities.</p>`;
      } else if (parentSection && parentSection.id === 'news') {
        title = "Latest News & Media Highlights";
        content = `<p>Read about Sri Mahalakshmi School achievements in leading publications:</p>
                   <p>Our students' achievements and the national science exhibition was covered by <em>The Times of India</em>, highlighting academic excellence in Sankarankovil.</p>
                   <p>Our "Joy of Giving" charity drive was covered in detail by <em>The Hindu</em>, documenting how students distributed books and warm clothes to orphanage centers during the festive season.</p>`;
      }

      showCustomModal(title, content);
    });
  });

  // =========================================================================
  // 7. BOARD RESULTS POSTER ZOOM
  // =========================================================================
  const resultsPoster = document.getElementById('results-poster');
  if (resultsPoster) {
    resultsPoster.addEventListener('click', () => {
      showCustomModal(
        'STD XII Board Exam Results 2023-2024',
        `<div style="text-align: center; overflow-y: auto; max-height: 70vh;">
          <img src="images/upload_results_2024.jpg" alt="Sri Mahalakshmi School STD XII Results Poster" style="width: 100%; max-width: 100%; height: auto; border-radius: var(--radius-md); box-shadow: var(--shadow-md);">
        </div>`
      );
    });
  }

});
