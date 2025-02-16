import { useEffect, useState } from 'react';
import './MovieScore.css'

const MovieScore = ({className, title, score}) => {

    const [isScoreChanged, setIsScoreChanged] = useState(false)

    const stopAnimation = title == "High Score" ? sessionStorage.getItem('highscore') : 0

    useEffect(() => {
        if (score != stopAnimation && score != 0) {
            setIsScoreChanged(true)
            setTimeout(() => {
                setIsScoreChanged(false)
            }, 1500)
        }
    }, [score])

    return (
        <div className={isScoreChanged ? 'growScore ' + className : className}>{title}: {score}</div>
    )
}

export default MovieScore;