import Score from '../entity/score';

class ScoreLogic {

    public static newScore(): Score {
        return new Score();
    }

    public static updateScore(score: Score): void {
        const currentTime: number = new Date().getTime();
        const timeTaken: number = currentTime - score.lastUpdate;
        const extraScore: number =  Math.max(0, Math.floor((Score.maxTime - timeTaken) / 1000 * Score.secondUnit));
        const newScore: number = Score.baseUnit + extraScore;
        score.score += newScore;
        score.lastUpdate = currentTime;
    }

    public static resetScore(score: Score): void {
        score.score = 0;
        score.lastUpdate = new Date().getTime();
    }
}

export default ScoreLogic;
