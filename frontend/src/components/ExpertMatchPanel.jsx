import React, { useState } from 'react';
import { BrainCircuit, RefreshCw, Sparkles } from 'lucide-react';
import { expertMatchApi } from '../services/api';
import './ExpertMatchPanel.css';

const domains = [
  'Technology & Hardware',
  'Finance & M&A',
  'Operations & Supply Chain',
  'Life Sciences & Healthcare',
  'Business Strategy & Governance',
  'Legal & Regulatory',
];

export default function ExpertMatchPanel({ renderExpert, onResultsChange }) {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState(null);
  const [matchingMode, setMatchingMode] = useState('');
  const [matchedSkills, setMatchedSkills] = useState([]);
  const [isMatching, setIsMatching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const findMatches = async (event) => {
    event.preventDefault();
    setIsMatching(true);
    setErrorMessage('');

    try {
      const { data } = await expertMatchApi.recommend({
        description,
        category: category || null,
      });
      const matches = data.data || [];
      setResults(matches);
      onResultsChange?.(matches.length > 0);
      setMatchingMode(data.meta?.matching_mode || 'keyword_fallback');
      setMatchedSkills(data.meta?.matched_skills || []);
    } catch (error) {
      const validationMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat()[0]
        : null;
      setErrorMessage(validationMessage || error.response?.data?.message || 'Could not find expert matches. Please try again.');
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <section className="cp-ai-match-panel">
      <div className="cp-ai-match-panel__heading">
        <span><BrainCircuit size={18} /> AI EXPERT MATCHING</span>
        <p>Describe the work you need help with. We’ll identify relevant expertise and rank verified profiles.</p>
      </div>

      <form onSubmit={findMatches}>
        <label className="cp-ai-match-panel__description">
          Project scope or challenge
          <textarea
            maxLength={5000}
            minLength={10}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="For example: We need a review of our semiconductor design before manufacturing."
            required
            rows={3}
            value={description}
          />
        </label>
        <div className="cp-ai-match-panel__footer">
          <label>
            Industry or domain
            <select onChange={(event) => setCategory(event.target.value)} value={category}>
              <option value="">Any domain</option>
              {domains.map((domain) => <option key={domain} value={domain}>{domain}</option>)}
            </select>
          </label>
          <button className="cp-btn cp-btn--primary" disabled={isMatching} type="submit">
            {isMatching ? <><RefreshCw size={15} className="cp-ai-match-spinner" /> Finding matches…</> : <><Sparkles size={15} /> Find AI matches</>}
          </button>
        </div>
      </form>

      <small>Cloudflare AI extracts project requirements. Keep confidential or personal information out of the description.</small>
      {errorMessage && <p className="cp-ai-match-panel__error" role="alert">{errorMessage}</p>}

      {results !== null && (
        <div className="cp-ai-match-panel__results">
          <div className="cp-ai-match-panel__status" role="status">
            <span>{matchingMode === 'cloudflare_ai' ? 'Cloudflare AI extracted requirements' : 'Keyword matching fallback is active'}</span>
            {matchedSkills.length > 0 && <span>Requirements: {matchedSkills.join(', ')}</span>}
            <button type="button" onClick={() => { setResults(null); setMatchingMode(''); setMatchedSkills([]); onResultsChange?.(false); }}>Clear matches</button>
          </div>
          {results.length > 0 ? (
            <div className="cp-experts-list">
              {results.map((expert) => renderExpert(expert))}
            </div>
          ) : <p className="cp-ai-match-panel__empty">No close verified matches yet. Try a broader project description or another domain.</p>}
        </div>
      )}
    </section>
  );
}
