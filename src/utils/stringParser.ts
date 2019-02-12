export const handleBrazilianMoney = (value: string | number) => {
	if (value === undefined || value === null) {
		return undefined
	}
	return 'R$ ' + Number(value).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
}

export const valueToPercentage = (value: number) => {
	return value ? `${value.toFixed(1)}%` : '0.0%'
}
