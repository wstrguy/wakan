const mongoose = require('mongoose');

const WalletSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    walletId: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0,
    },
    balanceBefore: {
        type: Number,
        default: 0,
    },
    balanceAfter: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Wallet', WalletSchema);