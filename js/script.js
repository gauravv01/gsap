document.addEventListener("DOMContentLoaded", function () {
  /* Utilities */

  // number formate with comma
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /* Slide Animation */
  function slideAnimation(el, config = {}, scrollTriggerConfig = {}) {
    let finalTarget, targetChild;
    document.querySelectorAll(el).forEach((item) => {
      const animConfig = item.dataset.animConfig
        ? JSON.parse(item.dataset.animConfig)
        : {};
      const sTriggerConfig = Object.assign(
        {
          trigger: item,
          // once: false,
          start: "top bottom-=150",
          toggleActions: "play pause resume reset",
        },
        scrollTriggerConfig
      );
      const finalConfig = Object.assign(
        {
          y: 100,
          alpha: 0,
          stagger: 0.15,
          // ease: "power4.Out",
          ease: "back.out(0.7)",
          duration: 0.8,
          scrollTrigger: sTriggerConfig,
        },
        config,
        animConfig
      );
      if (finalConfig.targetChild) {
        targetChild = finalConfig.targetChild;
        delete finalConfig.targetChild;
      }
      finalTarget = targetChild ? item.querySelectorAll(targetChild) : item;

      gsap.from(finalTarget, finalConfig);
    });
  }
  /* Menu */
  slideAnimation(".top-nav", {
    x: 0,
    y: -10,
    duration: 1,
  });
  /* Responsive Menu */
  function menuClickAnimation() {
    const hamburger = $("#hamburger-icon"),
      topHeader = $(".top-header"),
      mainMenu = $(".main-menu"),
      mainMenuList = $(".main-menu-list"),
      mainMenuListLi = $(".main-menu-list>li");

    const tl = gsap.timeline();

    hamburger.on("click", (e) => {
      e.preventDefault();

      const isMenuOpened = topHeader.hasClass("menu-opened");
      if (isMenuOpened) {
        tl.kill();
        tl.to(mainMenu, {
          duration: 0.2,
          ease: "power1.out",
          right: -460,

          onComplete: function () {
            topHeader.removeClass("menu-opened");
          },
        });
      } else {
        topHeader.addClass("menu-opened");
        tl.fromTo(
          mainMenu,
          {
            right: -460,
          },
          {
            right: 0,
            duration: 0.2,
            ease: "power1.out",
          }
        ).fromTo(
          mainMenuListLi,
          {
            alpha: 0,
            y: 30,
          },
          {
            alpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.3,
            ease: "power1.out",
          }
        );
      }
    });
  }
  menuClickAnimation();

  /* Text Splitting */
  const splitted = new SplitType(".text-slide-up", {
    types: "lines, words, chars",
  });
  $(splitted.lines).wrap("<div class='text-slide-up-wrapper'></div>");

  //   Text slide animation
  slideAnimation(".text-slide-up", {
    targetChild: ".char",
    y: 100,
    x: 0,
    stagger: 0.013,
  });
  //   Liquidity Ways Box Animation
  slideAnimation(".top-header__bottom", {
    targetChild: " .fade-in",
    y: 0,
    x: 0,
    alpha: 0,
    stagger: 0.3,
  });

  // Header action-btn
  slideAnimation(".top-header__bottom", {
    targetChild: " .btn",
    y: 0,
    x: 0,
    stagger: 0,
    ease: "back.out(1.7)",
    duration: 0.3,
    scale: 0.9,
    delay: 0.3,
  });

  // Operatioins Number Animation

  function counterUpAnimation(el) {
    const targets = gsap.utils.toArray(el);
    targets.forEach((target) => {
      gsap.from(target, {
        textContent: 0,
        duration: 1,
        ease: "power1.in",
        snap: { textContent: 1 },
        stagger: {
          each: 1.0,
          onUpdate: function () {
            this.targets()[0].innerHTML = numberWithCommas(
              Math.ceil(this.targets()[0].textContent)
            );
          },
          onComplete: function () {
            target.innerHTML = target.dataset.target;
          },
        },
        scrollTrigger: {
          trigger: target,
          start: "top bottom-=120",
        },
      });
    });
  }

  function statesBoxAnimation(el) {
    const targets = gsap.utils.toArray(el);
    targets.forEach((target, i) => {
      gsap.from(target, {
        //   y: 100,
        x: () => {
          let xVal = 0;
          if (i == 0) {
            xVal = -1;
          } else if (i == 2) {
            xVal = 1;
          }
          return xVal * 100;
        },
        scrollTrigger: {
          trigger: target,
          scrub: 2,
          start: "top bottom-=110",
          end: "top center-=100",
          onEnter: function (x) {
            counterUpAnimation(target.querySelector(".states"));
          },
        },
      });
    });
  }
  statesBoxAnimation(".states-counters__box");

  slideAnimation(".ceo-image", {
    x: 0,
    y: 50,
    rotation: -180,
    scale: 0.3,
    // duration: 1,
  });
  slideAnimation(".ceo-bio-btn", {
    scale: 0,
    x: 0,
    y: 0,
    duration: 0.3,
  });
  /* Footer */

  function footerSlideUpAnimation(el) {
    slideAnimation(el, {
      targetChild: " .slide-up",
      y: 50,
      // y: 5,
      stagger: 0.05,
      ease: "power1.out",
      duration: 0.3,
    });
  }
  footerSlideUpAnimation(".footer");
});
