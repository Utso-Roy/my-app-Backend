router.get("/", getDisasters);
router.get("/:id", getDisasterById);

router.post("/", createDisaster);

router.put("/:id", updateDisaster);

router.delete("/:id", deleteDisaster);