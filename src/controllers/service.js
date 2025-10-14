import * as service from "../service";

export const getAllServices = async (req, res) => {
  try {
    const response = await service.getAllServices();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: -1, mes: "Server error" });
  }
};
export const createService = async (req, res) => {
  try {
    const response = await service.createService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ err: -1, mes: "Server error" });
  }
};
export const updateService = async (req, res) => {
  try {
    const response = await service.updateService(req.params.id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: -1, mes: "Server error" });
  }
};
export const deleteService = async (req, res) => {
  try {
    const response = await service.deleteService(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ err: -1, mes: "Server error" });
  }
};
