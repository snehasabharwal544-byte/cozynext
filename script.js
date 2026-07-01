// HEADER SCROLL EFFECT
const header = document.querySelector("[data-header]");
function updateHeader() {
  if (window.scrollY > 20) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", updateHeader);
updateHeader();
// MOBILE MENU
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}
// BOOKING FORM
const bookingForm = document.querySelector("[data-booking-form]");
const checkIn = document.querySelector("[data-checkin]");
const checkOut = document.querySelector("[data-checkout]");
const formNote = document.querySelector("[data-form-note]");
const today = new Date().toISOString().split("T")[0];
if (checkIn && checkOut) {
  checkIn.min = today;
  checkOut.min = today;
  checkIn.addEventListener("change", () => {
    checkOut.min = checkIn.value;
    // If checkout date is before checkin date, clear it
    if (checkOut.value && checkOut.value < checkIn.value) {
      checkOut.value = checkIn.value;
    }
  });
}
if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(bookingForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const checkin = formData.get("checkin");
    const checkout = formData.get("checkout");
    const message = `Hello Cozy Nest Apartment,\n\nI would like to request a booking.\n\nName: ${name}\nPhone: ${phone}\nCheck-in: ${checkin}\nCheck-out: ${checkout}`;
    
    const whatsappNumber = "9419582916";
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    // Open WhatsApp in new tab
    window.open(whatsappURL, "_blank");
    if (formNote) {
      formNote.textContent = "✅ Redirecting you to WhatsApp...";
      formNote.style.color = "#c66b3d";
      setTimeout(() => {
        formNote.textContent = "";
      }, 5000);
    }
    bookingForm.reset();
    // Reset date inputs min value
    checkIn.min = today;
    checkOut.min = today;
  });
}
// MAP EMBED
window.onload = function() {
  const iframe = document.getElementById("mapFrame");
  if (iframe) {
    // Embed link showing general Noida region on map
    iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112117.81831889812!2d77.30752538183713!3d28.5353272991054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a431281613%3A0x550ae22c6b3e616f!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1719390234567!5m2!1sen!2sin";
  }
};
// GALLERY LIGHTBOX
const galleryImages = document.querySelectorAll('.gallery-grid img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;
if (galleryImages.length && lightbox && lightboxImg) {
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage();
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
  });
  const showImage = () => {
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
  };
  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  };
  const nextImage = () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage();
  };
  const prevImage = () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage();
  };
  // Close triggers
  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  // Navigation triggers
  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    nextImage();
  });
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    prevImage();
  });
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    }
  });
}
// REVIEWS & RATING FORM
const stars = document.querySelectorAll('.star');
 const ratingInput = document.getElementById('rating-value');
 let selectedRating = 0;
 if (stars.length) {
   // Highlight stars based on index
   const highlightStars = (count) => {
     stars.forEach((star, index) => {
       if (index < count) {
         star.classList.add('selected');
       } else {
         star.classList.remove('selected');
      }
     });
   };
   // Attach event listeners
   stars.forEach((star, index) => {
     // Hover highlight
     star.addEventListener('mouseover', () => {
       highlightStars(index + 1);
     });
    //  Remove hover highlight (restore current selection)
     star.addEventListener('mouseout', () => {
  highlightStars(selectedRating);
     });     // Save selection
star.addEventListener('click', () => {
         selectedRating = index + 1;
       if (ratingInput) {
         ratingInput.value = selectedRating;
       }
       highlightStars(selectedRating);
     });
   });
}
// // EMAILJS REVIEW SUBMITTER
 const reviewForm = document.getElementById("reviewForm");
 const confirmation = document.getElementById("confirmation");
 Check if EmailJS is available in the window
  if (typeof emailjs !== 'undefined') {
   // Initialize EmailJS with your Public Key
   emailjs.init("nOk9PO4Pqdk5Q3EfN");
   }
 if (reviewForm) {
   reviewForm.addEventListener("submit", function(e) {
     e.preventDefault();
     if (selectedRating === 0) {
       if (confirmation) {
         confirmation.textContent = "⚠️ Please select a rating score (1 to 5 stars).";
         confirmation.style.color = "#c66b3d";
       }
       return;
     }
     if (typeof emailjs === 'undefined') {
       console.error("EmailJS SDK failed to load.");
       if (confirmation) {
         confirmation.textContent = "❌ Service temporarily unavailable. Please try again later.";
         confirmation.style.color = "red";
       }
       return;    
       }
//     // --- EMAILJS SERVICE & TEMPLATE CREDENTIALS ---
    // IMPORTANT: Replace the values below with your Service ID and Template ID from the EmailJS Dashboard
const SERVICE_ID = "service_whe21va";   // Replace with e.g. "service_gmail"
    const TEMPLATE_ID = "template_gl2ceml"; // Replace with your template ID
    
    // DEMO FALLBACK: If service/template ID is still set to placeholder, simulate success
    if (SERVICE_ID === "service_whe21va" || TEMPLATE_ID === "ttemplate_gl2ceml") {
    console.warn("EmailJS is in demo/preview mode. Please configure SERVICE_ID and TEMPLATE_ID inside script.js.");
      
      if (confirmation) {       confirmation.textContent = "✅ Thank you! Your review was recorded successfully (Demo Mode).";
confirmation.style.color = "green";      }
      
       // Reset the form
       reviewForm.reset();
       selectedRating = 0;
       if (ratingInput) ratingInput.value = 0;       stars.forEach(s => s.classList.remove('selected'));
      
      setTimeout(() => {
         if (confirmation) confirmation.textContent = "";
       }, 5000);
      
       return;
     }
     // Real EmailJS Send Trigger
     if (confirmation) {
       confirmation.textContent = "⌛ Sending your review...";
       confirmation.style.color = "var(--muted)";
     }
 emailjs.sendForm(service_whe21va, template_gl2ceml, this)       .then(() => {
        if (confirmation) {
           confirmation.textContent = "✅ Thank you! Your review was sent to our email.";
           confirmation.style.color = "green";
       }
        
         // Reset inputs
         reviewForm.reset();
         selectedRating = 0;
         if (ratingInput) ratingInput.value = 0;
         stars.forEach(s => s.classList.remove('selected'));
        
         setTimeout(() => {
           if (confirmation) confirmation.textContent = "";
         }, 5000);
       })
       .catch(err => {
         console.error("EmailJS send failed:", err);
         if (confirmation) {
           confirmation.textContent = "❌ Error sending review. Please try again.";
           confirmation.style.color = "red";
         }
       });
   });
 }
//review part
