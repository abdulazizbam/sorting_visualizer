const main = document.querySelector('main')
const algosCon = document.querySelector('.algos')
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
let activeAlgo = document.querySelector('.algos .active')
main.appendChild(canvas)

canvas.width = window.innerWidth
canvas.height = 500


const list = new  listVisualizer(ctx, canvas)
const sorter = new Sorter(list)
list.populateList()
list.drawList()


const wait = async (time)=>{
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}


algosCon.addEventListener('click', async (e) => {

    if(!e.target.matches('button')) return;

    

    algosCon.querySelector('.active').classList.remove('active')
    e.target.classList.add('active')
    activeAlgo = e.targe
})


startBtn.addEventListener('click', async () => {

    if(!activeAlgo) return

    stopBtn.classList.remove('inactive')

    if(activeAlgo.id === 'selectionSort') {
        sorter.startSorting()
        await sorter.selectionSort()
        stopBtn.classList.add('inactive')
        return
    }

    if(activeAlgo.id === 'bubbleSort') {
        sorter.startSorting()
        sorter.bubbleSort()
        stopBtn.classList.add('inactive')
        return
    }

})

startBtn.addEventListener('click', async () => {
    if(!activeAlgo) return

    sorter.stopSorting()
    await wait(2000)
    stopBtn.classList.add('inactive')
})




