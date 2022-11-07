import Cpf from "../../src/domain/entities/Cpf"

test("Não deve criar um cpf com caracteres com tamanho diferente de 11 caracteres", () => {
    expect(() => new Cpf("123")).toThrowError(new Error("Invalid Cpf"))
})

test("Não deve criar um cpf com caracteres iguais", () => {
    expect(() => new Cpf("111.111.111-11")).toThrowError(new Error("Invalid Cpf"))
})

test("Não deve criar um cpf inválido", () => {
    expect(() => new Cpf("111.222.333-98")).toThrowError(new Error("Invalid Cpf"))
})

test("Deve criar um cpf válido", () => {
    const cpf = new Cpf("078.100.277-00")
    expect(cpf.getValue()).toBe("07810027700")
})

test("Deve criar um cpf válido", () => {
    const cpf = new Cpf("259.556.978-37")
    expect(cpf.getValue()).toBe("25955697837")
})