import express from "express";
import clothingController from "../controllers/clothingController.js";
import Auth from "../middleware/Auth.js";

const router = express.Router();

// roupas gerais
router.get("/clothes", clothingController.getAllClothes);
router.get("/clothes/:id", clothingController.getClothingById);

// roupas do usuário logado
router.get("/my-clothes", Auth.Authorization, clothingController.getMyClothes);

// CRUD protegido
router.post("/clothes", Auth.Authorization, clothingController.createClothing);
router.put("/clothes/:id", Auth.Authorization, clothingController.updateClothing);
router.delete("/clothes/:id", Auth.Authorization, clothingController.deleteClothing);

// closet de outro usuário
router.get("/users/:userId/closet", clothingController.getUserCloset);

export default router;