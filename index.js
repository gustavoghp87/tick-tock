const express = require('express')
const app = express()
const axios = require('axios')
const server = "https://piso-de-mercado-restful.herokuapp.com"
// const server = "http://localhost:3000"

const callToServer = async () => {
    const axiosReq = await axios(`${server}/api/update`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {psw: 'Buy the milk'}
    })
    const data = await axiosReq.data
    console.log(data)
}

const checkActive = () => {
    console.log("Check active")
    setTimeout(() => {
        console.log("Check active 2")
        const timestampNow = Date.now()
        //const dateNow = new Date(timestampNow).toLocaleString("es-AR", {timeZone: "America/Buenos_Aires"})
        const timestampToLocale = timestampNow - 1000 * 60 * 60 *3
        const dateNowString = new Date(timestampToLocale).toLocaleString("es-AR", {timeZone: "UTC"})
        const activeDay = (new Date(timestampToLocale)).getDay()>0 && (new Date(timestampToLocale)).getDay()<6 ? true : false
        const localeHour = parseInt(dateNowString.split(' ')[1])
        const activeHour = localeHour>9 && localeHour<18 ? true : false
        const nowActive = activeDay && activeHour ? true : false
        console.log(`\nHoy es ${dateNowString}`)
        console.log("Hoy es activo:", activeDay, ", hora activa:", activeHour)
        console.log("Conclusión", nowActive)
        if (nowActive) callToServer()
        checkActive()
    }, 1000*60*5)
}

app.use(express.json())

app.listen(6001, () => {
    console.log("Listening on port 6001")
    checkActive()
})
