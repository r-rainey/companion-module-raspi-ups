module.exports = async function (self) {
	self.setVariableDefinitions([
		{ variableId: 'loadVoltage', name: 'Load Voltage' },
		{ variableId: 'current', name: "Current in mA" },
		{ variableId: 'power', name: 'Power' },
		{ variableId: 'percent', name: 'Percent Left' },
		{ variableId: 'percentRemaining', name: 'Percent of battery left until 3.7V' }
	])
}
