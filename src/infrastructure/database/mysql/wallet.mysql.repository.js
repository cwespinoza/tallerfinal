import { DataTypes } from "sequelize";
import sequelize from "./connection.js";

export const WalletModel = sequelize.define("Wallet", {
    name: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    currency: { type: DataTypes.STRING(3), allowNull: false, defaultValue: "BOB" },
    balance: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    userId: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

export default class WalletMySQLRepository {
    async save(walletEntity) {
        const wallet = await WalletModel.create({
            name: walletEntity.name,
            type: walletEntity.type,
            currency: walletEntity.currency,
            balance: walletEntity.balance,
            userId: walletEntity.userId
        });
        return wallet.toJSON();
    }

    async findByUserId(userId) {
        const wallets = await WalletModel.findAll({
            where: { userId },
            order: [["id", "DESC"]]
        });
        return wallets.map((wallet) => wallet.toJSON());
    }

    async findById(id) {
        const wallet = await WalletModel.findByPk(id);
        return wallet ? wallet.toJSON() : null;
    }

    async delete(id) {
        const wallet = await WalletModel.findByPk(id);
        if (!wallet) return null;
        await wallet.destroy();
        return true;
    }
}

