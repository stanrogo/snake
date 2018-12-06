class Score {
    public score: number;
    public lastUpdate: number;
    public static readonly baseUnit: number = 50;
    public static readonly maxTime: number = 3 * 1000;
    public static readonly secondUnit: number = 10;

    constructor() {
        this.score = 0;
        this.lastUpdate = new Date().getTime();
    }
}

export default Score;
