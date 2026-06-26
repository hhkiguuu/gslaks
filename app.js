let profiles = [];
let index = 0;

async function load() {
  const res = await fetch("/api/profiles");
  profiles = await res.json();
  show();
}

function show() {
  if (!profiles.length) return;

  const p = profiles[index];

  document.getElementById("card").innerHTML = `
    <h2>${p.name || "Unknown"}</h2>
    <p>${p.bio || "No bio"}</p>
    <p>Age: ${p.age || "?"}</p>
  `;
}

function like() {
  index++;
  show();
}

function pass() {
  index++;
  show();
}

load();
