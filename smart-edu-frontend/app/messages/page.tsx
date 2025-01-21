'use client';
import { useState, useEffect, useRef  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiMoreVertical, FiSend } from 'react-icons/fi';
import { FaUsers, FaUserPlus, FaSmile, FaBan, FaDownload, FaImage, FaTrash, FaUser, FaEnvelope, FaGraduationCap, FaMapMarkerAlt, FaPhone, FaSchool, FaTimes  } from 'react-icons/fa';
import { users } from '@/app/resources/content';
import EmojiPicker from 'emoji-picker-react';
import chatFunctions from '../resources/chatFunctions';

interface Message {
  id: string;
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: string;
}
interface Group {
  id: string;
  name: string;
  members: string[];
  createdBy: number;
  createdAt: string;
  lastMessage?: string;
}
export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [showGroupCreate, setShowGroupCreate] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [showEmojis, setShowEmojis] = useState(false);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Current user (for demo purposes)
  const currentUser = users.user1;

  // Filter recent chats
  const recentChats = Object.values(users).filter(user => 
    user.userId !== currentUser.userId && 
    messages.some(m => 
      m.senderId === user.userId || m.receiverId === user.userId
    )
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: currentUser.userId,
      receiverId: selectedUser.userId,
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const createGroup = () => {
    console.log('Creating group:', groupName, selectedMembers);
    if (!groupName.trim() || selectedMembers.length === 0) {
      return;
    }
  
    const newGroup = chatFunctions.createGroup(groupName, selectedMembers, currentUser);
    
    // Add first group message
    const welcomeMessage = {
      id: Date.now().toString(),
      senderId: currentUser.userId,
      groupId: newGroup.groupId,
      text: `Group "${groupName}" created`,
      timestamp: new Date().toISOString(),
      type: 'system'
    };
  
    setGroups(prevGroups => [...prevGroups, { ...newGroup, id: newGroup.groupId, createdBy: newGroup.creator }]);
    setMessages(prevMessages => [...prevMessages, welcomeMessage as unknown as Message]);
    setSelectedUser({ ...newGroup, isGroup: true });
    setGroupName('');
    setSelectedMembers([]);
    setShowGroupCreate(false);
  };
  

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[80vh]">
          {/* Left Sidebar */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Messages</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowNewChat(true)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaUserPlus />
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGroupCreate(true)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaUsers />
                </motion.button>
              </div>
            </div>
            
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
{/* Groups Section */}
{groups.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">Groups</h3>
                <div className="space-y-2">
                  {groups.map(group => (
                    <motion.div
                      key={group.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setSelectedUser({ ...group, isGroup: true })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white">
                          {group.name[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <p className="text-sm text-gray-500">
                            {group.members.length} members
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2 overflow-y-auto h-[calc(80vh-120px)]">
              {recentChats.map((user) => (
                <motion.div
                  key={user.userId}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedUser(user)}
                  className={`p-3 rounded-xl cursor-pointer ${
                    selectedUser?.userId === user.userId 
                      ? 'bg-blue-50 dark:bg-blue-900' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                      {user.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.school}
                      </p>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">
                      {user.status === 'online' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-1" />
                      )}
                      {user.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl p-4 flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                      {selectedUser.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedUser.name}</h3>
                      <p className="text-sm text-gray-500">{selectedUser.status}</p>
                    </div>
                  </div>
                    <div className="relative">
                    <button 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <FiMoreVertical />
                    </button>

                    <AnimatePresence>
                        {showDropdown && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-2 z-50"
                        >
                            <button 
                                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                onClick={() => {
                                    setShowProfile(true);
                                    setShowDropdown(false);
                                }}
                                >
                                <FaUser className="text-gray-500" />
                                View Profile
                            </button>

                            <button 
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            onClick={() => {/* Add delete chat logic */}}
                            >
                            <FaTrash className="text-gray-500" />
                            Delete Chat
                            </button>

                            <button 
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            onClick={() => {/* Add export chat logic */}}
                            >
                            <FaDownload className="text-gray-500" />
                            Export Chat
                            </button>

                            <button 
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                            onClick={() => {/* Add media logic */}}
                            >
                            <FaImage className="text-gray-500" />
                            Media
                            </button>

                            <button 
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-red-500"
                            onClick={() => {/* Add block user logic */}}
                            >
                            <FaBan className="text-red-500" />
                            Block User
                            </button>
                        </motion.div>
                        )}
                    </AnimatePresence>
                    </div>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto py-4 space-y-4">
                  {messages
                    .filter(msg => 
                      (msg.senderId === currentUser.userId && msg.receiverId === selectedUser.userId) ||
                      (msg.senderId === selectedUser.userId && msg.receiverId === currentUser.userId)
                    )
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === currentUser.userId ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-xl ${
                            message.senderId === currentUser.userId
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700'
                          }`}
                        >
                          <p>{message.text}</p>
                          <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="pt-4 border-t dark:border-gray-700">
                    <div className="flex gap-2 relative">
                    <button
                        ref={emojiButtonRef}
                        onClick={() => setShowEmojis(!showEmojis)}
                        className="p-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <FaSmile className="text-xl" />
                    </button>
                    
                    <AnimatePresence>
                        {showEmojis && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full left-0 mb-2"
                        >
                            <EmojiPicker
                            onEmojiClick={(emojiObject) => {
                                setNewMessage(prev => prev + emojiObject.emoji);
                                setShowEmojis(false);
                            }}
                            width={300}
                            height={400}
                            />
                        </motion.div>
                        )}
                    </AnimatePresence>

                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 p-3 rounded-xl bg-gray-100 dark:bg-gray-700"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                    >
                        <FiSend />
                    </button>
                    </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">New Chat</h2>
            <div className="space-y-4">
              <input
                type="search"
                placeholder="Search users..."
                className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700"
              />
              <div className="max-h-60 overflow-y-auto">
                {Object.values(users)
                  .filter(user => user.userId !== currentUser.userId)
                  .map(user => (
                    <div
                      key={user.userId}
                      onClick={() => {
                        setSelectedUser(user);
                        setShowNewChat(false);
                      }}
                      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                          {user.name[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.school}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                onClick={() => setShowNewChat(false)}
                className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Group Creation Modal */}
      {showGroupCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Group</h2>
              <button 
                onClick={() => setShowGroupCreate(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              createGroup();
            }}>
              <div className="space-y-4">
                <label className='text-foreground' htmlFor="">Group Name <span className='text-red-800 font-bold'>*</span></label>
                <input
                  type="text"
                  placeholder="Group name"
                  className="w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />

                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {Object.values(users)
                    .filter(user => user.userId !== currentUser.userId)
                    .map(user => (
                      <div
                        key={user.userId}
                        onClick={() => {
                          setSelectedMembers(prev =>
                            prev.includes(user.userId.toString())
                              ? prev.filter(id => id !== user.userId.toString())
                              : [...prev, user.userId.toString()]
                          );
                        }}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(user.userId.toString())}
                            onChange={() => {}}
                            className="rounded text-blue-500"
                          />
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                            {user.name[0]}
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-gray-500">{user.school}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
                    disabled={!groupName.trim() || selectedMembers.length === 0}
                  >
                    Create Group
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGroupCreate(false)}
                    className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}


        {showProfile && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl w-[80%] max-w-5xl"
            >
            <div className="grid md:grid-cols-3 h-full">
                {/* Left Section - Profile Info */}
                <div className="p-8 border-r dark:border-gray-700">
                <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-4xl font-bold mb-4">
                    <img src={selectedUser.avatar} alt="" className='rounded-full' />
                    </div>
                    <h2 className="text-3xl font-bold">{selectedUser.name}</h2>
                    <span className={`mt-3 px-4 py-1.5 rounded-full text-sm ${
                    selectedUser.status === 'online' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                    {selectedUser.status}
                    </span>
                </div>

                <div className="mt-8 space-y-4">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl transition-colors">
                    Message
                    </button>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition-colors">
                    Block User
                    </button>
                </div>
                </div>

                {/* Middle Section - Details */}
                <div className="p-8 md:col-span-2">
                <div className="flex justify-between items-start mb-8">
                    <h3 className="text-2xl font-bold">Profile Information</h3>
                    <button
                    onClick={() => setShowProfile(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                    <FaTimes className="text-xl" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                        <h4 className="text-lg font-semibold mb-4">Personal Details</h4>
                        <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaGraduationCap className="text-blue-500 text-2xl" />
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Grade</p>
                            <p className="font-medium text-lg">{selectedUser.grade}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaSchool className="text-blue-500 text-2xl" />
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">School</p>
                            <p className="font-medium text-lg">{selectedUser.school}</p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                        <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                        <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-blue-500 text-2xl" />
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                            <p className="font-medium text-lg">{selectedUser.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-blue-500 text-2xl" />
                            <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p className="font-medium text-lg">{selectedUser.email}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                        <h4 className="text-lg font-semibold mb-4">About</h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {selectedUser.bio}
                        </p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                        <h4 className="text-lg font-semibold mb-4">Location</h4>
                        <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-blue-500 text-2xl" />
                        <p className="font-medium text-lg">{selectedUser.location}</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </motion.div>
        </div>
        )}
    </div>
  );
}
