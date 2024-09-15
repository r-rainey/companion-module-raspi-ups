const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const got = require('got')

// This module will just query the flask app running on the raspi
// to get UPS information, which is returned in JSON
// Update the variables to reflect whatever we want to display

class zoneminderInstance extends InstanceBase {
    async init(config) {
        console.log("The init function begins")
        console.log(config)
        await this.getInformation()
        setInterval(await this.getInformation(), 30 * 1000)
    }
    async getInformation() {
        // Make a call to the flask app
        const url = `http://${this.config.host}:${this.config.port}`
        console.log(url);
        const response = await got(url).json();
        console.log(response)

    }
    getConfigFields() {
        return [
            {
                type: "static-text",
                id: "info",
                width: 12,
                label: "Information",
                value: "Control a camera from Zoneminder, supports PTZ and creates snapshots on your computer. If you need more cameras, just setup additional modules."
            },
            {
                type: 'textinput',
                id: 'host',
                label: 'Target IP/hostname',
                width: 15,
                regex: Regex.SOMETHING,
            },
            {
                type: 'numeric',
                id: 'port',
                label: 'Port number',
            }

        ]
    }

}