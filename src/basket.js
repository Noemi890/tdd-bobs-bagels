class BagelShopBasket {
    constructor () {
        this.basket = []
        this.basketCapacity = 5
        this.inventory = require('../inventory.json').inventory
        this.discountByProduct = {
            BGLO: {
                quantity: 6,
                discount: 0.45
            },
            BGLP: {
                quantity: 12,
                discount: 0.69
            },
            BGLE: {
                quantity: 6,
                discount: 0.45
            }
        }
    }

    addABagel(bagel, quantity = 1) {

        for (let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].sku === bagel && this.basket.length < this.basketCapacity) {
                this.basket.push(this.inventory[i])
                for (let j = 0; j < this.basket.length; j++) {
                    if (this.basket[j].sku === bagel) {
                        this.basket[j].quantity = quantity
                    }
                }
                // console.log("my basket", this.basket)
                return this.basket
            }

        }

        return "Sorry, your basket is full. The last Bagel wasn't added to your basket"
    }

    removeABagel(bagel) {
        for (let i = 0; i < this.basket.length; i++) {
            if (this.basket[i].sku === bagel) {
                this.basket.splice(i, 1)
                return this.basket
            }
        }
        return "Cannot remove the Bagel. Item not in the basket"
    }

    increaseBasket(user, newBasketCapacity) {
        if (user === "manager") {
            this.basketCapacity = newBasketCapacity
            return this.basketCapacity
        }
        return "You don't have authorization"
    }

    getBagelPrice(bagel) {
        let price = ""
        for (let i = 0; i < this.basket.length; i++) {
            if (this.basket[i].sku === bagel) {
                price = this.basket[i].price
            }
            // console.log("my price", price)
            return price
        }
       
    }

    checkOut() {
        let total = 0
        let totalDiscount = 0
        let items = []
        for (let i = 0; i < this.basket.length; i++) {
            const discount = this.getDiscountByProduct(this.basket[i].sku, this.basket[i].quantity)
            const productCost = (this.basket[i].quantity * this.basket[i].price) - discount
            items.push({
                name: this.basket[i].name,
                quantity: this.basket[i].quantity,
                total: `£${productCost.toFixed(2)}`,
                discount: `-£${discount}`
            })
            total += productCost
            totalDiscount += discount
            
        }
        // console.log("my checkout", items, "my total", total)
        return {items, total, totalDiscount}
    }

    getDiscountByProduct(productSKU, quantity) {
        if (!this.discountByProduct[productSKU]) {
            return 0
        }
        const discountOptions = this.discountByProduct[productSKU]
        return Math.floor(quantity/discountOptions.quantity) * discountOptions.discount
    }
    
    receipt() {
        const checkout = this.checkOut()
        let receipt = ["Bob's Bagels", {
            items: checkout.items,
            total: `£${checkout.total}`,
            totalDiscount: `£${checkout.totalDiscount}`
        }, "Thank you for your order!"]
        console.log("my receipt", receipt)
        return receipt;
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