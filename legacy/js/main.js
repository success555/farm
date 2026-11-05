/**
 * Doutare Agro Farm Limited
 * Interactive Scripts & Mobile/WebView Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Sticky Header Behavior
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Enterprise Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const enterpriseCards = document.querySelectorAll('.enterprise-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');

      enterpriseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 4. Interactive Produce & Wholesale Order Estimator
  const produceSelect = document.getElementById('calcProduce');
  const quantityInput = document.getElementById('calcQuantity');
  const unitLabel = document.getElementById('calcUnitLabel');
  const unitPriceEl = document.getElementById('calcUnitPrice');
  const totalPriceEl = document.getElementById('calcTotalPrice');
  const sendWhatsAppOrderBtn = document.getElementById('sendWhatsAppOrder');
  const emailQuoteBtn = document.getElementById('emailQuote');

  // Baseline market price estimates (in NGN, customizable upon direct inquiry)
  const producePrices = {
    plantain: { name: 'Giant High-Yield Plantain', unit: 'Bunches', price: 4500, min: 10 },
    cassava_raw: { name: 'Farm-Fresh Cassava Tubers', unit: 'Bags (100kg)', price: 18000, min: 5 },
    garri: { name: 'Processed Garri (Fine Grain)', unit: 'Bags (50kg)', price: 32000, min: 3 },
    maize: { name: 'High-Grade Yellow/White Maize', unit: 'Bags (100kg)', price: 48000, min: 5 },
    catfish_live: { name: 'Live Table-Size Catfish', unit: 'Kilograms (Kg)', price: 3800, min: 20 },
    catfish_smoked: { name: 'Smoked Kiln-Dried Catfish', unit: 'Cartons (5kg)', price: 26000, min: 2 },
    poultry_eggs: { name: 'Farm-Fresh Jumbo Eggs', unit: 'Crates', price: 4800, min: 10 },
    poultry_broiler: { name: 'Dressed/Live Broiler Chicken', unit: 'Birds', price: 6500, min: 10 },
    plantain_suckers: { name: 'High-Yield Plantain Suckers (Propagation Stock)', unit: 'Suckers', price: 600, min: 50 }
  };

  function updateCalculator() {
    if (!produceSelect || !quantityInput) return;
    const selectedKey = produceSelect.value;
    const itemData = producePrices[selectedKey] || producePrices.plantain;
    
    const qty = parseInt(quantityInput.value, 10) || itemData.min;
    if (unitLabel) unitLabel.textContent = itemData.unit;
    
    const formattedUnitPrice = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(itemData.price);
    const total = qty * itemData.price;
    const formattedTotal = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(total);

    if (unitPriceEl) unitPriceEl.textContent = `${formattedUnitPrice} / ${itemData.unit}`;
    if (totalPriceEl) totalPriceEl.textContent = formattedTotal;

    // Update WhatsApp link dynamic prefilled text
    if (sendWhatsAppOrderBtn) {
      const msg = encodeURIComponent(
        `Hello Doutare Agro Farm Limited! I would like to place an order inquiry:\n\n` +
        `🌾 Item: ${itemData.name}\n` +
        `📦 Quantity: ${qty} ${itemData.unit}\n` +
        `💰 Estimated Total: ${formattedTotal}\n` +
        `📍 Delivery Location: (Please advise delivery options from Ayakoromo / Delta State)\n\nThank you!`
      );
      sendWhatsAppOrderBtn.href = `https://wa.me/qr/IFALUE5YG2W5N1?text=${msg}`;
    }

    // Update Email quote dynamic link
    if (emailQuoteBtn) {
      const subject = encodeURIComponent(`Order Inquiry: ${itemData.name} (${qty} ${itemData.unit})`);
      const body = encodeURIComponent(
        `Hello Doutare Agro Farm Sales Team,\n\n` +
        `I am interested in procuring produce from your Ayakoromo farm:\n\n` +
        `Produce: ${itemData.name}\n` +
        `Quantity: ${qty} ${itemData.unit}\n` +
        `Estimated Total: ${formattedTotal}\n\n` +
        `Kindly send your commercial invoice, pickup availability, and logistics terms.\n\n` +
        `Best regards,`
      );
      emailQuoteBtn.href = `mailto:doutareagro@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  produceSelect?.addEventListener('change', updateCalculator);
  quantityInput?.addEventListener('input', updateCalculator);
  updateCalculator();

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive && answer) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAnswer = firstItem.querySelector('.faq-answer');
    firstItem.classList.add('active');
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 30 + 'px';
  }

  // 6. Interactive Gallery Filtering & Lightbox Viewer
  const galleryFilterBtns = document.querySelectorAll('.gallery-btn');
  const allGalleryItems = Array.from(document.querySelectorAll('#mainGalleryGrid .gallery-item'));
  let visibleGalleryItems = [...allGalleryItems];
  let currentLightboxIndex = 0;

  // Filter gallery items by category
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-gallery-filter');

      visibleGalleryItems = [];
      allGalleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCategory === filterVal) {
          item.style.display = 'block';
          visibleGalleryItems.push(item);
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Lightbox Modal Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  function updateLightboxView(index) {
    if (!visibleGalleryItems.length || !lightboxImg) return;
    if (index < 0) index = visibleGalleryItems.length - 1;
    if (index >= visibleGalleryItems.length) index = 0;
    currentLightboxIndex = index;

    const item = visibleGalleryItems[currentLightboxIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-title')?.textContent || 'Doutare Agro Field Photo';
    const tag = item.querySelector('.gallery-tag')?.textContent || 'Farm Photo';
    const loc = item.querySelector('.gallery-loc span')?.textContent || 'Ayakoromo town, Burutu LGA';

    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || title;
      }
      if (lightboxCaption) {
        lightboxCaption.innerHTML = `<strong>${title}</strong> &bull; <span style="color: var(--accent-gold);">${tag}</span><br><small style="color: #94a3b8;">📍 ${loc}</small>`;
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = `Photo ${currentLightboxIndex + 1} of ${visibleGalleryItems.length}`;
      }
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  // Open Lightbox on card click
  allGalleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = visibleGalleryItems.indexOf(item);
      currentLightboxIndex = idx !== -1 ? idx : 0;
      updateLightboxView(currentLightboxIndex);
      lightboxModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightboxView(currentLightboxIndex - 1);
  });
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateLightboxView(currentLightboxIndex + 1);
  });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // Keyboard navigation (Arrow keys & Escape)
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') updateLightboxView(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') updateLightboxView(currentLightboxIndex + 1);
  });

  // Mobile Touch Swipe Navigation
  let touchStartX = 0;
  let touchEndX = 0;
  lightboxModal?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightboxModal?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      updateLightboxView(currentLightboxIndex + 1); // Swipe left = next
    } else if (touchEndX > touchStartX + swipeThreshold) {
      updateLightboxView(currentLightboxIndex - 1); // Swipe right = prev
    }
  }, { passive: true });

  // 7. Toast Notification Utility
  const toast = document.getElementById('toastMsg');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 8. Copy to Clipboard Utility
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Direct info: ${textToCopy}`);
        });
      }
    });
  });

  // 9. Contact & Booking Form Handler
  const contactForm = document.getElementById('farmContactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName')?.value.trim();
    const phone = document.getElementById('cPhone')?.value.trim();
    const interest = document.getElementById('cInterest')?.value;
    const message = document.getElementById('cMessage')?.value.trim();

    const formattedMsg = encodeURIComponent(
      `Hello Doutare Agro Farm Limited!\n\n` +
      `👤 Name: ${name}\n` +
      `📞 Phone: ${phone}\n` +
      `🌱 Area of Interest: ${interest}\n` +
      `💬 Message: ${message}\n\n` +
      `Inquiry sent from official farm website.`
    );

    showToast("Launching WhatsApp inquiry with your message...");
    setTimeout(() => {
      window.open(`https://wa.me/qr/IFALUE5YG2W5N1?text=${formattedMsg}`, '_blank');
    }, 400);
  });

  // 10. Active Scrollspy for Navigation Links
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  }, { passive: true });
});
