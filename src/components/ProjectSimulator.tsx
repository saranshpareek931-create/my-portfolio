import { useState } from 'react';
import { QrCode, Users, Sparkles, Search, HelpCircle } from 'lucide-react';
import { playClick, playChime } from '../lib/sound';

export default function ProjectSimulator({ projectId }: { projectId: string }) {
  if (projectId === 'educloud-portal') {
    return <EduCloudSimulator />;
  }
  if (projectId === 'gram-sathi') {
    return <GramSathiSimulator />;
  }
  if (projectId === 'quiz-master') {
    return <QuizMasterSimulator />;
  }
  return null;
}

function EduCloudSimulator() {
  const [activeRole, setActiveRole] = useState<'student' | 'faculty'>('student');
  const [qrVerified, setQrVerified] = useState(false);

  const roleData = {
    student: {
      role: 'Student Learning Portal',
      access: 'Access lecture notes, lab manuals, and syllabus branch-wise (CSE)',
      resource: 'Python_Flask_Complete_Notes.pdf (Uploaded by Faculty)',
      qrStatus: 'QR Instant Access: Active',
    },
    faculty: {
      role: 'Teacher Resource Dashboard',
      access: 'Upload academic materials, manage subject units, and generate QR codes',
      resource: 'Data_Structures_Unit_3.pdf (Cloud Synced on Render)',
      qrStatus: 'Generate Resource QR: Ready',
    },
  };

  const handleRole = (r: 'student' | 'faculty') => {
    playClick(650, 0.03);
    setActiveRole(r);
    setQrVerified(false);
  };

  const triggerQr = () => {
    playClick(750, 0.03);
    setQrVerified(true);
    playChime(820, 0.25);
  };

  const curr = roleData[activeRole];

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-accent" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-fg">
            EduCloud Centralized Portal Sandbox
          </span>
        </div>
        <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-accent">
          Live on Render
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muted mr-1">Switch View:</span>
        {(['student', 'faculty'] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => handleRole(r)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-mono uppercase transition-colors ${
              activeRole === r
                ? 'bg-accent text-bg font-semibold'
                : 'border border-line bg-surface-2 text-muted hover:text-fg'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-line bg-bg p-4 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-line pb-2.5">
          <span className="text-muted">Active Portal: <strong className="text-fg">{curr.role}</strong></span>
          <span className="text-accent">{curr.qrStatus}</span>
        </div>
        <p className="text-fg text-[13px]">{curr.access}</p>
        <div className="flex items-center justify-between pt-2 border-t border-line text-muted text-[11px]">
          <span>Material: {curr.resource}</span>
          <button
            type="button"
            onClick={triggerQr}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-fg hover:border-accent"
          >
            <QrCode size={13} className="text-accent" />
            <span>{qrVerified ? 'QR Scanned & Verified ✓' : 'Test QR Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function GramSathiSimulator() {
  const [selectedScheme, setSelectedScheme] = useState<number>(0);

  const schemes = [
    {
      name: 'PM Kisan Samman Nidhi',
      eligibility: 'Small & marginal landholding farmer families with valid Aadhaar & land records.',
      benefit: '₹6,000 / year in three equal installments',
      docs: ['Aadhaar Card', 'Land Ownership Records', 'Bank Account Passbook'],
    },
    {
      name: 'Kisan Credit Card (KCC)',
      eligibility: 'Individual/joint farmers, tenant farmers, oral lessees & sharecroppers.',
      benefit: 'Low-interest short-term credit up to ₹3,00,000 for crop cultivation',
      docs: ['Identity Proof', 'Land Revenue Slips', 'Passport Photos'],
    },
    {
      name: 'Pradhan Mantri Fasal Bima Yojana',
      eligibility: 'Farmers growing notified crops in notified areas with insurable interest.',
      benefit: 'Comprehensive risk insurance against non-preventable natural perils',
      docs: ['Sowing Certificate', 'Land Record / ROR', 'Aadhaar & Bank Details'],
    },
  ];

  const handleSelect = (idx: number) => {
    playClick(680, 0.03);
    setSelectedScheme(idx);
    playChime(640, 0.2);
  };

  const curr = schemes[selectedScheme];

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-accent" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-fg">
            Gram Sathi Rural Scheme Assistance Simulator
          </span>
        </div>
        <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-accent">
          Live on Netlify
        </span>
      </div>

      <div className="mt-4">
        <p className="font-mono text-xs text-muted mb-2">Select a government scheme to verify eligibility:</p>
        <div className="flex flex-wrap gap-2">
          {schemes.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`rounded-lg px-3 py-1.5 text-xs text-left transition-colors ${
                selectedScheme === idx
                  ? 'bg-accent text-bg font-medium'
                  : 'border border-line bg-surface-2 text-muted hover:text-fg'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-line bg-bg p-4 font-mono text-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-accent font-semibold">{curr.benefit}</span>
          <span className="text-[11px] text-muted">Direct Benefit Transfer</span>
        </div>
        <p className="text-fg text-xs leading-relaxed"><strong className="text-muted">Eligibility:</strong> {curr.eligibility}</p>
        <div className="pt-2 border-t border-line">
          <span className="text-[11px] text-muted block mb-1.5">Required Documents:</span>
          <div className="flex flex-wrap gap-1.5">
            {curr.docs.map((d) => (
              <span key={d} className="rounded border border-line bg-surface px-2 py-0.5 text-[10px] text-fg">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizMasterSimulator() {
  const [topic, setTopic] = useState<'Python' | 'Flask' | 'SQL'>('Python');
  const [answered, setAnswered] = useState<number | null>(null);

  const quizzes = {
    Python: {
      q: 'What is the purpose of Python’s list comprehension?',
      options: [
        'A concise way to create lists based on existing iterables',
        'To compile Python code into machine binary',
        'To enforce strict variable type casting',
      ],
      correct: 0,
      note: 'Extracted concept: Functional list transformations in Python.',
    },
    Flask: {
      q: 'How does Flask associate a URL endpoint with a view function?',
      options: [
        'Through the @app.route() decorator',
        'By importing external XML configuration files',
        'Via global system environment variables',
      ],
      correct: 0,
      note: 'Extracted concept: Decorator-based HTTP routing in Flask.',
    },
    SQL: {
      q: 'Which SQL clause is used to filter records based on group aggregate values?',
      options: [
        'HAVING',
        'WHERE',
        'ORDER BY',
      ],
      correct: 0,
      note: 'Extracted concept: Aggregate condition evaluation in SQL.',
    },
  };

  const handleTopic = (t: 'Python' | 'Flask' | 'SQL') => {
    playClick(640, 0.03);
    setTopic(t);
    setAnswered(null);
  };

  const handleAnswer = (idx: number) => {
    setAnswered(idx);
    if (idx === quizzes[topic].correct) {
      playChime(880, 0.3);
    } else {
      playClick(440, 0.05);
    }
  };

  const curr = quizzes[topic];

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface p-5 sm:p-7">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-fg">
            Quiz Master AI Question Generator Sandbox
          </span>
        </div>
        <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-[10px] text-muted">
          AI &amp; Self-Assessment
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="font-mono text-xs text-muted mr-1">Study Material:</span>
        {(['Python', 'Flask', 'SQL'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTopic(t)}
            className={`rounded-lg px-3 py-1 text-xs font-mono transition-colors ${
              topic === t
                ? 'bg-accent text-bg font-semibold'
                : 'border border-line bg-surface-2 text-muted hover:text-fg'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-line bg-bg p-4 font-mono text-xs space-y-3">
        <div className="flex items-center gap-2 text-accent">
          <HelpCircle size={14} />
          <span className="font-semibold text-fg text-sm">{curr.q}</span>
        </div>

        <div className="space-y-1.5 pt-1">
          {curr.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left rounded-lg border p-2.5 text-xs transition-colors ${
                answered === idx
                  ? idx === curr.correct
                    ? 'border-accent bg-accent/15 text-fg font-semibold'
                    : 'border-red-500 bg-red-500/10 text-fg'
                  : 'border-line bg-surface text-muted hover:text-fg'
              }`}
            >
              <span className="mr-2 font-bold">{String.fromCharCode(65 + idx)}.</span>
              {opt}
              {answered === idx && idx === curr.correct && <span className="ml-2 text-accent">✓ Correct</span>}
            </button>
          ))}
        </div>

        {answered !== null && (
          <div className="text-[11px] text-muted pt-2 border-t border-line">
            {curr.note}
          </div>
        )}
      </div>
    </div>
  );
}
