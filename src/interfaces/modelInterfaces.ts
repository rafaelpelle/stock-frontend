export interface UserInterface {
	id: number,
	walletId: number,
	registrationDate: string,
	lastRegularWithdraw: string,
	status: string,
	cpf: string,
	name: string,
}

export interface WalletInterface {
	id: number,
	regularContribution: number,
	additionalContribution: number,
	portabilityContribution: number,
	supplementaryPlanContribution: number,
	insuranceCompanyContribution: number,
	totalBalance: number,
}

export interface TransactionInterface {
	id: number,
	userId: number,
	installmentValue: number,
	numberOfInstallments: number,
	date: string,
	type: string,

}
