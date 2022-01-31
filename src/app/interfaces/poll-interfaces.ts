// Type for the data received from the API
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

// Types for data body when voting on a poll
export interface IPollIds {
  pollId: string,
  answerId: string
}

// Types for creating a new poll
export interface IPollNewAnswers {
  text: string,
  value: string
}

export interface IPollNew {
  title: string,
  answers: IPollNewAnswers[]
}
