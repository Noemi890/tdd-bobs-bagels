const BagelShopBasket = require('../src/basket.js');

describe("BagelShopBasket", () => {
    it("add an item to the basket", () => {
        const newBasket = new BagelShopBasket()
        const expected = newBasket.getBagelPrice("ham", 5)
        const result = newBasket.addABagel("ham", 5)
        expect(result).toEqual(expected)
    })

    it("remove an item from the basket", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("salmon", 10)
        newBasket.addABagel("ham", 5)
        const expected = [{
            name: "salmon",
            price: 10,
            quantity: 1
        }]
        const result = newBasket.removeABagel("ham")
        expect(result).toEqual(expected)
    })

    it("gives an error if the basket is full", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("salmon", 10)
        newBasket.addABagel("ham", 5)
        newBasket.addABagel("cheese", 8)
        newBasket.addABagel("ham", 5)
        newBasket.addABagel("salmon", 10)
        const expected = "Sorry, your basket is full. The last Bagel wasn't added to your basket"
        const result = newBasket.addABagel("cheese", 8)
        expect(result).toEqual(expected)
    })

    it("increase basket capacity", () => {
        const newBasket = new BagelShopBasket()
        const expected = 10
        const result = newBasket.increaseBasket("manager")
        expect(result).toEqual(expected)
    })

    it("gives an error when trying to remove an item that is not in the basket", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("salmon", 10)
        newBasket.addABagel("ham", 5)
        const expected = "Cannot remove the Bagel. Item not in the basket"
        const result = newBasket.removeABagel("cheese")
        expect(result).toEqual(expected)
    })

    it("shows the price of the bagel", () => {
        const newBasket = new BagelShopBasket()
        const expected = `This ham Bagel costs 5, you added 1 in your basket`
        const result = newBasket.addABagel("ham", 5)
        expect(result).toEqual(expected)
    })

    it("adds more than one Bagel at once", () => {
        const newBasket = new BagelShopBasket()
        const expected = `This salmon Bagel costs 10, you added 3 in your basket`
        const result = newBasket.addABagel("salmon", 10, 3)
        expect(result).toEqual(expected)
    })

    it("total sum of the basket", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("salmon", 10, 3)
        newBasket.addABagel("ham", 5)
        newBasket.addABagel("cheese", 8, 2)
        newBasket.addABagel("ham", 5)
        newBasket.addABagel("salmon", 10, 4)
        const expected = `Your total basket is 96`
        const result = newBasket.checkOut()
        expect(result).toEqual(expected)
    })
})