const BagelShopBasket = require('../src/basket.js');

describe("BagelShopBasket", () => {
    it("add an item to the basket", () => {
        const newBasket = new BagelShopBasket()
        const expected = [{
            "sku": "BGLE",
            "price": "0.49",
            "name": "Bagel",
            "variant": "Everything",
            "quantity": 1
        }]
        const result = newBasket.addABagel("BGLE")
        expect(result).toEqual(expected)
    })

    it("remove an item from the basket", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("COF")
        newBasket.addABagel("BGLP")
        const expected = [{
            "sku": "COF",
            "price": "0.99",
            "name": "Bagel",
            "variant": "",
            "quantity": 1
        }]
        const result = newBasket.removeABagel("BGLP")
        expect(result).toEqual(expected)
    })

    it("gives an error if the basket is full", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("BGLE")
        newBasket.addABagel("BGLE")
        newBasket.addABagel("BGLE")
        newBasket.addABagel("BGLE")
        newBasket.addABagel("BGLE")
        const expected = "Sorry, your basket is full. The last Bagel wasn't added to your basket"
        const result = newBasket.addABagel("cheese", 8)
        expect(result).toEqual(expected)
    })

    it("increase basket capacity", () => {
        const newBasket = new BagelShopBasket()
        const expected = 10
        const result = newBasket.increaseBasket("manager", 10)
        expect(result).toEqual(expected)
    })

    it("gives an error when trying to remove an item that is not in the basket", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("COF")
        newBasket.addABagel("BGLP")
        const expected = "Cannot remove the Bagel. Item not in the basket"
        const result = newBasket.removeABagel("cheese")
        expect(result).toEqual(expected)
    })

    it("shows the price of the bagel", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("COF")
        newBasket.addABagel("BGLP")
        const expected = "0.99"
        const result = newBasket.getBagelPrice("COF")
        expect(result).toEqual(expected)
    })

    it("add more than one bagel", () => {
        const newBasket = new BagelShopBasket()
        const expected = [{
            "sku": "COF",
            "price": "0.99",
            "name": "Bagel",
            "variant": "",
            "quantity": 3
        }]
        const result = newBasket.addABagel("COF", 3)
        expect(result).toEqual(expected)
    })

    it("total sum of the basket", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("BGSE", 5)
        newBasket.addABagel("BGLP", 24)
        const expected = { 
            items: [{
                name: "Bagel Sandwich",
                quantity: 5,
                total: "£14.95",
                discount: "-£0"
            },
            {
                name: "Bagel",
                quantity: 24,
                total: "£7.98",
                discount: "-£1.38"
            }
            ], 
            total: 22.93,
            totalDiscount: 1.38
        }
        const result = newBasket.checkOut()
        expect(result).toEqual(expected)
    })

    it("Receipt", () => {
        const newBasket = new BagelShopBasket()
        newBasket.addABagel("BGSE", 5)
        newBasket.addABagel("BGLP", 24)
        const expected = [
            "Bob's Bagels",
            { 
                items: [{
                    name: "Bagel Sandwich",
                    quantity: 5,
                    total: "£14.95",
                    discount: "-£0"
                },
                {
                    name: "Bagel",
                    quantity: 24,
                    total: "£7.98",
                    discount: "-£1.38"
                }
                ], 
                total: "£22.93",
                totalDiscount: "£1.38"
            },
            "Thank you for your order!"
        ]
        const result = newBasket.receipt()
        expect(result).toEqual(expected)
    })
})