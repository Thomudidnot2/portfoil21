import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { Mail, Trash2, Clock, User, X, Inbox as InboxIcon, ShieldCheck } from 'lucide-react';
import { useVibe } from '../context/VibeContext';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: any;
}

export function MessageInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { accentColor } = useVibe();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Check if the logged in user is the admin
      setIsAdmin(user?.email === 'gptthomu@gmail.com' || user?.email === 'georgesthomasnedumpurath@gmail.com');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin || !isOpen) return;

    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      setMessages(msgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'contactMessages');
    });

    return () => unsubscribe();
  }, [isAdmin, isOpen]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this transmission?')) return;
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `contactMessages/${id}`);
    }
  };

  if (!isAdmin) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        style={{ backgroundColor: accentColor, boxShadow: `0 0 30px ${accentColor}66` }}
      >
        <InboxIcon size={24} className="text-black" />
        {messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black">
            {messages.length}
          </span>
        )}
      </button>

      {/* Inbox Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl p-4 md:p-8 overflow-y-auto"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <ShieldCheck size={24} style={{ color: accentColor }} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Transmission Logs</h2>
                    <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Secure Admin Access Only</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 opacity-20">
                    <Mail size={40} className="text-white" />
                  </div>
                  <p className="text-white/40 font-mono uppercase tracking-widest">No transmissions found in the buffer.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 relative group"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                            <User size={18} style={{ color: accentColor }} />
                          </div>
                          <div>
                            <h3 className="text-white font-bold">{msg.name}</h3>
                            <p className="text-white/40 text-xs font-mono">{msg.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-white/20 font-mono text-[10px] uppercase tracking-widest">
                            <Clock size={12} />
                            <span>{msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 'Just now'}</span>
                          </div>
                          <button 
                            onClick={() => handleDelete(msg.id)}
                            className="text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                        <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
