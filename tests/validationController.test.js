const {describe, it} = require("node:test")
const assert = require("node:assert")

const {isValidUsername,isValidPassword} = require("../controllers/validationController")

const generateString = (n) => {
    let str = ""
    for (let i = 100; i < 100+n; i++) {
        str += String.fromCodePoint(i)        
    }
    return str
}

describe("isValidUsername", () => {
    it("gives false for non-string input", () => {
        assert.ok(!isValidUsername([1,2,3]));
    })

    it("gives false for empty string", () => {
        assert.ok(!isValidUsername(""));
    })

    it("gives false for input string with length < 3", () => {
        assert.ok(!isValidUsername("as"));
    })

    it("gives false for input string with length > 30", () => {
        let input = generateString(31)

        const result = isValidUsername(input)

        assert.ok(!result);
    })

    it("gives true for input string with length equals 3", () => {
        assert.ok(isValidUsername("123"));
    })

    it("gives true for input string with length equals 30", () => {
        let input = generateString(30)

        const result = isValidUsername(input)

        assert.ok(result);
    })

    it("gives true for input string with length in [3,30] interval", () => {
        let input = generateString(15)

        const result = isValidUsername(input)

        assert.ok(result);
    })

})

describe("isValidPassword", () => {
    it("gives false for non-string input", () => {
        assert.ok(!isValidPassword([1,2,3]));
    })

    it("gives false for empty string", () => {
        assert.ok(!isValidPassword(""));
    })

    it("gives false for input string with length < 8", () => {
        let input = generateString(7)

        const result = isValidPassword(input)

        assert.ok(!result);
    })

    it("gives true for input string with length equals 8", () => {
        let input = generateString(8)

        const result = isValidPassword(input)

        assert.ok(result);
    })

    it("gives true for input string with length > 8", () => {
        let input = generateString(9)

        const result = isValidPassword(input)

        assert.ok(result);
    })
})