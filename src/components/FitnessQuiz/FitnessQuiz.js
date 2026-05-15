'use client';

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import './FitnessQuiz.css';
import { supabase } from '@/lib/supabase';

// ============================================
// QUIZ DATA
// ============================================
const STEPS = [
  {
    id: 'objective',
    question: 'What is your fitness objective?',
    subtitle: 'Select the goal that best describes what you want to achieve.',
    type: 'single',
    options: [
      'Losing weight',
      'Achieving a toned physique and reducing body fat',
      'Building strength'
    ],
  },
  {
    id: 'inspires',
    question: 'What inspires you to exercise?',
    subtitle: 'Understanding your motivation helps us keep you on track.',
    type: 'single',
    options: [
      'Looking better physically',
      'Staying ahead of others',
      'Preparing for an upcoming event',
      'Feeling healthy and active',
      'Improving mental well-being',
      'Enjoying food without guilt'
    ],
  },
  {
    id: 'activity',
    question: 'How active are you daily?',
    subtitle: 'This helps us calculate your daily energy expenditure.',
    type: 'single-column',
    options: [
      'I often spend a lot of time sitting at a desk or driving.',
      'I try to include 30 to 45 minutes of exercise every few days.',
      'I remain active throughout the day by standing and walking.',
      'My daily routine is very physically demanding.'
    ],
  },
  {
    id: 'coaching',
    question: 'Which coaching style speaks to you the most?',
    subtitle: 'Select the approach that fits your preferences.',
    type: 'single',
    options: [
      'Short, efficient workouts',
      'Strength training',
      'Tailored to Your Needs',
      'Guided programs / High-intensity sessions',
      'Flexible training at my own pace'
    ],
  },
  {
    id: 'age',
    question: 'What is your age range?',
    subtitle: 'Age affects metabolism and recovery speed.',
    type: 'single',
    options: ['18 - 29', '30 - 39', '40 - 49', '50 - 59', '60+'],
  },
  {
    id: 'gender',
    question: 'What is your gender identity?',
    subtitle: 'Used for accurate calorie and macro calculations.',
    type: 'single',
    options: ['Female', 'Male', 'Non-binary', 'I prefer not to answer'],
  },
  {
    id: 'weights',
    question: 'What is your current and target weight?',
    subtitle: 'Set a realistic goal to project your transformation.',
    type: 'double-number',
    fields: [
      { id: 'currentWeight', label: 'Current Weight (kg)', defaultValue: 70 },
      { id: 'targetWeight', label: 'Desire Weight (kg)', defaultValue: 65 }
    ]
  },
  {
    id: 'height',
    question: 'What is your height?',
    subtitle: 'Used to calculate your body metrics (BMI/BMR).',
    type: 'number',
    min: 140,
    max: 220,
    unit: 'cm',
    defaultValue: 170,
  },
  {
    id: 'frequency',
    question: 'How many days a week would you prefer to train?',
    subtitle: 'Consistency matters more than intensity.',
    type: 'single',
    options: ['1 - 2', '3 - 4', '5+'],
  },
  {
    id: 'duration',
    question: 'What session duration would typically align best with your schedule?',
    subtitle: 'Shorter or longer sessions?',
    type: 'single',
    options: ['25 mins', '35 mins', '45 mins', '60 mins'],
  },
  {
    id: 'fitnessLevel',
    question: 'What is your current fitness level?',
    subtitle: 'Be honest — this helps us tailor your program.',
    type: 'single-column',
    options: [
      "Beginner: I'm new to strength training",
      "Some experience: I've worked out before, but not consistently",
      "Intermediate: I train regularly and know the basics",
      "Advanced: I have advanced knowledge and extensive training"
    ],
  },
  {
    id: 'consistency',
    question: 'What usually prevents you from staying consistent?',
    subtitle: 'Select your biggest struggle.',
    type: 'single',
    options: [
      'Lack of time',
      'Work stress and fatigue',
      'No workout structure',
      'The gym environment feels inconvenient'
    ],
  },
  {
    id: 'smartSystem',
    question: 'Would you prefer a guided smart fitness system in your space?',
    subtitle: 'A solution designed to optimize your home workouts.',
    type: 'single-column',
    options: [
      "Yes, definitely. I want a convenient, effective solution at home.",
      "Possibly, depending on cost. It sounds good if it's the right value.",
      "I'd like to learn more. Tell me more about how it works.",
      "I'm unsure. Need more information to decide."
    ],
  }
];

