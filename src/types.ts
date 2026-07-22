/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AppScreen {
  Welcome = 'welcome',
  Onboarding = 'onboarding',
  Suggestions = 'suggestions',
  Detail = 'detail',
  Reveal = 'reveal',
  Chat = 'chat',
  Profile = 'profile'
}

export type Intent = 'dating' | 'networking' | 'friendship';

export interface UserProfile {
  name: string;
  age: number;
  profession: string;
  industry: string;
  neighborhood: string;
  education: string;
  intent: Intent;
  interests: string[];
  bio: string;
  city: string;
  moodboardPreset: string;
  moodboardAnalyzedVibe: string;
  profilePhotos: string[];
}

export interface Candidate {
  id: string;
  age: number;
  profession: string;
  industry: string;
  neighborhood: string;
  education: string;
  intent: Intent;
  interests: string[];
  aboutMe: string;
  whyMatch: string;
  matchScore: number;
  firstName: string; 
  avatarSeed: number; // For SVG geometric design variations
  promptQuestions: { question: string; answer: string }[];
  overlapHighlights: string[];
  chatHistory: { sender: 'me' | 'them'; text: string; timestamp: string }[];
  scriptedReplies: { TriggerWord: string; response: string; delay?: number }[];
  location: string;
  timeOfDayMatch: string;
  pingStatus: 'none' | 'pinged' | 'accepted' | 'declined';
  photoRevealState: 'locked' | 'requested' | 'unveiled';
  moodboardPhotos: string[];
}
