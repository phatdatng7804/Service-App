import * as service from "../service";

export const getAllCategories = async (req, res) => {
  try {
    const response = await service.getAllCategories();
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: -1, mes: "Server error" });
  }
};
export const createCategory = async (req, res) => {
  try {
    const response = await service.createCategory(req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: -1, mes: "Server error" });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const response = await service.updateCategory(req.params.id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: -1, mes: "Server error" });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const response = await service.deleteCategory(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: -1, mes: "Server error" });
  }
};
