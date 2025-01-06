const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, User } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, toUpiId } = req.body;
    console.log(req.userId);
    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toUser = await User.findOne({ upiId: toUpiId }).session(session);
    if (!toUser) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid UPI ID"
        });
    }
    console.log(account.balance)
    console.log(amount)
    const toAccount = await Account.findOne({ userId: toUser._id }).session(session);

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, {  balance: account.balance-Number(amount) } ).session(session);
    await Account.updateOne({ userId: toUser._id }, { $inc: { balance: amount } }).session(session);

    console.log(account.balance-amount
    )
    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;