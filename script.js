document.getElementById("carbon-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const km = +document.getElementById("km").value;
  const elec = +document.getElementById("electricity").value;
  const house = +document.getElementById("household").value;
  const meat = document.getElementById("meat").value;
  const recycle = document.getElementById("recycle").value;
  const flights = document.getElementById("flights").value;
  const shower = +document.getElementById("shower").value;
  const plastic = document.getElementById("plastic").value;
  const orders = +document.getElementById("orders").value;
  const car = document.getElementById("car").value;
  const energy = document.getElementById("energy").value;

  let score = 0;
  score += km / 10;
  score += (elec / house) / 50;
  score += (meat === "Yes") ? 15 : 5;
  score += (recycle === "No") ? 5 : -5;
  score += (flights === "Yes") ? 20 : 0;
  score += shower;
  score += (plastic === "Yes") ? 5 : -2;
  score += orders / 2;
  score += (car === "Yes") ? 10 : -5;
  score += (energy === "Non-renewable (coal/oil/gas)") ? 10 : -10;

  let level = "", message = "";
  if (score < 40) {
    level = "🟢 Low";
    message = "You're doing great! 🌿 Keep up the sustainable habits!";
  } else if (score < 70) {
    level = "🟡 Moderate";
    message = "You're on the right path! ";
  } else {
    level = "🔴 High";
    message = "Time to rethink! Reduce car use, plastic, and go green 🌎";
  }

  document.getElementById("result").classList.remove("hidden");
  document.getElementById("result").innerHTML = `
    <h2>Your Carbon Score: ${Math.round(score)}</h2>
    <h3>Impact Level: ${level}</h3>
    <p>${message}</p>
    <h4>🌟 Personalized Tips to Reduce Your Carbon Footprint</h4>
    <ul>
      <li>💡 Switch to LED lights</li>
      
      <li>🚍 Use public transport or 🚲 cycle</li>
      <li>🥗 Eat plant-based meals twice a week</li>
      <li>🛒 Reduce packaging and shop locally</li>
      <li>☀️ Install solar panels if possible</li>
      <li>🔌 Unplug electronics when not in use</li>
      <li>✈️ Limit flight travel</li>
    </ul>
  `;
    showAIAdvice({
    km,
    electricity: elec,
    house,
    meat,
    recycle,
    flights,
    shower,
    plastic,
    orders,
    car,
    energy
  });

});

// Live value update
document.getElementById("km").oninput = function() {
  document.getElementById("km-val").textContent = this.value;
};
document.getElementById("electricity").oninput = function() {
  document.getElementById("elec-val").textContent = this.value;
};
document.getElementById("shower").oninput = function() {
  document.getElementById("shower-val").textContent = this.value;
};
document.getElementById("orders").oninput = function() {
  document.getElementById("orders-val").textContent = this.value;
};



// === AI Advisor Logic ===
function getAIAdvice(inputs) {
  let tips = [];

  if (inputs.km > 200) tips.push("🚗 Consider carpooling or using public transport to reduce emissions from driving.");
  if (inputs.electricity > 1000) tips.push("⚡ High electricity usage detected. Try switching to energy-efficient appliances.");
  if (inputs.meat === "Yes") tips.push("🥩 Reducing meat intake can significantly lower your carbon footprint.");
  if (inputs.recycle === "No") tips.push("♻️ Start recycling more frequently to minimize landfill waste.");
  if (inputs.flights === "Yes") tips.push("✈️ Avoid frequent flights or consider offsetting your flight emissions.");
  if (inputs.shower > 10) tips.push("🚿 Shorter showers help save both water and energy.");
  if (inputs.plastic === "Yes") tips.push("🛍️ Minimize use of plastic bags by switching to reusable alternatives.");
  if (inputs.orders > 10) tips.push("📦 Consolidate online shopping to reduce packaging and delivery emissions.");
  if (inputs.car === "Yes" && inputs.km > 150) tips.push("🚘 Limit personal car use by planning trips better.");
  if (inputs.energy === "Non-renewable (coal/oil/gas)") tips.push("🔋 Consider switching to renewable energy sources like solar or wind.");

  if (tips.length === 0) tips.push("🎉 Great job! Your lifestyle choices are eco-friendly. Keep it up!");

  return tips;
}

function showAIAdvice(inputs) {
  const advice = getAIAdvice(inputs);
  const adviceSection = document.getElementById("ai-advice");
  adviceSection.classList.remove("hidden");
  adviceSection.innerHTML = `
    <h3>🤖 AI Advisor Suggestions</h3>
    <ul>${advice.map(t => `<li>${t}</li>`).join("")}</ul>
  `;
}
