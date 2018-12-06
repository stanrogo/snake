import ScoreLogic from '../logic/scoreLogic';
import Score from '../entity/score';

class ScoreService {
    public readonly score: Score;

    constructor() {
        this.score = new Score();
    }

    public updateScore(): void {
        ScoreLogic.updateScore(this.score);
    }

    public resetScore(): void {
        ScoreLogic.resetScore(this.score);
    }
}

export default ScoreService;
