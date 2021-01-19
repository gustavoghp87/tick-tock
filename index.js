const express = require('express')
const app = express()
const axios = require('axios')
const server = "https://piso-de-mercado-restful.herokuapp.com"
// const server = "http://localhost:3000"

const callToServer = async () => {
    try {
        const axiosReq = await axios(`${server}/api/update`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {psw: 'Buy the milk'}
        })
        const data = await axiosReq.data
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

const checkActive = () => {
    console.log("Check active")
    setTimeout(() => {
        console.log("Check active run")
        try {
            const timestampNow = Date.now()
            const dateNow = new Date(timestampNow).toLocaleString("es-AR", {timeZone: "America/Buenos_Aires"})
            const timestampToLocale = timestampNow - 1000 * 60 * 60 *3
            const dateNowString = new Date(timestampToLocale).toLocaleString("es-AR", {timeZone: "UTC"})
            const weekDay = (new Date(timestampToLocale)).getDay()
            const activeDay = weekDay>0 && weekDay<6 ? true : false
            const localeHour = parseInt(dateNowString.split(' ')[1])
            const activeHour = localeHour>9 && localeHour<18 ? true : false
            const nowActive = activeDay && activeHour ? true : false
            console.log(`\nHoy es ${dateNowString}, día ${weekDay} de la semana, locale hour: ${localeHour}`)
            console.log("Hoy es activo:", activeDay, ", hora activa:", activeHour)
            console.log("Conclusión", nowActive)
            if (nowActive) callToServer()
        } catch (error) {console.log(error)} finally {checkActive()}
    }, 1000*60*30)
}

app.use(express.json())

app.listen(6001, () => {
    console.log("Listening on port 6001")
    checkActive()
})
