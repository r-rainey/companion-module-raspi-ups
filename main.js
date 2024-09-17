const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const got = require('got')

var percent, percentRemaining = ''

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		await this.getInformation() //
		this.setVariableValues({
			'percent': percent,
			'percentRemaining': percentRemaining
		})
		var roo = setInterval(() => {
			console.log('refreshed token');
			this.getInformation();
			this.setVariableValues({
				'percent': percent,
				'percentRemaining': percentRemaining
			})
		}, 30 * 1000)
		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async getInformation() {
		// Make a call to the flask app
		const url = `http://127.0.0.1:5000/`
		console.log(url);
		const response = await got(url);
		// console.log(response)
		var jsontext = JSON.parse(response.body)
		console.log(jsontext)
		percent = jsontext.Percent.toFixed(2)
		percentRemaining = jsontext.Percent_Remaining.toFixed(2)
		// percentRemaining = this.convertDecimalToHoursMinutes(jsontext.Percent_Remaining)
		console.log(percent)
		console.log(percentRemaining)

	}

	convertDecimalToHoursMinutes(decimalHours) {
		const hours = Math.floor(decimalHours);
		const minutes = Math.round((decimalHours - hours) * 60);
		return `${hours}:${minutes}`;
	}

	async configUpdated(config) {
		this.config = config
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				regex: Regex.PORT,
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
