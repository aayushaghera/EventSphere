// Health controller
export function healthCheck(req, res) {
  res.status(200).send({
    success: 'true',
    message: 'API is healthy'
  });
}