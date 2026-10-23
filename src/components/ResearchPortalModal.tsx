import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { SavedNote, SavedStructure } from '../types';
import { 
  X, 
  User as UserIcon, 
  Dna, 
  FileText, 
  Plus, 
  Trash2, 
  RotateCw 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ResearchPortalModalProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSignIn: () => void;
}

export const ResearchPortalModal: React.FC<ResearchPortalModalProps> = ({
  isOpen,
  user,
  onClose,
  onSignIn,
}) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'notes' | 'structures'>('notes');
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [structures, setStructures] = useState<SavedStructure[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // New Note Form
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newGene, setNewGene] = useState<string>('');
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);

  const fetchUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const notesRef = collection(db, 'research_notes');
      const qNotes = query(notesRef, where('userId', '==', user.uid));
      const snapNotes = await getDocs(qNotes);
      const notesList: SavedNote[] = snapNotes.docs.map((d) => ({ id: d.id, ...d.data() } as SavedNote));
      setNotes(notesList);

      const structRef = collection(db, 'saved_structures');
      const qStruct = query(structRef, where('userId', '==', user.uid));
      const snapStruct = await getDocs(qStruct);
      const structList: SavedStructure[] = snapStruct.docs.map((d) => ({ id: d.id, ...d.data() } as SavedStructure));
      setStructures(structList);

    } catch (err) {
      handleFirestoreError(err, OperationType.GET, 'user_data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      fetchUserData();
    }
  }, [isOpen, user]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newTitle.trim() || !newContent.trim()) return;

    setIsSavingNote(true);
    try {
      const noteData: SavedNote = {
        userId: user.uid,
        title: newTitle.trim(),
        content: newContent.trim(),
        targetGene: newGene.trim() || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'research_notes'), noteData);
      setNewTitle('');
      setNewContent('');
      setNewGene('');
      fetchUserData();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'research_notes');
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteNote = async (id?: string) => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, 'research_notes', id));
      fetchUserData();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `research_notes/${id}`);
    }
  };

  const handleDeleteStructure = async (id?: string) => {
    if (!id) return;
    try {
      await deleteDoc(doc(db, 'saved_structures', id));
      fetchUserData();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `saved_structures/${id}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className={`rounded-2xl border w-full max-w-3xl p-6 shadow-2xl space-y-6 relative max-h-[90vh] flex flex-col transition-colors ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-inherit pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-cyan-500/40 p-0.5 bg-white shrink-0">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-22_at_20.10.21_541bb7ba.jpeg"
                alt="SHBBSH Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {language === 'sq' ? 'Portali i Kërkimit SHBBSH' : language === 'it' ? 'Portale della Ricerca SHBBSH' : 'SHBBSH Research Portal'}
              </h3>
              <p className="text-xs font-mono text-cyan-500">{user?.email || 'Anëtar i SHBBSH'}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!user ? (
          <div className="py-12 text-center space-y-4">
            <p className="text-sm text-slate-500">
              {language === 'sq' 
                ? 'Identifikohuni me llogarinë tuaj Google për të ruajtur shënime laboratori dhe struktura molekulare në Firestore.'
                : 'Sign in with your Google account to access your Firestore-backed lab notes and structure bookmarks.'}
            </p>
            <button
              onClick={onSignIn}
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors font-mono"
            >
              Sign In with Google
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            
            {/* Tabs */}
            <div className="flex gap-2 border-b border-inherit pb-2 text-xs font-mono">
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-2 ${
                  activeTab === 'notes' 
                    ? 'bg-cyan-500 text-slate-950 font-bold' 
                    : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Lab Notes ({notes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('structures')}
                className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-2 ${
                  activeTab === 'structures' 
                    ? 'bg-cyan-500 text-slate-950 font-bold' 
                    : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Dna className="w-4 h-4" />
                <span>Saved Structures ({structures.length})</span>
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-400 font-mono text-xs flex flex-col items-center gap-2">
                <RotateCw className="w-5 h-5 text-cyan-500 animate-spin" />
                <span>Loading Firestore research records...</span>
              </div>
            ) : activeTab === 'notes' ? (
              <div className="space-y-6">
                
                {/* Create Note Form */}
                <form onSubmit={handleCreateNote} className={`rounded-2xl border p-4 space-y-3 transition-colors ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-xs font-mono uppercase text-cyan-500 font-bold flex items-center gap-1.5">
                    <Plus className="w-4 h-4" />
                    <span>{language === 'sq' ? 'Krijo Shënim Kërkimor' : 'Create Lab Research Note'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Titulli i shënimit (p.sh. Analiza e Gjenit KRAS)..."
                      required
                      className={`border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-sans ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />

                    <input
                      type="text"
                      value={newGene}
                      onChange={(e) => setNewGene(e.target.value)}
                      placeholder="Target Gene / PDB ID..."
                      className={`border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Përshkrimi i të dhënave eksperimentale, hipotezave apo vëzhgimeve..."
                    required
                    rows={3}
                    className={`w-full border rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500 font-sans ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />

                  <button
                    type="submit"
                    disabled={isSavingNote}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors font-mono flex items-center gap-1.5 ml-auto"
                  >
                    <span>{language === 'sq' ? 'Ruaj në Firestore' : 'Save Note to Firestore'}</span>
                  </button>
                </form>

                {/* Notes List */}
                <div className="space-y-3">
                  {notes.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 font-mono text-xs border border-dashed rounded-2xl border-inherit">
                      {language === 'sq' ? 'Nuk keni shënime të ruajtura ende.' : 'No lab notes saved yet.'}
                    </div>
                  ) : (
                    notes.map((note) => (
                      <div key={note.id} className={`rounded-2xl border p-4 space-y-2 relative transition-colors ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{note.title}</span>
                            {note.targetGene && (
                              <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                                {note.targetGene}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                            title="Fshi"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className={`text-xs leading-relaxed font-sans ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{note.content}</p>

                        <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-inherit">
                          Ruajtur: {new Date(note.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            ) : (
              /* Structures List */
              <div className="space-y-3">
                {structures.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 font-mono text-xs border border-dashed rounded-2xl border-inherit">
                    {language === 'sq' ? 'Nuk keni shënuar asnjë strukturë 3D ende.' : 'No bookmarked 3D structures yet.'}
                  </div>
                ) : (
                  structures.map((s) => (
                    <div key={s.id} className={`rounded-2xl border p-4 flex items-center justify-between gap-4 font-mono text-xs transition-colors ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-cyan-500 font-bold">{s.pdbId}</span>
                          <span className="text-slate-400">·</span>
                          <span className="font-semibold">{s.title}</span>
                        </div>
                        <div className="text-slate-400 text-[11px] mt-1">Organism: {s.organism} | Resolution: {s.resolution}</div>
                      </div>

                      <button
                        onClick={() => handleDeleteStructure(s.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition-colors shrink-0"
                        title="Fshi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
