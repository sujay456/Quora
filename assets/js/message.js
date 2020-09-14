function init() {
  gsap.from(".user", { y: -50, duration: 0.5, stagger: 0.1, opacity: 0 });
}

console.log();
let container = $(".messageBox-container");

container.click(() => {
  console.log("Hello");
  event.stopPropagation();
});
