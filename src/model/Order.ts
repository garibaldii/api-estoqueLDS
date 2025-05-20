import { getModelForClass, prop } from "@typegoose/typegoose";
import Product from "./abstract/Product";

class Order {

    @prop({ required: true, unique: true})
    public orderCode: string

    @prop({ required: true })
    public productList: Product[]

    @prop({ required: true })
    public departureDate: Date

    constructor(orderCode: string, productList: Product[], departureDate: Date) {
        this.orderCode = orderCode;
        this.productList = productList;
        this.departureDate = departureDate
    }

}

const Order_MongoDB_Model = getModelForClass(Order)

export { Order, Order_MongoDB_Model }