export default {
  env: {
    development: 'development',
    production: 'production'
  },
  messages: {
    restrictedAccess: "You don't have the permission to perform this action",
    tokenRequired: "Access Denied, token required",
    emailNotVerified: "Email has not been verified.",
    unauthorizedToken: "Unauthorized Token",
    notSubscribed: "You are not subscribed",
    unauthorizedAccess: 'Unauthorized access',
    invalidActivationLink: 'Activation Link is expired or used already',
    notFound: '%s was not found',
    retrievedSuccess: '%s retrieved successfully',
    createdSuccess: '%s created successfully',
    updatedSuccess: '%s updated successfully',
    deletedSuccess: '%s deleted successfully',
    questionNotFound: 'Question was not found',
    answerNotFound: 'Answer was not found',
    notificationNotFound: 'Notification was not found',
    alreadyVoted: 'You have already voted for this answer',
    alreadySubscribed: 'You have already subscribed for this question',
    notVoted: 'You have not voted for this answer',
    canNotVoteYourself: 'You can not vote for your answer',
    loginSuccess: 'Login successfully',
    logoutSuccess: 'Logout successfully',
    invalidCredentials: 'Invalid credentials',
    accountCreated: 'Registration Successful, Check Email for Activation Link',
    accountActivated: 'Account Activated Successfully',
    activationEmailSent: 'Check Email for Account Activation Link',
    usernameExists: 'Username already exists',
    somethingWentWrong: 'Something went wrong',
    subscribedToQuestion: 'Subscribed to question successfully',
    unsubscribedFromQuestion: 'Unsubscribed from question successfully',
    emailExists: 'Email already exists',
    invalidPasswordError: 'Password must be at least 6 characters, a lowercase and uppercase letter, a numeric and special character.',
    bestAnswerAlreadyExists: 'Best answer already selected for this question',
    bestAnswerSelectedSuccess: 'Best answer selected successfully',
    notificationAlreadyRead: 'Notification already marked as read',
    markNotificationAsRead: 'Notification marked as read successfully',
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
