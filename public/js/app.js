console.log('the js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#searchResult1')
const m2 = document.querySelector('#searchResult2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    if (location.length > 0) {

        m1.textContent = "Loading..."
        m2.textContent = ""

        fetch('/weather?address=' + location).then((response) => {

            response.json().then((data) => {
                if (data.error) {
                    m1.textContent = "Sorry no weather report is available for that location. Try another search."
                } else {
                    console.log(data)
                    m1.textContent = "Weather for "+data.summary
                    m2.textContent = "Todays temperature "+data.today.temperature+" degrees with "+data.today.rain+"% chance of rain. "+data.today.summary
                }
            })
            
        })
    } else {
        m1.textContent = "Sorry no weather report is available for that location. Try another search."
        m2.textContent = ""
    }
})