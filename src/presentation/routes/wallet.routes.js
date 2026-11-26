import { Router } from "express";
import WalletController from "../controllers/wallet.controller.js";
import WalletService from "../../application/use-cases/wallet.service.js";
import WalletMySQLRepository from "../../infrastructure/database/mysql/wallet.mysql.repository.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const walletRepository = new WalletMySQLRepository();
const walletService = new WalletService(walletRepository);
const walletController = new WalletController(walletService);

const router = Router();

/**
 * @swagger
 * /wallets:
 *   get:
 *     summary: Listar todas las billeteras o cuentas del usuario autenticado
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de billeteras del usuario
 */
router.get("/", authMiddleware, walletController.getWallets);

/**
 * @swagger
 * /wallets:
 *   post:
 *     summary: Crear una nueva billetera o cuenta financiera
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Banco Nacional"
 *               type:
 *                 type: string
 *                 example: "Cuenta bancaria"
 *               currency:
 *                 type: string
 *                 example: "BOB"
 *               balance:
 *                 type: number
 *                 example: 1500
 *     responses:
 *       201:
 *         description: Billetera creada exitosamente
 *       400:
 *         description: Datos inválidos o incompletos
 */
router.post("/", authMiddleware, walletController.createWallet);

/**
 * @swagger
 * /wallets/{id}:
 *   delete:
 *     summary: Eliminar una billetera del usuario autenticado
 *     tags: [Wallets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Billetera eliminada correctamente
 *       403:
 *         description: No autorizado para eliminar esta billetera
 *       404:
 *         description: Billetera no encontrada
 */
router.delete("/:id", authMiddleware, walletController.deleteWallet);

export default router;

