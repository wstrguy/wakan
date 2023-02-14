const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
    },
    transactionType: {
        type: String,
        enum: ['credit', 'debit', 'transfer', 'withdrawal'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);
    