import { useState, useEffect} from "react"



export default function Main() {

   const [meme,setMeme] = useState({
    topText : "One does not simply",
    bottomText : "Walk into Mordor" ,
    imageURL : "http://i.imgflip.com/1bij.jpg"
})
    const [allMemes, setAllMemes] = useState([])

    

useEffect(()=> {
fetch("https://api.imgflip.com/get_memes")
.then(res => res.json())
.then (data => setAllMemes(data.data.memes))
},[])

function handleChange(event){
const {value,name} = event.currentTarget
setMeme((prevMeme) => ({...prevMeme, [name]:value}))
}

function getNewMeme () {

    const number = Math.floor(Math.random()* allMemes.length)
    const newImage = allMemes[number].url
    setMeme((prevMeme) => ({
    ...prevMeme, imageURL:newImage
    }))
}
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange} //calling fn on change event 
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getNewMeme} >Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src= {meme.imageURL}/>
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}