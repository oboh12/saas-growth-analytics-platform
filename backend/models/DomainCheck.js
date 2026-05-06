import mongoose from "mongoose";

const domainCheckSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  domain: String,
  score: Number,
  status: String,
  spf: Boolean,
  dmarc: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("DomainCheck", domainCheckSchema);