// ============================================
// ADAPTIVE RESULTS CALCULATOR
// ============================================
function calculateResults(answers) {
  // ---- Extract raw inputs ----
  const currentWeight = parseFloat(answers.currentWeight) || 70;
  const targetWeight = parseFloat(answers.targetWeight) || 65;
  const height = parseFloat(answers.height) || 170;

  // ---- Age: midpoint of bracket ----
  let age = 25;
  if (answers.age === '18 - 29') age = 24;
  else if (answers.age === '30 - 39') age = 35;
  else if (answers.age === '40 - 49') age = 45;
  else if (answers.age === '50 - 59') age = 55;
  else if (answers.age === '60+') age = 65;

  // ---- Activity level → NEAT multiplier (Harris-Benedict scale) ----
  let activityMultiplier = 1.375;
  if (answers.activity?.includes('sitting at a desk')) activityMultiplier = 1.2;
  else if (answers.activity?.includes('30 to 45 minutes')) activityMultiplier = 1.375;
  else if (answers.activity?.includes('standing and walking')) activityMultiplier = 1.55;
  else if (answers.activity?.includes('physically demanding')) activityMultiplier = 1.725;

  // ---- Training frequency modifier ----
  let freqMultiplier = 1.0;
  if (answers.frequency === '1 - 2') freqMultiplier = 0.85;
  else if (answers.frequency === '3 - 4') freqMultiplier = 1.0;
  else if (answers.frequency === '5+') freqMultiplier = 1.15;

  // ---- Session duration modifier ----
  let durationMultiplier = 1.0;
  if (answers.duration === '25 mins') durationMultiplier = 0.80;
  else if (answers.duration === '35 mins') durationMultiplier = 0.90;
  else if (answers.duration === '45 mins') durationMultiplier = 1.0;
  else if (answers.duration === '60 mins') durationMultiplier = 1.15;

  // ---- BMR (Mifflin-St Jeor) ----
  let bmr;
  if (answers.gender === 'Male') {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age + 5;
  } else if (answers.gender === 'Female') {
    bmr = 10 * currentWeight + 6.25 * height - 5 * age - 161;
  } else {
    const bmrM = 10 * currentWeight + 6.25 * height - 5 * age + 5;
    const bmrF = 10 * currentWeight + 6.25 * height - 5 * age - 161;
    bmr = (bmrM + bmrF) / 2;
  }

  const tdee = Math.round(bmr * activityMultiplier);

  // ---- DIRECTION is ALWAYS determined by actual weight delta ----
  const weightDelta = targetWeight - currentWeight; // positive = gain, negative = lose
  const isLosing = weightDelta < 0;
  const isGaining = weightDelta > 0;
  const isMaintaining = Math.abs(weightDelta) < 0.1;

  // ---- Base safe weekly change rate (kg/week) from objective ----
  // This controls intensity, NOT direction. Direction comes from weightDelta.
  let baseRate = 0.4; // moderate default
  if (answers.objective === 'Losing weight') baseRate = 0.5;
  else if (answers.objective?.includes('toned physique')) baseRate = 0.35;
  else if (answers.objective === 'Building strength') baseRate = 0.25;

  // Modulate rate by training volume (frequency × duration)
  const trainingIntensity = freqMultiplier * durationMultiplier;
  const adjustedRate = baseRate * trainingIntensity;

  // Clamp to safe physiological range: 0.15 – 0.8 kg/week
  const safeRate = Math.max(0.15, Math.min(0.8, adjustedRate));

  // Signed weekly rate: negative = losing, positive = gaining
  const weeklyRate = isMaintaining ? 0 : (isLosing ? -safeRate : safeRate);

  // ---- Calorie target ----
  // 1 kg fat ≈ 7700 kcal → per week adjustment = safeRate * 7700 / 7 ≈ safeRate * 1100
  let calorieAdjustment = 0;
  if (isLosing) calorieAdjustment = Math.round(safeRate * 1100); // deficit
  else if (isGaining) calorieAdjustment = -Math.round(safeRate * 1100); // surplus

  const dailyCal = Math.max(1200, Math.round(tdee - calorieAdjustment));

  // ---- Macros ----
  const proteinPerKg = isGaining ? 2.2 : 2.0;
  const protein = Math.round(currentWeight * proteinPerKg);
  const fatPercent = isGaining ? 0.28 : 0.25;
  const fat = Math.round((dailyCal * fatPercent) / 9);
  const carbs = Math.max(50, Math.round((dailyCal - protein * 4 - fat * 9) / 4));

  // ---- Adaptive timeline ----
  let totalWeeks = 4;
  if (!isMaintaining && safeRate > 0) {
    totalWeeks = Math.ceil(Math.abs(weightDelta) / safeRate);
  }
  totalWeeks = Math.max(4, Math.min(52, totalWeeks));

  const w1 = Math.max(1, Math.round(totalWeeks * 0.33));
  const w2 = Math.max(2, Math.round(totalWeeks * 0.66));
  const w3 = totalWeeks;

  // Clamp helper: never overshoot target
  const clamp = (w) => {
    if (isLosing) return Math.max(targetWeight, w);
    if (isGaining) return Math.min(targetWeight, w);
    return currentWeight; // maintaining
  };

  const timeline = [
    { label: 'Today', weight: currentWeight },
    { label: `Week ${w1}`, weight: Math.round(clamp(currentWeight + weeklyRate * w1) * 10) / 10 },
    { label: `Week ${w2}`, weight: Math.round(clamp(currentWeight + weeklyRate * w2) * 10) / 10 },
    { label: `Week ${w3}`, weight: Math.round(clamp(currentWeight + weeklyRate * w3) * 10) / 10 },
  ];

  const milestones = [
    { week: w1, label: 'Foundation phase', weight: timeline[1].weight },
    { week: w2, label: 'Progress phase', weight: timeline[2].weight },
    { week: w3, label: 'Goal reached', weight: timeline[3].weight },
  ];

  // ---- Body fat estimate (Deurenberg BMI formula) ----
  const bmi = currentWeight / ((height / 100) ** 2);
  let bfEstimate;
  if (answers.gender === 'Male') {
    bfEstimate = Math.round(1.20 * bmi + 0.23 * age - 16.2);
  } else if (answers.gender === 'Female') {
    bfEstimate = Math.round(1.20 * bmi + 0.23 * age - 5.4);
  } else {
    bfEstimate = Math.round(1.20 * bmi + 0.23 * age - 10.8);
  }
  bfEstimate = Math.max(5, Math.min(45, bfEstimate));

  // ---- Program recommendation (coaching + fitness level) ----
  let programReco = 'Personalized Functional Plan';
  if (answers.coaching?.includes('Strength')) {
    programReco = answers.fitnessLevel?.includes('Advanced')
      ? 'Advanced Progressive Overload'
      : 'Progressive Overload Strength';
  } else if (answers.coaching?.includes('Short')) {
    programReco = 'High-Efficiency HIIT';
  } else if (answers.coaching?.includes('Guided') || answers.coaching?.includes('High-intensity')) {
    programReco = 'Immersive Guided Classes';
  } else if (answers.coaching?.includes('Flexible')) {
    programReco = 'Self-Paced Flexible Training';
  } else if (answers.coaching?.includes('Tailored')) {
    programReco = 'Custom Adaptive Program';
  }

  // Append fitness level context
  let levelNote = '';
  if (answers.fitnessLevel?.includes('Beginner')) levelNote = 'tailored for beginners';
  else if (answers.fitnessLevel?.includes('Some experience')) levelNote = 'for returning trainees';
  else if (answers.fitnessLevel?.includes('Intermediate')) levelNote = 'for intermediate athletes';
  else if (answers.fitnessLevel?.includes('Advanced')) levelNote = 'for advanced athletes';

  // ---- Goal summary text ----
  let goalSummary = '';
  if (isMaintaining) goalSummary = 'Maintain your current weight while improving fitness.';
  else if (isLosing) goalSummary = `Lose ${Math.abs(weightDelta).toFixed(1)} kg over ~${totalWeeks} weeks at ${safeRate.toFixed(2)} kg/week.`;
  else goalSummary = `Gain ${weightDelta.toFixed(1)} kg over ~${totalWeeks} weeks at ${safeRate.toFixed(2)} kg/week.`;

  return {
    dailyCal, protein, carbs, fat, bfEstimate, bmi: Math.round(bmi * 10) / 10,
    milestones, currentWeight, targetWeight, timeline,
    programReco, levelNote, goalSummary,
    isLosing, isGaining, isMaintaining, totalWeeks,
    smartSystem: answers.smartSystem,
  };
}

