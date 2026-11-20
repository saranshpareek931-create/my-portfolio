import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  FileText,
  Copy,
  ExternalLink,
  Sparkles,
  Layers,
  Code2,
  Briefcase,
  Mail,
  X,
  Check,
} from 'lucide-react';
import { projects, profile } from '../data/portfolio';
import { scrollToId } from '../lib/scroll';
import { getTheme, toggleTheme, setPalette } from '../lib/theme';
import { isSoundEnabled, toggleSound, playClick, playChime } from '../lib/sound';

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Projects' | 'Theme & Appearance' | 'Actions';
  icon: typeof Search;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      playClick(720, 0.05);
      setQuery('');
      setSelectedIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const items: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Home',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        scrollToId('home');
        onClose();
      },
    },
    {
      id: 'nav-about',
      title: 'Go to About & Metrics',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        scrollToId('about');
        onClose();
      },
    },
    {
      id: 'nav-expertise',
      title: 'Go to Expertise & Skills Orbit',
      category: 'Navigation',
      icon: Code2,
      action: () => {
        scrollToId('expertise');
        onClose();
      },
    },
    {
      id: 'nav-projects',
      title: 'Go to Selected Projects',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        scrollToId('projects');
        onClose();
      },
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience & Timeline',
      category: 'Navigation',
      icon: Layers,
      action: () => {
        scrollToId('experience');
        onClose();
      },
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        scrollToId('contact');
        onClose();
      },
    },

    // Projects
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      title: `View ${p.title} (${p.kind})`,
      category: 'Projects' as const,
      icon: Briefcase,
      action: () => {
        scrollToId('projects');
        onClose();
      },
    })),

    // Theme & Appearance
    {
      id: 'theme-toggle',
      title: `Switch to ${getTheme() === 'dark' ? 'Light Mode' : 'Dark Mode'}`,
      category: 'Theme & Appearance',
      icon: getTheme() === 'dark' ? Sun : Moon,
      shortcut: 'Pull Cord',
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'palette-amber',
      title: 'Palette: Cinematic Amber Gold (Default)',
      category: 'Theme & Appearance',
      icon: Sparkles,
      action: () => {
        setPalette('amber');
        playChime(660);
        onClose();
      },
    },
    {
      id: 'palette-emerald',
      title: 'Palette: Cyberpunk Radiant Emerald',
      category: 'Theme & Appearance',
      icon: Sparkles,
      action: () => {
        setPalette('emerald');
        playChime(740);
        onClose();
      },
    },
    {
      id: 'palette-violet',
      title: 'Palette: Cosmic Deep Violet',
      category: 'Theme & Appearance',
      icon: Sparkles,
      action: () => {
        setPalette('violet');
        playChime(820);
        onClose();
      },
    },
    {
      id: 'palette-monochrome',
      title: 'Palette: Minimalist Monochrome Studio',
      category: 'Theme & Appearance',
      icon: Sparkles,
      action: () => {
        setPalette('monochrome');
        playChime(580);
        onClose();
      },
    },

    // Actions
    {
      id: 'action-sound',
      title: `${isSoundEnabled() ? 'Mute' : 'Enable'} Tactile Sound Effects`,
      category: 'Actions',
      icon: isSoundEnabled() ? VolumeX : Volume2,
      action: () => {
        toggleSound();
        onClose();
      },
    },
    {
      id: 'action-gmail',
      title: `Compose Email in Gmail (${profile.email})`,
      category: 'Actions',
      icon: Mail,
      action: () => {
        window.open(profile.gmailUrl, '_blank');
        onClose();
      },
    },
    {
      id: 'action-copy-email',
      title: `Copy Email (${profile.email})`,
      category: 'Actions',
      icon: copied ? Check : Copy,
      action: async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          playChime(880);
          window.setTimeout(onClose, 600);
        } catch {
          window.location.href = `mailto:${profile.email}`;
          onClose();
        }
      },
    },
    {
      id: 'action-resume',
      title: 'Download Official Résumé (PDF)',
      category: 'Actions',
      icon: FileText,
      action: () => {
        const a = document.createElement('a');
        a.href = profile.resume;
        a.download = 'Saransh_Resume.pdf';
        a.click();
        onClose();
      },
    },
    {
      id: 'action-github',
      title: 'Open GitHub Profile (@saranshpareek931-create)',
      category: 'Actions',
      icon: ExternalLink,
      action: () => {
        window.open(profile.links.github, '_blank');
        onClose();
      },
    },
  ];

  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playClick(500, 0.02);
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playClick(600, 0.02);
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center p-4 pt-[12vh] sm:p-6 sm:pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop blur */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            initial={{ scale: 0.94, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search size={18} className="text-accent" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or jump to section..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm text-fg placeholder:text-muted focus:outline-none"
              />
              <span className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                className="rounded-full p-1 text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted">
                  No matching commands found.
                </div>
              ) : (
                <ul className="space-y-1">
                  {filtered.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors ${
                            isSelected
                              ? 'bg-accent text-bg font-medium'
                              : 'text-fg hover:bg-surface-2'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={16} className={isSelected ? 'text-bg' : 'text-accent'} />
                            <span>{item.title}</span>
                          </div>
                          <div className="flex items-center gap-2 font-mono text-[10px]">
                            {item.shortcut && (
                              <span
                                className={`rounded px-1.5 py-0.5 ${
                                  isSelected ? 'bg-bg/20 text-bg' : 'border border-line bg-surface-2 text-muted'
                                }`}
                              >
                                {item.shortcut}
                              </span>
                            )}
                            <span className={isSelected ? 'text-bg/80' : 'text-muted'}>
                              {item.category}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-line bg-surface-2/60 px-4 py-2.5 font-mono text-[10px] text-muted">
              <span>↑↓ to navigate · Enter to select</span>
              <span>Theme &amp; Actions</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
