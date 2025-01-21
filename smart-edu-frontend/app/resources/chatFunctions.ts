export const chatFunctions = {
    // Message handling
    sendMessage: (currentUser: { userId: any; }, selectedUser: { userId: any; }, messageText: any, currentMessages: any) => {
      const newMsg = {
        id: Date.now().toString(),
        senderId: currentUser.userId,
        receiverId: selectedUser.userId,
        text: messageText,
        timestamp: new Date().toISOString()
      };
      return [...currentMessages, newMsg];
    },
  
    // Chat filtering
    filterMessages: (messages: any[], currentUser: { userId: any; }, selectedUser: { userId: any; }) => {
      return messages.filter((msg: { senderId: any; receiverId: any; }) => 
        (msg.senderId === currentUser.userId && msg.receiverId === selectedUser.userId) ||
        (msg.senderId === selectedUser.userId && msg.receiverId === currentUser.userId)
      );
    },
  
    // Search functionality
    searchUsers: (users: ArrayLike<unknown> | { [s: string]: unknown; }, searchTerm: string) => {
      return Object.values(users).filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.school.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  
    // Group handling
    createGroup: (groupName: any, members: any, currentUser: { userId: any; }) => {
      return {
        groupId: Date.now().toString(),
        name: groupName,
        creator: currentUser.userId,
        members: [...members, currentUser.userId],
        createdAt: new Date().toISOString(),
        type: 'group'
      };
    },
  
    // Chat management
    deleteChat: (messages: any[], userId: any) => {
      return messages.filter((message: { senderId: any; receiverId: any; }) => 
        message.senderId !== userId && message.receiverId !== userId
      );
    },
  
    exportChat: (messages: any[], currentUser: { userId: any; }, selectedUser: { userId: any; name: any; }) => {
      const chatHistory = messages
        .filter((msg: { senderId: any; receiverId: any; }) => 
          (msg.senderId === currentUser.userId && msg.receiverId === selectedUser.userId) ||
          (msg.senderId === selectedUser.userId && msg.receiverId === currentUser.userId)
        )
        .map((msg: { senderId: any; text: any; timestamp: string | number | Date; }) => ({
          sender: msg.senderId === currentUser.userId ? 'You' : selectedUser.name,
          message: msg.text,
          time: new Date(msg.timestamp).toLocaleString()
        }));
      
      return JSON.stringify(chatHistory, null, 2);
    },
  
    // User management
    blockUser: (blockedUsers: any, userId: any) => {
      return [...blockedUsers, userId];
    },
  
    unblockUser: (blockedUsers: any[], userId: any) => {
      return blockedUsers.filter((id: any) => id !== userId);
    },
  
    // Recent chats
    getRecentChats: (messages: any[], currentUser: { userId: any; }, users: { [x: string]: any; }) => {
      const uniqueUsers = new Set();
      return messages
        .filter((msg: { senderId: unknown; receiverId: unknown; }) => {
          if (msg.senderId === currentUser.userId) {
            if (!uniqueUsers.has(msg.receiverId)) {
              uniqueUsers.add(msg.receiverId);
              return true;
            }
          } else if (msg.receiverId === currentUser.userId) {
            if (!uniqueUsers.has(msg.senderId)) {
              uniqueUsers.add(msg.senderId);
              return true;
            }
          }
          return false;
        })
        .map((msg: { senderId: any; receiverId: any; }) => {
          const otherUserId = msg.senderId === currentUser.userId ? msg.receiverId : msg.senderId;
          return users[`user${otherUserId}`];
        });
    },
  
    // Message formatting
    formatMessageTime: (timestamp: string | number | Date) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
  
    // Media handling
    getMediaMessages: (messages: any[], currentUser: { userId: any; }, selectedUser: { userId: any; }) => {
      return messages.filter((msg: { senderId: any; receiverId: any; type: string; }) => 
        ((msg.senderId === currentUser.userId && msg.receiverId === selectedUser.userId) ||
        (msg.senderId === selectedUser.userId && msg.receiverId === currentUser.userId)) &&
        msg.type === 'media'
      );
    },
    // User status management
    updateUserStatus: (userId: any, status: any) => {
        return {
        userId,
        status,
        lastSeen: new Date().toISOString()
        };
    },

    // Message notifications
    getUnreadCount: (messages: { filter: (arg0: (msg: any) => boolean) => { (): any; new(): any; length: any; }; }, userId: any) => {
        return messages.filter((msg: { receiverId: any; read: any; }) => 
        msg.receiverId === userId && !msg.read
        ).length;
    },

    markMessagesAsRead: (messages: any[], senderId: any, receiverId: any) => {
        return messages.map((msg: { senderId: any; receiverId: any; }) => 
        (msg.senderId === senderId && msg.receiverId === receiverId)
            ? { ...msg, read: true }
            : msg
        );
    },

    // Group chat functions
    addUserToGroup: (group: { members: any; }, userId: any) => {
        return {
        ...group,
        members: [...group.members, userId]
        };
    },

    removeUserFromGroup: (group: { members: any[]; }, userId: any) => {
        return {
        ...group,
        members: group.members.filter((id: any) => id !== userId)
        };
    },

    // Message actions
    editMessage: (messages: any[], messageId: any, newText: any) => {
        return messages.map((msg: { id: any; }) =>
        msg.id === messageId
            ? { ...msg, text: newText, edited: true }
            : msg
        );
    },

    deleteMessage: (messages: any[], messageId: any) => {
        return messages.filter((msg: { id: any; }) => msg.id !== messageId);
    },

    // Media handling
    formatFileSize: (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    validateFile: (file: { type: any; size: number; }, allowedTypes: string | any[], maxSize: number) => {
        const isValidType = allowedTypes.includes(file.type);
        const isValidSize = file.size <= maxSize;
        return { isValid: isValidType && isValidSize, error: !isValidType ? 'Invalid file type' : !isValidSize ? 'File too large' : null };
    },

    // Search and filter
    searchMessages: (messages: any[], searchTerm: string) => {
        return messages.filter((msg: { text: string; }) =>
        msg.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },

    filterMessagesByDate: (messages: any[], startDate: number, endDate: number) => {
            return messages.filter((msg: { timestamp: string | number | Date; }) => {
                const msgDate = new Date(msg.timestamp);
                return msgDate >= new Date(startDate) && msgDate <= new Date(endDate);
            });
    },

    // User typing indicator
    setUserTyping: (userId: any, isTyping: any) => {
        return {
        userId,
        isTyping,
        timestamp: new Date().toISOString()
        };
    },

    // Message reactions
    addReaction: (messages: any[], messageId: any, userId: any, reaction: any) => {
        return messages.map((msg: { id: any; reactions: any; }) =>
        msg.id === messageId
            ? {
                ...msg,
                reactions: [...(msg.reactions || []), { userId, reaction, timestamp: new Date().toISOString() }]
            }
            : msg
        );
    },

    removeReaction: (messages: any[], messageId: any, userId: any) => {
        return messages.map((msg: { id: any; reactions: any; }) =>
        msg.id === messageId
            ? {
                ...msg,
                reactions: (msg.reactions || []).filter((r: { userId: any; }) => r.userId !== userId)
            }
            : msg
        );
    },

    // Message forwarding
    forwardMessage: (message: any, receiverId: any) => {
        return {
        ...message,
        id: Date.now().toString(),
        receiverId,
        forwarded: true,
        timestamp: new Date().toISOString()
        };
    },

    // Chat statistics
    getChatStats: (messages: { timestamp: any; }[], userId: any) => {
        return {
        totalMessages: messages.length,
        sentMessages: messages.filter((msg: { senderId?: any; receiverId?: any; timestamp: any }) => msg.senderId === userId).length,
        receivedMessages: messages.filter((msg: { senderId?: any; receiverId?: any; timestamp: any }) => msg.receiverId === userId).length,        
        mediaMessages: messages.filter((msg: { timestamp: any; type?: string }) => msg.type === 'media').length,        firstMessage: messages[0]?.timestamp,
        lastMessage: messages[messages.length - 1]?.timestamp
        };
    }
};
  
  export default chatFunctions;
  