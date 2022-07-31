const button = document.querySelector('.btn')
const bill = document.querySelector('.calculator__input--bill');
const number = document.querySelector('.calculator__input--number')
const radios = document.querySelectorAll('.calculator__radio')
const radioLabels = document.querySelectorAll('.calculator__input--radio')
const tipInput = document.querySelector('.calculator__input--tip')
const totalTip = document.querySelector('#total-tip')
const splitTip = document.querySelector('#split-tip')
const error = document.querySelector('.error')

let billAmt = 0
let tipPercent = 0
let  peopleNumber = 0
let splitTipAmt = 0
let totalTipAmt = 0
let disabled = true
let errorMsg = false

radios.forEach(item => {
  const itemContainer = item.parentElement
  item.addEventListener('input', (e) => {
   removeSelectedRadioClass()
   tipInput.value = ''
   itemContainer.classList.add('selected-radio')
    tipPercent = parseInt(e.target.value)
    disabled = false
    renderDOM()
  })
})

bill.addEventListener('input', (e) => {
 billAmt = parseInt(e.target.value)
 disabled = false
 renderDOM()
})

tipInput.addEventListener('input', (e) => {
 removeSelectedRadioClass()
 tipPercent = parseInt(e.target.value)
 disabled = false
 renderDOM()
})

number.addEventListener('input', (e) => {
 const val = parseInt(e.target.value)
 if(!val){
  errorMsg = true
  renderDOM()
 } else {
  errorMsg = false
 }
 peopleNumber = val
 disabled = false
 renderDOM()
})

function removeSelectedRadioClass(){
 radioLabels.forEach(item => {
  item.classList.remove('selected-radio')
 })
}

function renderDOM(){
 button.disabled = disabled
 if(errorMsg){
   error.style.display = 'inline'
 } else {
  error.style.display = 'none'
 }
 if(isSafeToDisplayTotal()){
  totalTip.textContent = `$${totalTipAmt.toFixed(2)}`
  splitTip.textContent = `$${splitTipAmt.toFixed(2)}`
 } else {
  totalTip.textContent = '...'
  splitTip.textContent = '...'
 }
 
}

function isSafeToDisplayTotal(){
  if(billAmt && (tipPercent || tipPercent >= 1) && peopleNumber ){
   totalTipAmt = billAmt * tipPercent / 100
   splitTipAmt = totalTipAmt / peopleNumber
   return true
  }
  return false
}

function reset(){
 billAmt = 0
 tipPercent = 0 
 peopleNumber = 0
 splitTipAmt = 0
 totalTipAmt = 0
 disabled = true
 removeSelectedRadioClass()
 totalTip.textContent = '$0.00'
 splitTip.textContent = '$0.00'
 button.disabled = disabled
 tipInput.value = ''
 bill.value = ''
 number.value = ''
 radios.forEach(radio => {
  radio.checked = false
 })
}

button.addEventListener('click', () => {
 reset()
})

