let curr1 = localStorage.getItem("curr1")
let curr2 = localStorage.getItem("curr2")
let amount = localStorage.getItem("amount")

const today = new Date()
const pastDate = new Date()
pastDate.setDate(today.getDate() - 7)

const formatDate = d => d.toISOString().split("T")[0]

fetch(`https://api.frankfurter.app/${formatDate(pastDate)}..${formatDate(today)}?from=${curr1}&to=${curr2}`)
.then(res=>res.json())
.then(data=>{
  let labels = Object.keys(data.rates)
  let values = labels.map(l=>data.rates[l][curr2])

  new Chart(document.getElementById('rateChart'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${curr1} to ${curr2}`,
        data: values,
        borderColor: '#ff6b6b',
        fill: false,
        tension: 0.3
      }]
    }
  })

  let trend = document.getElementById('trend')
  if(values[values.length-1] > values[0]){
    trend.innerText = "📈 Trend: Price is increasing"
    trend.style.color = "lightgreen"
  } else if(values[values.length-1] < values[0]){
    trend.innerText = "📉 Trend: Price is decreasing"
    trend.style.color = "red"
  } else {
    trend.innerText = "➡️ Trend: Stable"
    trend.style.color = "yellow"
  }
})
