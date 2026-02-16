"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    let navOpen = false;
    navToggle.addEventListener("click", () => {
      navOpen = !navOpen;
      siteNav.classList.toggle("is-open", navOpen);
      if (navOpen) {
        navToggle.setAttribute("aria-expanded", "true");
      }
    });
  }

  const pricingButtons = document.querySelectorAll(".toggle-btn");
  const priceNodes = document.querySelectorAll("[data-price]");

  const setPlan = (plan) => {
    pricingButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.plan === plan);
    });

    priceNodes.forEach((node) => {
      const value = node.dataset[plan];
      if (value) {
        node.textContent = value;
      }
    });
  };

  setPlan("monthly");

  pricingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.plan === "yearly") {
        return;
      }
      setPlan(button.dataset.plan);
    });
  });

  const accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    const triggers = accordion.querySelectorAll(".accordion-trigger");

    const togglePanel = (trigger) => {
      const panelId = trigger.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      trigger.setAttribute("aria-expanded", "false");
      if (panel) {
        panel.hidden = true;
      }
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => togglePanel(trigger));
      trigger.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          togglePanel(trigger);
        }
      });
    });
  }

  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const isValid = validateSignupForm(signupForm);
      const status = signupForm.querySelector(".form-status");
      if (status) {
        status.textContent = isValid
          ? "Thanks! We will send updates soon."
          : "Please check your details and try again.";
      }
    });
  }

  initHeroCarousel();
});

function initHeroCarousel() {
  const carousel = document.querySelector("[data-hero-carousel]");
  if (!carousel) {
    return;
  }

  const items = Array.from(carousel.querySelectorAll(".carousel-item"));
  if (items.length === 0) {
    return;
  }

  const controls = carousel.querySelectorAll("[data-carousel-dir]");
  let index = 0;

  const update = (nextIndex) => {
    items[index].classList.remove("is-active");
    items[index].setAttribute("aria-hidden", "true");

    index = (nextIndex + items.length) % items.length;
    items[index].classList.add("is-active");
    items[index].setAttribute("aria-hidden", "false");
  };

  items.forEach((item, itemIndex) => {
    const isActive = itemIndex === 0;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-hidden", String(!isActive));
  });

  let timer = setInterval(() => update(index + 1), 6000);

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => update(index + 1), 6000);
  };

  controls.forEach((button) => {
    button.addEventListener("click", () => {
      const dir = button.dataset.carouselDir;
      update(dir === "prev" ? index - 1 : index + 1);
      restart();
    });
  });
}

function validateSignupForm() {
  return true;
}
