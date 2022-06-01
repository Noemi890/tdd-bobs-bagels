class BagelShopBasket {
    constructor () {
        this.basket = []
        this.basketCapacity = 5
    }

    addABagel(bagel, price, quantity = 1) {
        if (this.basket.length < this.basketCapacity) {
            this.basket.push({
                name: bagel,
                price: price,
                quantity: quantity
            })

            return this.getBagelPrice(bagel, price, quantity)
        }

        return "Sorry, your basket is full. The last Bagel wasn't added to your basket"
    }

    removeABagel(name) {
        for (let i = 0; i < this.basket.length; i++) {
            if (this.basket[i].name === name) {
                this.basket.splice(i, 1)
                return this.basket
            }
        }

        return "Cannot remove the Bagel. Item not in the basket"
    }

    increaseBasket(user) {
        if (user === "manager") {
            this.basketCapacity = 10
            return this.basketCapacity
        }
        return "You don't have authorization"
    }

    getBagelPrice(bagel, price, quantity = 1) {
        return `This ${bagel} Bagel costs ${price}, you added ${quantity} in your basket`
    }

    checkOut() {
        let total = 0
        for (let i = 0; i < this.basket.length; i++) {
            let productCost = this.basket[i].quantity * this.basket[i].price
            total += productCost
        }
        return `Your total basket is ${total}`
    }

}

// const basket = new BagelShopBasket()
// basket.addABagel("ham", 5)
// basket.addABagel("ham", 5)
// basket.addABagel("ham", 5)
// basket.addABagel("ham", 5)
// basket.addABagel("ham", 5)
// basket.addABagel("ham", 5)
// console.log("My Basket", basket.basket)
// console.log("manager tries to change the basket capacity", basket.increaseBasket("manager"))
// console.log("user1 tries to change the basket capacity", basket.increaseBasket("user1"))
module.exports = BagelShopBasket