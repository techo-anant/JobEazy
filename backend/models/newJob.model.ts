export class NewJob {
    constructor(
        public companyName: string,
        public positionName: string,
        public date: string,
        public dateToOld: string,
        public siteUrl?: string | null,
        private jobDescription?: string | null,
        public isAccepted?: boolean,
    ) { }

    getJobDescription(): string {
        return this.jobDescription ?? 'No description provided';
    }

    setJobDescription(desc: string): void {
        this.jobDescription = desc;
    }

    getSiteUrl(): string {
        return this.siteUrl ?? 'No URL provided';
    }

    setSiteUrl(Url: string): void {
        this.siteUrl = Url;
    }

    isOld(): boolean {
        const now: Date = new Date();
        const oldDate: Date = new Date(this.dateToOld);
        return now > oldDate;
    }
}

export type Job = {
    companyName: string,
    positionName: string,
    date: string,
    dateToOld: string,
    siteUrl?: string | null,
    jobDescription?: string | null,
    isAccepted?: boolean,
} 