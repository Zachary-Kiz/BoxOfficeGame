import './MovieItem.css'
import CountUp from 'react-countup'

const MovieItem = ({item, prevTitle, index, updateScore, displayButton}) => {

    return (
      <div className="movieItem">
              
            <img className='movieImage' src={`https://image.tmdb.org/t/p/w500${item.path}`}/>
            <div><b>{item.title}</b></div>
            { index == 1 && displayButton ? 
            <div className='alignMovieText'>
              has a<br></br>
              <button className='decisionButton' onClick={()=> updateScore(true)}>Higher</button>
              <br></br>
              <button className='decisionButton' onClick={() => updateScore(false)}>Lower</button>
              <br></br>
              box office result than <b>{prevTitle.title}</b>
            </div> : 
              index == 1 ? <><div>made</div><div className='moneyMade loadMoney'><b>$<CountUp start={0} end={item.revenue} duration={4}></CountUp></b></div></> : 
              <><div>made</div><div className='moneyMade'><b>$<CountUp start={item.revenue} end={item.revenue}></CountUp></b></div></>
            }
          </div>
    )
}

export default MovieItem;