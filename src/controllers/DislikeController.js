const Dev = require('../models/Dev')

class DislikeController {
	async store(req, res) {
		const { user } = req.headers
		const { devID } = req.params

		const loggedDev = await Dev.findById(user)
		const targetDev = await Dev.findById(devID)

		if (!targetDev) {
			return res.status(400).json({ error: 'Dev not exists' })
		}

		loggedDev.dislikes.push(targetDev._id)

		await loggedDev.save()

		return res.json(loggedDev)
	}
}

module.exports = new DislikeController()
