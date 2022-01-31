export default {
  env: {
    development: 'development',
    production: 'production'
  },
  notifications: {
    vote: 'Vote notification',
    bestAnswer: 'Best answer notification',
    answer: 'New answer notification'
  },
  notificationContents: {
    bestAnswer: '%s selected the best answer for %s',
    answer: '%s made answer on %s',
    vote: '%s %s your answer on %s'
  },
  votes: {
    up: 'up',
    down: 'down'
  },
  voteKeys: {
    up: 'upvoted',
    down: 'downvoted'
  }
};
