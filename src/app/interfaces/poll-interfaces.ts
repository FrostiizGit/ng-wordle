export interface IPollAnswers {
    text: string,
    value: string,
    vote: number,
    _id: string
  }
export interface IPoll {
    creator: string,
    title: string,
    answers: IPollAnswers[],
    totalVotes: number,
    _id: string
  }

export interface IPollIds {
  pollId: string,
  answerId: string
}