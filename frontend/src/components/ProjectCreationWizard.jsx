import React, { useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2,
  FileText, Lightbulb, Monitor, Sparkles, Upload, Users, X,
} from 'lucide-react';
import './ProjectCreationWizard.css';

const steps = ['Project Details', 'Requirements', 'Review & Publish'];
const categories = ['Technology & Software', 'Business Strategy', 'Finance & Accounting', 'Healthcare & Life Sciences', 'Operations & Supply Chain', 'Legal & Compliance', 'Marketing & Communications', 'Other'];

export default function ProjectCreationWizard({ onBack }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: '', category: '', description: '', budget: '', duration: 'Less than 1 month', workArrangement: 'Remote', expertsNeeded: '1 expert', preferredDate: '', experience: 'Any Level', additionalRequirements: '' });
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [notice, setNotice] = useState('');

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setNotice('');
  };
  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !skills.some((item) => item.toLowerCase() === skill.toLowerCase())) setSkills((current) => [...current, skill]);
    setSkillInput('');
  };
  const nextStep = () => {
    const pendingSkill = skillInput.trim();
    const nextSkills = pendingSkill && !skills.some((skill) => skill.toLowerCase() === pendingSkill.toLowerCase()) ? [...skills, pendingSkill] : skills;
    if (step === 1 && (!form.title.trim() || !form.category || !form.description.trim())) {
      setNotice('Add a project title, category, and description to continue.');
      return;
    }
    if (step === 2 && nextSkills.length === 0) {
      setNotice('Add at least one required skill or area of expertise.');
      return;
    }
    setSkills(nextSkills);
    setSkillInput('');
    setNotice('');
    setStep((current) => Math.min(3, current + 1));
  };
  const addFiles = (event) => {
    setAttachments((current) => [...current, ...Array.from(event.target.files || [])].slice(0, 5));
    event.target.value = '';
  };
  const saveNotice = (action) => setNotice(`${action} will be available when project storage is connected. Your details remain in this form for now.`);

  const Choice = ({ name, value, label, checked, onChange }) => (
    <label className={`project-choice ${checked ? 'project-choice--selected' : ''}`}>
      <input checked={checked} name={name} onChange={onChange} type="radio" value={value} />
      <span className="project-choice__dot" /><span>{label}</span>
    </label>
  );

  return (
    <div className="project-wizard">
      <div className="project-wizard__heading">
        <div>
          <button className="project-wizard__back" onClick={onBack} type="button"><ArrowLeft size={15} /> My Projects</button>
          <h1>{step === 3 ? 'Review & Publish' : 'Create a New Project'}</h1>
          <p>{step === 1 ? 'Describe your project and find the right experts to bring your ideas to life.' : step === 2 ? 'Set requirements to help us find the best experts for your project.' : 'Review your project details before publishing.'}</p>
        </div>
        <div className="project-wizard__progress" aria-label={`Step ${step} of ${steps.length}`}>
          {steps.map((label, index) => {
            const number = index + 1;
            return <React.Fragment key={label}><div className={`project-step ${step === number ? 'project-step--active' : ''} ${step > number ? 'project-step--complete' : ''}`}><span>{step > number ? <Check size={13} /> : number}</span><small>{label}</small></div>{number < steps.length && <i className={`project-step__line ${step > number ? 'project-step__line--complete' : ''}`} />}</React.Fragment>;
          })}
        </div>
      </div>

      <div className="project-wizard__layout">
        <div className="project-wizard__main">
          {step === 1 && <>
            <section className="project-form-card">
              <header><h2>Project Information</h2><p>Provide the main details about your project.</p></header>
              <div className="project-form-grid">
                <label className="project-field project-field--full"><span>Project Title <b>*</b></span><input maxLength={160} name="title" onChange={updateField} placeholder="e.g. Digital Transformation Strategy for SME Business" value={form.title} /><small>{form.title.length}/160</small></label>
                <label className="project-field"><span>Project Category <b>*</b></span><select name="category" onChange={updateField} value={form.category}><option value="">Select a category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
                <div className="project-field"><span>Required Skills / Expertise <b>*</b></span><div className="project-skill-input"><div className="project-skill-tags">{skills.map((skill) => <button key={skill} onClick={() => setSkills((current) => current.filter((item) => item !== skill))} type="button">{skill}<X size={12} /></button>)}<input aria-label="Add a required skill" onChange={(event) => setSkillInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); addSkill(); } }} placeholder={skills.length ? 'Add another skill…' : 'Add skills and press Enter…'} value={skillInput} /></div></div></div>
                <label className="project-field project-field--full"><span>Project Description <b>*</b></span><textarea maxLength={1000} name="description" onChange={updateField} placeholder="Explain your project goals, challenges, and the type of expertise you are looking for…" rows={4} value={form.description} /><small>{form.description.length}/1000</small></label>
              </div>
            </section>
            <section className="project-form-card">
              <header><h2>Project Details</h2><p>Add more information to help experts understand your needs.</p></header>
              <div className="project-form-grid project-form-grid--details">
                <fieldset className="project-option-group"><legend>Budget <em>(Optional)</em></legend>{['Negotiable', 'Below LKR 50,000', 'LKR 50,000 – 150,000', 'Above LKR 150,000'].map((budget) => <Choice key={budget} name="budget" value={budget} label={budget} checked={form.budget === budget} onChange={updateField} />)}</fieldset>
                <fieldset className="project-option-group"><legend>Expected Duration <em>(Optional)</em></legend>{['Less than 1 month', '1 – 3 months', '3 – 6 months', 'More than 6 months'].map((duration) => <Choice key={duration} name="duration" value={duration} label={duration} checked={form.duration === duration} onChange={updateField} />)}</fieldset>
                <fieldset className="project-option-group"><legend>Work Arrangement <em>(Optional)</em></legend>{['Remote', 'On-site', 'Hybrid'].map((arrangement) => <Choice key={arrangement} name="workArrangement" value={arrangement} label={arrangement} checked={form.workArrangement === arrangement} onChange={updateField} />)}</fieldset>
                <label className="project-field"><span>Number of Experts Needed <em>(Optional)</em></span><select name="expertsNeeded" onChange={updateField} value={form.expertsNeeded}>{['1 expert', '2 – 3 experts', '4 – 5 experts', 'More than 5 experts'].map((count) => <option key={count}>{count}</option>)}</select></label>
                <label className="project-field"><span>Preferred Completion Date <em>(Optional)</em></span><input name="preferredDate" onChange={updateField} type="date" value={form.preferredDate} /></label>
              </div>
            </section>
          </>}

          {step === 2 && <section className="project-form-card project-requirements-card">
            <header><h2>Project Requirements</h2><p>Define what you need from the experts.</p></header>
            <label className="project-field"><span>Required Skills / Expertise <b>*</b></span><input onChange={(event) => setSkillInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); addSkill(); } }} placeholder="Search or add skills (e.g. Project Management, Cloud, Marketing…)" value={skillInput} /></label>
            <div className="project-skill-tags project-skill-tags--large">{skills.map((skill) => <button key={skill} onClick={() => setSkills((current) => current.filter((item) => item !== skill))} type="button">{skill}<X size={12} /></button>)}</div>
            <fieldset className="project-choice-grid"><legend>Number of Experts Needed</legend>{['1 expert', '2 – 3 experts', '4 – 5 experts', 'More than 5 experts'].map((count) => <label className={`project-count-choice ${form.expertsNeeded === count ? 'project-count-choice--selected' : ''}`} key={count}><input checked={form.expertsNeeded === count} name="expertsNeeded" onChange={updateField} type="radio" value={count} /><Users size={18} /><strong>{count}</strong></label>)}</fieldset>
            <fieldset className="project-choice-grid project-choice-grid--experience"><legend>Expected Experience Level</legend>{[['Any Level', 'Open to all'], ['Mid Level', '3 – 10 years'], ['Senior Level', '10+ years']].map(([level, detail]) => <label className={`project-level-choice ${form.experience === level ? 'project-level-choice--selected' : ''}`} key={level}><input checked={form.experience === level} name="experience" onChange={updateField} type="radio" value={level} /><CheckCircle2 size={17} /><strong>{level}</strong><small>{detail}</small></label>)}</fieldset>
            <label className="project-field"><span>Specific Requirements <em>(Optional)</em></span><textarea maxLength={1000} name="additionalRequirements" onChange={updateField} placeholder="Mention any specific qualifications, industry experience, tools, or certifications you prefer…" rows={4} value={form.additionalRequirements} /><small>{form.additionalRequirements.length}/1000</small></label>
            <div className="project-attachments"><div><span className="project-attachments__icon"><Upload size={18} /></span><div><strong>Attachments <em>(Optional)</em></strong><small>Upload project briefs, reference documents, or technical requirements.</small></div></div><label className="project-upload-btn">Choose Files<input accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple onChange={addFiles} type="file" /></label></div>
            {attachments.length > 0 && <ul className="project-attachment-list">{attachments.map((file, index) => <li key={`${file.name}-${index}`}><FileText size={14} /> {file.name}<button aria-label={`Remove ${file.name}`} onClick={() => setAttachments((current) => current.filter((_, fileIndex) => fileIndex !== index))} type="button"><X size={13} /></button></li>)}</ul>}
          </section>}

          {step === 3 && <section className="project-form-card project-review-card">
            <header><div><h2>Review &amp; Publish</h2><p>Please review all the information before publishing your project.</p></div><button className="project-review-edit" onClick={() => setStep(1)} type="button">Edit</button></header>
            <div className="project-review-section"><h3>Project Information</h3><dl><dt>Project Title</dt><dd>{form.title}</dd><dt>Category</dt><dd>{form.category}</dd><dt>Description</dt><dd>{form.description}</dd></dl></div>
            <div className="project-review-section"><h3>Requirements</h3><dl><dt>Required Skills</dt><dd><div className="project-review-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></dd><dt>Number of Experts</dt><dd>{form.expertsNeeded}</dd><dt>Experience Level</dt><dd>{form.experience}</dd>{form.additionalRequirements && <><dt>Specific Requirements</dt><dd>{form.additionalRequirements}</dd></>}</dl></div>
            <div className="project-review-section"><h3>Project Details</h3><dl>{[['Budget', form.budget], ['Expected Duration', form.duration], ['Work Arrangement', form.workArrangement], ['Preferred Completion Date', form.preferredDate], ['Attachments', attachments.length ? attachments.map((file) => file.name).join(', ') : 'None']].filter(([, value]) => value).map(([label, value]) => <React.Fragment key={label}><dt>{label}</dt><dd>{value}</dd></React.Fragment>)}</dl></div>
          </section>}

          {notice && <p className="project-wizard__notice" role="status">{notice}</p>}
          <div className="project-wizard__footer">
            {step > 1 ? <button className="project-wizard__secondary" onClick={() => { setNotice(''); setStep((current) => current - 1); }} type="button"><ArrowLeft size={15} /> Previous</button> : <button className="project-wizard__secondary" onClick={() => saveNotice('Draft saving')} type="button">Save as Draft</button>}
            <span className="project-wizard__footer-spacer" />
            {step < 3 ? <button className="project-wizard__primary" onClick={nextStep} type="button">Next Step <ArrowRight size={15} /></button> : <><button className="project-wizard__secondary" onClick={() => saveNotice('Draft saving')} type="button">Save as Draft</button><button className="project-wizard__primary" onClick={() => saveNotice('Publishing')} type="button">Publish Project <ArrowRight size={15} /></button></>}
          </div>
        </div>

        <aside className="project-wizard__aside">
          <section className="project-tip-card"><div className="project-tip-card__banner"><span><FileText size={29} /><Sparkles size={17} /></span><div><strong>The right project</strong><p>Be clear and specific to attract the most relevant experts.</p></div></div><ul>{['Describe your goals and challenges', 'Mention the key skills you need', 'Set a realistic budget and timeline', 'Be clear about the work arrangement'].map((tip) => <li key={tip}><CheckCircle2 size={15} />{tip}</li>)}</ul></section>
          <section className="project-example-card"><header><span><Lightbulb size={15} /> Example Project</span><b>Sample</b></header><h3>Digital Transformation Strategy</h3><p>We are looking for experienced guidance to assess our current processes and plan a practical modernization roadmap.</p><div><span>Technology</span><span>3–6 months</span><span>Remote</span></div></section>
          <section className="project-help-card"><span><Monitor size={19} /></span><div><strong>Need Help?</strong><p>Our support team is here to help you create a successful project.</p></div><button type="button" onClick={() => setNotice('Contact support from your ElderExpert account to get help with your project.')}>Contact Support <ArrowRight size={13} /></button></section>
        </aside>
      </div>
    </div>
  );
}
