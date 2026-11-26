import WalletEntity from "../../domain/entities/wallet.entity.js";

export default class WalletService {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }

    async createWallet(data) {
        if (!data.name || !data.type || !data.userId) {
            throw new Error("El nombre, el tipo y el usuario son obligatorios");
        }
        if (data.balance !== undefined && Number.isNaN(Number(data.balance))) {
            throw new Error("El saldo inicial debe ser un número válido");
        }

        const wallet = new WalletEntity(data);
        return await this.walletRepository.save(wallet);
    }

    async getWalletsByUserId(userId) {
        return await this.walletRepository.findByUserId(userId);
    }

    async deleteWallet(id, userId) {
        const wallet = await this.walletRepository.findById(id);
        if (!wallet) {
            throw new Error("Billetera no encontrada");
        }
        if (String(wallet.userId) !== String(userId)) {
            throw new Error("No autorizado: solo puedes eliminar tus propias billeteras");
        }

        await this.walletRepository.delete(id);
        return { message: "Billetera eliminada correctamente" };
    }
}

