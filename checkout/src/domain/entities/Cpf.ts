export default class Cpf {
    private FIRST_DIGIT_FACTOR = 10
    private SECOND_DIGIT_FACTOR = 11

    constructor(private value: string) {
        if(!this.isValid(value)) throw new Error("Invalid Cpf")
        this.value = this.normalizeCpf(value)
    }

    private isValid(cpf: string): boolean {
        cpf = this.normalizeCpf(cpf)
        if (!this.isValidLength(cpf)) return false
        if(this.allCharactersEquals(cpf)) return false
        const firstLastDigit = this.calculateDigit(cpf, this.FIRST_DIGIT_FACTOR)
        const secondLastDigit = this.calculateDigit(cpf, this.SECOND_DIGIT_FACTOR)
        return `${firstLastDigit}${secondLastDigit}` == this.lastDigits(cpf)
    }

    private normalizeCpf(cpf: string) {
        return cpf.replace(/[^0-9]+/g, "")
    }

    private isValidLength(cpf: string) {
        return cpf.length == 11
    }

    private allCharactersEquals(cpf: string) {
        return /^(.)\1+$/g.test(cpf)
    }

    private calculateDigit(cpf: string, factor: number) {
        let total = 0
        let index = 0
        let cpfArray = cpf.split("")
        while (factor > 1) {
            total += factor-- * Number(cpfArray[index++])
        }
        let rest = total % 11 
        return rest < 2 ? 0 : 11 - rest
    }

    private lastDigits(cpf: string) {
        return cpf.slice(9)
    }

    getValue() {
        return this.value
    }
}