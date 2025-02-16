import './App.css'
import { useState } from 'react'
import MovieItem from './components/MovieItem/MovieItem'
import MovieScore from './components/MovieScore/MovieScore'
import { useEffect } from 'react'
import {disableReactDevTools} from '@fvilers/disable-react-devtools'

import bgElem from '/hero-bg.png'
import sound from '/boxOfficeResult.wav'

if (import.meta.env.VITE_ENV === 'production') disableReactDevTools()

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
}

function App() {

  const [movies, setMovies] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighScore] = useState(sessionStorage.getItem('highscore') || 0);
  const [displayButton, setDisplayButton] = useState(true);
  const [lost, setLost] = useState(false);

  const audio = document.getElementById('clickSound');

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://boxoffice-api-sutu.onrender.com', API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies,...data])

    } catch (error) {
      console.error(`Error fetching movies: ${error}`)

    }
  }

  const updateScore = (userDec) => {
    let decision = movies[0].revenue < movies[1].revenue;
    setDisplayButton(false);
    audio.play();
    setTimeout(() => {
      if (userDec == decision) {
        setScore((score) => score + 1);
        rotateElements();
        setDisplayButton(true); // Show the button again after 5 seconds
      } else {
        setLost(true);
      }
      
    }, 5000);
  }

  const rotateElements = () => {
    setMovies((prevMovies) => {
      const newMovies = [...prevMovies];
      newMovies.shift();
      return newMovies;
    })
    if (movies.length <= 4) {
      fetchMovies()
    }
  }

  const reload = () => {
    window.location.reload();
  }

  useEffect(() => {
    fetchMovies();
  }, [])

  useEffect(() => {
    if (score > highscore) {
      setHighScore(score);
      sessionStorage.setItem('highscore', score)
    }
  }, [score])

  return (
    <>
      <img className='background' src={bgElem} alt='hero-background'></img>
      <audio id="clickSound" src="/boxOfficeResult.wav" preload="auto"></audio>
      <h2 className='movieHeader'><b>BOX OFFICE HIGHER LOWER</b></h2>
      <div className='container'>
          {movies.map((item, index) => (
            <MovieItem key={index} item={item} prevTitle={movies[index-1]} index={index} updateScore={updateScore} displayButton={displayButton}/>
          ))}
            {!lost ? (
              <div>
                <div className='vsCircle'>
                  <div className='vsText'><b>VS</b></div>
                </div>
                <MovieScore className='highScore' title={'High Score'} score={highscore}/>
                <MovieScore className='curScore' title={'Score'} score={score}/>
              </div>
          ) : <div className='playAgain'>
                <h2>You scored: {score} </h2>
                <br/>
                <button className='playAgainButton' onClick={() => reload()}>Play again?</button>
              </div>
            }
            
      </div>
    </>

  )
}



export default App