// ============================================
// SUB-COMPONENTS
// ============================================

function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="sq-progress">
      <div className="sq-progress__track">
        <div className="sq-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="sq-progress__label">
        <span>{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

function ChipSelector({ options, selected, onSelect, column }) {
  return (
    <div className={`sq-chips ${column ? 'sq-chip-column' : ''}`}>
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <button
            key={opt}
            className={`sq-chip ${isSelected ? 'sq-chip--active' : ''}`}
            onClick={() => onSelect(opt)}
            type="button"
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function NumberInput({ value, onChange, min, max, unit }) {
  return (
    <div className="sq-input-wrapper">
      <input 
        type="number" 
        className="sq-input"
        value={value}
        onChange={(e) => {
          let v = parseInt(e.target.value, 10);
          if (isNaN(v)) v = min;
          onChange(v);
        }}
        min={min}
        max={max}
      />
      <span className="sq-input-label">{unit}</span>
    </div>
  );
}

function DoubleNumberInput({ fields, values, onChange }) {
  return (
    <div className="sq-double-input">
      {fields.map(f => (
        <div key={f.id} className="sq-input-wrapper">
          <input 
            type="number" 
            className="sq-input"
            value={values[f.id] ?? f.defaultValue}
            onChange={(e) => {
              let v = parseFloat(e.target.value);
              if (isNaN(v)) v = f.defaultValue;
              onChange(f.id, v);
            }}
          />
          <span className="sq-input-label">{f.label}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================
// WEIGHT TIMELINE GRAPH (SVG) - ADAPTIVE
// ============================================
function WeightTimelineGraph({ timeline }) {
  const W = 400, H = 200, PAD = 50, PADT = 30, PADB = 40;
  const weights = timeline.map(p => p.weight);
  const minW = Math.min(...weights) - 2;
  const maxW = Math.max(...weights) + 2;
  const range = maxW - minW || 1;

  const points = timeline.map((p, i) => ({
    x: PAD + (i / (timeline.length - 1)) * (W - PAD * 2),
    y: PADT + ((maxW - p.weight) / range) * (H - PADT - PADB),
    ...p,
  }));

  const pathD = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = prev.x + (p.x - prev.x) * 0.6;
    return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
  }).join(' ');

  return (
    <div className="sq-graph">
      <h3 className="sq-graph__title">Adaptive Progress Projection</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="sq-graph__svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00AA13" />
            <stop offset="100%" stopColor="#00dd18" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,170,19,0.25)" />
            <stop offset="100%" stopColor="rgba(0,170,19,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map(i => {
          const y = PADT + (i / 3) * (H - PADT - PADB);
          const val = Math.round(maxW - (i / 3) * range);
          return (
            <g key={i}>
              <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x={PAD - 8} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="var(--font-inter)">{val}</text>
            </g>
          );
        })}
        <path d={`${pathD} L ${points[points.length - 1].x} ${H - PADB} L ${points[0].x} ${H - PADB} Z`} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="#0a0a0a" stroke="#00AA13" strokeWidth="2.5" />
            <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="var(--font-inter)">{p.weight} kg</text>
            <text x={p.x} y={H - PADB + 18} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="var(--font-inter)">{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ============================================
// RESULTS
// ============================================
function Results({ data, onRestart, isAnonymous }) {
  const isPositiveSystem = data.smartSystem?.includes('Yes') || data.smartSystem?.includes('Possibly');

  return (
    <div className="sq-results">
      <h2 className="sq-results__title">Your Fitness Projection</h2>
      <p className="sq-results__subtitle">{data.goalSummary}</p>

      <div className="sq-metrics">
        <div className="sq-metric">
          <span className="sq-metric__label">Current</span>
          <span className="sq-metric__value">{data.currentWeight}</span>
          <span className="sq-metric__unit">kg</span>
        </div>
        <div className="sq-metric sq-metric--accent">
          <span className="sq-metric__label">Target</span>
          <span className="sq-metric__value">{data.targetWeight}</span>
          <span className="sq-metric__unit">kg</span>
        </div>
        <div className="sq-metric">
          <span className="sq-metric__label">BMI</span>
          <span className="sq-metric__value">{data.bmi}</span>
          <span className="sq-metric__unit">kg/m²</span>
        </div>
        <div className="sq-metric">
          <span className="sq-metric__label">Body Fat Est.</span>
          <span className="sq-metric__value">{data.bfEstimate}</span>
          <span className="sq-metric__unit">%</span>
        </div>
      </div>

      <WeightTimelineGraph timeline={data.timeline} />

      <div className="sq-recommendation">
        <h3 className="sq-recommendation__title">Recommended Approach</h3>
        <p className="sq-recommendation__body">
          Based on your preferences, we recommend <strong>{data.programReco}</strong>
          {data.levelNote ? `, ${data.levelNote}` : ''}.
          {data.isLosing && ' Focus on a sustainable caloric deficit combined with your training routine.'}
          {data.isGaining && ' Focus on progressive overload with a controlled caloric surplus to build lean mass.'}
          {data.isMaintaining && ' Focus on body recomposition — building muscle while maintaining weight.'}
        </p>
      </div>

      <div className="sq-milestones">
        {data.milestones.map((m) => (
          <div key={m.week} className="sq-milestone">
            <span className="sq-milestone__week">Week {m.week}</span>
            <span className="sq-milestone__label">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="sq-macros">
        <h3 className="sq-macros__title">Daily Nutrition Target</h3>
        {(() => {
          const proteinPct = Math.round(data.protein * 4 / data.dailyCal * 100);
          const carbsPct = Math.round(data.carbs * 4 / data.dailyCal * 100);
          const fatPct = Math.round(data.fat * 9 / data.dailyCal * 100);
          return (
            <>
              <div className="sq-macros__bar">
                <div className="sq-macros__segment sq-macros__segment--protein" style={{ width: `${proteinPct}%` }} data-tooltip={`Protein ${proteinPct}%`} />
                <div className="sq-macros__segment sq-macros__segment--carbs" style={{ width: `${carbsPct}%` }} data-tooltip={`Carbs ${carbsPct}%`} />
                <div className="sq-macros__segment sq-macros__segment--fat" style={{ width: `${fatPct}%` }} data-tooltip={`Fat ${fatPct}%`} />
              </div>
              <div className="sq-macros__legend">
                <div className="sq-macros__item"><span className="sq-dot sq-dot--protein" /> Protein {data.protein}g ({proteinPct}%)</div>
                <div className="sq-macros__item"><span className="sq-dot sq-dot--carbs" /> Carbs {data.carbs}g ({carbsPct}%)</div>
                <div className="sq-macros__item"><span className="sq-dot sq-dot--fat" /> Fat {data.fat}g ({fatPct}%)</div>
              </div>
            </>
          );
        })()}
      </div>

      <div className="sq-calorie">
        <div className="sq-calorie__inner">
          <div>
            <span className="sq-calorie__label">Recommended Daily Intake</span>
            <span className="sq-calorie__value">{data.dailyCal} kcal</span>
          </div>
        </div>
      </div>

      {isPositiveSystem && (
        <div className="sq-cta">
          <h3>Elevate Your Training</h3>
          <p>You indicated interest in a smart fitness system. Striver integrates perfectly with your {data.programReco} goal.</p>
          <a href="/shop">Reserve Striver Today</a>
        </div>
      )}

      {isAnonymous && (
        <div className="sq-auth-prompt">
          <div className="sq-auth-prompt__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h3 className="sq-auth-prompt__title">Get Your Personalized Plan</h3>
          <p className="sq-auth-prompt__text">
            Our fitness team will review your results and reach out with a tailored plan.
            Sign up or sign in to save your progress and unlock exclusive recommendations.
          </p>
          <div className="sq-auth-prompt__actions">
            <a href="/signup" className="sq-auth-prompt__btn sq-auth-prompt__btn--primary">Sign Up</a>
            <a href="/login" className="sq-auth-prompt__btn sq-auth-prompt__btn--secondary">Sign In</a>
          </div>
        </div>
      )}

      <button className="sq-btn sq-btn--restart" onClick={onRestart} type="button">
        Retake Quiz
      </button>
    </div>
  );
}

// ============================================
// BACKGROUND COMPONENT
// ============================================
function QuizBackground() {
  return (
    <div className="sq-wizard-bg">
      <div className="sq-bg-wrap">
        <span className="sq-w-large" style={{top: '8%', left: '2%'}}>PRECISION</span>
        <span className="sq-w-med" style={{top: '12%', left: '48%'}}>EFFICIENCY</span>
        <span className="sq-w-small" style={{top: '5%', left: '80%'}}>STAMINA</span>
        <span className="sq-w-small" style={{top: '14%', left: '82%'}}>POWER</span>
        
        <span className="sq-w-small" style={{top: '25%', left: '5%'}}>STRENGTH</span>
        <span className="sq-w-med" style={{top: '26%', left: '22%'}}>TECHNOLOGY</span>
        <span className="sq-w-small" style={{top: '25%', left: '75%'}}>RESILIENCE</span>

        <span className="sq-w-large" style={{top: '38%', left: '2%'}}>FITNESS</span>
        <span className="sq-w-striver" style={{top: '42%', left: '32%'}}>STRIVER</span>
        <span className="sq-w-med" style={{top: '40%', left: '78%'}}>TECHNOLOGY</span>

        <span className="sq-w-large" style={{top: '65%', left: '4%'}}>PERFORMANCE</span>
        <span className="sq-w-med" style={{top: '68%', left: '62%'}}>INNOVATION</span>
        <span className="sq-w-small" style={{top: '65%', left: '90%'}}>SPEED</span>

        <span className="sq-w-small" style={{top: '85%', left: '8%'}}>ENDURANCE</span>
        <span className="sq-w-large" style={{top: '85%', left: '30%'}}>SPEED</span>
        <span className="sq-w-med" style={{top: '86%', left: '72%'}}>STRENGTH</span>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function FitnessQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    currentWeight: 70,
    targetWeight: 65,
    height: 170,
  });
  const [showResults, setShowResults] = useState(false);
  const sessionIdRef = useRef(
    typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2)
  );
  const submittedRef = useRef(false);

  const step = STEPS[currentStep];
  const totalSteps = STEPS.length;
  const isHeroMode = currentStep === 0 && !showResults;

  const updateAnswer = useCallback((key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleChipSelect = useCallback((option) => {
    updateAnswer(step.id, option);
  }, [step, updateAnswer]);

  const canProceed = useMemo(() => {
    if (step.type === 'single' || step.type === 'single-column') return !!answers[step.id];
    if (step.type === 'number') return !!answers[step.id];
    if (step.type === 'double-number') {
      return !!answers['currentWeight'] && !!answers['targetWeight'];
    }
    return true;
  }, [answers, step]);

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  }, [currentStep, totalSteps]);

  const goBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep, showResults]);

  const restart = useCallback(() => {
    setCurrentStep(0);
    setShowResults(false);
    setAnswers({ currentWeight: 70, targetWeight: 65, height: 170 });
    submittedRef.current = false;
    sessionIdRef.current = typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  }, []);

  const results = useMemo(() => calculateResults(answers), [answers]);

  // Submit quiz answers to Supabase when results are shown
  useEffect(() => {
    if (!showResults || submittedRef.current) return;
    submittedRef.current = true;

    const submitQuiz = async () => {
      try {
        // Get web user from localStorage (custom auth)
        let webAccountId = null;
        try {
          const stored = localStorage.getItem('striver_web_user');
          if (stored) webAccountId = JSON.parse(stored)?.id || null;
        } catch {}

        await supabase.from('web_quiz_submissions').insert({
          session_id: sessionIdRef.current,
          web_account_id: webAccountId,
          answers,
          results: {
            dailyCal: results.dailyCal,
            protein: results.protein,
            carbs: results.carbs,
            fat: results.fat,
            bmi: results.bmi,
            bfEstimate: results.bfEstimate,
            programReco: results.programReco,
            totalWeeks: results.totalWeeks,
            currentWeight: results.currentWeight,
            targetWeight: results.targetWeight,
            goalSummary: results.goalSummary,
          },
          source: 'website',
        });
      } catch (err) {
        console.error('Quiz submission error:', err);
      }
    };
    submitQuiz();
  }, [showResults, answers, results]);

  // Step content renderer
  const renderStepContent = () => (
    <>
      {(step.type === 'single' || step.type === 'single-column') && (
        <ChipSelector options={step.options} selected={answers[step.id]} onSelect={handleChipSelect} column={step.type === 'single-column'} />
      )}
      {step.type === 'number' && (
        <NumberInput value={answers[step.id] ?? step.defaultValue} onChange={(v) => updateAnswer(step.id, v)} min={step.min} max={step.max} unit={step.unit} />
      )}
      {step.type === 'double-number' && (
        <DoubleNumberInput fields={step.fields} values={answers} onChange={updateAnswer} />
      )}
    </>
  );

  // HERO MODE
  if (isHeroMode) {
    return (
      <div className="sq-hero-wrapper">
        <div className="sq-hero-card">
          <h2 className="sq-hero-question">{step.question}</h2>
          <p className="sq-hero-subtitle">{step.subtitle}</p>
          <div className="sq-hero-chips">
            {step.options.map((opt) => (
              <button
                key={opt}
                className={`sq-hero-chip ${answers[step.id] === opt ? 'sq-hero-chip--active' : ''}`}
                onClick={() => updateAnswer(step.id, opt)}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
          <button className="sq-hero-next" onClick={goNext} disabled={!canProceed} type="button">
            Next
          </button>
        </div>
      </div>
    );
  }

  // WIZARD MODE
  return (
    <div className="sq-wizard-overlay">
      <QuizBackground />
      <div className="sq-wizard">
        <div className="sq-wizard__inner">
          {showResults ? (
            <Results data={results} onRestart={restart} isAnonymous={!(() => { try { return !!localStorage.getItem('striver_web_user'); } catch { return false; } })()} />
          ) : (
            <>
              <ProgressBar current={currentStep} total={totalSteps} />
              <div className="sq-body" key={currentStep}>
                <h2 className="sq-question">{step.question}</h2>
                {step.subtitle && <p className="sq-subtitle">{step.subtitle}</p>}
                <div className="sq-content">{renderStepContent()}</div>
              </div>
              <div className="sq-nav">
                <button className="sq-btn sq-btn--back" onClick={goBack} type="button">Back</button>
                <button className="sq-btn sq-btn--next" onClick={goNext} disabled={!canProceed} type="button">
                  {currentStep === totalSteps - 1 ? 'See Results' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
