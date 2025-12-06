"use strict"

const Nls = require("alibabacloud-nls")
const fs = require("fs")
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs))

const URL = "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1"
const APPKEY = "KUl8oFxZENWhNfqY"
const TOKEN = "6916c956e5ed4e0db3f29dd93e718fd8"

let audioStream = fs.createReadStream("test1.pcm", {
    encoding: "binary",
    highWaterMark: 1024
})
let b1 = []

audioStream.on("data", (chunk) => {
    let b = Buffer.from(chunk, "binary")
    b1.push(b)
})

audioStream.on("close", async ()=>{
    while (true) {
        let st = new Nls.SpeechTranscription({
            url: URL,
            appkey:APPKEY,
            token:TOKEN
        })

        st.on("started", (msg)=>{
            console.log("Client recv started:", msg)
        })

        st.on("changed", (msg)=>{
            console.log("Client recv changed:", msg)
        })

        st.on("completed", (msg)=>{
            console.log("Client recv completed:", msg)
        })

        st.on("closed", () => {
            console.log("Client recv closed")
        })

        st.on("failed", (msg)=>{
            console.log("Client recv failed:", msg)
        })

        st.on("begin", (msg)=>{
            console.log("Client recv begin:", msg)
        })

        st.on("end", (msg)=>{
            console.log("Client recv end:", msg)
        })

        try {
            await st.start(st.defaultStartParams(), true, 6000)
        } catch(error) {
            console.log("error on start:", error)
            continue
        }

        try {
            for (let b of b1) {
                if (!st.sendAudio(b)) {
                    throw new Error("send audio failed")
                }
                await sleep(20)
            }
        } catch(error) {
            console.log("sendAudio failed:", error)
            continue
        }

        try {
            console.log("close...")
            await st.close()
        } catch(error) {
            console.log("error on close:", error)
        }
        await sleep(2000)
    }
})