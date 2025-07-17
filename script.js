const totalLevels = 25;
let unlockedLevel = parseInt(localStorage.getItem('unlockedLevel')) || 1;
const container = document.getElementById('levelContainer');

// Clear container in case of reload
container.innerHTML = '';

const buttonPositions = []; // to store button centers for chain drawing

for (let i = 1; i <= totalLevels; i++) {
  const levelBtn = document.createElement('button');
  levelBtn.classList.add('level-btn');

  if (i <= unlockedLevel) {
    levelBtn.classList.add('unlocked');
    levelBtn.innerText = i;
    levelBtn.addEventListener('click', () => {
      const confirmStart = confirm(`Start Level ${i}?`);
      if (confirmStart) {
        window.location.href = `game.html?level=${i}`;
      }
    });
  } else {
    levelBtn.classList.add('locked');
    levelBtn.innerHTML = `<span>${i}</span><span class="lock-icon">🔒</span>`;
    levelBtn.addEventListener('click', () => {
      // Trigger shake animation
      levelBtn.classList.add('shake');
      setTimeout(() => levelBtn.classList.remove('shake'), 500);
    });
  }

  // Positioning logic (Zigzag)
  const verticalSpacing = 130;
  const y = (i - 1) * verticalSpacing + 50;

  let x;
  if (i === 1) {
    x = 0.5;
  } else if (i % 2 === 0) {
    x = 0.2;
  } else {
    x = 0.8;
  }

  levelBtn.style.position = 'absolute';
  levelBtn.style.top = `${y}px`;
  levelBtn.style.left = `calc(${x * 100}% - 35px)`;

  container.appendChild(levelBtn);

  // Store center positions for SVG
  buttonPositions.push({
    x: x * container.clientWidth,
    y: y + 35,
  });
}

// Draw SVG chains
for (let i = 0; i < buttonPositions.length - 1; i++) {
  const start = buttonPositions[i];
  const end = buttonPositions[i + 1];

  const chainSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  chainSvg.classList.add('chain-line');

  const left = Math.min(start.x, end.x) - 75;
  const top = Math.min(start.y, end.y) - 20;

  chainSvg.style.left = `${left}px`;
  chainSvg.style.top = `${top}px`;
  chainSvg.style.width = `150px`;
  chainSvg.style.height = `100px`;

  const startX = start.x - left;
  const startY = start.y - top;
  const endX = end.x - left;
  const endY = end.y - top;

  const cp1X = startX;
  const cp1Y = (startY + endY) / 2;
  const cp2X = endX;
  const cp2Y = (startY + endY) / 2;

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const strokeColor = i < unlockedLevel - 1 ? "url(#gold-gradient)" : "url(#silver-gradient)";
  const d = `M${startX},${startY} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`;

  path.setAttribute("d", d);
  path.setAttribute("stroke", strokeColor);
  path.setAttribute("stroke-width", "6");
  path.setAttribute("fill", "none");
  path.setAttribute("stroke-linecap", "round");

  chainSvg.appendChild(path);
  container.appendChild(chainSvg);
}

function unlockNextLevel(currentLevel) {
  const nextLevel = currentLevel + 1;
  if (nextLevel > totalLevels) return;

  localStorage.setItem('unlockedLevel', nextLevel);
  const svgChains = document.querySelectorAll('svg.chain-line');
  const targetChain = svgChains[currentLevel - 1];

  if (targetChain) {
    targetChain.classList.add('breaking');
    setTimeout(() => {
      const path = targetChain.querySelector('path');
      if (path) {
        path.setAttribute('stroke', 'url(#gold-gradient)');
      }
      targetChain.classList.remove('breaking');
      targetChain.classList.add('chain-glow-gold');
    }, 500);
  }

  location.reload();
}
function openFeedback() {
  window.open('feedback.html', '_blank');
}


