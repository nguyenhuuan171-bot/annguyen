const handle = document.getElementById("handle");
const cord = document.getElementById("cord");
const bulb = document.getElementById("bulbGlass");

const origin = { x: 150, y: 380 };
let pos = { x: 150, y: 380 };
let vel = { x: 0, y: 0 };

let dragging = false;
let isOn = false;
let triggered = false;

const spring = 0.08;
const damping = 0.85;
const pullThreshold = 450; // kéo tới đây thì bật/tắt

handle.addEventListener("mousedown", () => {
  dragging = true;
  triggered = false;
});

document.addEventListener("mouseup", () => {
  dragging = false;
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;

  const rect = document.querySelector("svg").getBoundingClientRect();
  pos.x = e.clientX - rect.left;
  pos.y = e.clientY - rect.top;

  // nếu kéo đủ sâu thì bật/tắt đèn
  if (pos.y > pullThreshold && !triggered) {
    isOn = !isOn;
    triggered = true;
  }
});

function animate() {
  requestAnimationFrame(animate);

  if (!dragging) {
    vel.x += (origin.x - pos.x) * spring;
    vel.y += (origin.y - pos.y) * spring;

    vel.x *= damping;
    vel.y *= damping;

    pos.x += vel.x;
    pos.y += vel.y;
  }

  handle.setAttribute("cx", pos.x);
  handle.setAttribute("cy", pos.y);

  const midX = (origin.x + pos.x) / 2;
  const midY = (origin.y + pos.y) / 2 + 40;

  cord.setAttribute(
    "d",
    `M150 305 Q${midX} ${midY} ${pos.x} ${pos.y}`
  );

  // 💡 BẬT / TẮT ĐÈN
  if (isOn) {
    bulb.setAttribute("fill", "yellow");
  } else {
    bulb.setAttribute("fill", "#555");
  }
}

animate();
