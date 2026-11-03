import React, { useState } from 'react';
import { ArrowRight, BriefcaseBusiness, Camera, MapPin, Sparkles, Upload, X } from 'lucide-react';
import { expertProfileApi } from '../services/api';
import './ExpertProfileSetup.css';
import './ExpertProfileSetupUpload.css';
import './ProfilePhotoCrop.css';
import './BrandLogo.css';

export default function ExpertProfileSetup({ profile, onComplete, onLogout }) {
  const [form, setForm] = useState(() => ({ professional_title: profile?.professional_title || '', bio: profile?.bio || '', years_of_experience: profile?.years_of_experience ?? '', location: profile?.location || '' }));
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(profile?.profile_photo || '');
  const [photoRemoved, setPhotoRemoved] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const update = (event) => { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); setError(''); };
  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Choose an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Choose an image smaller than 5 MB.'); return; }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoRemoved(false);
    setError('');
  };
  const removePhoto = () => { setPhotoFile(null); setPhotoPreview(''); setPhotoRemoved(Boolean(profile?.profile_photo)); };

  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError('');
    try {
      const payload = new FormData();
      Object.entries({ ...form, years_of_experience: form.years_of_experience ? Number(form.years_of_experience) : '' }).forEach(([key, value]) => payload.append(key, value));
      if (photoFile) payload.append('profile_photo', photoFile);
      if (photoRemoved) payload.append('remove_profile_photo', '1');
      const { data } = profile?.id ? await expertProfileApi.update(profile.id, payload) : await expertProfileApi.create(payload);
      onComplete(data.data);
    } catch (requestError) {
      const validation = requestError.response?.data?.errors;
      setError(validation ? Object.values(validation).flat()[0] : requestError.response?.data?.message || 'We couldn’t save your profile. Please try again.');
    } finally { setSaving(false); }
  };

  return (
    <main className="expert-setup">
      <header className="expert-setup__top"><a className="expert-setup__brand" href="#expert-profile" aria-label="ElderExpert">ElderExpert</a><button type="button" onClick={onLogout}>Sign out</button></header>
      <section className="expert-setup__card">
        <div className="expert-setup__intro"><span className="expert-setup__eyebrow"><Sparkles size={14}/> YOUR EXPERIENCE MATTERS</span><h1>{profile ? 'Update your expert profile' : 'Create your expert profile'}</h1><p>Share your background so organizations can understand how you can help. You can update these details anytime.</p></div>
        <form onSubmit={submit} className="expert-setup__form">
          <div className="expert-setup__photo"><span className="expert-setup__photo-icon">{photoPreview ? <img src={photoPreview} alt="Profile photo preview"/> : <Camera size={22}/>}</span><div className="expert-setup__photo-content"><b>Profile photo <i>Optional</i></b><small>Choose a clear, professional headshot from your device.</small><div className="expert-setup__photo-actions"><label className="expert-setup__choose"><Upload size={15}/>{photoPreview ? 'Change photo' : 'Choose from device'}<input accept="image/png,image/jpeg,image/webp" onChange={choosePhoto} type="file"/></label>{photoPreview && <button className="expert-setup__remove-photo" onClick={removePhoto} type="button"><X size={14}/> Remove</button>}<span>JPG, PNG or WebP · up to 5 MB</span></div></div></div>
          <label className="expert-setup__field"><span>Professional title <em>*</em></span><span className="expert-setup__input"><BriefcaseBusiness size={17}/><input maxLength={255} name="professional_title" onChange={update} placeholder="e.g. Retired Finance Director and Leadership Advisor" required value={form.professional_title}/></span></label>
          <div className="expert-setup__row">
            <label className="expert-setup__field"><span>Years of experience</span><input className="expert-setup__plain" min="0" name="years_of_experience" onChange={update} placeholder="e.g. 25" type="number" value={form.years_of_experience}/></label>
            <label className="expert-setup__field"><span>Location</span><span className="expert-setup__input"><MapPin size={17}/><input maxLength={255} name="location" onChange={update} placeholder="City, country" value={form.location}/></span></label>
          </div>
          <label className="expert-setup__field"><span>Professional summary <em>*</em></span><textarea maxLength={2000} name="bio" onChange={update} placeholder="Describe your experience, areas of expertise, and how you like to support others…" required rows={5} value={form.bio}/><small className="expert-setup__count">{form.bio.length}/2000</small></label>
          {error && <p className="expert-setup__error" role="alert">{error}</p>}
          <button className="expert-setup__submit" disabled={saving} type="submit">{saving ? 'Saving your profile…' : profile ? 'Save profile changes' : 'Create expert profile'} {!saving && <ArrowRight size={18}/>}</button>
          <p className="expert-setup__privacy">Your profile will be visible to organizations seeking expert guidance.</p>
        </form>
      </section>
    </main>
  );
}
