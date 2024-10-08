const messageList = {
	400: 'Bad request',
	401: 'Unauthorized',
	403: 'Forbidden',
	405: 'Method not allowed',
	409: 'Conflict',
	500: 'Internal server error',
}
const HttpError = (status, message = messageList[status]) => {
	const error = new Error(message)
	error.status = status
	return error
}

export default HttpError
