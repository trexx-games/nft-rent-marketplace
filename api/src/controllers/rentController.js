const RentService = require("../services/rentService");

class RentController {
  static async startRent(req, res) {
    const {
      rentId,
      nftId,
      poolId,
      rentee,
      price,
      expirationDate,
      initDate,
      owner,
    } = req.body;
    
    await RentService.startRent({
      rentId,
      nftId,
      poolId,
      rentee,
      price,
      expirationDate,
      initDate,
      owner,
    });
    res.status(201).json({ message: "Rent started successfully" });
  }

  static async finishRent(req, res) {
    const { rentId, finishDate } = req.body;
    
    await RentService.finishRent({ rentId, finishDate });

    res.status(201).json({ message: "Rent finished successfully" });
  }

  static async getActiveByRentee(req, res) {
    
    const rents = await RentService.getActiveByRentee({
      rentee: req.params.rentee,
    });

    res.status(200).json({ rents });
  }

  static async getAllByRentee(req, res) {
    
    const rents = await RentService.getAllByRentee({
      rentee: req.params.rentee,
    });

    res.status(200).json({ rents });
  }

  static async getRentsLastDay(_, res) {
    const lastDayRents = await RentService.getRentsLastDay();

    res.status(200).json({ lastDayRents });
  }
}
module.exports = RentController;
