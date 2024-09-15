module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'loadVoltage', name: 'Load Voltage' },
		{ variableId: 'current', name: "Current in mA" },
		{ variableId: 'power', name: 'Power' },
		{ variableId: 'percent', name: 'Percent Left' },
		{ variableId: 'timeRemaining', name: 'Time remaining (hours)' }
	])
}
