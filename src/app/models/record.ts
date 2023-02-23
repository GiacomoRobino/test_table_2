export class Record {
    id: string;
    matchTeams: any;
    date: any;
    time: any;
    result: any;
    constructor(id: string, matchTeams: {home: string, away: string}, date: any, time: any, result: any){
        this.id = id;
        this.matchTeams = matchTeams;
        this.date = date;
        this.time = time;
        this.result = result;
    }
}