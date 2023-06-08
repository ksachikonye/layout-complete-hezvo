gsap.config({ trialWarn: false });
console.clear();
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
let smoother = ScrollSmoother.create({
  smooth: 2
});

let split = new SplitText("h1", { type: "lines" });
let masks;
function makeItHappen() {
  masks = [];
  split.lines.forEach((target) => {
    let mask = document.createElement("span");
    mask.className = "mask";
    target.append(mask);
    masks.push(mask);
    gsap.to(mask, {
      scaleX: 0,
      transformOrigin: "right center",
      ease: "none",
      scrollTrigger: {
        trigger: target,
        // markers: {
        //   startColor: "white",
        //   endColor: "#42a6e0",
        //   fontSize: "12px",
        //   indent: 10
        // },
        scrub: true,
        start: "top center",
        end: "bottom center"
      }
    });
  });
}

window.addEventListener("resize", newTriggers);

function newTriggers() {
  ScrollTrigger.getAll().forEach((trigger, i) => {
    trigger.kill();
    masks[i].remove();
  });
  split.split();
  makeItHappen();
}

makeItHappen();

  /*** GSAP Horizontal Scroll ***/

    const sections = document.querySelectorAll(".hs-section");

    // Section Pinning
    sections.forEach((section) => {
        // Check if section has horizontal scrolling
        if (section.dataset.type === "horizontal") {
            const cards = section.querySelector(".hs-section__cards");
            const card = section.querySelectorAll(".hs-section__card");

            gsap.to(cards, {
                x: () => {
                    return -cards.scrollWidth + card[0].offsetWidth;
                },
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: () => "top top",
                    end: () => `+=${cards.scrollWidth - card[0].offsetWidth}`,
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    //Uncomment below to activate Snap on Scroll
                    // snap: 1 / (card.length - 1),
                },
            });
            // Use standard vertical scroll pinning
        } else {
            ScrollTrigger.create({
                // markers: true,
                trigger: section,
                start: "top top",
                pin: true,
                snap: 1 / (sections.length - 1),
                anticipatePin: 1,
            });
        }
    });
      /*** END — GSAP Horizontal Scroll ***/


  //text-scale-up test
const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".textScaleUpWrapper",
      scrub: true,
      pin: true,
      
      start: "center bottom",
      end: "+=75%"
    }
  })
  
  .from(".text-scale-up", {
    scale: 0.5, 
    ease: "none"
  })
  
  .from(".line-2", {
    scaleX:0,
    ease:"none",
    transformOrigin:"center top"
  }, 0);