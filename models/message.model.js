import mongoose from "mongoose";

/**
 * Message Schema for tracking user-submitted messages.
 *
 * @typedef {Object} MessageDocument
 * @property {string} email - The sender's email address.
 * @property {string} phone - The sender's phone number.
 * @property {string} name - The sender's name.
 * @property {string} message - The content of the message.
 * @property {string} subject - The subject of the message.
 * @property {Object} data - Any additional data related to the message.
 * @property {Date} createdAt - Timestamp of when the message was created.
 * @property {Date} updatedAt - Timestamp of when the message was last updated.
 */
const messageSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    name: { type: String, trim: true },
    message: { type: String, trim: true },
    subject: { type: String, trim: true },
    data: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Create TTL index for auto-deletion after 5 days
messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 432000 });

/**
 * Static method to add a new message to the database.
 *
 * @param {Object} messageData - The message data to be saved.
 * @param {string} messageData.email - The sender's email.
 * @param {string} messageData.phone - The sender's phone number.
 * @param {string} messageData.name - The sender's name.
 * @param {string} messageData.message - The content of the message.
 * @param {string} messageData.subject - The subject of the message.
 * @param {Object} messageData.data - Any additional data.
 * @returns {Promise<MessageDocument>} The saved message document.
 * @throws {Error} If the message could not be saved.
 */
messageSchema.statics.addMessage = async function (messageData) {
  try {
    const messageDoc = new this(messageData);
    return await messageDoc.save();
  } catch (error) {
    throw new Error("Failed to save message: " + error.message);
  }
};

/**
 * Static method to retrieve a message by its ID.
 *
 * @param {mongoose.Schema.Types.ObjectId} id - The ID of the message to retrieve.
 * @returns {Promise<MessageDocument>} The found message document.
 * @throws {Error} If the message could not be found.
 */
messageSchema.statics.getMessageById = async function (id) {
  try {
    const message = await this.findById(id);
    if (!message) {
      throw new Error("Message not found");
    }
    return message;
  } catch (error) {
    throw error;
  }
};

/**
 * Static method to retrieve all messages (or filter by query) with pagination.
 *
 * @param {Object} filter - The filter conditions to query messages.
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of messages per page.
 * @returns {Promise<{messages: MessageDocument[], total: number}>} A list of messages and the total count.
 * @throws {Error} If there was an error retrieving messages.
 */
messageSchema.statics.getAllMessages = async function (
  filter = {},
  page = 1,
  limit = 10
) {
  try {
    const messages = await this.find(filter)
      .sort({ createAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await this.countDocuments(filter);
    return { messages, total };
  } catch (error) {
    throw new Error("Failed to retrieve messages: " + error.message);
  }
};

// Create and export the Message model
const Message = mongoose.model("Message", messageSchema);

export default Message;
