let select = document.querySelectorAll('.currency')
let btn = document.getElementById('btn')
let input = document.getElementById('input')

fetch('https://api.frankfurter.app/currencies')
.then(res=>res.json())
.then(res=>displayDropDown(res))

function displayDropDown(res){
  let curr = Object.entries(res)
  for(let i=0;i<curr.length;i++){
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`
    select[0].innerHTML += opt
    select[1].innerHTML += opt
  }
}

btn.addEventListener('click',()=>{
  let curr1 = select[0].value
  let curr2 = select[1].value
  let inputVal = input.value
  let date = document.getElementById('date').value

  if(curr1===curr2){
    document.getElementById('error').innerText = "Choose different currencies"
  } else if(inputVal==="" || inputVal<=0){
    document.getElementById('error').innerText = "Enter a valid amount"
  } else {
    document.getElementById('error').innerText = ""
    localStorage.setItem("curr1", curr1)
    localStorage.setItem("curr2", curr2)
    localStorage.setItem("amount", inputVal)
    localStorage.setItem("date", date)
    window.location.href = "result.html"
  }
})
