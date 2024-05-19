import { Request, Response } from 'express';
import Conversation from '../models/Conversation'; // Make sure to import your Conversation model
import BusinessSetting from '../models/BusinessSetting'; // Import your BusinessSetting model
import Message from '../models/Message'; // Import your Message model
import Auth from '../services/Auth'; // Assuming you have an Auth service for authentication

export async function index(req: Request, res: Response) {
    try {
        const conversationSystemEnabled = await BusinessSetting.findOne({ type: 'conversation_system' });

        if (conversationSystemEnabled?.value === 1) {
            const conversations = await Conversation.find({
                $or: [{ sender_id: Auth.user.id }, { receiver_id: Auth.user.id }]
            }).sort({ created_at: 'desc' }).paginate(5);

            return res.render('seller.conversations.index', { conversations });
        } else {
            // Flash message not available in this conversion
            return res.status(200).send('Conversation is disabled at this moment');
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function show(req: Request, res: Response) {
    try {
        const conversationId = decrypt(req.params.id);
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).send('Conversation not found');
        }

        if (conversation.sender_id === Auth.user.id) {
            conversation.sender_viewed = 1;
        } else if (conversation.receiver_id === Auth.user.id) {
            conversation.receiver_viewed = 1;
        }

        await conversation.save();
        return res.render('seller.conversations.show', { conversation });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function refresh(req: Request, res: Response) {
    try {
        const conversationId = decrypt(req.body.id);
        const conversation = await Conversation.findById(conversationId);

        if (!conversation) {
            return res.status(404).send('Conversation not found');
        }

        if (conversation.sender_id === Auth.user.id) {
            conversation.sender_viewed = 1;
        } else {
            conversation.receiver_viewed = 1;
        }

        await conversation.save();
        return res.render('frontend.partials.messages', { conversation });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function message_store(req: Request, res: Response) {
    try {
        const message = new Message({
            conversation_id: req.body.conversation_id,
            user_id: Auth.user.id,
            message: req.body.message
        });

        await message.save();

        const conversation = await message.conversation;

        if (conversation.sender_id === Auth.user.id) {
            conversation.receiver_viewed = "1";
        } else if (conversation.receiver_id === Auth.user.id) {
            conversation.sender_viewed = "1";
        }

        await conversation.save();
        return res.redirect('back');
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
