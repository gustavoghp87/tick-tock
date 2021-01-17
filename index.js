const express = require('express')
const app = express()
const axios = require('axios')
//https://piso-de-mercado.herokuapp.com/api/update

const callToServer = async () => {
    const axiosReq = await axios('http://localhost:3000/api/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {psw: 'Buy the milk'}
    })
    const data = await axiosReq.data
    console.log(data)
}

const checkActive = () => {
    console.log("Check active")
    ;setTimeout(() => {
        console.log("Check active 2")
        const timestampNow = Date.now()
        //const dateNow = new Date(timestampNow).toLocaleString("es-AR", {timeZone: "America/Buenos_Aires"})
        const timestampToLocale = timestampNow - 1000 * 60 * 60 *3
        const dateNowString = new Date(timestampToLocale).toLocaleString("es-AR", {timeZone: "UTC"})
        
        const activeDay = (new Date(timestampToLocale)).getDay()>0 && (new Date(timestampToLocale)).getDay()<6 ? true : false
        
        const localeHour = parseInt(dateNowString.split(' ')[1])
        
        const activeHour = localeHour>10 && localeHour<17 ? true : false
        
        const nowActive = activeDay && activeHour ? true : false
        
        console.log(`\nHoy es ${dateNowString}`)
        console.log("Hoy es activo:", activeDay, ", hora activa:", activeHour)
        console.log("Conclusión", nowActive)

        if (nowActive) callToServer()

        checkActive()
    }, 1000*60)
}

app.use(express.json())

app.listen(6001, () => {
    console.log("Listening on port 6001")
    checkActive()
})
