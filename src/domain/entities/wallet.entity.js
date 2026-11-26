export default class WalletEntity {
    constructor({ id, name, type, currency, balance, userId }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.currency = currency ? currency.toUpperCase() : "BOB";
        this.balance = balance !== undefined ? Number(balance) : 0;
        this.userId = userId;
    }
}

